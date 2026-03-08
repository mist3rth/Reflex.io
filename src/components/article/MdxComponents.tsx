import { ReactNode } from "react";

export function Callout({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-4 border-brand-accent-red pl-6 py-3 my-8 bg-brand-accent-red/5 italic text-brand-text-primary">
      {children}
    </blockquote>
  );
}

export function Highlight({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-8 rounded border border-brand-border bg-brand-bg-secondary p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent-amber" />
      <div className="font-mono text-xs text-brand-accent-amber uppercase tracking-wider mb-2 font-bold">
        {label}
      </div>
      <div className="text-sm text-brand-text-primary leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function Heading2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="scroll-mt-[100px] font-display font-black text-2xl md:text-3xl uppercase text-brand-text-primary mt-16 mb-8 tracking-tight">
      {children}
    </h2>
  );
}

export function Heading3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="scroll-mt-[100px] font-display font-black text-lg md:text-xl uppercase text-brand-accent-red mt-12 mb-6 tracking-wide">
      {children}
    </h3>
  );
}
