import React from 'react';

const DATA_POINTS = [
  {
    value: "97%",
    label: "DES INTERFACES E-COMMERCE",
    detail: "Utilisent des mécanismes d'urgence artificielle (Dark Patterns).",
    color: "text-brand-accent-red"
  },
  {
    value: "1.2k",
    label: "POINTS DE DONNÉES / MIN",
    detail: "Collectés en moyenne lors d'une session de navigation standard.",
    color: "text-white"
  },
  {
    value: "0.2s",
    label: "TEMPS DE RÉACTION BIOLOGIQUE",
    detail: "Fenêtre exploitée par les algorithmes de capture d'attention.",
    color: "text-brand-accent-red"
  }
];

export default function DataLog() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
      <div className="border-t border-brand-border pt-12">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-text-muted">DATA.LOG_ANALYSIS</span>
          <div className="h-[1px] flex-1 bg-brand-border/30" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {DATA_POINTS.map((point, i) => (
            <div key={i} className="relative group">
              {/* Background accent decoratif */}
              <div className="absolute -inset-4 bg-brand-accent-red/0 group-hover:bg-brand-accent-red/[0.02] transition-colors duration-500 rounded-lg -z-10" />
              
              <div className={`font-display font-black text-6xl lg:text-7xl mb-6 tracking-tighter ${point.color}`}>
                {point.value}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-text-primary">
                  {point.label}
                </h3>
                <p className="text-brand-text-secondary text-xs leading-relaxed font-serif italic border-l border-brand-accent-red/20 pl-4">
                  {point.detail}
                </p>
              </div>

              {/* Scanline ornament */}
              <div className="mt-8 h-[2px] w-full bg-brand-border/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-accent-red/40 w-1/3 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
              </div>
            </div>
          ))}
        </div>

        {/* Info bas de section */}
        <div className="mt-12 flex justify-end">
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-brand-text-muted">
            SOURCE: LABORATOIRE REFLEXE | RAW_DATA_EXTRACTED
          </p>
        </div>
      </div>
    </section>
  );
}
