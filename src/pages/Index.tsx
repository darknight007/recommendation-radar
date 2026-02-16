import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Globe, Search, Zap, TrendingUp, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import { PLATFORM_STATS, SOURCES } from "@/data/mockData";
import { useState } from "react";

const features = [
  { icon: Zap, title: "Real-Time Tracking", desc: "Every public recommendation tracked within 24 hours of publication." },
  { icon: Search, title: "Forensic Scoring", desc: "Hit rates, returns, and consistency scores calculated transparently." },
  { icon: Globe, title: "Global Coverage", desc: "Multi-market expansion — starting with India, scaling worldwide." },
];

export default function Index() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-bg-radial terminal-grid">
        <div className="container py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              LIVE — Indian Equity Markets
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-5">
              The Global Intelligence Radar for{" "}
              <span className="text-gradient-primary">Investment Recommendations</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Track. Verify. Compare. Every public stock recommendation — scored with forensic precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm transition-transform hover:scale-[1.02] glow-primary"
              >
                Explore Leaderboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold text-sm hover:bg-accent transition-colors"
              >
                View Today's Calls
              </Link>
            </div>

            {/* Live counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard label="Recommendations" value={PLATFORM_STATS.totalRecommendations} icon={BarChart3} />
              <MetricCard label="Sources Monitored" value={PLATFORM_STATS.totalSources} icon={TrendingUp} />
              <MetricCard label="Markets" value={PLATFORM_STATS.marketsTracked} icon={Globe} />
              <MetricCard label="Top Score" value={SOURCES[0].score} suffix="/100" icon={Shield} decimals={1} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-card/50 py-4">
        <div className="container flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-mono">
          <span>✦ Independent & Unbiased</span>
          <span className="hidden sm:inline">•</span>
          <span>✦ Open Scoring Methodology</span>
          <span className="hidden sm:inline">•</span>
          <span>✦ Updated Daily</span>
          <span className="hidden sm:inline">•</span>
          <span>✦ Data-Only — Zero Editorial Bias</span>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Every recommendation is captured, validated, and scored against real market performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/20 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top performers preview */}
      <section className="container pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">Top Performers</h2>
          <Link to="/leaderboard" className="text-sm text-primary hover:underline flex items-center gap-1">
            View Full Leaderboard <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground font-mono uppercase tracking-wider">
                <th className="text-left py-3 pr-4">#</th>
                <th className="text-left py-3 pr-4">Source</th>
                <th className="text-right py-3 pr-4">Hit Rate</th>
                <th className="text-right py-3 pr-4">Avg Return</th>
                <th className="text-right py-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.slice(0, 5).map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                >
                  <td className="py-3 pr-4 font-mono text-muted-foreground">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
                  </td>
                  <td className="py-3 pr-4">
                    <Link to={`/profile/${s.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                      {s.name}
                    </Link>
                    <span className="ml-2 text-xs text-muted-foreground">{s.type.replace('_', ' ')}</span>
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-success">{s.hitRate}%</td>
                  <td className="py-3 pr-4 text-right font-mono text-foreground">+{s.avgReturn}%</td>
                  <td className="py-3 text-right font-mono font-bold text-primary">{s.score}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Email capture */}
      <section className="border-t border-border bg-card/50">
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-display font-bold mb-3">Stay Informed</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            Get weekly performance digests and market intelligence — straight to your inbox.
          </p>
          {subscribed ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success font-medium">
              ✅ You're subscribed! Check your inbox for the welcome email.
            </motion.p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="shrink-0 px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-transform glow-primary"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
