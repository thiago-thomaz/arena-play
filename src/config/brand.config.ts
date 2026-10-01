// Configuração agnóstica de marca (White-label ready)
// Permite trocar nome, logo, identidade, textos e domínios sem tocar na lógica do sistema.

export interface BrandConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  subheadline: string;
  domain: string;
  supportEmail: string;
  colors: {
    graphite: string;
    deepNavy: string;
    surface: string;
    surfaceCard: string;
    offWhite: string;
    electricGreen: string;
    softGreen: string;
    blue: string;
    amber: string;
    red: string;
  };
  navigation: {
    homeHeroTitle: string;
    homeHeroSubtitle: string;
    ctaStartJourney: string;
    ctaExploreSports: string;
  };
}

export const brandConfig: BrandConfig = {
  brandName: "ARENA PLAY",
  shortName: "ArenaPlay",
  tagline: "O sistema operacional da sua jornada esportiva",
  subheadline: "Encontre espaços, profissionais, experiências e tudo o que sua jornada precisa.",
  domain: "arenaplay.com.br",
  supportEmail: "suporte@arenaplay.com.br",
  colors: {
    graphite: "#0B0F0E",
    deepNavy: "#111827",
    surface: "#121A18",
    surfaceCard: "#16221F",
    offWhite: "#F5F7F4",
    electricGreen: "#B8F34A",
    softGreen: "#DFF7A6",
    blue: "#3B82F6",
    amber: "#F59E0B",
    red: "#EF4444",
  },
  navigation: {
    homeHeroTitle: "Seu esporte. Sua jornada.",
    homeHeroSubtitle: "Encontre espaços, profissionais, experiências e tudo o que sua jornada precisa.",
    ctaStartJourney: "Começar minha jornada",
    ctaExploreSports: "Explorar esportes",
  },
};
