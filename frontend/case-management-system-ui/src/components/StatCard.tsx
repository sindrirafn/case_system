import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: number;
  helperText?: string;
}

function StatCard({ label, value, helperText }: StatCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {helperText ? <p className={styles.helperText}>{helperText}</p> : null}
    </div>
  );
}

export default StatCard;