import { ReactNode } from "react";
import { Info, AlertTriangle, BookOpen, Quote as QuoteIcon } from "lucide-react";

type CalloutType = "insight" | "warning" | "research";

export function Callout({ children, type = "insight" }: { children: ReactNode; type?: CalloutType }) {
  const styles = {
    insight: {
      bg: "bg-brand-accent-red/5",
      border: "border-brand-accent-red",
      icon: <Info className="w-5 h-5 text-brand-accent-red" />,
      label: "Insight"
    },
    warning: {
      bg: "bg-amber-500/5",
      border: "border-amber-500",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      label: "Attention"
    },
    research: {
      bg: "bg-blue-500/5",
      border: "border-blue-500",
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      label: "Recherche"
    }
  };

  const current = styles[type] || styles.insight;

  return (
    <div className={`my-8 border-l-4 ${current.border} ${current.bg} p-6 relative overflow-hidden group`}>
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          {current.icon}
        </div>
        <div className="flex-grow">
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold block mb-2 opacity-60">
            {current.label}
          </span>
          <div className="italic text-brand-text-primary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Highlight({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-10 border border-brand-border bg-brand-bg-secondary p-8 relative group">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent-red" />
      <div className="absolute -top-3 left-6 px-3 bg-brand-bg-primary border border-brand-border font-mono text-[10px] text-brand-accent-red uppercase tracking-widest font-black">
        {label}
      </div>
      <div className="text-brand-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function Quote({ children, author }: { children: ReactNode; author?: string }) {
  return (
    <div className="my-12 relative py-4">
      <QuoteIcon className="absolute -top-4 -left-4 w-12 h-12 text-brand-accent-red/10 -z-10" />
      <blockquote className="font-serif italic text-2xl md:text-3xl text-brand-text-primary leading-tight border-l-4 border-brand-accent-red pl-8">
        &ldquo;{children}&rdquo;
      </blockquote>
      {author && (
        <cite className="mt-6 block not-italic font-mono text-xs uppercase tracking-[0.3em] text-brand-accent-red font-bold pl-12">
          — {author}
        </cite>
      )}
    </div>
  );
}

export function Heading2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="scroll-mt-[120px] font-display font-black text-3xl md:text-4xl uppercase text-brand-text-primary mt-20 mb-8 tracking-tight border-b border-brand-border/50 pb-4">
      {children}
    </h2>
  );
}

export function Heading3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="scroll-mt-[120px] font-display font-black text-xl md:text-2xl uppercase text-brand-accent-red mt-12 mb-6 tracking-wide">
      {children}
    </h3>
  );
}
