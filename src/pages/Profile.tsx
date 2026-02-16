import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import { SOURCES, RECOMMENDATIONS } from "@/data/mockData";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const source = SOURCES.find(s => s.id === id);
  const recs = RECOMMENDATIONS.filter(r => r.sourceId === id);

  if (!source) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground text-lg">Source not found.</p>
          <Link to="/leaderboard" className="text-primary hover:underline text-sm mt-4 inline-block">
            ← Back to Leaderboard
          </Link>
        </div>
      </Layout>
    );
  }

  const typeLabel = source.type === 'RESEARCH_HOUSE' ? 'Research House' : source.type === 'BROKERAGE' ? 'Brokerage' : 'Finfluencer';

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <Link to="/leaderboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-3 w-3" /> Back to Leaderboard
        </Link>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold mb-1">{source.name}</h1>
              <p className="text-sm text-muted-foreground">
                {typeLabel} • Active since {source.activeSince}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">PERFORMANCE SCORE</span>
              <span className="text-3xl font-mono font-bold text-primary">{source.score}</span>
            </div>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Hit Rate" value={source.hitRate} suffix="%" decimals={1} />
          <MetricCard label="Avg Return" value={source.avgReturn} suffix="%" prefix="+" decimals={1} />
          <MetricCard label="Total Calls" value={source.totalCalls} />
          <MetricCard label="Consistency" value={source.consistency} suffix="/100" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="15-Day Return" value={source.return15d} suffix="%" prefix="+" decimals={1} />
          <MetricCard label="30-Day Return" value={source.return30d} suffix="%" prefix="+" decimals={1} />
          <MetricCard label="60-Day Return" value={source.return60d} suffix="%" prefix="+" decimals={1} />
          <MetricCard label="Active Calls" value={source.activeCalls} />
        </div>

        {/* Sector breakdown */}
        {source.sectors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-display font-semibold mb-4">Sector Breakdown</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {source.sectors.map((sec, i) => (
                <motion.div
                  key={sec.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{sec.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{sec.calls} calls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all"
                        style={{ width: `${sec.hitRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-success">{sec.hitRate}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation history */}
        <div>
          <h2 className="text-lg font-display font-semibold mb-4">Recommendation History</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  <th className="text-left py-3 pl-4 pr-4">Date</th>
                  <th className="text-left py-3 pr-4">Stock</th>
                  <th className="text-left py-3 pr-4">Direction</th>
                  <th className="text-right py-3 pr-4">Entry</th>
                  <th className="text-right py-3 pr-4">Target</th>
                  <th className="text-right py-3 pr-4">Current</th>
                  <th className="text-right py-3 pr-4">Return</th>
                  <th className="text-right py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recs.map((r, i) => {
                  const dirColor = r.direction === 'BUY' ? 'text-success' : r.direction === 'SELL' ? 'text-destructive' : 'text-warning';
                  return (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                    >
                      <td className="py-3 pl-4 pr-4 font-mono text-muted-foreground text-xs">{r.issuedAt}</td>
                      <td className="py-3 pr-4 font-mono font-medium text-foreground">{r.stock}</td>
                      <td className={`py-3 pr-4 font-mono font-semibold ${dirColor}`}>{r.direction}</td>
                      <td className="py-3 pr-4 text-right font-mono">₹{r.entryPrice.toLocaleString()}</td>
                      <td className="py-3 pr-4 text-right font-mono">₹{r.targetPrice.toLocaleString()}</td>
                      <td className="py-3 pr-4 text-right font-mono">₹{r.currentPrice.toLocaleString()}</td>
                      <td className={`py-3 pr-4 text-right font-mono ${r.returnPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {r.returnPercent > 0 ? '+' : ''}{r.returnPercent}%
                      </td>
                      <td className="py-3 pr-4 text-right"><StatusBadge status={r.status} /></td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
