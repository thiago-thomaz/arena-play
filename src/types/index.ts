// Tipos e Entidades Centrais do Sistema Operacional da Jornada Esportiva

export type Track = 'CASUAL' | 'APRENDIZ' | 'COMPETIDOR' | 'PROFISSIONAL';

export type SportLevel = 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO' | 'ELITE';

export type JourneyGoal = 
  | 'praticar' 
  | 'evoluir_tecnica' 
  | 'condicionamento' 
  | 'competicao' 
  | 'alta_performance';

export type JourneyStage = 
  | 'DESCOBERTA'
  | 'FUNDACAO'
  | 'DESENVOLVIMENTO'
  | 'PERFORMANCE'
  | 'PREPARACAO'
  | 'COMPETICAO'
  | 'RECUPERACAO'
  | 'EVOLUCAO';

export type ComponentPriority = 'ESSENCIAL' | 'RECOMENDADO' | 'OPCIONAL' | 'AVANCADO';

export type ComponentCategory = 
  | 'COURT' 
  | 'COACH' 
  | 'PERFORMANCE' 
  | 'HEALTH' 
  | 'EQUIPMENT' 
  | 'PACKAGE' 
  | 'GROUP' 
  | 'COMPETITION';

export interface JourneyComponent {
  id: string;
  category: ComponentCategory;
  name: string;
  roleOrType: string;
  priority: ComponentPriority;
  stage: JourneyStage;
  rationale: string;
  isFilled: boolean;
  assignedProviderId?: string;
  assignedProviderName?: string;
  estimatedCostMonth?: number;
}

export interface JourneyBlueprint {
  id: string;
  sportId: string;
  sportName: string;
  modalityId: string;
  modalityName: string;
  track: Track;
  goal: JourneyGoal;
  defaultStages: JourneyStage[];
  components: Omit<JourneyComponent, 'isFilled' | 'assignedProviderId' | 'assignedProviderName'>[];
}

export interface UserJourney {
  id: string;
  userId: string;
  sportId: string;
  sportName: string;
  modalityId: string;
  modalityName: string;
  track: Track;
  level: SportLevel;
  goal: JourneyGoal;
  currentStage: JourneyStage;
  city: string;
  components: JourneyComponent[];
  nextSteps: Array<{
    id: string;
    title: string;
    datetime: string;
    providerName: string;
    location: string;
    type: 'training' | 'court' | 'performance' | 'health' | 'tournament';
  }>;
  monthlyEstimate: {
    total: number;
    breakdown: Array<{ category: string; value: number }>;
  };
}

export interface TeamMember {
  role: string;
  category: ComponentCategory;
  name?: string;
  providerId?: string;
  status: 'FILLED' | 'PENDING';
  avatarUrl?: string;
  nextSession?: string;
  rating?: number;
}

export type ProviderType = 'PROFESSIONAL' | 'ORGANIZATION';

export type VerificationStatus = 
  | 'NOT_VERIFIED' 
  | 'UNDER_REVIEW' 
  | 'VERIFIED' 
  | 'EXPIRED' 
  | 'SUSPENDED';

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  providerType: ProviderType;
  category: ComponentCategory;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  sportId: string;
  modalityId: string;
  applicableTracks: Track[];
  rating: number;
  reviewCount: number;
  location: string;
  verified: boolean;
}

export interface VenueSpace {
  id: string;
  venueId: string;
  venueName: string;
  name: string;
  sportId: string;
  modalityId: string;
  surface: string; // Ex: Areia tratada, Saibro, Sintético
  covered: boolean;
  illuminated: boolean;
  hourlyPrice: number;
  photos: string[];
  amenities: string[]; // Vestiário, Bar, Estacionamento
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface Equipment {
  id: string;
  providerId: string;
  name: string;
  category: string;
  sportId: string;
  modalityId: string;
  quantityAvailable: number;
  rentalPrice: number;
  description: string;
  imageUrl?: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  sportId: string;
  track: Track;
  goal: JourneyGoal;
  durationWeeks: number;
  includedServices: Array<{ serviceName: string; providerName: string; sessions: number }>;
  price: number;
  discountPercentage?: number;
  rating: number;
}

export interface CasualGroup {
  id: string;
  title: string;
  sportName: string;
  track: Track;
  level: SportLevel;
  meetingTime: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  pricePerPlayer: number;
}

export interface Tournament {
  id: string;
  title: string;
  sportName: string;
  dateRange: string;
  location: string;
  level: SportLevel;
  prize?: string;
  daysRemaining: number;
}

// RESERVAS E PAGAMENTO ORQUESTRADO
export type BookingStatus = 
  | 'DRAFT'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'AWAITING_CONFIRMATION'
  | 'PARTIALLY_CONFIRMED'
  | 'CONFIRMED'
  | 'DECLINED'
  | 'EXPIRED'
  | 'CANCELED'
  | 'REFUND_PENDING'
  | 'REFUNDED'
  | 'COMPLETED';

export type ProviderConfirmationStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'DECLINED'
  | 'EXPIRED';

export interface BookingProviderItem {
  id: string;
  providerId: string;
  providerName: string;
  role: string;
  serviceId?: string;
  serviceName: string;
  price: number;
  confirmationStatus: ProviderConfirmationStatus;
  confirmedAt?: string;
  declineReason?: string;
  deadlineMinutes: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  sportName: string;
  modalityName: string;
  date: string;
  timeSlot: string; // Ex: '18:00 - 19:00'
  venueSpaceId?: string;
  venueName?: string;
  courtName?: string;
  courtPrice?: number;
  items: BookingProviderItem[];
  equipmentItems?: Array<{ equipmentId: string; name: string; price: number }>;
  totalAmount: number;
  status: BookingStatus;
  paymentMethod: 'PIX' | 'CREDIT_CARD';
  paymentId?: string;
  createdAt: string;
  heldUntil?: string; // Locking temporal para prevenção de double booking
  timeline: Array<{
    step: string;
    description: string;
    timestamp: string;
    status: 'DONE' | 'WAITING' | 'ERROR';
  }>;
}

// DEMO PERSONAS
export interface DemoPersona {
  id: string;
  name: string;
  avatarUrl: string;
  sport: string;
  modality: string;
  track: Track;
  level: SportLevel;
  goal: JourneyGoal;
  description: string;
}
