'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Users,
  ShieldCheck,
  Calendar,
  MessageSquare,
  RefreshCw,
  Trash2,
  Plus,
  Star,
  Clock,
  Sparkles,
  Phone,
  CheckCircle2,
} from 'lucide-react';

export default function MeuTimePage() {
  const { userJourney, services, removeTeamComponent, addTeamComponent, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'time' | 'grupos'>('time');
  const [contactModal, setContactModal] = useState<string | null>(null);

  const teamComponents = userJourney.components.filter(
    (c) => c.category === 'COACH' || c.category === 'PERFORMANCE' || c.category === 'HEALTH'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header com distinção conceitual (Item 82 da especificação) */}
      <div className="sports-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] bg-[#B8F34A]/10 px-2.5 py-1 rounded-full border border-[#B8F34A]/20 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Staff de Apoio & Comunidade
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              Meu Time & Grupos Esportivos
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xl">
              Distinção clara: <strong>Meu Time</strong> reúne seus especialistas técnicos e de saúde; <strong>Meus Grupos</strong> reúne seus parceiros e companheiros de jogo.
            </p>
          </div>

          {/* Abas Alternadoras */}
          <div className="flex items-center bg-[#121A18] p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('time')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'time'
                  ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-md shadow-[#B8F34A]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Meu Time ({teamComponents.filter((c) => c.isFilled).length})
            </button>
            <button
              onClick={() => setActiveTab('grupos')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'grupos'
                  ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-md shadow-[#B8F34A]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Meus Grupos & Partidas
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Aba: MEU TIME */}
      {activeTab === 'time' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8F34A]" />
              Especialistas da Sua Jornada ({userJourney.sportName})
            </h2>
            <Link
              href="/explorar"
              className="text-xs text-[#B8F34A] hover:underline font-semibold flex items-center gap-1"
            >
              Buscar mais profissionais no marketplace →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamComponents.map((comp) => {
              const isFilled = comp.isFilled;

              return (
                <div
                  key={comp.id}
                  className={`sports-card p-6 flex flex-col justify-between space-y-4 ${
                    isFilled ? 'sports-card-active' : 'opacity-85 border-dashed'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#B8F34A] bg-[#B8F34A]/10 px-2.5 py-0.5 rounded-full border border-[#B8F34A]/20">
                        {comp.roleOrType}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          isFilled
                            ? 'bg-[#B8F34A]/20 text-[#B8F34A]'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {isFilled ? 'CONTRATADO' : 'VAGA ABERTA'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {isFilled ? comp.assignedProviderName : `Contratar ${comp.roleOrType}`}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {comp.rationale}
                    </p>

                    {isFilled && (
                      <div className="p-3 rounded-xl bg-[#121A18] border border-white/5 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-gray-300">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#B8F34A]" /> Próxima sessão:
                          </span>
                          <strong className="text-white">Amanhã · 18:00</strong>
                        </div>
                        <div className="flex items-center justify-between text-gray-300">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#B8F34A]" /> Registro:
                          </span>
                          <strong className="text-white">Profissional Verificado</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    {isFilled ? (
                      <>
                        <button
                          onClick={() => setContactModal(comp.assignedProviderName || null)}
                          className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Mensagem
                        </button>
                        <button
                          onClick={() => removeTeamComponent(comp.id)}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                          title="Remover do time"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/explorar"
                        className="w-full py-2.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-extrabold flex items-center justify-center gap-1.5 hover:bg-[#a6e03c] transition-all"
                      >
                        <Plus className="w-4 h-4" /> Encontrar Especialista
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Conteúdo Aba: MEUS GRUPOS & PARTIDAS (Item 79, 80 da especificação) */}
      {activeTab === 'grupos' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Comunidade & Partidas Coletivas</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Grupos organizados para jogar avulso, rachas semanais e duplas fixas.
              </p>
            </div>
            <button
              onClick={() => showToast('Criador de grupo rápido aberto.')}
              className="px-4 py-2 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-bold hover:bg-[#a6e03c] transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Criar Novo Grupo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="sports-card p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Futevôlei · Grupo Fixo
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Pelada de Futevôlei Sexta no Pôquer
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Posto 9 Sand Arena · Toda Sexta 19:30
                  </p>
                </div>
                <span className="text-xs font-bold text-[#B8F34A] px-2.5 py-1 rounded-full bg-[#B8F34A]/10 border border-[#B8F34A]/20">
                  6 / 8 jogadores
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-400">Racha semanal com areia iluminada</span>
                <strong className="text-white">R$ 35 / jogador</strong>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => showToast('Você já está confirmado para esta sexta!')}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
                >
                  Ver Jogadores & Chat
                </button>
              </div>
            </div>

            <div className="sports-card p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Beach Tennis · Torneio Amador
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Duplas de Treino Circuito Paulista
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Arena Ibirapuera Beach · Sábados 09:00
                  </p>
                </div>
                <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                  4 / 4 duplas
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-400">Simulação de jogo com bola oficial</span>
                <strong className="text-white">R$ 40 / jogador</strong>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => showToast('Lista de presença visualizada.')}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
                >
                  Ver Tabela do Racha
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Mensagem Segura (Item 71: Proteger dados pessoais sem expor número de telefone) */}
      {contactModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sports-card p-6 max-w-md w-full space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8F34A]">
                  Mensageria Segura da Plataforma
                </span>
                <h3 className="text-base font-bold text-white">{contactModal}</h3>
              </div>
              <button
                onClick={() => setContactModal(null)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-300">
              Comunicação operacional protegida. Seus dados pessoais e número de telefone são preservados pela plataforma.
            </p>

            <textarea
              rows={3}
              placeholder="Digite sua dúvida ou ajuste de horário operacional..."
              className="w-full p-3 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setContactModal(null)}
                className="px-3 py-1.5 rounded-xl bg-white/5 text-gray-300 hover:text-white text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  showToast('Mensagem enviada com sucesso no canal operacional!');
                  setContactModal(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-black hover:bg-[#a6e03c]"
              >
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
