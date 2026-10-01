import {
  Track,
  SportLevel,
  JourneyGoal,
  JourneyStage,
  JourneyComponent,
  UserJourney,
} from '@/types';

export interface JourneyEvaluationInput {
  userId: string;
  userName: string;
  sportId: string;
  sportName: string;
  modalityId: string;
  modalityName: string;
  track: Track;
  level: SportLevel;
  goal: JourneyGoal;
  city: string;
  existingFilledRoles?: string[]; // Ex: ['Treinador', 'Fisioterapeuta', 'Quadra']
}

export function generateUserJourney(input: JourneyEvaluationInput): UserJourney {
  const {
    userId,
    sportName,
    modalityName,
    track,
    level,
    goal,
    city,
    existingFilledRoles = [],
  } = input;

  // Determinar estágio atual da jornada baseado na trilha e objetivo
  let currentStage: JourneyStage = 'FUNDACAO';
  if (track === 'CASUAL') {
    currentStage = 'DESCOBERTA';
  } else if (track === 'APRENDIZ') {
    currentStage = level === 'INICIANTE' ? 'FUNDACAO' : 'DESENVOLVIMENTO';
  } else if (track === 'COMPETIDOR') {
    currentStage = goal === 'competicao' ? 'PREPARACAO' : 'PERFORMANCE';
  } else if (track === 'PROFISSIONAL') {
    currentStage = 'PREPARACAO';
  }

  // Componentes construídos dinamicamente pelas regras configuráveis da modalidade e trilha
  const components: JourneyComponent[] = [];

  // Regra 1: Quadra / Espaço
  components.push({
    id: 'comp-court',
    category: 'COURT',
    name: `Espaço / Quadra para ${sportName}`,
    roleOrType: 'Quadra',
    priority: 'ESSENCIAL',
    stage: currentStage,
    rationale: 'Local regular para seus treinos e práticas com piso e estrutura adequados.',
    isFilled: existingFilledRoles.includes('Quadra'),
    assignedProviderName: existingFilledRoles.includes('Quadra') ? 'Posto 9 Sand Arena' : undefined,
    estimatedCostMonth: 380,
  });

  // Regra 2: Treinador / Professor
  if (track === 'CASUAL') {
    components.push({
      id: 'comp-coach-casual',
      category: 'COACH',
      name: `Professor de Fundamentos (${sportName})`,
      roleOrType: 'Professor',
      priority: 'OPCIONAL',
      stage: 'FUNDACAO',
      rationale: 'Opcional para quem deseja ajustes pontuais de batida e regras de jogo.',
      isFilled: existingFilledRoles.includes('Professor'),
      estimatedCostMonth: 180,
    });
  } else if (track === 'APRENDIZ') {
    components.push({
      id: 'comp-coach-tech',
      category: 'COACH',
      name: `Treinador Técnico (${sportName})`,
      roleOrType: 'Treinador',
      priority: 'ESSENCIAL',
      stage: 'DESENVOLVIMENTO',
      rationale: 'Fundamental para sua evolução técnica, correção postural e consistência.',
      isFilled: existingFilledRoles.includes('Treinador'),
      assignedProviderName: existingFilledRoles.includes('Treinador') ? 'Prof. João Silva (CREF 12934-SP)' : undefined,
      estimatedCostMonth: 600,
    });
  } else if (track === 'COMPETIDOR' || track === 'PROFISSIONAL') {
    components.push({
      id: 'comp-coach-pro',
      category: 'COACH',
      name: `Treinador de Alto Rendimento (${sportName})`,
      roleOrType: 'Treinador',
      priority: 'ESSENCIAL',
      stage: 'PREPARACAO',
      rationale: 'Especialista em táticas competitivas, rotina de jogos e estratégia de pontos.',
      isFilled: existingFilledRoles.includes('Treinador'),
      assignedProviderName: existingFilledRoles.includes('Treinador') ? 'Prof. João Silva (CREF 12934-SP)' : undefined,
      estimatedCostMonth: 800,
    });
  }

  // Regra 3: Preparação Física / Performance
  if (track === 'COMPETIDOR' || track === 'PROFISSIONAL') {
    components.push({
      id: 'comp-perf',
      category: 'PERFORMANCE',
      name: 'Preparador Físico Esportivo',
      roleOrType: 'Preparador Físico',
      priority: track === 'PROFISSIONAL' ? 'ESSENCIAL' : 'RECOMENDADO',
      stage: 'PERFORMANCE',
      rationale: 'Potência, deslocamento na areia/quadra e resistência cardiorrespiratória específica.',
      isFilled: existingFilledRoles.includes('Preparador Físico'),
      assignedProviderName: existingFilledRoles.includes('Preparador Físico') ? 'Carlos Souza (Preparador Pro)' : undefined,
      estimatedCostMonth: 450,
    });
  }

  // Regra 4: Fisioterapia / Prevenção de lesões
  if (track === 'COMPETIDOR' || track === 'PROFISSIONAL') {
    components.push({
      id: 'comp-physio',
      category: 'HEALTH',
      name: 'Fisioterapia Esportiva & Recovery',
      roleOrType: 'Fisioterapeuta',
      priority: 'RECOMENDADO',
      stage: 'PREPARACAO',
      rationale: 'Prevenção de sobrecargas articulares e protocolo de recuperação muscular pós-treino intenso.',
      isFilled: existingFilledRoles.includes('Fisioterapeuta'),
      assignedProviderName: existingFilledRoles.includes('Fisioterapeuta') ? 'Dr. Pedro Rocha (CREFITO 44821)' : undefined,
      estimatedCostMonth: 350,
    });
  }

  // Regra 5: Nutrição Esportiva (Saúde)
  if (track === 'COMPETIDOR' || track === 'PROFISSIONAL') {
    components.push({
      id: 'comp-nutri',
      category: 'HEALTH',
      name: 'Nutrição Esportiva de Rendimento',
      roleOrType: 'Nutricionista',
      priority: 'RECOMENDADO',
      stage: 'PREPARACAO',
      rationale: 'Recomendado para sua jornada porque você está em fase de preparação para competir em torneios.',
      isFilled: existingFilledRoles.includes('Nutricionista'),
      assignedProviderName: existingFilledRoles.includes('Nutricionista') ? 'Mariana Lima (CRN-3 39201)' : undefined,
      estimatedCostMonth: 250,
    });
  }

  // Regra 6: Psicologia do Esporte (Alta Performance)
  if (track === 'PROFISSIONAL') {
    components.push({
      id: 'comp-psic',
      category: 'HEALTH',
      name: 'Psicologia Esportiva',
      roleOrType: 'Psicólogo do Esporte',
      priority: 'AVANCADO',
      stage: 'COMPETICAO',
      rationale: 'Gestão de ansiedade pré-torneio, foco e resiliência em momentos decisivos de jogo.',
      isFilled: existingFilledRoles.includes('Psicólogo do Esporte'),
      estimatedCostMonth: 300,
    });
  }

  // Regra 7: Equipamentos
  components.push({
    id: 'comp-gear',
    category: 'EQUIPMENT',
    name: `Equipamento de ${sportName} (Raquete e Bolas)`,
    roleOrType: 'Equipamento',
    priority: track === 'CASUAL' ? 'OPCIONAL' : 'ESSENCIAL',
    stage: 'FUNDACAO',
    rationale: track === 'CASUAL' ? 'Você pode alugar na arena ou adquirir material próprio.' : 'Material calibrado ao seu nível e peso de impacto.',
    isFilled: existingFilledRoles.includes('Equipamento'),
    assignedProviderName: existingFilledRoles.includes('Equipamento') ? 'Material Próprio (Kevlar Pro)' : undefined,
    estimatedCostMonth: 120,
  });

  // Regra 8: Grupos / Partidas
  if (track === 'CASUAL' || track === 'APRENDIZ') {
    components.push({
      id: 'comp-group',
      category: 'GROUP',
      name: `Grupos de Prática e Jogos Avulsos (${modalityName})`,
      roleOrType: 'Grupo',
      priority: 'ESSENCIAL',
      stage: 'DESCOBERTA',
      rationale: 'Encontre parceiros no seu nível para jogar sem necessidade de fechar uma quadra inteira.',
      isFilled: existingFilledRoles.includes('Grupo'),
      assignedProviderName: existingFilledRoles.includes('Grupo') ? 'Pelada Semanal Futevôlei' : undefined,
      estimatedCostMonth: 160,
    });
  }

  // Próximos passos contextualizados
  const nextSteps = [];
  if (existingFilledRoles.includes('Treinador')) {
    nextSteps.push({
      id: 'ns-1',
      title: `Treino Técnico com Treinador`,
      datetime: 'Amanhã · 18:00',
      providerName: 'Prof. João Silva',
      location: 'Posto 9 Sand Arena - Quadra 2',
      type: 'training' as const,
    });
  }
  if (existingFilledRoles.includes('Preparador Físico')) {
    nextSteps.push({
      id: 'ns-2',
      title: 'Sessão de Preparação Física Específica',
      datetime: 'Quinta-feira · 07:30',
      providerName: 'Carlos Souza',
      location: 'Centro de Performance Sand Club',
      type: 'performance' as const,
    });
  }
  if (track === 'COMPETIDOR' || track === 'PROFISSIONAL') {
    nextSteps.push({
      id: 'ns-3',
      title: `Torneio Circuito Paulista de ${sportName}`,
      datetime: 'Em 21 dias · Sábado 08:00',
      providerName: 'Federação / Arena Prime',
      location: 'Complexo Esportivo Morumbi',
      type: 'tournament' as const,
    });
  } else {
    nextSteps.push({
      id: 'ns-4',
      title: `Partida Aberta com Amigos`,
      datetime: 'Sábado · 10:00',
      providerName: 'Arena Central',
      location: 'Quadra Areia 1',
      type: 'court' as const,
    });
  }

  // Estimativa financeira
  const breakdown = components
    .filter(c => c.priority === 'ESSENCIAL' || c.priority === 'RECOMENDADO')
    .map(c => ({
      category: c.roleOrType,
      value: c.estimatedCostMonth || 0,
    }));

  const total = breakdown.reduce((acc, curr) => acc + curr.value, 0);

  return {
    id: `journey-${userId}`,
    userId,
    sportId: input.sportId,
    sportName,
    modalityId: input.modalityId,
    modalityName,
    track,
    level,
    goal,
    currentStage,
    city,
    components,
    nextSteps,
    monthlyEstimate: {
      total,
      breakdown,
    },
  };
}

