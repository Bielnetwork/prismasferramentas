export const siteConfig = {
  brand: 'PRISMA — Gestão na Prática',
  prices: {
    basic: 'R$9,90',
    premium: 'R$19,90',
    promotional: 'R$14,90',
    upgradeDifference: 'R$5',
  },
  checkouts: {
    checkoutBasico: 'https://pay.lowify.com.br/checkout?product_id=0ctn3z' as string | null,
    checkoutPremium: 'https://pay.lowify.com.br/checkout?product_id=O2TR9A' as string | null,
    checkoutPromocional: 'https://pay.lowify.com.br/go.php?offer=e44bd1f8' as string | null,
  },
  contact: {
    email: null as string | null,
    supportText: 'Canal de suporte pendente de configuração.',
  },
  legal: {
    termsUrl: null as string | null,
    privacyUrl: null as string | null,
    refundPolicyText: null as string | null,
    additionalSupportInfo: null as string | null,
  },
  delivery: {
    instructions: null as string | null,
  },
  trust: {
    paymentInfo: null as string | null,
    deliveryInfo: null as string | null,
    refundInfo: null as string | null,
    supportInfo: null as string | null,
  },
  tracking: {
    metaPixelId: '1430848232335737' as string | null,
    consentGranted: true,
  },
} as const

export const imageConfig = {
  hero: '/images/hero-prisma.png' as string | null,
  basicPackage: '/images/package-basic.png' as string | null,
  premiumPackage: '/images/package-premium.png' as string | null,
  bonuses: '/images/package-premium.png' as string | null,
  bonusComparatives: '/images/bonus-comparatives.png' as string | null,
  bonusFlashcards: '/images/bonus-flashcards.png' as string | null,
  bonusGlossary: '/images/bonus-glossary.png' as string | null,
  practicalApplication: '/images/map-5w2h.png' as string | null,
  carousel: {
    pdca: '/images/carousel-pdca.png' as string | null,
    swot: '/images/carousel-swot.png' as string | null,
    gut: '/images/carousel-gut.png' as string | null,
    w5h2: '/images/carousel-5w2h.png' as string | null,
    ishikawa: '/images/carousel-ishikawa.png' as string | null,
    s5: '/images/carousel-5s.png' as string | null,
    oneOnOne: '/images/carousel-one-on-one.png' as string | null,
  },
  modules: {
    strategy: '/images/module-strategy.png' as string | null,
    processes: '/images/module-processes.png' as string | null,
    projects: '/images/module-projects.png' as string | null,
    logistics: '/images/module-logistics.png' as string | null,
    people: '/images/module-people.png' as string | null,
    indicators: '/images/module-indicators.png' as string | null,
  },
} as const
