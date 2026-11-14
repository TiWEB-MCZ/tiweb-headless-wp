import React, { useState } from 'react';
import { SHOWCASE_CASES, ShowcaseCase } from '../../data/cases';
import { ExternalLink, Check, Sparkles, FolderGit2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CasesShowcase: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('Todos');

  const segments = ['Todos', 'Saúde', 'Jurídico', 'Fiscal & Contábil'];

  const filteredCases = selectedSegment === 'Todos'
    ? SHOWCASE_CASES
    : SHOWCASE_CASES.filter((c) => c.segment === selectedSegment);

  return (
    <section id="cases" className="py-20 lg:py-28 bg-[var(--bg-app)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent-cyan)] mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            Portfólio & Engenharia Aplicada
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-main)] tracking-tight">
            Cases Reais & Verticais em Escala
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            De projetos comerciais entregues em produção a soluções proprietárias de inteligência artificial de alta conversão.
          </p>

          {/* Segment Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {segments.map((seg) => (
              <button
                key={seg}
                type="button"
                onClick={() => setSelectedSegment(seg)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedSegment === seg
                    ? 'bg-gradient-to-r from-[#bd93f9] to-[#8be9fd] text-slate-950 font-bold shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)]'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredCases.map((caseItem) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#bd93f9]/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      color: caseItem.accentColor,
                      borderColor: `${caseItem.accentColor}50`,
                      backgroundColor: `${caseItem.accentColor}15`,
                    }}
                  >
                    {caseItem.segment}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      caseItem.type === 'PROJETO REAL'
                        ? 'bg-[#50fa7b]/20 text-[#50fa7b] border-[#50fa7b]/40'
                        : 'bg-[#bd93f9]/20 text-[#bd93f9] border-[#bd93f9]/40'
                    }`}
                  >
                    {caseItem.type}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] mb-1 group-hover:text-[var(--accent-cyan)] transition-colors">
                  {caseItem.title}
                </h3>
                <span className="text-xs text-[var(--text-muted)] font-mono block mb-3">
                  Cliente: {caseItem.client}
                </span>

                <p className="text-xs sm:text-sm font-medium text-[var(--accent-purple)] mb-4">
                  {caseItem.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {caseItem.description}
                </p>

                {/* Resultados Reais */}
                <div className="space-y-2 mb-6 bg-[var(--bg-elevated)] p-4 rounded-2xl border border-[var(--border-subtle)]">
                  <span className="text-xs font-bold text-[#50fa7b] block mb-2 flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    Impacto Comprovado:
                  </span>
                  {caseItem.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <Check className="w-3.5 h-3.5 text-[#50fa7b] shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer com Tech Stack e Botão */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {caseItem.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-app)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={caseItem.secondaryLiveUrl ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
                  {caseItem.liveUrl ? (
                    <a
                      href={caseItem.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all bg-[var(--bg-elevated)] hover:bg-[#bd93f9]/20 text-[var(--text-main)] hover:text-[#bd93f9] border border-[var(--border-subtle)]"
                    >
                      <span>{caseItem.actionLabel}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  ) : (
                    <a
                      href="#advocacia"
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#bd93f9] to-[#8be9fd] text-slate-950 font-bold hover:opacity-90"
                    >
                      <span>{caseItem.actionLabel}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </a>
                  )}

                  {caseItem.secondaryLiveUrl && caseItem.secondaryActionLabel && (
                    <a
                      href={caseItem.secondaryLiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all bg-[var(--bg-elevated)] hover:bg-[#8be9fd]/20 text-[var(--text-main)] hover:text-[#8be9fd] border border-[var(--border-subtle)]"
                    >
                      <span>{caseItem.secondaryActionLabel}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
