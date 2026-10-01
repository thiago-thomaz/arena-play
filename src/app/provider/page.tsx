'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronRight,
} from 'lucide-react';

export default function ProviderDashboardPage() {
  const { providerDraft } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="sports-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] bg-[#B8F34A]/10 px-2.5 py-0.5 rounded-full border border-[#B8F34A]/20 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Painel de Operações do Parceiro
            </span>
            <span className="text-xs text-gray-400">
              {providerDraft.name} ({providerDraft.city})
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Painel do Provider & Insights de Jornada
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xl">
            Monitore suas reservas recebidas, faturamento orquestrado e a distribuição dos atletas que encontram seus serviços.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/provider/onboarding"
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all border border-white/10"
          >
            Editar Catálogo / Perfil
          </Link>
          <Link
            href="/provider/onboarding"
            className="px-5 py-2.5 rounded-2xl bg-[#B8F34A] text-[#0B0F0E] font-black text-xs hover:bg-[#a6e03c] transition-all flex items-center gap-2 shadow-lg shadow-[#B8F34A]/20"
          >
            <Sparkles className="w-3.5 h-3.5" /> Smart Onboarding
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sports-card p-5 space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Receita Líquida (Mês)</span>
          <div className="text-2xl font-black text-white flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-[#B8F34A]" /> R$ 8.450
          </div>
          <span className="text-[11px] text-[#B8F34A] font-semibold">+18% vs mês anterior</span>
        </div>

        <div className="sports-card p-5 space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Sessões Orquestradas</span>
          <div className="text-2xl font-black text-white flex items-center gap-1">
            <Calendar className="w-5 h-5 text-blue-400" /> 48
          </div>
          <span className="text-[11px] text-gray-400">100% de taxa de presença</span>
        </div>

        <div className="sports-card p-5 space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Avaliação Média</span>
          <div className="text-2xl font-black text-white flex items-center gap-1">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> 4.96
          </div>
          <span className="text-[11px] text-gray-400">54 avaliações verificadas</span>
        </div>

        <div className="sports-card p-5 space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Completude do Perfil</span>
          <div className="text-2xl font-black text-white flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-[#B8F34A]" /> {providerDraft.completionPercentage}%
          </div>
          <span className="text-[11px] text-[#B8F34A] font-semibold">Status: Operando</span>
        </div>
      </div>

      {/* Grid: Provider Journey Insights (Item 94) + Agenda Imediata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PROVIDER JOURNEY INSIGHTS (Item 94 da especificação) */}
        <div className="sports-card p-6 space-y-5">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B8F34A]">
              Sports Journey Intelligence
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              Quem está encontrando você?
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Origem da demanda mapeada pelo motor de jornadas:
            </p>
          </div>

          <div className="space-y-4">
            {/* Competidor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Competidor (Preparação de Torneio)</span>
                <span className="text-[#B8F34A] font-bold">72%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#B8F34A] rounded-full" style={{ width: '72%' }} />
              </div>
            </div>

            {/* Profissional */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Profissional (Alto Rendimento)</span>
                <span className="text-amber-400 font-bold">18%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            {/* Aprendiz */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Aprendiz (Evolução Técnica)</span>
                <span className="text-blue-400 font-bold">10%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121A18] border border-white/5 text-xs text-gray-300 space-y-2">
            <strong className="text-white block">Insight de Relevância:</strong>
            <p className="leading-relaxed">
              Sua especialização em <em>Beach Tennis Competitivo</em> faz você receber 3.4x mais recomendações para praticantes que estão a menos de 30 dias de um torneio.
            </p>
          </div>
        </div>

        {/* Agenda Próxima & Pedidos de Agendamento */}
        <div className="lg:col-span-2 sports-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B8F34A]" /> Próximos Atendimentos Confirmados
            </h3>
            <span className="text-xs text-gray-400">Hoje & Amanhã</span>
          </div>

          <div className="space-y-3">
            {[
              {
                time: 'Hoje · 18:00 às 19:00',
                client: 'João Silva',
                track: 'PROFISSIONAL',
                sport: 'Beach Tennis Duplas',
                location: 'Posto 9 Sand Arena - Quadra Central',
                service: 'Treino Tático & Alta Performance',
                price: 'R$ 160,00',
              },
              {
                time: 'Amanhã · 09:00 às 10:00',
                client: 'Camila Duarte',
                track: 'COMPETIDOR',
                sport: 'Beach Tennis',
                location: 'Posto 9 Sand Arena - Quadra 2',
                service: 'Ajuste de Smash e Bloqueio',
                price: 'R$ 150,00',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#121A18] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-white">{item.client}</strong>
                    <span className="text-[9px] px-2 py-0.5 rounded font-black badge-track-profissional">
                      {item.track}
                    </span>
                    <span className="text-xs text-gray-400">· {item.sport}</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 font-medium">{item.service}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{item.location}</p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-xs font-bold text-[#B8F34A] block">{item.time}</span>
                  <span className="text-xs text-white font-semibold mt-0.5 block">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-400">Prazo padrão de resposta automática: 30 minutos</span>
            <Link
              href="/provider/onboarding"
              className="text-xs text-[#B8F34A] font-bold hover:underline flex items-center gap-1"
            >
              Configurar regras de confirmação <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
