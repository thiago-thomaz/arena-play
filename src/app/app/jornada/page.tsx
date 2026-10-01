'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { performJourneyGapAnalysis } from '@/engine/journeyEngine';
import {
  Layers,
  Sparkles,
  Users,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  AlertCircle,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Trophy,
  Dumbbell,
  HeartPulse,
  Apple,
  Brain,
} from 'lucide-react';

export default function MinhaJornadaPage() {
  const {
    activePersona,
    userJourney,
    services,
    venues,
    addTeamComponent,
    removeTeamComponent,
    showToast,
  } = useApp();

  const [selectedRoleModal, setSelectedRoleModal] = useState<string | null>(null);

  // Análise de lacunas da jornada ativa
  const gapAnalysis = performJourneyGapAnalysis(userJourney);

  // Mapeamento de ícones para componentes
  const getCategoryIcon = (roleOrType: string) => {
    switch (roleOrType.toLowerCase()) {
      case 'treinador':
      case 'professor':
        return Dumbbell;
      case 'preparador físico':
        return TrendingUp;
      case 'fisioterapeuta':
        return HeartPulse;
      case 'nutricionista':
        return Apple;
      case 'psicólogo do esporte':
        return Brain;
      case 'quadra':
        return MapPin;
      default:
        return Trophy;
    }
  };

  // Recomendações contextuais disponíveis no marketplace compatíveis com a jornada
  const availableRecommendations = services.filter((s) => {
    const isApplicableTrack = s.applicableTracks.includes(userJourney.track);
    const notAlreadyHired = !userJourney.components.some(
      (c) => c.isFilled && c.assignedProviderName?.includes(s.providerName)
    );
    return isApplicableTrack && notAlreadyHired;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Contexto do Praticante & Estágio da Jornada */}
      <div className="sports-card p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8F34A]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] flex items-center gap-1.5 bg-[#B8F34A]/10 px-2.5 py-1 rounded-full border border-[#B8F34A]/20">
                <Sparkles className="w-3.5 h-3.5" />
                Sistema Operacional da Jornada
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                  userJourney.track === 'PROFISSIONAL'
                    ? 'badge-track-profissional'
                    : userJourney.track === 'COMPETIDOR'
                    ? 'badge-track-competidor'
                    : 'badge-track-casual'
                }`}
              >
                TRILHA {userJourney.track}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {userJourney.city}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{userJourney.sportName}</span>
              <span className="text-gray-500 font-normal text-xl md:text-2xl">/</span>
              <span className="text-gray-300 font-semibold text-xl md:text-2xl">{userJourney.modalityName}</span>
            </h1>

            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              Objetivo: <strong className="text-white capitalize">{userJourney.goal.replace('_', ' ')}</strong>. Nível: <strong className="text-white">{userJourney.level}</strong>. 
              {userJourney.track === 'PROFISSIONAL' && ' Estrutura orientada para alta performance, periodização e suporte multidisciplinar.'}
              {userJourney.track === 'COMPETIDOR' && ' Estrutura orientada para evolução tática, ritmo de jogo e prevenção de lesões.'}
              {userJourney.track === 'CASUAL' && ' Estrutura orientada para flexibilidade, diversão entre amigos e reservas ágeis.'}
            </p>
          </div>

          {/* Quick Stage Indicator */}
          <div className="bg-[#121A18] border border-white/10 p-5 rounded-2xl md:w-80 shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 uppercase font-semibold">Fase Atual da Jornada</span>
              <span className="text-[#B8F34A] font-bold">{userJourney.currentStage}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#88C61D] to-[#B8F34A] rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${gapAnalysis.completionPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>Estrutura completa: <strong className="text-white">{gapAnalysis.completionPercentage}%</strong></span>
              <Link
                href="/app/jornada/montar"
                className="text-[#B8F34A] hover:underline font-semibold flex items-center gap-1"
              >
                Ajustar jornada <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 2 Colunas (Meu Time & Próximos Passos | Gap Analysis & Recomendações) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Esquerda: Meu Time + Minha Estrutura + Próximos Passos (2 cols em telas grandes) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Seção 1: MEU TIME (Item 18 da especificação) */}
          <section className="sports-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#B8F34A]" />
                  Meu Time Multidisciplinar
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Profissionais integrados que acompanham e potencializam sua rotina esportiva.
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {gapAnalysis.alreadyHave.length} contratados
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userJourney.components
                .filter((c) => c.category === 'COACH' || c.category === 'PERFORMANCE' || c.category === 'HEALTH')
                .map((comp) => {
                  const Icon = getCategoryIcon(comp.roleOrType);
                  const isFilled = comp.isFilled;

                  return (
                    <div
                      key={comp.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isFilled
                          ? 'bg-[#16221F] border-[#B8F34A]/30'
                          : 'bg-[#121A18]/60 border-dashed border-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isFilled
                                ? 'bg-[#B8F34A]/15 text-[#B8F34A]'
                                : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                                {comp.roleOrType}
                              </span>
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                                  comp.priority === 'ESSENCIAL'
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-[#B8F34A]/15 text-[#B8F34A]'
                                }`}
                              >
                                {comp.priority}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-white mt-0.5">
                              {isFilled ? comp.assignedProviderName : `Adicionar ${comp.roleOrType}`}
                            </h3>
                          </div>
                        </div>

                        {isFilled ? (
                          <CheckCircle2 className="w-5 h-5 text-[#B8F34A] shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-500 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-gray-400 mt-2.5 line-clamp-2 leading-relaxed">
                        {comp.rationale}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        {isFilled ? (
                          <>
                            <span className="text-gray-400">Ativo na jornada</span>
                            <button
                              onClick={() => removeTeamComponent(comp.id)}
                              className="text-gray-400 hover:text-red-400 text-[11px] underline"
                            >
                              Trocar / Remover
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setSelectedRoleModal(comp.roleOrType)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#B8F34A] text-[#0B0F0E] font-bold hover:bg-[#a6e03c] transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Completar vaga
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Seção 2: MINHA ESTRUTURA (Espaço & Equipamentos) */}
          <section className="sports-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#B8F34A]" />
              Minha Estrutura & Equipamento
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userJourney.components
                .filter((c) => c.category === 'COURT' || c.category === 'EQUIPMENT')
                .map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#16221F] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        {item.roleOrType}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {item.isFilled ? item.assignedProviderName : item.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{item.rationale}</p>
                    </div>
                    {item.isFilled ? (
                      <span className="p-2 rounded-xl bg-[#B8F34A]/10 text-[#B8F34A] text-xs font-bold border border-[#B8F34A]/20">
                        Pronto
                      </span>
                    ) : (
                      <Link
                        href="/explorar"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
                      >
                        Encontrar
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </section>

          {/* Seção 3: PRÓXIMOS PASSOS (Timeline viva) */}
          <section className="sports-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#B8F34A]" />
                Próximos Passos da Sua Rotina
              </h2>
              <Link
                href="/reservas"
                className="text-xs text-[#B8F34A] hover:underline font-semibold flex items-center gap-1"
              >
                Ver agenda completa <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {userJourney.nextSteps.map((step) => (
                <div
                  key={step.id}
                  className="p-4 rounded-2xl bg-[#121A18] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        step.type === 'tournament'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-[#B8F34A]/15 text-[#B8F34A] border border-[#B8F34A]/30'
                      }`}
                    >
                      {step.type === 'tournament' ? <Trophy className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <p className="text-xs text-gray-300 mt-0.5 font-medium">
                        {step.providerName} · {step.location}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-[#B8F34A] font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{step.datetime}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/reservas"
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10"
                  >
                    Detalhes
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Coluna Direita: Análise de Lacunas + Investimento + Recomendações Contextuais */}
        <div className="space-y-8">
          {/* JOURNEY GAP ANALYSIS (Item 20 da especificação) */}
          <div className="sports-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#B8F34A]" />
              <h3 className="text-base font-bold text-white">Análise de Lacunas da Jornada</h3>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed">
              O sistema cruza seu objetivo de <strong>{userJourney.goal}</strong> com a estrutura atual para identificar o que falta para avançar.
            </p>

            {/* O que já tem */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                ✓ O que você já tem
              </span>
              <div className="space-y-1.5">
                {gapAnalysis.alreadyHave.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-[#16221F] border border-white/5 text-gray-200"
                  >
                    <span className="font-semibold">{item.roleOrType}</span>
                    <span className="text-[#B8F34A] text-[11px] truncate max-w-[140px]">
                      {item.assignedProviderName || 'Configurado'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* O que falta / pode adicionar */}
            {gapAnalysis.toAddRecommended.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  ○ Lacunas prioritárias
                </span>
                <div className="space-y-2">
                  {gapAnalysis.toAddRecommended.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#121A18] border border-amber-500/20 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-white">{item.roleOrType}</strong>
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        {item.rationale}
                      </p>
                      <button
                        onClick={() => setSelectedRoleModal(item.roleOrType)}
                        className="w-full text-center py-1.5 rounded-lg bg-[#B8F34A]/10 hover:bg-[#B8F34A]/20 text-[#B8F34A] font-bold text-[11px] transition-all"
                      >
                        Ver profissionais recomendados
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ESTIMATIVA DE INVESTIMENTO MENSAL (Item 52 da especificação) */}
          <div className="sports-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#B8F34A]" />
                Investimento da Jornada
              </h3>
              <span className="text-[11px] text-gray-400">Estimativa mensal</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#121A18] border border-white/5 space-y-2.5">
              {userJourney.monthlyEstimate.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{item.category}</span>
                  <span className="text-gray-200 font-semibold">
                    R$ {item.value.toLocaleString('pt-BR')}/mês
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Total Estimado</span>
                <span className="text-base font-black text-[#B8F34A]">
                  R$ {userJourney.monthlyEstimate.total.toLocaleString('pt-BR')}/mês
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed italic">
              * Estimativa transparente baseada nos serviços recomendados e frequências ideais para sua trilha. Não há fidelidade ou cobrança obrigatória única.
            </p>
          </div>

          {/* RECOMENDAÇÕES DA JORNADA (JOURNEY MATCH - Item 87) */}
          <div className="sports-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B8F34A]" />
                Recomendado para Você
              </h3>
              <span className="text-[10px] uppercase font-bold text-[#B8F34A]">Match de Jornada</span>
            </div>

            <div className="space-y-3">
              {availableRecommendations.slice(0, 3).map((serv) => (
                <div
                  key={serv.id}
                  className="p-3.5 rounded-xl bg-[#121A18] border border-white/10 hover:border-[#B8F34A]/40 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {serv.category} · {serv.providerName}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-snug mt-0.5">
                        {serv.name}
                      </h4>
                    </div>
                    <span className="text-xs font-black text-[#B8F34A] shrink-0">
                      R$ {serv.price}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 line-clamp-2">
                    {serv.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-gray-300 font-medium">
                      ★ {serv.rating} ({serv.reviewCount} avaliações)
                    </span>
                    <button
                      onClick={() => {
                        addTeamComponent('comp-nutri', serv.providerName, 'Nutricionista');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#B8F34A] text-[#0B0F0E] text-[11px] font-extrabold hover:bg-[#a5e03b] transition-all"
                    >
                      Adicionar ao Time
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Sheet Contextual para Seleção de Profissionais */}
      {selectedRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sports-card p-6 max-w-lg w-full space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8F34A]">
                  Completar Vaga
                </span>
                <h3 className="text-lg font-bold text-white">
                  Selecionar {selectedRoleModal}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRoleModal(null)}
                className="text-gray-400 hover:text-white text-sm p-1.5 rounded-lg bg-white/5"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Estes especialistas atendem especificamente sua modalidade (<strong>{userJourney.sportName}</strong>) e objetivo de <strong>{userJourney.goal}</strong> em {userJourney.city}:
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {services
                .filter((s) => s.applicableTracks.includes(userJourney.track))
                .map((srv) => (
                  <div
                    key={srv.id}
                    className="p-3.5 rounded-xl bg-[#121A18] border border-white/10 hover:border-[#B8F34A]/50 transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{srv.providerName}</span>
                        {srv.verified && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#B8F34A]/20 text-[#B8F34A] font-bold">
                            Verificado
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{srv.name}</p>
                      <span className="text-[11px] font-semibold text-[#B8F34A]">
                        R$ {srv.price} / sessão
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addTeamComponent('comp-nutri', srv.providerName, selectedRoleModal);
                        setSelectedRoleModal(null);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-extrabold hover:bg-[#a7e13d] transition-all shrink-0"
                    >
                      Contratar
                    </button>
                  </div>
                ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedRoleModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
