'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { BookingStatus } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  DollarSign,
  UserCheck,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export default function ReservasPage() {
  const { bookings, updateBookingStatus, showToast } = useApp();
  const [selectedBookingId, setSelectedBookingId] = useState<string>(bookings[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'CONFIRMED') return b.status === 'CONFIRMED';
    if (filterStatus === 'PENDING') return b.status === 'AWAITING_CONFIRMATION' || b.status === 'PAYMENT_PENDING';
    if (filterStatus === 'DECLINED') return b.status === 'DECLINED' || b.status === 'CANCELED';
    return true;
  });

  // Simulação de eventos do motor de orquestração (Itens 63 a 67)
  const handleSimulateConfirmation = () => {
    if (!selectedBooking) return;
    updateBookingStatus(
      selectedBooking.id,
      'CONFIRMED',
      'Treinador e Quadra aceitaram o agendamento'
    );
    showToast('Reserva confirmada por todos os providers com sucesso!');
  };

  const handleSimulateDecline = () => {
    if (!selectedBooking) return;
    updateBookingStatus(
      selectedBooking.id,
      'DECLINED',
      'Treinador indisponível neste horário'
    );
    showToast('Alerta: O treinador recusou este slot. Alternativas geradas abaixo.');
  };

  const handleSimulateRefund = () => {
    if (!selectedBooking) return;
    updateBookingStatus(
      selectedBooking.id,
      'REFUNDED',
      'Reembolso integral liquidado na chave Pix'
    );
    showToast('Reembolso de 100% processado com sucesso.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="sports-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8F34A] bg-[#B8F34A]/10 px-2.5 py-0.5 rounded-full border border-[#B8F34A]/20 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Central de Reservas Orquestradas
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Minhas Reservas & Agendamentos
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xl">
            Acompanhe o status multi-provider de quadra, treinador e equipamento em tempo real com garantia de não haver double-booking.
          </p>
        </div>

        <Link
          href="/reservas/nova"
          className="px-5 py-3 rounded-2xl bg-[#B8F34A] text-[#0B0F0E] font-black text-xs hover:bg-[#a6e03c] transition-all flex items-center gap-2 shadow-lg shadow-[#B8F34A]/20 shrink-0"
        >
          <Sparkles className="w-4 h-4" /> Fazer Nova Reserva Orquestrada
        </Link>
      </div>

      {/* Grid: Lista à Esquerda | Detalhes & Timeline à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Esquerda: Filtro e Lista */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
              Histórico ({filteredBookings.length})
            </h2>

            {/* Filtros */}
            <div className="flex items-center gap-1 bg-[#121A18] p-1 rounded-xl border border-white/5 text-[11px]">
              <button
                onClick={() => setFilterStatus('ALL')}
                className={`px-2 py-1 rounded-lg font-bold ${
                  filterStatus === 'ALL' ? 'bg-white/10 text-white' : 'text-gray-400'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterStatus('CONFIRMED')}
                className={`px-2 py-1 rounded-lg font-bold ${
                  filterStatus === 'CONFIRMED' ? 'bg-[#B8F34A] text-[#0B0F0E]' : 'text-gray-400'
                }`}
              >
                Confirmadas
              </button>
              <button
                onClick={() => setFilterStatus('PENDING')}
                className={`px-2 py-1 rounded-lg font-bold ${
                  filterStatus === 'PENDING' ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400'
                }`}
              >
                Pendentes
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredBookings.map((b) => {
              const isSelected = b.id === selectedBooking?.id;

              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBookingId(b.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-[#16221F] border-[#B8F34A] shadow-lg shadow-[#B8F34A]/10'
                      : 'bg-[#121A18] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {b.sportName} · {b.venueName}
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-black ${
                        b.status === 'CONFIRMED'
                          ? 'bg-[#B8F34A]/20 text-[#B8F34A]'
                          : b.status === 'AWAITING_CONFIRMATION'
                          ? 'bg-amber-500/20 text-amber-400'
                          : b.status === 'DECLINED'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 mt-1 font-semibold">
                    {b.date} · {b.timeSlot}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px] text-gray-400">
                    <span>
                      {b.items.length + (b.venueSpaceId ? 1 : 0)} serviços orquestrados
                    </span>
                    <strong className="text-white">R$ {b.totalAmount}</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita: Detalhes, Split Financeiro e Timeline de Confirmação */}
        {selectedBooking ? (
          <div className="lg:col-span-2 space-y-6">
            <div className="sports-card p-6 md:p-8 space-y-6">
              {/* Header do Detalhe */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Identificador: #{selectedBooking.id} · {selectedBooking.sportName}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {selectedBooking.venueName}
                  </h3>
                  <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B8F34A]" />
                    {selectedBooking.courtName} · {selectedBooking.date} das {selectedBooking.timeSlot}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-gray-400 block">Total Orquestrado</span>
                  <span className="text-2xl font-black text-[#B8F34A]">
                    R$ {selectedBooking.totalAmount},00
                  </span>
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    Pago via {selectedBooking.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Status do Orquestrador (Item 63 a 66) */}
              {selectedBooking.status === 'DECLINED' && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Seu treinador não pôde aceitar este horário</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    O sistema de resiliência de jornada mantém sua quadra segura e oferece opções inteligentes sem necessidade de recomeçar do zero:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'CONFIRMED', 'Novo treinador alocado com sucesso');
                        showToast('Prof. Renata Vasconcelos alocada para o mesmo horário!');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#B8F34A] text-[#0B0F0E] text-xs font-bold hover:bg-[#a6e03c]"
                    >
                      Escolher outro treinador disponível
                    </button>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'CONFIRMED', 'Horário alterado para sábado 10:00');
                        showToast('Horário ajustado para sábado às 10:00!');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
                    >
                      Alterar para próximo slot livre
                    </button>
                    <button
                      onClick={handleSimulateRefund}
                      className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/30"
                    >
                      Cancelar e Reembolsar Pix
                    </button>
                  </div>
                </div>
              )}

              {/* Itens Orquestrados na Reserva & Split (Item 55, 62) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Componentes Contratados nesta Reserva
                </h4>

                <div className="space-y-2">
                  {/* Quadra */}
                  {selectedBooking.courtName && (
                    <div className="p-3.5 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B8F34A] block">
                          Espaço / Quadra
                        </span>
                        <strong className="text-white">{selectedBooking.courtName}</strong>
                        <p className="text-[11px] text-gray-400">{selectedBooking.venueName}</p>
                      </div>
                      <div className="text-right">
                        <strong className="text-white block">R$ {selectedBooking.courtPrice},00</strong>
                        <span className="text-[10px] text-[#B8F34A] font-bold">Confirmado</span>
                      </div>
                    </div>
                  )}

                  {/* Profissionais */}
                  {selectedBooking.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B8F34A] block">
                          Profissional: {item.role}
                        </span>
                        <strong className="text-white">{item.providerName}</strong>
                        <p className="text-[11px] text-gray-400">{item.serviceName}</p>
                      </div>
                      <div className="text-right">
                        <strong className="text-white block">R$ {item.price},00</strong>
                        <span
                          className={`text-[10px] font-bold ${
                            item.confirmationStatus === 'CONFIRMED'
                              ? 'text-[#B8F34A]'
                              : item.confirmationStatus === 'DECLINED'
                              ? 'text-red-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {item.confirmationStatus === 'CONFIRMED' ? 'Confirmado' : 'Aguardando'}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Equipamentos */}
                  {selectedBooking.equipmentItems?.map((eq) => (
                    <div
                      key={eq.equipmentId}
                      className="p-3.5 rounded-xl bg-[#121A18] border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">
                          Equipamento
                        </span>
                        <strong className="text-white">{eq.name}</strong>
                      </div>
                      <strong className="text-white">R$ {eq.price},00</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* TIMELINE DE CONFIRMAÇÃO EM TEMPO REAL (Item 130 da especificação) */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B8F34A]" />
                    Linha do Tempo da Orquestração
                  </h4>
                  <span className="text-[11px] text-gray-400">Tempo limite de confirmação: 30 min</span>
                </div>

                <div className="space-y-3">
                  {selectedBooking.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          step.status === 'DONE'
                            ? 'bg-[#B8F34A] text-[#0B0F0E]'
                            : step.status === 'ERROR'
                            ? 'bg-red-500 text-white'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {step.status === 'DONE' ? '✓' : step.status === 'ERROR' ? '✕' : '◷'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-white">{step.step}</strong>
                          <span className="text-[10px] text-gray-400">{step.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simuladores de Estado para Demonstração (Itens 188 e 191) */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Simulador de Eventos do Gateway & Provider (Demonstração do Ciclo)
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleSimulateConfirmation}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10"
                  >
                    Simular Aprovação Geral
                  </button>
                  <button
                    onClick={handleSimulateDecline}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/20"
                  >
                    Simular Recusa do Treinador (Gera Alternativa)
                  </button>
                  <button
                    onClick={handleSimulateRefund}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20"
                  >
                    Simular Reembolso Pix
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 sports-card p-12 text-center text-gray-400">
            Nenhuma reserva encontrada com os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
}
