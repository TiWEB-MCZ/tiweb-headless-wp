import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Terminal, Shield, GitBranch, Cpu, CheckCircle, Lock, BarChart3, RefreshCw } from 'lucide-react';

export const EngineeringTrust: React.FC = () => {
  const [viewMode, setViewMode] = useState<'business' | 'tech'>('business');

  return (
    <section id="engenharia" className="py-20 lg:py-28 bg-[var(--bg-app)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent-green)] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Método & Rigor Construtivo
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-main)] tracking-tight">
            Como Construímos Software
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Eliminamos o risco de investimento através de processos industriais de engenharia, testados e auditáveis em cada linha de código.
          </p>

          {/* Toggle Interativo */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('business')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                viewMode === 'business'
                  ? 'bg-gradient-to-r from-[#bd93f9] to-[#8be9fd] text-slate-950 font-bold shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Visão de Negócio (ROI & Segurança)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('tech')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                viewMode === 'tech'
                  ? 'bg-gradient-to-r from-[#50fa7b] to-[#8be9fd] text-slate-950 font-bold shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Visão Técnica (CTO & Arquitetura)
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico com Framer Motion */}
        <AnimatePresence mode="wait">
          {viewMode === 'business' ? (
            <motion.div
              key="business"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card Negócio 1 */}
              <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#bd93f9] transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#bd93f9]/20 flex items-center justify-center text-[#bd93f9] mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">Proteção do Seu Investimento</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Software que não dá retrabalho. Nosso protocolo previne o endividamento técnico, garantindo que o seu produto continue escalando sem necessidade de reescritas caras a cada 6 meses.
                </p>
                <div className="text-xs font-mono text-[var(--accent-cyan)] bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  ✓ Previsibilidade orçamentária cravada em cronograma
                </div>
              </div>

              {/* Card Negócio 2 */}
              <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#50fa7b] transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#50fa7b]/20 flex items-center justify-center text-[#50fa7b] mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">Blindagem Jurídica & LGPD</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Seus dados e os dados dos seus clientes não vazam. Projetamos segregação rigorosa de bancos de dados por cliente (Multi-Tenant isolado), auditado contra ataques e invasões.
                </p>
                <div className="text-xs font-mono text-[#50fa7b] bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  ✓ Conformidade bancária com trilha de auditoria
                </div>
              </div>

              {/* Card Negócio 3 */}
              <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#8be9fd] transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#8be9fd]/20 flex items-center justify-center text-[#8be9fd] mb-6">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">Zero Downtime em Produção</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Novas funcionalidades e atualizações entram no ar sem tirar o sistema do ar ou interromper vendas. Se qualquer falha for detectada, o rollback atômico restaura a versão estável em segundos.
                </p>
                <div className="text-xs font-mono text-[#ffb86c] bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  ✓ SLA de 99.9% com monitoramento em tempo real
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card Técnico 1 */}
              <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#50fa7b] transition-all font-mono shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#50fa7b]/20 flex items-center justify-center text-[#50fa7b] mb-6">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 font-sans">TDD Estrito ≥ 93%</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 font-sans">
                  Nenhum código entra em produção sem teste unitário e de integração prévios. Cobrimos contratos de API, renderização de componentes e lógica de negócio.
                </p>
                <div className="text-[11px] text-[#50fa7b] bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  $ vitest run --coverage<br />
                  ✓ All 100% tests passing
                </div>
              </div>

              {/* Card Técnico 2 */}
              <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#bd93f9] transition-all font-mono shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#bd93f9]/20 flex items-center justify-center text-[#bd93f9] mb-6">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 font-sans">SSOT & Git Flow Universal</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 font-sans">
                  Single Source of Truth inegociável. Branches protegidas, Universal Merge Commit e bloqueio estrito contra squash/rebase para garantir histórico imutável.
                </p>
                <div className="text-[11px] text-[#bd93f9] bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  git merge --no-ff feature/*<br />
                  Quality Gate: PASSED
                </div>
              </div>

              {/* Card Técnico 3 */}
              <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#8be9fd] transition-all font-mono shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#8be9fd]/20 flex items-center justify-center text-[#8be9fd] mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 font-sans">Arquitetura Desacoplada</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 font-sans">
                  Frontends estáticos ultra-leves consumindo backends headless via REST/GraphQL. Zero gargalos de concorrência e escalabilidade horizontal sob demanda.
                </p>
                <div className="text-[11px] text-[#8be9fd] bg-[var(--bg-app)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  SPA + Headless API<br />
                  FCP &lt; 0.8s | 60 FPS Mobile
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
