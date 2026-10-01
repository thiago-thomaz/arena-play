'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JourneyBlueprint, ComponentPriority } from '@/types';
import {
  ShieldCheck,
  Layers,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  BarChart3,
  Calendar,
  AlertTriangle,
  Sparkles,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sliders,
  Flame,
} from 'lucide-react';

export default function AdminBackofficePage() {
  const { blueprints, updateBlueprint, showToast, bookings } = useApp();
  const [activeTab, setActiveTab] = useState<'blueprints' | 'intelligence' | 'financial' | 'quality'>('blueprints');

  const [currentBlueprint, setCurrentBlueprint] = useState<JourneyBlueprint>(blueprints[0]);

  // Editar prioridade de um componente no blueprint sem deploy (Item 98)
  const handlePriorityChange = (componentId: string, newPriority: ComponentPriority) => {
    const updated = {
      ...currentBlueprint,
      components: currentBlueprint.components.map((c) =>
        c.id === componentId ? { ...c, priority: newPriority } : c
      ),
    };
    setCurrentBlueprint(updated);
    updateBlueprint(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="sports-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] bg-[#B8F34A]/10 px-2.5 py-0.5 rounded-full border border-[#B8F34A]/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Gestão Central da Plataforma
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Backoffice Administrativo & Journey Engine
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xl">
            Configure blueprints esportivos em tempo real sem deploy, monitore o Sports Intelligence e audite splits financeiros.
          </p>
        </div>

        {/* Abas do Admin */}
        <div className="flex flex-wrap items-center bg-[#121A18] p-1.5 rounded-2xl border border-white/10 shrink-0 gap-1">
          <button
            onClick={() => setActiveTab('blueprints')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'blueprints'
                ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Blueprints Visuais
          </button>
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'intelligence'
                ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sports Intelligence
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'financial'
                ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            GMV & Split Financeiro
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quality'
                ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Quality Gate & Providers
          </button>
        </div>
      </div>

      {/* ABA 1: VISUAL JOURNEY BLUEPRINTS EDITOR (Item 98 da especificação) */}
      {activeTab === 'blueprints' && (
        <div className="space-y-6">
          <div className="sports-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B8F34A] tracking-wider">
                  Configurador de Regras sem Deploy
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Blueprint: {currentBlueprint.sportName} · Trilha {currentBlueprint.track}
                </h2>
                <p className="text-xs text-gray-400">
                  Defina as prioridades dos componentes para o objetivo de {currentBlueprint.goal}. As recomendações de todos os usuários são recalculadas dinamicamente.
                </p>
              </div>

              <button
                onClick={() => showToast('Blueprint salvo e propagado para o motor de jornadas.')}
                className="px-4 py-2 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-black hover:bg-[#a6e03c] transition-all flex items-center gap-1.5 self-start sm:self-center"
              >
                <Save className="w-3.5 h-3.5" /> Salvar Regras Globais
              </button>
            </div>

            {/* Tabela de Componentes do Blueprint */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="pb-3 font-bold">Componente / Papel</th>
                    <th className="pb-3 font-bold">Categoria</th>
                    <th className="pb-3 font-bold">Fase da Jornada</th>
                    <th className="pb-3 font-bold">Prioridade da Regra</th>
                    <th className="pb-3 font-bold">Custo Estimado</th>
                    <th className="pb-3 font-bold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentBlueprint.components.map((comp) => (
                    <tr key={comp.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5">
                        <strong className="text-white block">{comp.name}</strong>
                        <span className="text-[11px] text-gray-400">{comp.roleOrType}</span>
                      </td>
                      <td className="py-3.5 text-gray-300">{comp.category}</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300 font-semibold text-[10px]">
                          {comp.stage}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <select
                          value={comp.priority}
                          onChange={(e) =>
                            handlePriorityChange(comp.id, e.target.value as ComponentPriority)
                          }
                          className="px-2.5 py-1 rounded-lg bg-[#121A18] border border-white/10 text-white font-bold text-xs focus:border-[#B8F34A] focus:outline-none"
                        >
                          <option value="ESSENCIAL">ESSENCIAL</option>
                          <option value="RECOMENDADO">RECOMENDADO</option>
                          <option value="OPCIONAL">OPCIONAL</option>
                          <option value="AVANCADO">AVANCADO</option>
                        </select>
                      </td>
                      <td className="py-3.5 text-white font-bold">
                        R$ {comp.estimatedCostMonth}/mês
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => showToast(`Regra de ${comp.name} sincronizada.`)}
                          className="text-[#B8F34A] hover:underline font-semibold text-[11px]"
                        >
                          Ajustar Rationale
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: SPORTS INTELLIGENCE & MARKET OPPORTUNITY ENGINE (Itens 107 e 108) */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico/Distribuição de Demanda */}
            <div className="sports-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#B8F34A]" /> Demanda por Modalidade
              </h3>
              <div className="space-y-3 pt-2">
                {[
                  { sport: 'Beach Tennis', percentage: 46, growth: '+28%' },
                  { sport: 'Futevôlei', percentage: 24, growth: '+15%' },
                  { sport: 'Tênis', percentage: 18, growth: '+8%' },
                  { sport: 'Padel', percentage: 12, growth: '+42%' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{item.sport}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#B8F34A] font-bold">{item.growth}</span>
                        <span className="text-gray-400">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#88C61D] to-[#B8F34A] rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horários de Pico & Gaps de Oferta */}
            <div className="sports-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" /> Horários & Ocupação
              </h3>
              <p className="text-xs text-gray-400">
                Picos de procura não atendidos por falta de quadras ou treinadores:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between">
                  <span className="text-gray-300">18:00 às 21:00 (Segunda a Sexta)</span>
                  <span className="text-amber-400 font-bold">96% ocupação</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between">
                  <span className="text-gray-300">08:00 às 11:00 (Sábados e Domingos)</span>
                  <span className="text-amber-400 font-bold">92% ocupação</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between">
                  <span className="text-gray-300">14:00 às 17:00 (Oportunidade off-peak)</span>
                  <span className="text-blue-400 font-bold">44% ocupação</span>
                </div>
              </div>
            </div>

            {/* Market Opportunity Engine (Item 108) */}
            <div className="sports-card p-6 space-y-4 border-[#B8F34A]/30">
              <span className="text-[10px] font-black uppercase text-[#B8F34A] tracking-wider block">
                Market Opportunity Engine
              </span>
              <h3 className="text-base font-bold text-white">
                Oportunidades de Expansão Detectadas
              </h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-3 rounded-xl bg-[#121A18] border border-[#B8F34A]/20 space-y-1">
                  <strong className="text-white block">Pinheiros / Vila Madalena:</strong>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Existe demanda 3.2x maior do que a oferta para treinadores especializados em torneio de Beach Tennis entre 18h e 20h.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#121A18] border border-white/5 space-y-1">
                  <strong className="text-white block">Moema / Ibirapuera:</strong>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Alta procura por fisioterapia esportiva integrada à quadra pós-jogo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: GMV & SPLIT FINANCEIRO (Item 106 da especificação) */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sports-card p-5 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">GMV Total Processado</span>
              <div className="text-2xl font-black text-white flex items-center gap-1">
                <DollarSign className="w-5 h-5 text-[#B8F34A]" /> R$ 142.800
              </div>
              <span className="text-[11px] text-[#B8F34A] font-semibold">+24% vs mês anterior</span>
            </div>

            <div className="sports-card p-5 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Repasse a Parceiros</span>
              <div className="text-2xl font-black text-white flex items-center gap-1">
                <Users className="w-5 h-5 text-blue-400" /> R$ 125.664
              </div>
              <span className="text-[11px] text-gray-400">Split automático via Pix</span>
            </div>

            <div className="sports-card p-5 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Receita Líquida Plataforma</span>
              <div className="text-2xl font-black text-[#B8F34A] flex items-center gap-1">
                <Sparkles className="w-5 h-5 text-[#B8F34A]" /> R$ 17.136
              </div>
              <span className="text-[11px] text-gray-400">Take rate médio: 12%</span>
            </div>

            <div className="sports-card p-5 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Taxa de Reembolso</span>
              <div className="text-2xl font-black text-white">0.8%</div>
              <span className="text-[11px] text-[#B8F34A] font-semibold">Baixíssimo índice de estorno</span>
            </div>
          </div>
        </div>
      )}

      {/* ABA 4: QUALITY GATE & VERIFICAÇÕES (Itens 102 e 103) */}
      {activeTab === 'quality' && (
        <div className="sports-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B8F34A]" />
            Quality Gate de Homologação de Providers
          </h3>
          <p className="text-xs text-gray-400">
            Checklist obrigatório antes da liberação do selo oficial verificado:
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                name: 'Prof. João Silva',
                category: 'Treinador Técnico',
                doc: 'CREF 12934-SP (Válido)',
                score: '98 / 100',
                status: 'VERIFICADO',
              },
              {
                name: 'Mariana Lima',
                category: 'Nutrição Esportiva',
                doc: 'CRN-3 39201 (Válido)',
                score: '96 / 100',
                status: 'VERIFICADO',
              },
              {
                name: 'Carlos Oliveira',
                category: 'Treinador em Onboarding',
                doc: 'CREF 034912-G/SP (Em análise)',
                score: '84 / 100',
                status: 'EM_ANALISE',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-white text-sm">{p.name}</strong>
                  <p className="text-gray-400 mt-0.5">{p.category} · {p.doc}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-400">Score de Qualidade: <strong className="text-[#B8F34A]">{p.score}</strong></span>
                  <span
                    className={`px-2.5 py-1 rounded font-bold text-[10px] ${
                      p.status === 'VERIFICADO'
                        ? 'bg-[#B8F34A]/20 text-[#B8F34A]'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
