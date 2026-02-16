interface StatusBadgeProps {
  status: 'ACTIVE' | 'HIT' | 'MISS';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    ACTIVE: "bg-primary/10 text-primary border-primary/20",
    HIT: "bg-success/10 text-success border-success/20",
    MISS: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const labels = { ACTIVE: '🟢 ACTIVE', HIT: '✅ HIT', MISS: '❌ MISS' };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
