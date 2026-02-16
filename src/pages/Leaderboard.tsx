import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { SOURCES, Source } from "@/data/mockData";

type SortKey = 'score' | 'hitRate' | 'avgReturn' | 'totalCalls';

export default function Leaderboard() {
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortAsc, setSortAsc] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [page, setPage] = useState(0);
  const perPage = 20;

  const filtered = useMemo(() => {
    let list = [...SOURCES];
    if (typeFilter !== 'ALL') list = list.filter(s => s.type === typeFilter);
    list.sort((a, b) => sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
    return list;
  }, [sortKey, sortAsc, typeFilter]);

  const paged = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortHeader = ({ k, label, className = "" }: { k: SortKey; label: string; className?: string }) => (
    <th
      className={`py-3 pr-4 cursor-pointer select-none hover:text-foreground transition-colors ${className}`}
      onClick={() => toggleSort(k)}
    >
      <span className="inline-flex items-center gap-1">
        {label} <ArrowUpDown className={`h-3 w-3 ${sortKey === k ? 'text-primary' : ''}`} />
      </span>
    </th>
  );

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Performance Leaderboard</h1>
          <p className="text-sm text-muted-foreground">Indian Equity Markets — Updated daily</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs text-muted-foreground font-mono">SOURCE TYPE:</span>
          {['ALL', 'BROKERAGE', 'RESEARCH_HOUSE', 'FINFLUENCER'].map(t => (
            <button
              key={t}
              onClick={() => { setTypeFilter(t); setPage(0); }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                typeFilter === t ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'ALL' ? 'All' : t === 'RESEARCH_HOUSE' ? 'Research' : t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card text-xs text-muted-foreground font-mono uppercase tracking-wider">
                <th className="text-left py-3 pl-4 pr-4">#</th>
                <th className="text-left py-3 pr-4">Source</th>
                <th className="text-left py-3 pr-4">Type</th>
                <SortHeader k="hitRate" label="Hit Rate" className="text-right" />
                <SortHeader k="avgReturn" label="Avg Return" className="text-right" />
                <SortHeader k="totalCalls" label="Total Calls" className="text-right" />
                <SortHeader k="score" label="Score" className="text-right" />
              </tr>
            </thead>
            <tbody>
              {paged.map((s, i) => {
                const rank = page * perPage + i + 1;
                const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}`;
                return (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                  >
                    <td className="py-3 pl-4 pr-4 font-mono text-muted-foreground">{medal}</td>
                    <td className="py-3 pr-4">
                      <Link to={`/profile/${s.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                        {s.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">
                      {s.type === 'RESEARCH_HOUSE' ? 'Research' : s.type.charAt(0) + s.type.slice(1).toLowerCase()}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono text-success">{s.hitRate}%</td>
                    <td className="py-3 pr-4 text-right font-mono text-foreground">+{s.avgReturn}%</td>
                    <td className="py-3 pr-4 text-right font-mono text-muted-foreground">{s.totalCalls}</td>
                    <td className="py-3 pr-4 text-right font-mono font-bold text-primary">{s.score}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
