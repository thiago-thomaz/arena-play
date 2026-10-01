'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DemoPersona,
  UserJourney,
  Booking,
  VenueSpace,
  Service,
  Equipment,
  Package,
  CasualGroup,
  Tournament,
  JourneyBlueprint,
  JourneyComponent,
} from '@/types';
import {
  demoPersonas,
  seedVenues,
  seedServices,
  seedEquipments,
  seedPackages,
  seedGroups,
  seedTournaments,
  initialBookings,
  initialBlueprints,
} from '@/data/seedData';
import { generateUserJourney } from '@/engine/journeyEngine';

interface ProviderOnboardingDraft {
  providerType: 'PROFESSIONAL' | 'ORGANIZATION';
  offeredCategories: string[];
  name: string;
  email: string;
  phone: string;
  city: string;
  sportId: string;
  serviceTitle: string;
  servicePrice: number;
  serviceDuration: number;
  courtName?: string;
  courtPrice?: number;
  crefOrCrn?: string;
  hasAvailabilitySet: boolean;
  completionPercentage: number;
}

interface AppContextType {
  activePersona: DemoPersona;
  setActivePersona: (persona: DemoPersona) => void;
  personas: DemoPersona[];
  userJourney: UserJourney;
  setUserJourney: React.Dispatch<React.SetStateAction<UserJourney>>;
  venues: VenueSpace[];
  services: Service[];
  equipments: Equipment[];
  packages: Package[];
  groups: CasualGroup[];
  tournaments: Tournament[];
  bookings: Booking[];
  blueprints: JourneyBlueprint[];
  updateBlueprint: (updated: JourneyBlueprint) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status'], timelineStep?: string) => void;
  addTeamComponent: (componentId: string, providerName: string, roleOrType: string) => void;
  removeTeamComponent: (componentId: string) => void;
  providerDraft: ProviderOnboardingDraft;
  updateProviderDraft: (partial: Partial<ProviderOnboardingDraft>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activePersona, setActivePersonaState] = useState<DemoPersona>(demoPersonas[0]);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [blueprints, setBlueprints] = useState<JourneyBlueprint[]>(initialBlueprints);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Definir preenchimentos iniciais baseados na persona ativa
  const getInitialFilledRoles = (personaId: string) => {
    if (personaId === 'persona-joao') {
      return ['Quadra', 'Treinador', 'Preparador Físico', 'Fisioterapeuta', 'Equipamento'];
    }
    if (personaId === 'persona-camila') {
      return ['Quadra', 'Treinador', 'Equipamento'];
    }
    // Persona casual
    return ['Quadra', 'Equipamento', 'Grupo'];
  };

  const [userJourney, setUserJourney] = useState<UserJourney>(() => {
    return generateUserJourney({
      userId: demoPersonas[0].id,
      userName: demoPersonas[0].name,
      sportId: 'beach_tennis',
      sportName: demoPersonas[0].sport,
      modalityId: 'beach_tennis_duplas',
      modalityName: demoPersonas[0].modality,
      track: demoPersonas[0].track,
      level: demoPersonas[0].level,
      goal: demoPersonas[0].goal,
      city: 'São Paulo - SP',
      existingFilledRoles: getInitialFilledRoles(demoPersonas[0].id),
    });
  });

  const setActivePersona = (newPersona: DemoPersona) => {
    setActivePersonaState(newPersona);
    const newJourney = generateUserJourney({
      userId: newPersona.id,
      userName: newPersona.name,
      sportId: newPersona.sport.toLowerCase().replace(/\s+/g, '_'),
      sportName: newPersona.sport,
      modalityId: `${newPersona.sport.toLowerCase()}_mod`,
      modalityName: newPersona.modality,
      track: newPersona.track,
      level: newPersona.level,
      goal: newPersona.goal,
      city: 'São Paulo - SP',
      existingFilledRoles: getInitialFilledRoles(newPersona.id),
    });
    setUserJourney(newJourney);
    showToast(`Persona alternada para: ${newPersona.name} (${newPersona.track})`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Reserva #${newBooking.id} iniciada com sucesso!`);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status'], timelineStep?: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        const updatedTimeline = [...b.timeline];
        if (timelineStep) {
          updatedTimeline.push({
            step: timelineStep,
            description: `Atualização de status para ${status}`,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: status === 'DECLINED' || status === 'CANCELED' ? 'ERROR' : 'DONE',
          });
        }
        return {
          ...b,
          status,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const addTeamComponent = (componentId: string, providerName: string, roleOrType: string) => {
    setUserJourney(prev => {
      const updated = prev.components.map(comp => {
        if (comp.id === componentId || comp.roleOrType === roleOrType) {
          return {
            ...comp,
            isFilled: true,
            assignedProviderName: providerName,
          };
        }
        return comp;
      });
      return {
        ...prev,
        components: updated,
      };
    });
    showToast(`${roleOrType} adicionado ao seu time!`);
  };

  const removeTeamComponent = (componentId: string) => {
    setUserJourney(prev => {
      const updated = prev.components.map(comp => {
        if (comp.id === componentId) {
          return {
            ...comp,
            isFilled: false,
            assignedProviderName: undefined,
          };
        }
        return comp;
      });
      return {
        ...prev,
        components: updated,
      };
    });
    showToast('Componente desvinculado do seu time.');
  };

  const updateBlueprint = (updated: JourneyBlueprint) => {
    setBlueprints(prev => prev.map(b => (b.id === updated.id ? updated : b)));
    showToast('Blueprint de jornada atualizado no admin.');
  };

  // Provider Onboarding Draft com autosave
  const [providerDraft, setProviderDraft] = useState<ProviderOnboardingDraft>({
    providerType: 'PROFESSIONAL',
    offeredCategories: ['COACH'],
    name: 'Carlos Oliveira',
    email: 'carlos.pro@sports.com',
    phone: '(11) 98877-6655',
    city: 'São Paulo - SP',
    sportId: 'beach_tennis',
    serviceTitle: 'Treino Tático Avançado',
    servicePrice: 150,
    serviceDuration: 60,
    courtName: '',
    courtPrice: 0,
    crefOrCrn: 'CREF 034912-G/SP',
    hasAvailabilitySet: true,
    completionPercentage: 75,
  });

  const updateProviderDraft = (partial: Partial<ProviderOnboardingDraft>) => {
    setProviderDraft(prev => {
      const next = { ...prev, ...partial };
      // Calcular percentual de completude
      let points = 0;
      if (next.name) points += 15;
      if (next.email && next.phone) points += 15;
      if (next.offeredCategories.length > 0) points += 20;
      if (next.serviceTitle && next.servicePrice > 0) points += 25;
      if (next.crefOrCrn) points += 15;
      if (next.hasAvailabilitySet) points += 10;
      next.completionPercentage = Math.min(100, points);
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        activePersona,
        setActivePersona,
        personas: demoPersonas,
        userJourney,
        setUserJourney,
        venues: seedVenues,
        services: seedServices,
        equipments: seedEquipments,
        packages: seedPackages,
        groups: seedGroups,
        tournaments: seedTournaments,
        bookings,
        blueprints,
        updateBlueprint,
        addBooking,
        updateBookingStatus,
        addTeamComponent,
        removeTeamComponent,
        providerDraft,
        updateProviderDraft,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
