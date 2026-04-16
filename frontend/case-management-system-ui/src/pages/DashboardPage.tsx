import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../api/dashboardApi";
import StatCard from "../components/StatCard";
import DashboardSummaryChart from "../components/DashboardSummaryChart";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => getDashboardSummary(1)
  });

  if (isLoading) {
    return (
      <section className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h2>Dashboard</h2>
            <p>Loading dashboard data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h2>Dashboard</h2>
            <p>Failed to load dashboard data.</p>
          </div>
        </div>
      </section>
    );
  }

  const riskLevel =
    data.overdueOpenCases >= 8
      ? "High"
      : data.overdueOpenCases >= 4
      ? "Moderate"
      : "Low";

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2>Dashboard</h2>
          <p>Operational overview for the current case environment.</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          label="Total open cases"
          value={data.totalOpenCases}
          helperText="Cases currently in active workflow."
        />
        <StatCard
          label="Critical cases"
          value={data.criticalCases}
          helperText="High-priority cases needing close attention."
        />
        <StatCard
          label="Assigned to me"
          value={data.casesAssignedToUser}
          helperText="Open cases currently assigned to the selected user."
        />
        <StatCard
          label="Resolved last 7 days"
          value={data.resolvedLast7Days}
          helperText="Recently completed cases."
        />
        <StatCard
          label="New last 7 days"
          value={data.newLast7Days}
          helperText="Incoming case volume over the last week."
        />
        <StatCard
          label="Overdue open cases"
          value={data.overdueOpenCases}
          helperText="Open cases past their due date."
        />
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Summary Visualization</h3>
              <p>Quick visual comparison of the main dashboard metrics.</p>
            </div>
          </div>

          <DashboardSummaryChart
            totalOpenCases={data.totalOpenCases}
            criticalCases={data.criticalCases}
            casesAssignedToUser={data.casesAssignedToUser}
            resolvedLast7Days={data.resolvedLast7Days}
            newLast7Days={data.newLast7Days}
            overdueOpenCases={data.overdueOpenCases}
          />
        </div>

        <div className={styles.sideColumn}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h3>Operational Health</h3>
                <p>Simple at-a-glance interpretation of current workload.</p>
              </div>
            </div>

            <div className={styles.healthList}>
              <div className={styles.healthItem}>
                <strong>Open workload</strong>
                <p>{data.totalOpenCases} currently active cases.</p>
              </div>

              <div className={styles.healthItem}>
                <strong>Urgent pressure</strong>
                <p>{data.criticalCases} critical cases require close monitoring.</p>
              </div>

              <div className={styles.healthItem}>
                <strong>Backlog risk</strong>
                <p>
                  {data.overdueOpenCases} overdue open cases. Current risk level:{" "}
                  <span className={styles.riskText}>{riskLevel}</span>.
                </p>
              </div>

              <div className={styles.healthItem}>
                <strong>Recent inflow</strong>
                <p>{data.newLast7Days} new cases created in the last week.</p>
              </div>

              <div className={styles.healthItem}>
                <strong>Recent completions</strong>
                <p>{data.resolvedLast7Days} cases resolved in the last week.</p>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h3>Notes</h3>
                <p>This dashboard currently uses summary metrics from the backend API.</p>
              </div>
            </div>

            <ul className={styles.notesList}>
              <li>Authentication is not connected yet, so the selected user is currently hardcoded.</li>
              <li>More advanced charts can be added later using trend-based endpoints.</li>
              <li>This page is intended to demonstrate a manager-facing overview, not final reporting depth.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;