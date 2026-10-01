'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { generateUserJourney } from '@/engine/journeyEngine';
import { Track, SportLevel, JourneyGoal } from '@/types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trophy,
  Dumbbell,
  Target,
  Flame,
  Activity,
  Layers,
} from 'lucide-react';

export default function JourneyBuilderPage() {
  const router = useRouter();
  const { activePersona, setUserJourney, showToast } = useApp();

  const [step, setStep] = useState<number>(1);

  // Estados do formulário agrupado
  const [selectedSport, setSelectedSport] = useState<string>('Beach Tennis');
  const [selectedModality, setSelectedModality] = useState<string>('Duplas Competitivo');
  const [selectedTrack, setSelectedTrack] = useState<Track>('PROFISSIONAL');
  const [selectedLevel, setSelectedLevel] = useState<SportLevel>('AVANCADO');
  const [selectedGoal, setSelectedGoal] = useState<JourneyGoal>('competicao');
  const [frequency, setFrequency] = useState<string>('3 a 4x por semana');
  const [city, setCity] = useState<string>('São Paulo - SP');
  const [existingItems, setExistingItems] = useState<string[]>([
    'Quadra',
    'Treinador',
  ]);

  const sportsOptions = [
    { id: 'bt', name: 'Beach Tennis', icon: '🎾' },
    { id: 'tenis', name: 'Tênis', icon: '🎾' },
    { id: 'futevolei', name: 'Futevôlei', icon: '⚽' },
    { id: 'padel', name: 'Padel', icon: '🏓' },
    { id: 'futebol', name: 'Futebol Society', icon: '⚽' },
    { id: 'corrida', name: 'Corrida & Atletismo', icon: '🏃' },
  ];

  const tracksConfig: Array<{ track: Track; title: string; subtitle: string; icon: any }> = [
    {
      track: 'CASUAL',
      title: 'Casual',
      subtitle: 'Quero praticar por diversão, saúde e social com amigos.',
      icon: Activity,
    },
    {
      track: 'APRENDIZ',
      title: 'Aprendiz',
      subtitle: 'Quero evoluir minha técnica, aprender fundamentos e ter constância.',
      icon: Dumbbell,
    },
    {
      track: 'COMPETIDOR',
      title: 'Competidor',
      subtitle: 'Quero disputar torneios amadores, ligas locais e subir de categoria.',
      icon: Target,
    },
    {
      track: 'PROFISSIONAL',
      title: 'Profissional',
      subtitle: 'Quero maximizar minha performance com suporte multidisciplinar completo.',
      icon: Flame,
    },
  ];

  const toggleExistingItem = (item: string) => {
    if (existingItems.includes(item)) {
      setExistingItems(existingItems.filter((i) => i !== item));
    } else {
      setExistingItems([...existingItems, item]);
    }
  };

  const handleFinish = () => {
    const newJourney = generateUserJourney({
      userId: activePersona.id,
      userName: activePersona.name,
      sportId: selectedSport.toLowerCase().replace(/\s+/g, '_'),
      sportName: selectedSport,
      modalityId: `${selectedSport.toLowerCase()}_mod`,
      modalityName: selectedModality,
      track: selectedTrack,
      level: selectedLevel,
      goal: selectedGoal,
      city,
      existingFilledRoles: existingItems,
    });

    setUserJourney(newJourney);
    showToast('Nova jornada esportiva configurada e calculada!');
    router.push('/app/jornada');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B8F34A] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Journey Builder
        </span>
        <h1 className="text-3xl font-black text-white">Montar Minha Jornada Esportiva</h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Diga onde você está e onde deseja chegar. O sistema organiza os recursos e profissionais ideais para o seu momento.
        </p>

        {/* Mini progress steps */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-10 bg-[#B8F34A]'
                  : s < step
                  ? 'w-6 bg-[#88C61D]'
                  : 'w-6 bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo do Step */}
      <div className="sports-card p-6 md:p-8 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-lg font-bold text-white">1. Qual é o seu esporte e modalidade?</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Selecione o esporte base e a sua cidade de atuação.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sportsOptions.map((sp) => {
                const isSelected = selectedSport === sp.name;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setSelectedSport(sp.name)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#B8F34A]/15 border-[#B8F34A] text-white shadow-lg shadow-[#B8F34A]/10'
                        : 'bg-[#121A18] border-white/10 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl block mb-2">{sp.icon}</span>
                    <span className="text-sm font-bold block">{sp.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Modalidade / Formato
                </label>
                <input
                  type="text"
                  value={selectedModality}
                  onChange={(e) => setSelectedModality(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-sm focus:border-[#B8F34A] focus:outline-none"
                  placeholder="Ex: Duplas, Simples, 3x3..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Cidade de Prática
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-sm focus:border-[#B8F34A] focus:outline-none"
                  placeholder="Ex: São Paulo - SP"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-lg font-bold text-white">2. Qual é a sua Trilha e Objetivo?</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                A trilha define a intensidade e as categorias de serviços da sua jornada.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tracksConfig.map((t) => {
                const isSelected = selectedTrack === t.track;
                const Icon = t.icon;
                return (
                  <button
                    key={t.track}
                    type="button"
                    onClick={() => setSelectedTrack(t.track)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#B8F34A]/15 border-[#B8F34A] text-white shadow-lg shadow-[#B8F34A]/10'
                        : 'bg-[#121A18] border-white/10 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-[#B8F34A] text-[#0B0F0E]' : 'bg-white/10 text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold">{t.title}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#B8F34A]" />}
                    </div>
                    <p className="text-xs text-gray-400 leading-snug">{t.subtitle}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Seu Nível Atual
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as SportLevel)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-sm focus:border-[#B8F34A] focus:outline-none"
                >
                  <option value="INICIANTE">Iniciante</option>
                  <option value="INTERMEDIARIO">Intermediário</option>
                  <option value="AVANCADO">Avançado</option>
                  <option value="ELITE">Elite / Pro</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  Objetivo Principal
                </label>
                <select
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value as JourneyGoal)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A18] border border-white/10 text-white text-sm focus:border-[#B8F34A] focus:outline-none"
                >
                  <option value="praticar">Apenas praticar / Lazer</option>
                  <option value="evoluir_tecnica">Evolução Técnica</option>
                  <option value="condicionamento">Condicionamento Físico</option>
                  <option value="competicao">Competir em Torneios</option>
                  <option value="alta_performance">Alta Performance Nacional</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-lg font-bold text-white">3. O que você já possui?</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Marque o que já faz parte da sua rotina para gerarmos a Análise de Lacunas precisa.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Quadra', label: 'Quadra / Arena fixa' },
                { name: 'Treinador', label: 'Treinador Técnico' },
                { name: 'Preparador Físico', label: 'Preparador Físico' },
                { name: 'Fisioterapeuta', label: 'Fisioterapeuta' },
                { name: 'Nutricionista', label: 'Nutricionista Esportivo' },
                { name: 'Equipamento', label: 'Equipamento Próprio' },
              ].map((item) => {
                const isSelected = existingItems.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleExistingItem(item.name)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#B8F34A]/15 border-[#B8F34A] text-white'
                        : 'bg-[#121A18] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold">{item.label}</span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isSelected ? 'bg-[#B8F34A] text-[#0B0F0E] font-bold' : 'border border-gray-600'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-[#121A18] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-gray-300 block">
                Frequência Semanal Desejada
              </span>
              <div className="flex flex-wrap gap-2">
                {['1 a 2x por semana', '3 a 4x por semana', '5+ dias por semana'].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                      frequency === freq
                        ? 'bg-[#B8F34A] text-[#0B0F0E] border-[#B8F34A]'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-black hover:bg-[#a6e03c] transition-all shadow-lg shadow-[#B8F34A]/20"
            >
              Próximo passo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B8F34A] to-[#88C61D] text-[#0B0F0E] text-xs font-black hover:brightness-105 transition-all shadow-xl shadow-[#B8F34A]/30"
            >
              <Sparkles className="w-4 h-4" /> Gerar Minha Jornada
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
