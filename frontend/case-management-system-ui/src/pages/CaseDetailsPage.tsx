import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { addComment, getCaseById, updateCase } from "../api/casesApi";
import { getUsers } from "../api/usersApi";
import { getCustomers } from "../api/customersApi";
import type { UpdateCaseRequest } from "../types/case";
import StatusBadge from "../components/StatusBadge";
import styles from "./CaseDetailsPage.module.css";

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

function toDateTimeLocalValue(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

function fromDateTimeLocalValue(value: string) {
  if (!value) return null;
  return new Date(value).toISOString();
}

function CaseDetailsPage() {
  const { id } = useParams();
  const caseId = Number(id);
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState<UpdateCaseRequest | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const caseQuery = useQuery({
    queryKey: ["case", caseId],
    queryFn: () => getCaseById(caseId),
    enabled: Number.isFinite(caseId)
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers
  });

  useEffect(() => {
    if (caseQuery.data) {
      setFormValues({
        title: caseQuery.data.title,
        description: caseQuery.data.description,
        status: caseQuery.data.status,
        priority: caseQuery.data.priority,
        category: caseQuery.data.category,
        customerId: caseQuery.data.customerId,
        assignedUserId: caseQuery.data.assignedUserId,
        dueDate: caseQuery.data.dueDate
      });
    }
  }, [caseQuery.data]);

  const updateCaseMutation = useMutation({
    mutationFn: (request: UpdateCaseRequest) => updateCase(caseId, request),
    onSuccess: async () => {
      setUpdateMessage("Case updated successfully.");
      await queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
    },
    onError: () => {
      setUpdateMessage("Failed to update case.");
    }
  });

  const addCommentMutation = useMutation({
    mutationFn: (content: string) =>
      addComment(caseId, {
        userId: 1,
        content
      }),
    onSuccess: async () => {
      setCommentContent("");
      setCommentMessage("Comment added successfully.");
      await queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
    },
    onError: () => {
      setCommentMessage("Failed to add comment.");
    }
  });

  if (!Number.isFinite(caseId)) {
    return (
      <section>
        <h2>Case Details</h2>
        <p>Invalid case id.</p>
      </section>
    );
  }

  if (caseQuery.isLoading || !formValues) {
    return (
      <section>
        <h2>Case Details</h2>
        <p>Loading case details...</p>
      </section>
    );
  }

  if (caseQuery.isError || !caseQuery.data) {
    return (
      <section>
        <h2>Case Details</h2>
        <p>Failed to load case details.</p>
      </section>
    );
  }

  const caseItem = caseQuery.data;

  function handleUpdateSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdateMessage("");

    if (!formValues) {
      setUpdateMessage("Form is not ready yet.");
      return;
    }

    updateCaseMutation.mutate(formValues);
  }

  function handleCommentSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setCommentMessage("");

    if (!commentContent.trim()) {
      setCommentMessage("Comment content is required.");
      return;
    }

    addCommentMutation.mutate(commentContent.trim());
  }

  return (
    <section className={styles.caseDetailsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h2>Case Details</h2>
          <p>Review and update the selected case.</p>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailsMain}>
          <div className={styles.panel}>
            <div className={styles.detailsHeading}>
              <div>
                <h3>{caseItem.title}</h3>
                <p>{caseItem.customerName}</p>
              </div>

              <div className={styles.caseCardBadges}>
                <StatusBadge label={caseItem.status} />
                <StatusBadge label={caseItem.priority} />
              </div>
            </div>

            <div className={styles.detailsMeta}>
              <span><strong>Category:</strong> {caseItem.category}</span>
              <span><strong>Assigned:</strong> {caseItem.assignedUserName || "Unassigned"}</span>
              <span><strong>Created by:</strong> {caseItem.createdByUserName}</span>
              <span><strong>Created:</strong> {formatDateTime(caseItem.createdAt)}</span>
              <span><strong>Updated:</strong> {formatDateTime(caseItem.updatedAt)}</span>
              <span><strong>Due:</strong> {formatDateTime(caseItem.dueDate)}</span>
            </div>

            <div className={styles.detailsDescription}>
              <h4>Description</h4>
              <p>{caseItem.description}</p>
            </div>
          </div>

          <div className={styles.panel}>
            <h3>Comments</h3>

            {caseItem.comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <div className={styles.commentsList}>
                {caseItem.comments.map((comment) => (
                  <div key={comment.id} className={styles.commentItem}>
                    <div className={styles.commentItemTop}>
                      <strong>{comment.userName}</strong>
                      <span>{formatDateTime(comment.createdAt)}</span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            <form className={styles.stackForm} onSubmit={handleCommentSubmit}>
              <div className={styles.field}>
                <label htmlFor="commentContent">Add Comment</label>
                <textarea
                  id="commentContent"
                  rows={4}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write a comment..."
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={addCommentMutation.isPending}
                >
                  {addCommentMutation.isPending ? "Adding..." : "Add Comment"}
                </button>
              </div>

              {commentMessage && <p className={styles.formMessage}>{commentMessage}</p>}
            </form>
          </div>
        </div>

        <aside className={styles.detailsSidebar}>
          <div className={styles.panel}>
            <h3>Edit Case</h3>

            <form className={styles.stackForm} onSubmit={handleUpdateSubmit}>
              <div className={styles.field}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={5}
                  value={formValues.description}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={formValues.status}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev ? { ...prev, status: e.target.value } : prev
                    )
                  }
                >
                  <option value="New">New</option>
                  <option value="InProgress">In Progress</option>
                  <option value="WaitingForCustomer">Waiting for Customer</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={formValues.priority}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev ? { ...prev, priority: e.target.value } : prev
                    )
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={formValues.category}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev ? { ...prev, category: e.target.value } : prev
                    )
                  }
                >
                  <option value="Access">Access</option>
                  <option value="Permissions">Permissions</option>
                  <option value="Bug">Bug</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Account">Account</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="customerId">Customer</label>
                <select
                  id="customerId"
                  value={formValues.customerId}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev ? { ...prev, customerId: Number(e.target.value) } : prev
                    )
                  }
                >
                  {customersQuery.data?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} — {customer.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="assignedUserId">Assigned User</label>
                <select
                  id="assignedUserId"
                  value={formValues.assignedUserId ?? ""}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev
                        ? {
                          ...prev,
                          assignedUserId: e.target.value ? Number(e.target.value) : null
                        }
                        : prev
                    )
                  }
                >
                  <option value="">Unassigned</option>
                  {usersQuery.data?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  type="datetime-local"
                  value={toDateTimeLocalValue(formValues.dueDate)}
                  onChange={(e) =>
                    setFormValues((prev) =>
                      prev
                        ? {
                          ...prev,
                          dueDate: fromDateTimeLocalValue(e.target.value)
                        }
                        : prev
                    )
                  }
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={updateCaseMutation.isPending}
                >
                  {updateCaseMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {updateMessage && <p className={styles.formMessage}>{updateMessage}</p>}
            </form>
          </div>

          <div className={styles.panel}>
            <h3>Customer</h3>
            <div className={styles.infoStack}>
              <div>
                <strong>Name</strong>
                <p>{caseItem.customerName}</p>
              </div>
              <div>
                <strong>Company</strong>
                <p>{caseItem.customerCompanyName || "—"}</p>
              </div>
              <div>
                <strong>Email</strong>
                <p>{caseItem.customerEmail || "—"}</p>
              </div>
              <div>
                <strong>Phone</strong>
                <p>{caseItem.customerPhoneNumber || "—"}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CaseDetailsPage;