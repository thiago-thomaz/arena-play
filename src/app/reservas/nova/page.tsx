'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Booking } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  QrCode,
  DollarSign,
  ArrowRight,
  Lock,
} from 'lucide-react';

export default function NovaReservaPage() {
  const router = useRouter();
  const { venues, services, equipments, activePersona, addBooking, showToast } = useApp();

  // Seleções
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(venues[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('Sexta, 24 de Outubro');
  const [selectedTime, setSelectedTime] = useState<string>('18:00 - 19:00');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(services[0]?.id || '');
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(['eq-1']);
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT_CARD'>('PIX');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const selectedSpace = venues.find((v) => v.id === selectedSpaceId) || venues[0];
  const selectedTrainer = services.find((s) => s.id === selectedTrainerId);

  // Cálculos de split financeiro
  const courtPrice = selectedSpace?.hourlyPrice || 140;
  const trainerPrice = selectedTrainer?.price || 0;
  const equipmentTotal = selectedEquipments.reduce((acc, eqId) => {
    const eq = equipments.find((e) => e.id === eqId);
    return acc + (eq?.rentalPrice || 0);
  }, 0);
  const totalAmount = courtPrice + trainerPrice + equipmentTotal;

  const toggleEquipment = (id: string) => {
    if (selectedEquipments.includes(id)) {
      setSelectedEquipments(selectedEquipments.filter((e) => e !== id));
    } else {
      setSelectedEquipments([...selectedEquipments, id]);
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newBookingId = `book-${Math.floor(1000 + Math.random() * 9000)}`;

      const newBooking: Booking = {
        id: newBookingId,
        userId: activePersona.id,
        userName: activePersona.name,
        sportName: selectedSpace.sportId === 'beach_tennis' ? 'Beach Tennis' : selectedSpace.venueName,
        modalityName: 'Orquestração Integrada',
        date: selectedDate,
        timeSlot: selectedTime,
        venueSpaceId: selectedSpace.id,
        venueName: selectedSpace.venueName,
        courtName: selectedSpace.name,
        courtPrice,
        items: selectedTrainer
          ? [
              {
                id: `bitem-${Date.now()}`,
                providerId: selectedTrainer.providerId,
                providerName: selectedTrainer.providerName,
                role: 'Treinador Técnico',
                serviceId: selectedTrainer.id,
                serviceName: selectedTrainer.name,
                price: selectedTrainer.price,
                confirmationStatus: 'CONFIRMED',
                deadlineMinutes: 30,
              },
            ]
          : [],
        equipmentItems: selectedEquipments.map((eqId) => {
          const eq = equipments.find((e) => e.id === eqId);
          return {
            equipmentId: eqId,
            name: eq?.name || 'Equipamento',
            price: eq?.rentalPrice || 0,
          };
        }),
        totalAmount,
        status: 'CONFIRMED',
        paymentMethod,
        paymentId: `${paymentMethod.toLowerCase()}_${Date.now()}`,
        createdAt: new Date().toISOString(),
        timeline: [
          {
            step: `Pagamento ${paymentMethod} Aprovado`,
            description: `Valor total de R$ ${totalAmount},00 liquidado instantaneamente.`,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: 'DONE',
          },
          {
            step: 'Reserva da Quadra Garantida',
            description: `${selectedSpace.name} travada no sistema da arena (Sem risco de double-booking).`,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: 'DONE',
          },
          {
            step: 'Confirmação do Treinador',
            description: selectedTrainer
              ? `${selectedTrainer.providerName} confirmou presença para a sessão.`
              : 'Sem treinador contratado para este slot.',
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: 'DONE',
          },
        ],
      };

      addBooking(newBooking);
      setIsProcessing(false);
      router.push('/reservas');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Orquestração de Agendamento
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white">
          Reservar Quadra + Treinador + Equipamento
        </h1>
        <p className="text-xs md:text-sm text-gray-400">
          Monte uma sessão completa em um único checkout com split de pagamento e confirmação automatizada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Seleção (2 Colunas) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Escolha do Espaço / Quadra */}
          <div className="sports-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B8F34A]" /> 1. Escolha a Quadra / Espaço
            </h2>

            <div className="space-y-3">
              {venues.map((space) => {
                const isSelected = selectedSpaceId === space.id;
                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => setSelectedSpaceId(space.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                      isSelected
                        ? 'bg-[#16221F] border-[#B8F34A] shadow-md shadow-[#B8F34A]/10'
                        : 'bg-[#121A18] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{space.name}</span>
                        <span className="text-[10px] text-[#B8F34A] font-semibold bg-[#B8F34A]/10 px-2 py-0.5 rounded">
                          ★ {space.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{space.venueName} · {space.surface}</p>
                      <p className="text-[11px] text-gray-500 mt-1">{space.address}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <strong className="text-sm text-white block">R$ {space.hourlyPrice}/h</strong>
                      {space.covered && (
                        <span className="text-[10px] text-gray-400">Coberta</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Data e Horário com Hold de Proteção (Item 60) */}
          <div className="sports-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B8F34A]" /> 2. Data e Horário
              </h2>
              <span className="text-[10px] text-[#B8F34A] flex items-center gap-1 font-bold bg-[#B8F34A]/10 px-2.5 py-0.5 rounded-full border border-[#B8F34A]/20">
                <Lock className="w-3 h-3" /> Hold de 10 min ativo
              </span>
            </div>

            {/* Recorrência */}
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="recurrence"
                  checked={!isRecurring}
                  onChange={() => setIsRecurring(false)}
                  className="accent-[#B8F34A]"
                />
                Reserva Única
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="recurrence"
                  checked={isRecurring}
                  onChange={() => setIsRecurring(true)}
                  className="accent-[#B8F34A]"
                />
                Recorrente (Semanal)
              </label>
            </div>

            {/* Horários disponíveis */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {['17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'].map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      isSelected
                        ? 'bg-[#B8F34A] text-[#0B0F0E] border-[#B8F34A]'
                        : 'bg-[#121A18] text-gray-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Seleção de Treinador Sincronizado */}
          <div className="sports-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8F34A]" /> 3. Treinadores Disponíveis neste Horário
            </h2>

            <div className="space-y-2.5">
              {services.map((srv) => {
                const isSelected = selectedTrainerId === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedTrainerId(srv.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#16221F] border-[#B8F34A]'
                        : 'bg-[#121A18] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{srv.providerName}</span>
                        <span className="text-[10px] text-[#B8F34A] font-semibold bg-[#B8F34A]/10 px-1.5 py-0.2 rounded">
                          ★ {srv.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{srv.name}</p>
                    </div>
                    <strong className="text-xs text-white shrink-0">R$ {srv.price}</strong>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Equipamentos Adicionais */}
          <div className="sports-card p-6 space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              4. Equipamento Opcional para Aluguel
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {equipments.map((eq) => {
                const isSelected = selectedEquipments.includes(eq.id);
                return (
                  <button
                    key={eq.id}
                    type="button"
                    onClick={() => toggleEquipment(eq.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'bg-[#B8F34A]/15 border-[#B8F34A] text-white'
                        : 'bg-[#121A18] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="font-semibold">{eq.name}</span>
                    <strong className="text-white">+ R$ {eq.rentalPrice}</strong>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resumo do Checkout & Split (1 Coluna) */}
        <div className="space-y-6">
          <div className="sports-card p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
              Resumo da Orquestração
            </h3>

            {/* Itens do Split */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Quadra ({selectedSpace.name})</span>
                <strong className="text-white">R$ {courtPrice},00</strong>
              </div>

              {selectedTrainer && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Treinador ({selectedTrainer.providerName})</span>
                  <strong className="text-white">R$ {trainerPrice},00</strong>
                </div>
              )}

              {equipmentTotal > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Equipamento alugado</span>
                  <strong className="text-white">R$ {equipmentTotal},00</strong>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Total</span>
                <span className="text-xl font-black text-[#B8F34A]">
                  R$ {totalAmount},00
                </span>
              </div>
            </div>

            {/* Método de Pagamento (Item 61) */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-gray-300 block">
                Forma de Pagamento
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('PIX')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    paymentMethod === 'PIX'
                      ? 'bg-[#B8F34A] text-[#0B0F0E] border-[#B8F34A]'
                      : 'bg-[#121A18] text-gray-300 border-white/10'
                  }`}
                >
                  <QrCode className="w-4 h-4" /> Pix Instantâneo
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CREDIT_CARD')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    paymentMethod === 'CREDIT_CARD'
                      ? 'bg-[#B8F34A] text-[#0B0F0E] border-[#B8F34A]'
                      : 'bg-[#121A18] text-gray-300 border-white/10'
                  }`}
                >
                  <CreditCard className="w-4 h-4" /> Cartão
                </button>
              </div>
            </div>

            {/* Botão de Finalização */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#B8F34A] to-[#88C61D] text-[#0B0F0E] font-black text-xs hover:brightness-105 transition-all shadow-xl shadow-[#B8F34A]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Liquidando e Orquestrando...</span>
              ) : (
                <>
                  <span>Pagar e Iniciar Orquestração</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              Garantia de segurança: Em caso de recusa por qualquer profissional, o reembolso é imediato ou você pode escolher outro especialista com 1 clique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
