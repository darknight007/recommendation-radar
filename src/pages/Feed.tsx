import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import RecommendationCard from "@/components/RecommendationCard";
import { RECOMMENDATIONS, SOURCES } from "@/data/mockData";

export default function Feed() {
  const [dirFilter, setDirFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = useMemo(() => {
    let list = [...RECOMMENDATIONS];
    if (dirFilter !== 'ALL') list = list.filter(r => r.direction === dirFilter);
    if (sourceFilter !== 'ALL') list = list.filter(r => r.sourceId === sourceFilter);
    if (statusFilter !== 'ALL') list = list.filter(r => r.status === statusFilter);
    return list;
  }, [dirFilter, sourceFilter, statusFilter]);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Recommendation Feed</h1>
          <p className="text-sm text-muted-foreground">Latest investment recommendations — all sources, all stocks</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <span className="text-xs text-muted-foreground font-mono block mb-1.5">DIRECTION</span>
            <div className="flex gap-1.5">
              {['ALL', 'BUY', 'SELL', 'HOLD'].map(d => (
                <button
                  key={d}
                  onClick={() => setDirFilter(d)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    dirFilter === d ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-card border border-border text-muted-foreground'
                  }`}
                >
                  {d === 'ALL' ? 'All' : d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-mono block mb-1.5">STATUS</span>
            <div className="flex gap-1.5">
              {['ALL', 'ACTIVE', 'HIT', 'MISS'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    statusFilter === s ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-card border border-border text-muted-foreground'
                  }`}
                >
                  {s === 'ALL' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-mono block mb-1.5">SOURCE</span>
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              className="px-3 py-1.5 rounded-md text-xs bg-card border border-border text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
            >
              <option value="ALL">All Sources</option>
              {SOURCES.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">🔍 No recommendations match your filters</p>
            <p className="text-sm">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <RecommendationCard rec={rec} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
