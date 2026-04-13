import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCases } from "../api/casesApi";
import type { CaseQueryParams } from "../types/case";
import StatusBadge from "../components/StatusBadge";
import { getUsers } from "../api/usersApi";
import styles from "./CasesPage.module.css";

function CasesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");


  const queryParams: CaseQueryParams = useMemo(() => {
    const params: CaseQueryParams = {};

    if (search.trim()) params.search = search.trim();
    if (status) params.status = status;
    if (priority) params.priority = priority;
    if (category) params.category = category;
    if (assignedUserId) params.assignedUserId = Number(assignedUserId);

    return params;
  }, [search, status, priority, category, assignedUserId]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cases", queryParams],
    queryFn: () => getCases(queryParams)
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  return (
    <section className={styles.casesPage}>
      <div className={styles.pageHeader}>
        <div>
          <h2>Cases</h2>
          <p>Browse, search, and filter current cases.</p>
        </div>
      </div>

      <div className={styles.filtersPanel}>
        <div className={styles.filtersGrid}>
          <div className={styles.field}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search title or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
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
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">All</option>
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
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
            <label htmlFor="assignedUser">Assigned User</label>
            <select
              id="assignedUser"
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
            >
              <option value="">All</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className={styles.panel}>
          <p>Loading cases...</p>
        </div>
      )}

      {isError && (
        <div className={styles.panel}>
          <p>Failed to load cases.</p>
        </div>
      )}

      {!isLoading && !isError && data && data.length === 0 && (
        <div className={styles.panel}>
          <p>No cases found for the current filters.</p>
        </div>
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className={styles.casesList}>
          {data.map((caseItem) => (
            <button
              key={caseItem.id}
              type="button"
              className={styles.caseCard}
              onClick={() => navigate(`/cases/${caseItem.id}`)}
            >
              <div className={styles.caseCardTop}>
                <div>
                  <h3>{caseItem.title}</h3>
                  <p>{caseItem.customerName}</p>
                </div>

                <div className={styles.caseCardBadges}>
                  <StatusBadge label={caseItem.status} />
                  <StatusBadge label={caseItem.priority} />
                </div>
              </div>

              <div className={styles.caseCardMeta}>
                <span><strong>Category:</strong> {caseItem.category}</span>
                <span><strong>Assigned:</strong> {caseItem.assignedUserName || "Unassigned"}</span>
                <span><strong>Updated:</strong> {new Date(caseItem.updatedAt).toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default CasesPage;