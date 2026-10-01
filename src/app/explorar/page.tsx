'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Compass,
  Search,
  MapPin,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

export default function ExplorarPage() {
  const { venues, services, packages, groups, tournaments, addTeamComponent, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('ALL');

  const intentQueries = [
    'Quadra de beach tennis sexta à noite',
    'Nutricionista esportivo em São Paulo',
    'Treinador técnico para competição',
    'Grupo de futevôlei sábado',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Search Hero (Itens 24, 26, 28) */}
      <div className="sports-card p-6 md:p-10 space-y-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Explorar Ecossistema Esportivo
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white">
            Espaços, Profissionais & Experiências
          </h1>
          <p className="text-xs md:text-sm text-gray-300">
            Descubra os recursos certificados que combinam com seu nível e objetivo esportivo.
          </p>
        </div>

        {/* Input de Busca com Intenção (Item 26) */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 bg-[#121A18] rounded-2xl border border-white/10 focus-within:border-[#B8F34A] transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você procura? Ex: quadra de saibro, treinador de beach tennis..."
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-white px-2"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Atalhos de intenção rápidos */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-semibold">Exemplos de busca:</span>
            {intentQueries.map((query, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(query)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] border border-white/5 transition-all"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Categorias (Item 28) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          {[
            { id: 'ALL', label: 'Tudo' },
            { id: 'COURT', label: 'Quadras & Espaços' },
            { id: 'COACH', label: 'Treinadores' },
            { id: 'HEALTH', label: 'Saúde & Nutrição' },
            { id: 'PERFORMANCE', label: 'Performance' },
            { id: 'PACKAGES', label: 'Programas / Pacotes' },
            { id: 'GROUPS', label: 'Grupos & Partidas' },
            { id: 'TOURNAMENTS', label: 'Torneios' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#B8F34A] text-[#0B0F0E] shadow-sm'
                  : 'bg-[#121A18] text-gray-300 hover:bg-white/5 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Resultados */}
      <div className="space-y-8">
        {/* Seção 1: Quadras & Espaços */}
        {(activeCategory === 'ALL' || activeCategory === 'COURT') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B8F34A]" /> Espaços & Quadras Homologadas
              </h2>
              <span className="text-xs text-gray-400">{venues.length} quadras disponíveis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((space) => (
                <div key={space.id} className="sports-card overflow-hidden flex flex-col justify-between">
                  <div className="h-44 relative overflow-hidden bg-gray-900">
                    <img
                      src={space.photos[0]}
                      alt={space.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 text-xs font-bold text-[#0B0F0E] bg-[#B8F34A] px-2.5 py-0.5 rounded-full shadow-md">
                      ★ {space.rating}
                    </span>
                    {space.covered && (
                      <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                        Coberta
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        {space.venueName}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{space.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{space.surface}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{space.address}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">A partir de</span>
                        <strong className="text-base text-white">R$ {space.hourlyPrice}/h</strong>
                      </div>
                      <Link
                        href="/reservas/nova"
                        className="px-4 py-2 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-black hover:bg-[#a6e03c] transition-all"
                      >
                        Reservar Quadra
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção 2: Profissionais & Saúde */}
        {(activeCategory === 'ALL' || activeCategory === 'COACH' || activeCategory === 'HEALTH' || activeCategory === 'PERFORMANCE') && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B8F34A]" /> Treinadores & Especialistas de Saúde
              </h2>
              <span className="text-xs text-gray-400">{services.length} especialistas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="sports-card p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#B8F34A] bg-[#B8F34A]/10 px-2 py-0.5 rounded border border-[#B8F34A]/20">
                        {srv.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {srv.rating}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white">{srv.providerName}</h3>
                        {srv.verified && (
                          <CheckCircle2 className="w-4 h-4 text-[#B8F34A]" />
                        )}
                      </div>
                      <h4 className="text-xs text-gray-300 font-semibold mt-1">{srv.name}</h4>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="text-[11px] text-gray-400 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{srv.durationMinutes} min · {srv.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Sessão</span>
                      <strong className="text-base text-white">R$ {srv.price},00</strong>
                    </div>
                    <button
                      onClick={() => {
                        addTeamComponent('comp-nutri', srv.providerName, srv.category === 'COACH' ? 'Treinador' : 'Nutricionista');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#B8F34A] hover:text-[#0B0F0E] text-white text-xs font-bold transition-all"
                    >
                      Adicionar à Jornada
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção 3: Programas & Pacotes Multiprovider (Item 49, 50, 51) */}
        {(activeCategory === 'ALL' || activeCategory === 'PACKAGES') && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#B8F34A]" /> Programas & Pacotes Multiprovider
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="sports-card p-6 space-y-4 border-[#B8F34A]/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#B8F34A] bg-[#B8F34A]/10 px-2 py-0.5 rounded border border-[#B8F34A]/20">
                        Programa {pkg.durationWeeks} semanas
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1.5">{pkg.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-[#B8F34A]">
                        R$ {pkg.price.toLocaleString('pt-BR')}
                      </span>
                      {pkg.discountPercentage && (
                        <span className="text-[10px] text-gray-400 block">
                          Economia de {pkg.discountPercentage}%
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{pkg.description}</p>

                  <div className="p-3.5 rounded-xl bg-[#121A18] border border-white/5 space-y-1.5 text-xs">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Serviços Integrados no Pacote
                    </span>
                    {pkg.includedServices.map((inc, i) => (
                      <div key={i} className="flex items-center justify-between text-gray-300">
                        <span>{inc.sessions}x {inc.serviceName} ({inc.providerName})</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8F34A]" />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => showToast(`Pacote ${pkg.title} selecionado para sua jornada!`)}
                    className="w-full py-2.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-black hover:bg-[#a6e03c] transition-all"
                  >
                    Contratar Programa Integrado
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
