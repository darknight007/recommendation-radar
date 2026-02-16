import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: number;
  icon?: LucideIcon;
  decimals?: number;
}

function useCountUp(target: number, duration = 1200, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, decimals]);
  return count;
}

export default function MetricCard({ label, value, suffix = "", prefix = "", trend, icon: Icon, decimals = 0 }: MetricCardProps) {
  const count = useCountUp(value, 1500, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-primary/60" />}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-mono font-bold text-foreground">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
        {trend !== undefined && (
          <span className={`text-xs font-mono mb-1 ${trend >= 0 ? "text-success" : "text-destructive"}`}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