// Análise de Lacunas (Gap Analysis)
export interface JourneyGapAnalysis {
  alreadyHave: JourneyComponent[];
  toAddRecommended: JourneyComponent[];
  toAddOptional: JourneyComponent[];
  completionPercentage: number;
}

export function performJourneyGapAnalysis(journey: UserJourney): JourneyGapAnalysis {
  const alreadyHave = journey.components.filter(c => c.isFilled);
  const toAddRecommended = journey.components.filter(
    c => !c.isFilled && (c.priority === 'ESSENCIAL' || c.priority === 'RECOMENDADO')
  );
  const toAddOptional = journey.components.filter(
    c => !c.isFilled && (c.priority === 'OPCIONAL' || c.priority === 'AVANCADO')
  );

  const totalEssentialOrRec = journey.components.filter(
    c => c.priority === 'ESSENCIAL' || c.priority === 'RECOMENDADO'
  ).length;

  const filledEssentialOrRec = alreadyHave.filter(
    c => c.priority === 'ESSENCIAL' || c.priority === 'RECOMENDADO'
  ).length;

  const completionPercentage = totalEssentialOrRec > 0 
    ? Math.round((filledEssentialOrRec / totalEssentialOrRec) * 100) 
    : 100;

  return {
    alreadyHave,
    toAddRecommended,
    toAddOptional,
    completionPercentage,
  };
}
