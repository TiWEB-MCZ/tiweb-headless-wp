import React from 'react';
import { ECOSYSTEM_PRODUCTS, EcosystemProduct } from '../data/products';
import { ExternalLink, ArrowRight, Check, Layers, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const BentoGrid: React.FC = () => {
  return (
    <section id="produtos" className="py-20 lg:py-28 bg-[var(--bg-app)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <a
              href="#mapa"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--border-strong)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shadow-xs"
              title="Retornar à Constelação Tecnológica"
            >
              <Compass className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
              <span>Voltar à Constelação</span>
            </a>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent-purple)]">
              <Layers className="w-3.5 h-3.5" />
              Ecossistema Multi-Produto TIWEB
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-main)] tracking-tight">
            Nossos Pilares Tecnológicos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Quatro soluções proprietárias que combinam inteligência artificial, automação operacional e conformidade de alto padrão para alavancar negócios.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {ECOSYSTEM_PRODUCTS.map((product, idx) => {
            const isWide = idx === 0 || idx === 1; // Primeiros dois cards maiores
            const colSpanClass = isWide ? 'lg:col-span-6' : 'lg:col-span-6';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${colSpanClass} rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-purple)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group relative overflow-hidden`}
              >
                {/* Header do Card */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                      style={{
                        color: product.accentColor,
                        borderColor: `${product.accentColor}50`,
                        backgroundColor: `${product.accentColor}15`,
                      }}
                    >
                      {product.category}
                    </span>

                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--accent-green)] border border-[var(--border-subtle)] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#50fa7b]" />
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm font-medium text-[var(--accent-purple)] mb-4">
                    {product.tagline}
                  </p>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-6">
                    {product.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        <Check className="w-4 h-4 text-[#50fa7b] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer do Card (Métricas, Tech Stack e Botão) */}
                <div className="pt-6 border-t border-[var(--border-subtle)]">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-[var(--accent-green)] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {product.metrics}
                    </span>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Botões de Ação */}
                  <div className={product.secondaryActionUrl ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
                    <a
                      href={product.actionUrl}
                      target={product.isExternal ? '_blank' : '_self'}
                      rel={product.isExternal ? 'noopener noreferrer' : undefined}
                      className="w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border"
                      style={{
                        backgroundColor: `${product.accentColor}20`,
                        borderColor: `${product.accentColor}60`,
                        color: product.accentColor,
                      }}
                    >
                      <span>{product.actionLabel}</span>
                      {product.isExternal ? (
                        <ExternalLink className="w-4 h-4 shrink-0" />
                      ) : (
                        <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                      )}
                    </a>

                    {product.secondaryActionUrl && product.secondaryActionLabel && (
                      <a
                        href={product.secondaryActionUrl}
                        target={product.secondaryIsExternal ? '_blank' : '_self'}
                        rel={product.secondaryIsExternal ? 'noopener noreferrer' : undefined}
                        className="w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-subtle)] hover:border-[var(--accent-purple)]"
                      >
                        <span>{product.secondaryActionLabel}</span>
                        {product.secondaryIsExternal ? (
                          <ExternalLink className="w-4 h-4 shrink-0" />
                        ) : (
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        )}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
