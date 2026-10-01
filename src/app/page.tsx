'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { brandConfig } from '@/config/brand.config';
import {
  Sparkles,
  Search,
  MapPin,
  ArrowRight,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Trophy,
  Dumbbell,
  ShieldCheck,
  Star,
  Activity,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  const { activePersona, userJourney, venues, services, packages, showToast } = useApp();
  const [searchSport, setSearchSport] = useState<string>('');
  const [searchCity, setSearchCity] = useState<string>('São Paulo');

  // Saudação e headline adaptada à trilha (Item 25 da especificação)
  const getTrackGreeting = () => {
    switch (activePersona.track) {
      case 'PROFISSIONAL':
        return {
          title: `Olá, ${activePersona.name}. Controle sua preparação.`,
          subtitle: 'Sua equipe multidisciplinar e calendário de torneios estão orquestrados.',
        };
      case 'COMPETIDOR':
        return {
          title: `Olá, ${activePersona.name}. Prepare-se para competir.`,
          subtitle: 'Ajuste sua tática de jogo, ritmo e suporte físico para o próximo torneio.',
        };
      case 'APRENDIZ':
        return {
          title: `Olá, ${activePersona.name}. Continue evoluindo.`,
          subtitle: 'Aulas técnicas, correção de movimentos e constância para subir de nível.',
        };
      case 'CASUAL':
      default:
        return {
          title: `Olá, ${activePersona.name}. Quer jogar hoje?`,
          subtitle: 'Quadras disponíveis, partidas com amigos e horários abertos sem burocracia.',
        };
    }
  };

  const greeting = getTrackGreeting();

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300">
      {/* 1. HERO SECTION (Item 24 da especificação) */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#121A18]/60 via-[#0B0F0E] to-[#0B0F0E]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B8F34A]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16221F] border border-[#B8F34A]/30 text-xs font-bold text-[#B8F34A] shadow-lg shadow-[#B8F34A]/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{brandConfig.tagline}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            {brandConfig.navigation.homeHeroTitle}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {brandConfig.navigation.homeHeroSubtitle}
          </p>

          {/* Barra de Busca de Intenção (Item 24) */}
          <div className="max-w-3xl mx-auto p-2 sm:p-2.5 rounded-2xl bg-[#16221F] border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 w-full">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchSport}
                onChange={(e) => setSearchSport(e.target.value)}
                placeholder="O que você pratica? Ex: Beach Tennis, Tênis, Futevôlei..."
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-gray-500"
              />
            </div>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 w-full">
              <MapPin className="w-4 h-4 text-[#B8F34A] shrink-0" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Em qual cidade?"
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-gray-500"
              />
            </div>

            <Link
              href="/explorar"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#B8F34A] text-[#0B0F0E] font-black text-xs hover:bg-[#a6e03c] transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#B8F34A]/20 shrink-0"
            >
              <span>Buscar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/app/jornada/montar"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all border border-white/10"
            >
              {brandConfig.navigation.ctaStartJourney}
            </Link>
            <Link
              href="/explorar"
              className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white text-xs font-semibold transition-all"
            >
              {brandConfig.navigation.ctaExploreSports} →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CONTEXTUAL PERSONA CARD / WIDGET DA JORNADA (Itens 25 e 165) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sports-card p-6 md:p-8 border-[#B8F34A]/30 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  Sua Jornada em Tempo Real
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-black ${
                    activePersona.track === 'PROFISSIONAL'
                      ? 'badge-track-profissional'
                      : activePersona.track === 'COMPETIDOR'
                      ? 'badge-track-competidor'
                      : 'badge-track-casual'
                  }`}
                >
                  {activePersona.track}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">{greeting.title}</h2>
              <p className="text-xs md:text-sm text-gray-300 max-w-xl">{greeting.subtitle}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/app/jornada"
                className="px-5 py-2.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] font-black text-xs hover:bg-[#a6e03c] transition-all flex items-center gap-1.5 shadow-md shadow-[#B8F34A]/20"
              >
                Abrir Minha Jornada Completa <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Mini Widgets da Jornada (Meu Time + Próxima Atividade) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            {/* Meu Time Resumo */}
            <div className="p-4 rounded-xl bg-[#121A18] border border-white/5 space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Meu Time ({activePersona.sport})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {userJourney.components
                  .filter((c) => c.category === 'COACH' || c.category === 'HEALTH' || c.category === 'PERFORMANCE')
                  .slice(0, 4)
                  .map((comp) => (
                    <span
                      key={comp.id}
                      className={`text-[11px] px-2 py-1 rounded-lg font-semibold flex items-center gap-1 ${
                        comp.isFilled
                          ? 'bg-[#B8F34A]/10 text-[#B8F34A] border border-[#B8F34A]/20'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {comp.isFilled ? '✓' : '○'} {comp.roleOrType}
                    </span>
                  ))}
              </div>
            </div>

            {/* Próximo Compromisso */}
            <div className="p-4 rounded-xl bg-[#121A18] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Próximo na Agenda
              </span>
              <strong className="text-xs text-white block">
                {userJourney.nextSteps[0]?.title || 'Treino Técnico Agendado'}
              </strong>
              <p className="text-[11px] text-[#B8F34A] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {userJourney.nextSteps[0]?.datetime || 'Amanhã · 18:00'}
              </p>
            </div>

            {/* Foco Atual */}
            <div className="p-4 rounded-xl bg-[#121A18] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Estágio da Jornada
              </span>
              <strong className="text-xs text-white block">
                Fase de {userJourney.currentStage}
              </strong>
              <p className="text-[11px] text-gray-400">
                {activePersona.track === 'PROFISSIONAL' && 'Torneio Estadual em 21 dias'}
                {activePersona.track === 'COMPETIDOR' && 'Simulação tática de duplas'}
                {activePersona.track === 'CASUAL' && 'Jogo aberto com amigos na sexta'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ESPAÇOS EM DESTAQUE NA SUA REGIÃO (Item 86 da especificação) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#B8F34A]" />
              Espaços em Destaque em São Paulo
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Arenas certificadas com pisos padronizados e disponibilidade imediata.
            </p>
          </div>
          <Link href="/explorar" className="text-xs text-[#B8F34A] hover:underline font-semibold">
            Ver todas as quadras →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.slice(0, 3).map((space) => (
            <div key={space.id} className="sports-card overflow-hidden flex flex-col justify-between">
              <div className="h-44 relative bg-gray-900">
                <img
                  src={space.photos[0]}
                  alt={space.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 text-xs font-bold text-[#0B0F0E] bg-[#B8F34A] px-2.5 py-0.5 rounded-full shadow-md">
                  ★ {space.rating}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {space.venueName}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{space.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{space.surface}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white font-bold">R$ {space.hourlyPrice}/h</span>
                  <Link
                    href="/reservas/nova"
                    className="px-3.5 py-1.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-black hover:bg-[#a6e03c]"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TREINADORES PARA SUA JORNADA (Item 85 da especificação) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B8F34A]" />
              Treinadores Recomendados para {userJourney.sportName}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Profissionais compatíveis com a trilha {userJourney.track} e objetivo de {userJourney.goal}.
            </p>
          </div>
          <Link href="/explorar" className="text-xs text-[#B8F34A] hover:underline font-semibold">
            Ver todos os especialistas →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((srv) => (
            <div key={srv.id} className="sports-card p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-[#B8F34A] bg-[#B8F34A]/10 px-2 py-0.5 rounded border border-[#B8F34A]/20">
                    {srv.category}
                  </span>
                  <span className="text-xs text-amber-400 font-bold">★ {srv.rating}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-2">{srv.providerName}</h3>
                <h4 className="text-xs text-gray-300 font-semibold mt-0.5">{srv.name}</h4>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{srv.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white font-bold">R$ {srv.price} / sessão</span>
                <Link
                  href="/app/jornada"
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#B8F34A] hover:text-[#0B0F0E] text-white text-xs font-bold transition-all"
                >
                  Conectar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
