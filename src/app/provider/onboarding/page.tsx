'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Save,
} from 'lucide-react';

export default function SmartProviderOnboardingPage() {
  const { providerDraft, updateProviderDraft, showToast } = useApp();

  const categoriesOptions = [
    { id: 'COURT', label: 'Espaço / Quadra', icon: '🏟️' },
    { id: 'COACH', label: 'Treinamento', icon: '🎾' },
    { id: 'PERFORMANCE', label: 'Performance / Prep. Física', icon: '⚡' },
    { id: 'HEALTH', label: 'Saúde (Nutri / Fisio / Psico)', icon: '🩺' },
    { id: 'EQUIPMENT', label: 'Equipamentos', icon: '🎒' },
    { id: 'PACKAGE', label: 'Pacotes Multiprovider', icon: '📦' },
  ];

  const toggleCategory = (catId: string) => {
    const current = providerDraft.offeredCategories;
    if (current.includes(catId)) {
      updateProviderDraft({ offeredCategories: current.filter((c) => c !== catId) });
    } else {
      updateProviderDraft({ offeredCategories: [...current, catId] });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Banner com Autosave e Progresso (Itens 42 e 43) */}
      <div className="sports-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B8F34A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Smart Provider Onboarding
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white mt-1">
            Cadastro Inteligente de Parceiro
          </h1>
          <p className="text-xs text-gray-400">
            Preencha sem fricção. O sistema salva automaticamente e atualiza o preview em tempo real.
          </p>
        </div>

        {/* Barra de Completude Progressiva (Item 42) */}
        <div className="bg-[#121A18] border border-white/10 p-3.5 rounded-2xl sm:w-72 shrink-0 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300 font-semibold flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5 text-[#B8F34A]" /> Autosave Ativo
            </span>
            <span className="text-[#B8F34A] font-bold">
              {providerDraft.completionPercentage}% completo
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#88C61D] to-[#B8F34A] rounded-full transition-all duration-300"
              style={{ width: `${providerDraft.completionPercentage}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 block text-right">
            {providerDraft.completionPercentage >= 70
              ? '✓ Mínimo para operar atingido'
              : 'Preencha os campos básicos'}
          </span>
        </div>
      </div>

      {/* Grid: Layout Desktop 2 Colunas (Formulário à Esquerda | Live Preview à Direita - Item 44) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulário à Esquerda (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Primeira Pergunta: O que você oferece? (Item 35) */}
          <div className="sports-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              1. O que você oferece na plataforma?
            </h2>
            <p className="text-xs text-gray-400">
              Você pode selecionar mais de uma categoria para atender com o mesmo perfil.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {categoriesOptions.map((cat) => {
                const isSelected = providerDraft.offeredCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#B8F34A]/15 border-[#B8F34A] text-white shadow-sm'
                        : 'bg-[#121A18] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xl block mb-1">{cat.icon}</span>
                    <span className="text-xs font-bold block leading-snug">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Perfil Básico (Item 36) */}
          <div className="sports-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              2. Perfil & Identificação
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  Nome do Profissional ou Arena
                </label>
                <input
                  type="text"
                  value={providerDraft.name}
                  onChange={(e) => updateProviderDraft({ name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                  placeholder="Ex: Carlos Silva ou Arena Prime"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  Cidade de Atuação
                </label>
                <input
                  type="text"
                  value={providerDraft.city}
                  onChange={(e) => updateProviderDraft({ city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                  placeholder="Ex: São Paulo - SP"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  E-mail Comercial
                </label>
                <input
                  type="email"
                  value={providerDraft.email}
                  onChange={(e) => updateProviderDraft({ email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={providerDraft.phone}
                  onChange={(e) => updateProviderDraft({ phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Oferta de Serviços (Item 37) */}
          <div className="sports-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              3. Configuração do Serviço Principal
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">
                  Título do Serviço
                </label>
                <input
                  type="text"
                  value={providerDraft.serviceTitle}
                  onChange={(e) => updateProviderDraft({ serviceTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                  placeholder="Ex: Treino Tático Avançado em Beach Tennis"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Preço por Sessão (R$)
                  </label>
                  <input
                    type="number"
                    value={providerDraft.servicePrice}
                    onChange={(e) => updateProviderDraft({ servicePrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    value={providerDraft.serviceDuration}
                    onChange={(e) => updateProviderDraft({ serviceDuration: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Documentos & Verificação (Item 39 e 74) */}
          <div className="sports-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B8F34A]" />
              4. Registro Profissional (Trust Layer)
            </h2>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                Registro CREF / CRN / CREFITO / CNPJ
              </label>
              <input
                type="text"
                value={providerDraft.crefOrCrn || ''}
                onChange={(e) => updateProviderDraft({ crefOrCrn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-xs focus:border-[#B8F34A] focus:outline-none"
                placeholder="Ex: CREF 034912-G/SP"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Profissionais verificados recebem o selo oficial e prioridade nas recomendações contextuais da jornada.
              </span>
            </div>
          </div>
        </div>

        {/* Live Preview à Direita (5 cols) (Item 41 da especificação) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#B8F34A]" /> Prévia Real do Praticante
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#B8F34A]/10 text-[#B8F34A] font-bold">
                Ao Vivo
              </span>
            </div>

            {/* Card Renderizado como o Praticante Vê */}
            <div className="sports-card p-6 space-y-5 border-[#B8F34A]/40 shadow-xl shadow-[#B8F34A]/5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {providerDraft.name || 'Nome do Parceiro'}
                    </h3>
                    {providerDraft.crefOrCrn && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#B8F34A]/20 text-[#B8F34A] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verificado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B8F34A]" /> {providerDraft.city || 'Cidade'}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0 (Novo)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121A18] border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-[#B8F34A] uppercase tracking-wider block">
                  Serviço Principal na Jornada
                </span>
                <h4 className="text-sm font-bold text-white">
                  {providerDraft.serviceTitle || 'Título do seu serviço'}
                </h4>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {providerDraft.serviceDuration} min
                  </span>
                  <strong className="text-white text-sm">
                    R$ {providerDraft.servicePrice},00
                  </strong>
                </div>
              </div>

              {providerDraft.crefOrCrn && (
                <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8F34A]" />
                  <span>Documento verificado: <strong>{providerDraft.crefOrCrn}</strong></span>
                </div>
              )}

              <button
                type="button"
                onClick={() => showToast('Perfil publicado no catálogo com sucesso!')}
                className="w-full py-3 rounded-xl bg-[#B8F34A] text-[#0B0F0E] font-black text-xs hover:bg-[#a6e03c] transition-all shadow-md shadow-[#B8F34A]/20 cursor-pointer"
              >
                Publicar Oferta na Plataforma
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
