import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-gradient-primary">Quark Capital</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The global intelligence radar for investment recommendations. Independent. Transparent. Data-Only.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
              <Link to="/feed" className="hover:text-foreground transition-colors">Daily Feed</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Disclaimer</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Quark Capital Intelligence Radar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
