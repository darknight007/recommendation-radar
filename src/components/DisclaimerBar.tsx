import { AlertTriangle } from "lucide-react";

export default function DisclaimerBar() {
  return (
    <div className="bg-secondary border-t border-border py-2.5 px-4">
      <div className="container flex items-start gap-2 text-xs text-muted-foreground">
        <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-warning" />
        <p>
          <strong>SEBI Disclaimer:</strong> This platform tracks publicly available recommendations for educational purposes only. We do not provide investment advice. Past performance does not guarantee future results. Consult a SEBI-registered advisor before investing.
        </p>
      </div>
    </div>
  );
}
