import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import styles from "./DashboardSummaryChart.module.css";

interface DashboardSummaryChartProps {
  totalOpenCases: number;
  criticalCases: number;
  casesAssignedToUser: number;
  resolvedLast7Days: number;
  newLast7Days: number;
  overdueOpenCases: number;
}

function DashboardSummaryChart({
  totalOpenCases,
  criticalCases,
  casesAssignedToUser,
  resolvedLast7Days,
  newLast7Days,
  overdueOpenCases
}: DashboardSummaryChartProps) {
  const data = [
    { name: "Open", value: totalOpenCases },
    { name: "Critical", value: criticalCases },
    { name: "Assigned", value: casesAssignedToUser },
    { name: "Resolved", value: resolvedLast7Days },
    { name: "New", value: newLast7Days },
    { name: "Overdue", value: overdueOpenCases }
  ];

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardSummaryChart;