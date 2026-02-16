import { Link } from "react-router-dom";
import { Recommendation } from "@/data/mockData";
import StatusBadge from "./StatusBadge";

export default function RecommendationCard({ rec }: { rec: Recommendation }) {
  const dirColor = rec.direction === 'BUY' ? 'text-success' : rec.direction === 'SELL' ? 'text-destructive' : 'text-warning';

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-foreground">{rec.stock}</span>
          <span className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded ${dirColor} bg-current/10`} style={{ backgroundColor: undefined }}>
            <span className={dirColor}>{rec.direction}</span>
          </span>
          <span className="text-xs text-muted-foreground font-mono">₹{rec.entryPrice.toLocaleString()} → ₹{rec.targetPrice.toLocaleString()}</span>
        </div>
        <StatusBadge status={rec.status} />
      </div>

      <Link to={`/profile/${rec.sourceId}`} className="text-sm text-primary hover:underline">
        {rec.sourceName}
      </Link>
      <span className="text-xs text-muted-foreground ml-2">{rec.issuedAt} • {rec.exchange}</span>

      <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-3 text-xs font-mono">
        <div>
          <span className="text-muted-foreground block">Entry</span>
          <span className="text-foreground">₹{rec.entryPrice.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-muted-foreground block">Current</span>
          <span className={rec.returnPercent >= 0 ? "text-success" : "text-destructive"}>
            ₹{rec.currentPrice.toLocaleString()} ({rec.returnPercent > 0 ? '+' : ''}{rec.returnPercent}%)
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Days Active</span>
          <span className="text-foreground">{rec.daysActive}</span>
        </div>
      </div>
    </div>
  );
}
