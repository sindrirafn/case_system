import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  label: string;
}

function StatusBadge({ label }: StatusBadgeProps) {
  const normalized = label.toLowerCase();

  let variantClass = "";

  if (normalized === "new") variantClass = styles.new;
  else if (normalized === "inprogress") variantClass = styles.inProgress;
  else if (normalized === "waitingforcustomer") variantClass = styles.waiting;
  else if (normalized === "resolved") variantClass = styles.resolved;
  else if (normalized === "closed") variantClass = styles.closed;
  else if (normalized === "critical") variantClass = styles.critical;
  else if (normalized === "high") variantClass = styles.high;
  else if (normalized === "medium") variantClass = styles.medium;
  else if (normalized === "low") variantClass = styles.low;

  return <span className={`${styles.badge} ${variantClass}`}>{label}</span>;
}

export default StatusBadge;