interface StatusBadgeProps {
  label: string;
}

function StatusBadge({ label }: StatusBadgeProps) {
  const normalized = label.toLowerCase();

  let className = "badge";

  if (normalized === "new") className += " badge--new";
  else if (normalized === "inprogress") className += " badge--inprogress";
  else if (normalized === "waitingforcustomer") className += " badge--waiting";
  else if (normalized === "resolved") className += " badge--resolved";
  else if (normalized === "closed") className += " badge--closed";
  else if (normalized === "critical") className += " badge--critical";
  else if (normalized === "high") className += " badge--high";
  else if (normalized === "medium") className += " badge--medium";
  else if (normalized === "low") className += " badge--low";

  return <span className={className}>{label}</span>;
}

export default StatusBadge;