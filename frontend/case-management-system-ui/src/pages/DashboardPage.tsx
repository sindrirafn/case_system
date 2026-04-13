import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../api/dashboardApi";

function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => getDashboardSummary(1)
  });

  if (isLoading) {
    return (
      <section>
        <h2>Dashboard</h2>
        <p>Loading dashboard...</p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section>
        <h2>Dashboard</h2>
        <p>Failed to load dashboard data.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Dashboard</h2>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        <div>
          <strong>Total open cases</strong>
          <p>{data.totalOpenCases}</p>
        </div>
        <div>
          <strong>Critical cases</strong>
          <p>{data.criticalCases}</p>
        </div>
        <div>
          <strong>Assigned to user</strong>
          <p>{data.casesAssignedToUser}</p>
        </div>
        <div>
          <strong>Resolved last 7 days</strong>
          <p>{data.resolvedLast7Days}</p>
        </div>
        <div>
          <strong>New last 7 days</strong>
          <p>{data.newLast7Days}</p>
        </div>
        <div>
          <strong>Overdue open cases</strong>
          <p>{data.overdueOpenCases}</p>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;