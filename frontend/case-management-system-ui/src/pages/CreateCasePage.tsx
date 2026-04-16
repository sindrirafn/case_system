import type { SubmitEvent } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createCase } from "../api/casesApi";
import { getUsers } from "../api/usersApi";
import { getCustomers } from "../api/customersApi";
import type { CreateCaseRequest } from "../types/case";
import styles from "./CreateCasePage.module.css";

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

function CreateCasePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState<CreateCaseRequest>({
    title: "",
    description: "",
    status: "New",
    priority: "Medium",
    category: "Other",
    customerId: 1,
    assignedUserId: null,
    createdByUserId: 1,
    dueDate: null
  });

  const [formMessage, setFormMessage] = useState("");

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers
  });

  const createCaseMutation = useMutation({
    mutationFn: createCase,
    onSuccess: async (createdCase) => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
      navigate(`/cases/${createdCase.id}`);
    },
    onError: () => {
      setFormMessage("Failed to create case.");
    }
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormMessage("");

    if (!formValues.title.trim()) {
      setFormMessage("Title is required.");
      return;
    }

    if (!formValues.description.trim()) {
      setFormMessage("Description is required.");
      return;
    }

    createCaseMutation.mutate({
      ...formValues,
      title: formValues.title.trim(),
      description: formValues.description.trim()
    });
  }

  const isLoadingLookups = usersQuery.isLoading || customersQuery.isLoading;
  const isLookupError = usersQuery.isError || customersQuery.isError;

  if (isLoadingLookups) {
    return (
      <section>
        <h2>Create Case</h2>
        <p>Loading form data...</p>
      </section>
    );
  }

  if (isLookupError || !usersQuery.data || !customersQuery.data) {
    return (
      <section>
        <h2>Create Case</h2>
        <p>Failed to load users or customers.</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2>Create Case</h2>
          <p>Create a new case and assign it to the right person.</p>
        </div>
      </div>

      <div className={styles.panel}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={formValues.title}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter case title"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={6}
              value={formValues.description}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe the issue or request"
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formValues.status}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, status: e.target.value }))
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
                  setFormValues((prev) => ({ ...prev, priority: e.target.value }))
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
                  setFormValues((prev) => ({ ...prev, category: e.target.value }))
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
                  setFormValues((prev) => ({
                    ...prev,
                    customerId: Number(e.target.value)
                  }))
                }
              >
                {customersQuery.data.map((customer) => (
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
                  setFormValues((prev) => ({
                    ...prev,
                    assignedUserId: e.target.value ? Number(e.target.value) : null
                  }))
                }
              >
                <option value="">Unassigned</option>
                {usersQuery.data.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="createdByUserId">Created By</label>
              <select
                id="createdByUserId"
                value={formValues.createdByUserId}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    createdByUserId: Number(e.target.value)
                  }))
                }
              >
                {usersQuery.data.map((user) => (
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
                  setFormValues((prev) => ({
                    ...prev,
                    dueDate: fromDateTimeLocalValue(e.target.value)
                  }))
                }
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={createCaseMutation.isPending}
            >
              {createCaseMutation.isPending ? "Creating..." : "Create Case"}
            </button>
          </div>

          {formMessage && <p className={styles.formMessage}>{formMessage}</p>}
        </form>
      </div>
    </section>
  );
}

export default CreateCasePage;