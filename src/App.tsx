import { useEffect, useRef, useState, type ReactNode } from 'react'
import { imageConfig, siteConfig } from './config'
import { trackEvent } from './tracking'

type IconName = 'grid' | 'example' | 'layers' | 'file' | 'book' | 'compare' | 'cards' | 'search' | 'check' | 'x'

const imageDimensions: Record<string, { width: number; height: number }> = {
  '/images/hero-prisma.png': { width: 1672, height: 941 },
  '/images/package-basic.png': { width: 1254, height: 1254 },
  '/images/package-premium.png': { width: 1254, height: 1254 },
  '/images/bonus-comparatives.png': { width: 1122, height: 1402 },
  '/images/bonus-flashcards.png': { width: 1122, height: 1402 },
  '/images/bonus-glossary.png': { width: 1122, height: 1402 },
  '/images/map-5w2h.png': { width: 1448, height: 1086 },
  '/images/carousel-pdca.png': { width: 896, height: 632 },
  '/images/carousel-swot.png': { width: 894, height: 630 },
  '/images/carousel-gut.png': { width: 894, height: 630 },
  '/images/carousel-5w2h.png': { width: 894, height: 628 },
  '/images/carousel-ishikawa.png': { width: 895, height: 631 },
  '/images/carousel-5s.png': { width: 898, height: 632 },
  '/images/carousel-one-on-one.png': { width: 895, height: 630 },
  '/images/module-strategy.png': { width: 1448, height: 1086 },
  '/images/module-processes.png': { width: 1448, height: 1086 },
  '/images/module-projects.png': { width: 1448, height: 1086 },
  '/images/module-logistics.png': { width: 1448, height: 1086 },
  '/images/module-people.png': { width: 1448, height: 1086 },
  '/images/module-indicators.png': { width: 1448, height: 1086 },
}

function optimizedImageSources(src: string) {
  const dimensions = imageDimensions[src]
  if (!dimensions) return null
  const base = src.replace('/images/', '/images/optimized/').replace(/\.png$/i, '')
  const candidates = [640, 960].filter((width) => width < dimensions.width)
  return [...candidates.map((width) => `${base}-${width}.webp ${width}w`), `${base}.webp ${dimensions.width}w`].join(', ')
}

function ResponsiveImage({ src, alt, priority = false, eager = false, sizes = '100vw', onLoad, onError }: { src: string; alt: string; priority?: boolean; eager?: boolean; sizes?: string; onLoad?: () => void; onError?: () => void }) {
  const dimensions = imageDimensions[src]
  const webpSources = optimizedImageSources(src)
  const image = (
    <img
      src={src}
      alt={alt}
      width={dimensions?.width}
      height={dimensions?.height}
      loading={priority || eager ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : eager ? 'auto' : 'low'}
      onLoad={onLoad}
      onError={onError}
    />
  )
  return webpSources ? <picture><source type="image/webp" srcSet={webpSources} sizes={sizes} />{image}</picture> : image
}

const modules = [
  { number: '01', title: 'Estratégia e Planejamento', count: 20, description: 'Conheça ferramentas para analisar cenários, definir prioridades, organizar objetivos e estruturar planos.', image: imageConfig.modules.strategy },
  { number: '02', title: 'Processos e Qualidade', count: 20, description: 'Estude métodos para compreender processos, identificar problemas e organizar ações de melhoria.', image: imageConfig.modules.processes },
  { number: '03', title: 'Projetos e Produtividade', count: 17, description: 'Consulte conceitos de planejamento, execução, acompanhamento de tarefas e organização de projetos.', image: imageConfig.modules.projects },
  { number: '04', title: 'Logística e Operações', count: 15, description: 'Entenda ferramentas relacionadas a fluxos, estoques, processos operacionais e organização das atividades.', image: imageConfig.modules.logistics },
  { number: '05', title: 'Pessoas e Liderança', count: 14, description: 'Revise conceitos de comunicação, liderança, equipes e gestão de pessoas.', image: imageConfig.modules.people },
  { number: '06', title: 'Indicadores e Decisões', count: 14, description: 'Compreenda indicadores e métodos utilizados para analisar informações e apoiar decisões.', image: imageConfig.modules.indicators },
]

const slides = [
  { title: 'Ciclo PDCA', label: 'Planejar, executar, verificar e agir', image: imageConfig.carousel.pdca, tone: 'blue' },
  { title: 'Análise SWOT', label: 'Forças, fraquezas, oportunidades e ameaças', image: imageConfig.carousel.swot, tone: 'teal' },
  { title: 'Matriz GUT', label: 'Gravidade, urgência e tendência', image: imageConfig.carousel.gut, tone: 'violet' },
  { title: 'Plano de Ação 5W2H', label: 'Estrutura para organizar ações', image: imageConfig.carousel.w5h2, tone: 'sand' },
  { title: 'Diagrama de Ishikawa', label: 'Análise visual de causas', image: imageConfig.carousel.ishikawa, tone: 'sky' },
  { title: 'Ferramenta 5S', label: 'Organização e melhoria do ambiente', image: imageConfig.carousel.s5, tone: 'mint' },
  { title: 'Reunião 1:1', label: 'Escuta, desenvolvimento e acordos', image: imageConfig.carousel.oneOnOne, tone: 'navy' },
]

const faqs = [
  ['O que recebo no Básico?', 'Você recebe os 100 mapas visuais de gestão, distribuídos em seis módulos, em arquivos digitais PDF.'],
  ['Qual é a diferença entre Básico e Premium?', 'O Premium inclui os mesmos 100 mapas e acrescenta 20 comparativos, 40 flashcards e um glossário com 100 termos.'],
  ['Os materiais são físicos?', 'Não. O PRISMA é um produto digital. Você recebe arquivos para consulta e impressão.'],
  ['Posso estudar pelo celular?', 'Sim. Os PDFs podem ser abertos no celular, tablet ou computador com um leitor compatível.'],
  ['Posso imprimir?', 'Sim. Você pode imprimir os mapas que desejar utilizar.'],
  ['Preciso instalar um aplicativo?', 'Não. O PRISMA não exige a instalação de um aplicativo próprio.'],
  ['O pagamento é mensal?', 'Não. O preço anunciado corresponde a um pagamento único.'],
  ['O material substitui um curso?', 'Não. É um material complementar de estudo e consulta.'],
]

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    example: <><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="m8 12 2.5 2.5L16 9"/></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
    compare: <><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></>,
    cards: <><rect x="3" y="5" width="15" height="14" rx="2"/><path d="M7 5V3h14v14h-3M7 10h7M7 14h4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    x: <path d="m6 6 12 12M18 6 6 18"/>,
  }
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function ImageSlot({ src, label, className = '', priority = false }: { src: string | null; label: string; className?: string; priority?: boolean }) {
  const sizes = className.includes('hero-slot')
    ? '(max-width: 900px) calc(100vw - 36px), 52vw'
    : className.includes('module-image')
      ? '(max-width: 720px) calc(100vw - 36px), (max-width: 980px) 50vw, 360px'
      : className.includes('offer-image') || className.includes('upgrade-image')
        ? '(max-width: 720px) calc(100vw - 36px), 500px'
        : className.includes('preview-image')
          ? 'min(900px, calc(100vw - 40px))'
          : '(max-width: 720px) calc(100vw - 36px), 600px'
  return (
    <div className={`image-slot ${className} ${src ? 'has-image' : ''}`}>
      {src ? <ResponsiveImage src={src} alt={label} priority={priority} sizes={sizes} /> : <><span className="slot-mark">P</span><span>{label}</span><small>Imagem preparada para inserir depois</small></>}
    </div>
  )
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function appendCampaignParams(target: string) {
  const destination = new URL(target, window.location.href)
  const current = new URLSearchParams(window.location.search)
  current.forEach((value, key) => {
    if ((key.startsWith('utm_') || key === 'fbclid' || key === 'gclid') && !destination.searchParams.has(key)) destination.searchParams.set(key, value)
  })
  return destination.toString()
}

function Carousel({ onOpen, previewOpen }: { onOpen: (index: number) => void; previewOpen: boolean }) {
  const [loadSlides, setLoadSlides] = useState(false)
  const [slidesReady, setSlidesReady] = useState(false)
  const loadedSlides = useRef(new Set<number>())

  useEffect(() => {
    const startLoading = () => setLoadSlides(true)
    if (document.readyState === 'complete') startLoading()
    else window.addEventListener('load', startLoading, { once: true })
    return () => window.removeEventListener('load', startLoading)
  }, [])

  const markSlideReady = (index: number) => {
    loadedSlides.current.add(index)
    if (loadedSlides.current.size === slides.length) setSlidesReady(true)
  }

  return (
    <div className={`carousel-shell ${previewOpen ? 'is-paused' : ''} ${slidesReady ? 'is-ready' : ''}`}>
      <div className="carousel-viewport">
        <div className="carousel-track">
          {[0, 1].map((setIndex) => (
            <div className="carousel-set" key={setIndex} aria-hidden={setIndex === 1 ? 'true' : undefined}>
              {slides.map((slide, slideIndex) => (
                <button
                  className={`demo-slide tone-${slide.tone}`}
                  type="button"
                  key={`${slide.title}-${setIndex}`}
                  onClick={() => onOpen(slideIndex)}
                  tabIndex={setIndex === 1 ? -1 : 0}
                  aria-label={`Ampliar exemplo: ${slide.title}`}
                >
                  {slide.image ? <ResponsiveImage src={slide.image} alt={`Exemplo do material ${slide.title}`} eager={loadSlides} sizes="(max-width: 720px) calc(100vw - 36px), 560px" onLoad={setIndex === 0 ? () => markSlideReady(slideIndex) : undefined} onError={setIndex === 0 ? () => markSlideReady(slideIndex) : undefined} /> : <div className="slide-placeholder"><span className="slide-number">{String(slideIndex + 1).padStart(2, '0')}</span><div><small>MAPA VISUAL</small><h3>{slide.title}</h3><p>{slide.label}</p></div><span className="expand-label">Ampliar <span aria-hidden="true">↗</span></span></div>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Dialog({ open, onClose, labelledBy, children, className = '' }: { open: boolean; onClose: () => void; labelledBy: string; children: ReactNode; className?: string }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    document.body.classList.add('modal-open')
    closeRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => { document.body.classList.remove('modal-open'); document.removeEventListener('keydown', handleKey); previous?.focus() }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={dialogRef} className={`dialog ${className}`} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <button ref={closeRef} className="dialog-close" type="button" onClick={onClose} aria-label="Fechar janela"><Icon name="x" /></button>
        {children}
      </div>
    </div>
  )
}

function App() {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const visibleFaqs = [
    ...faqs.slice(0, 7),
    ...(siteConfig.delivery.instructions ? [['Como recebo os arquivos?', siteConfig.delivery.instructions]] : []),
    faqs[7],
  ]
  const trustItems = [
    { title: 'Pagamento', text: siteConfig.trust.paymentInfo },
    { title: 'Entrega digital', text: siteConfig.trust.deliveryInfo },
    { title: 'Política de reembolso', text: siteConfig.trust.refundInfo },
    { title: 'Suporte', text: siteConfig.trust.supportInfo },
  ].filter((item): item is { title: string; text: string } => Boolean(item.text))

  useEffect(() => {
    trackEvent('PageView', {}, true)
    trackEvent('ViewContent', {
      content_name: 'PRISMA — Gestão na Prática',
      content_category: 'Material Digital de Gestão',
      content_type: 'product',
    }, true)
  }, [])

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 4600)
  }

  function checkout(url: string | null, plan: 'Básico' | 'Premium' | 'Premium promocional') {
    if (!url) {
      showNotice(`O checkout ${plan} ainda precisa ser conectado no arquivo src/config.ts.`)
      return
    }
    window.location.assign(appendCampaignParams(url))
  }

  function openBasicOffer() {
    setUpgradeOpen(true)
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PRISMA — início"><span className="brand-prism">P</span><span><strong>PRISMA</strong><small>GESTÃO NA PRÁTICA</small></span></a>
        <nav aria-label="Navegação principal"><a href="#conteudo">Conteúdo</a><a href="#modulos">Módulos</a><a href="#faq">Dúvidas</a><button className="header-cta" onClick={() => scrollTo('ofertas')}>Ver pacotes</button></nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <span className="eyebrow"><span></span> BIBLIOTECA VISUAL DE GESTÃO</span>
          <h1><em>100 Mapas Visuais de Gestão</em> para entender as ferramentas sem se perder em páginas e páginas de teoria.</h1>
          <div className="hero-visual"><div className="hero-glow"></div><ImageSlot src={imageConfig.hero} label="Apresentação visual do PRISMA — Gestão na Prática" className="hero-slot" priority /></div>
          <p className="hero-lead">Aprenda e revise conceitos de Administração, Estratégia, Processos, Qualidade, Logística e Gestão de Pessoas com explicações visuais, exemplos práticos e materiais organizados para consultar ou imprimir.</p>
          <ul className="hero-benefits">
            <li><Icon name="check" /> 100 mapas organizados em 6 módulos.</li>
            <li><Icon name="check" /> Explicações e exemplos de aplicação.</li>
            <li><Icon name="check" /> PDFs para estudar no celular ou imprimir.</li>
          </ul>
          <button className="button button-primary" onClick={() => scrollTo('demonstracao')}>QUERO EXPLORAR OS MAPAS <span aria-hidden="true">↓</span></button>
          <p className="microcopy">Material digital em PDF • Consulta no celular e computador • Pronto para imprimir</p>
        </section>

        <section className="demo section-pad" id="demonstracao">
          <div className="section-heading"><span className="eyebrow">PRÉVIA DO CONTEÚDO</span><h2>Veja alguns dos mapas que você vai receber.</h2><p>Explore as ferramentas por dentro e veja como os conceitos são apresentados com explicações, exemplos e aplicações práticas.</p><small className="carousel-instruction">Passe para explorar os mapas. Clique em um material para ampliar.</small></div>
          <Carousel onOpen={setPreviewIndex} previewOpen={previewIndex !== null} />
        </section>

        <section className="modules section-pad section-light" id="modulos">
          <div className="section-heading"><span className="eyebrow">CONTEÚDO ORGANIZADO</span><h2>Uma biblioteca visual completa para estudar e consultar ferramentas de gestão.</h2><p>São 100 mapas organizados por assunto, reunindo conceitos, ferramentas e exemplos para você encontrar o que precisa sem depender de materiais espalhados.</p></div>
          <div className="module-grid">{modules.map((module) => <article className="module-card" key={module.title}><div className="module-top"><span>{module.number}</span><strong>{module.count}<small> MAPAS</small></strong></div><ImageSlot src={module.image} label={`Imagem do módulo ${module.number}`} className="module-image" /><h3>{module.title} — {module.count} mapas</h3><p>{module.description}</p></article>)}</div>
          <p className="module-total"><strong>100 mapas • 6 módulos</strong><span>Material digital para consulta e impressão</span></p>
        </section>

        <section className="commercial-benefits section-pad section-navy">
          <div className="section-heading light"><span className="eyebrow eyebrow-light">MAIS PRATICIDADE</span><h2>Menos tempo procurando explicações. Mais praticidade para estudar e revisar.</h2><p>Em vez de consultar várias fontes toda vez que surgir uma dúvida, tenha os principais conceitos reunidos em materiais visuais e organizados.</p></div>
          <div className="benefit-grid six-benefits">
            {[
              ['grid', 'Explicações visuais', 'Conceitos apresentados de maneira organizada, facilitando a identificação dos pontos principais.'],
              ['book', 'Revisão prática', 'Consulte os mapas sempre que quiser retomar um assunto.'],
              ['example', 'Exemplos de aplicação', 'Veja situações que ajudam a contextualizar como cada ferramenta é utilizada.'],
              ['layers', 'Conteúdo organizado', 'Encontre os assuntos distribuídos em seis módulos.'],
              ['file', 'Estude de onde estiver', 'Abra os PDFs em dispositivos compatíveis, como celular, tablet ou computador.'],
              ['cards', 'Imprima quando quiser', 'Utilize os arquivos digitalmente ou imprima as páginas que forem úteis para seu estudo.'],
            ].map(([icon, title, text], i) => <article className="benefit-card" key={title}><span className="benefit-index">0{i + 1}</span><Icon name={icon as IconName} /><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="practical pain-comparison section-pad section-light" id="conteudo">
          <div className="section-heading narrow"><span className="eyebrow">INFORMAÇÃO ORGANIZADA</span><h2>Você conhece as siglas, mas sabe diferenciar e aplicar cada ferramenta?</h2><p>SWOT, PDCA, GUT, 5W2H, Ishikawa... São muitos conceitos para aprender. E quando as explicações ficam espalhadas entre aulas, apostilas e pesquisas, revisar pode se tornar trabalhoso.</p></div>
          <div className="practical-layout">
            <div className="comparison">
              <article className="comparison-card muted"><span className="comparison-label">ESTUDO COM INFORMAÇÕES DISPERSAS</span><ul><li><Icon name="x" /> Definições espalhadas em diferentes materiais.</li><li><Icon name="x" /> Dificuldade para encontrar exemplos.</li><li><Icon name="x" /> Mais tempo procurando o conteúdo.</li><li><Icon name="x" /> Revisão pouco organizada.</li></ul></article>
              <article className="comparison-card positive"><span className="comparison-label">ESTUDO COM O PRISMA</span><ul><li><Icon name="check" /> Conteúdo reunido em mapas.</li><li><Icon name="check" /> Explicações e aplicações no mesmo material.</li><li><Icon name="check" /> Consulta organizada por assunto.</li><li><Icon name="check" /> PDFs disponíveis para revisão e impressão.</li></ul></article>
            </div>
            <ImageSlot src={imageConfig.practicalApplication} label="MAPA REAL DE PDCA OU 5W2H — INSERIR DEPOIS" className="practical-image" />
          </div>
          <p className="comparison-closing">Uma forma mais prática de reunir teoria, exemplos e consulta rápida em uma mesma biblioteca.</p>
        </section>

        <section className="bonuses section-pad section-navy">
          <div className="section-heading light"><span className="eyebrow eyebrow-light">MATERIAIS COMPLEMENTARES</span><h2>Complete sua biblioteca com 3 materiais extras para revisão.</h2><p>No Premium, você recebe os 100 mapas do Básico e mais três materiais complementares para comparar conceitos, praticar a revisão e consultar termos.</p></div>
          <div className="bonus-grid">
            {[
              ['compare', 'BÔNUS 1', '20 Comparativos de Gestão', 'Consulte diferenças entre ferramentas e conceitos apresentados lado a lado, facilitando a identificação de suas características e aplicações.', imageConfig.bonusComparatives],
              ['cards', 'BÔNUS 2', '40 Flashcards para Revisão', 'Perguntas e respostas organizadas para revisar conceitos e verificar o que você lembra dos assuntos estudados.', imageConfig.bonusFlashcards],
              ['search', 'BÔNUS 3', 'Glossário com 100 Termos de Gestão', 'Uma referência de consulta para compreender expressões e conceitos utilizados em Administração e Gestão.', imageConfig.bonusGlossary],
            ].map(([icon, overline, title, text, image]) => <article className="bonus-card" key={title}><div className={`bonus-visual ${image ? 'has-image' : ''}`}>{image ? <ResponsiveImage src={image} alt={`Imagem do ${title}`} sizes="(max-width: 720px) calc(100vw - 36px), 360px" /> : <><Icon name={icon as IconName} /><span>IMAGEM DO {overline}</span></>}</div><span className="bonus-overline">{overline}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <p className="bonus-note"><Icon name="check" /> Os três bônus fazem parte do Premium e da opção promocional do pacote completo.</p>
        </section>

        <section className="offers section-pad" id="ofertas">
          <div className="section-heading"><span className="eyebrow">ESCOLHA SEU PACOTE</span><h2>Escolha como você quer acessar sua biblioteca de gestão.</h2><p>Pagamento único. Material digital em PDF.</p></div>
          <div className="offer-grid">
            <article className="offer-card basic"><ImageSlot src={imageConfig.basicPackage} label="IMAGEM DO PACOTE BÁSICO" className="offer-image" /><div className="offer-body"><span className="plan-label">PACOTE BÁSICO</span><h3>PRISMA Essencial — 100 Mapas</h3><p className="plan-support">Para quem quer estudar e consultar os 100 mapas visuais de gestão.</p><div className="price"><small>Pagamento único</small><strong>{siteConfig.prices.basic}</strong></div><ul><li><Icon name="check" /> 100 mapas visuais.</li><li><Icon name="check" /> 6 módulos completos.</li><li><Icon name="check" /> Explicações e exemplos práticos.</li><li><Icon name="check" /> PDF para consulta no celular e impressão.</li><li className="not-included"><Icon name="x" /> Não inclui os três bônus.</li></ul><button className="button button-outline" onClick={openBasicOffer}>QUERO OS 100 MAPAS</button></div></article>
            <article className="offer-card premium"><span className="premium-ribbon">MAIS VENDIDO</span><ImageSlot src={imageConfig.premiumPackage} label="IMAGEM DO PACOTE PREMIUM" className="offer-image" /><div className="offer-body"><span className="plan-label">PACOTE PREMIUM</span><h3>PRISMA Completo — 100 Mapas + 3 Bônus</h3><p className="plan-support">Para quem deseja os mapas e mais três materiais complementares de estudo.</p><div className="price"><small>Pagamento único</small><strong>{siteConfig.prices.premium}</strong></div><p className="premium-value-highlight">100 mapas visuais + 3 bônus exclusivos</p><ul><li><Icon name="check" /> Os mesmos 100 mapas do Básico.</li><li><Icon name="check" /> 20 comparativos.</li><li><Icon name="check" /> 40 flashcards.</li><li><Icon name="check" /> Glossário de 100 termos.</li><li><Icon name="check" /> Todos os arquivos em formato digital.</li></ul><p className="premium-difference">Por R$10 a mais que o Básico, você acrescenta os três materiais complementares.</p><button className="button button-primary" onClick={() => checkout(siteConfig.checkouts.checkoutPremium, 'Premium')}>QUERO O PRISMA COMPLETO</button></div></article>
          </div>
          <p className="secure-note"><span aria-hidden="true">◇</span> Ao escolher uma opção, você será direcionado ao checkout correspondente da Lowify.</p>
        </section>

        {trustItems.length > 0 && <section className="trust-section section-pad section-light"><div className="section-heading"><span className="eyebrow">COMPRA E SUPORTE</span><h2>Informações transparentes antes da compra.</h2></div><div className="trust-grid">{trustItems.map((item) => <article key={item.title}><Icon name="check" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>}

        <section className="faq section-pad section-light" id="faq">
          <div className="faq-layout"><div className="faq-intro"><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Informação clara antes de escolher.</h2><p>Confira o que está incluído em cada pacote e como o material funciona.</p></div><div className="accordion">{visibleFaqs.map(([question, answer], index) => <details key={question} open={openFaq === index}><summary onClick={(event) => { event.preventDefault(); setOpenFaq(openFaq === index ? null : index) }}>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <section className="final-cta section-pad"><div><span className="eyebrow eyebrow-light">PRISMA — GESTÃO NA PRÁTICA</span><h2>Tenha os principais conceitos de gestão reunidos em uma biblioteca visual.</h2><p>São 100 mapas organizados em seis módulos, com explicações e exemplos para estudar, revisar e consultar sempre que precisar.</p><button className="button button-light" onClick={() => scrollTo('ofertas')}>ESCOLHER MEU PACOTE <span aria-hidden="true">↑</span></button></div></section>
      </main>

      <footer><div className="footer-main"><div><a className="brand brand-light" href="#top"><span className="brand-prism">P</span><span><strong>PRISMA</strong><small>GESTÃO NA PRÁTICA</small></span></a><p>Material digital de estudo e consulta sobre ferramentas e conceitos de gestão.</p></div><div><h3>Informações</h3><button onClick={() => showNotice('Os Termos de Uso aguardam os dados jurídicos reais antes da publicação.')}>Termos de Uso</button><button onClick={() => showNotice('A Política de Privacidade aguarda os dados e ferramentas reais antes da publicação.')}>Política de Privacidade</button></div><div><h3>Suporte</h3><p>{siteConfig.contact.supportText}</p>{siteConfig.contact.email && <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PRISMA — Gestão na Prática.</span><span>Produto digital em PDF.</span></div></footer>

      <Dialog open={previewIndex !== null} onClose={() => setPreviewIndex(null)} labelledBy="preview-title" className="preview-dialog">
        {previewIndex !== null && <><span className="dialog-overline">EXEMPLO DO CONTEÚDO</span><h2 id="preview-title">{slides[previewIndex].title}</h2><ImageSlot src={slides[previewIndex].image} label={`Prévia do mapa ${slides[previewIndex].title}`} className="preview-image" /><p>{slides[previewIndex].label}.</p></>}
      </Dialog>

      <Dialog open={upgradeOpen} onClose={() => setUpgradeOpen(false)} labelledBy="upgrade-title" className="upgrade-dialog">
        <div className="upgrade-layout"><ImageSlot src={imageConfig.bonuses} label="IMAGEM DOS TRÊS BÔNUS" className="upgrade-image" /><div className="upgrade-content"><span className="dialog-overline">OFERTA OPCIONAL</span><h2 id="upgrade-title">Antes de finalizar: leve os 3 bônus por apenas {siteConfig.prices.upgradeDifference} a mais.</h2><p>Você já escolheu os 100 mapas de gestão. Agora pode receber também os 20 comparativos, os 40 flashcards e o glossário de 100 termos.</p><ul><li><Icon name="check" /> 20 comparativos.</li><li><Icon name="check" /> 40 flashcards.</li><li><Icon name="check" /> Glossário de 100 termos.</li></ul><div className="upgrade-price"><span>Em vez de pagar <s>{siteConfig.prices.premium}</s> pelo Premium:</span><strong>{siteConfig.prices.promotional} <small>no total</small></strong><p>100 mapas + 3 bônus por {siteConfig.prices.promotional}.</p></div><button className="button button-primary" onClick={() => checkout(siteConfig.checkouts.checkoutPromocional, 'Premium promocional')}>SIM, QUERO TUDO POR {siteConfig.prices.promotional}</button><button className="decline-button" onClick={() => checkout(siteConfig.checkouts.checkoutBasico, 'Básico')}>NÃO, QUERO SOMENTE OS 100 MAPAS POR {siteConfig.prices.basic}</button><small className="upgrade-clarity">Você escolhe uma das opções. {siteConfig.prices.promotional} é o valor total do Premium promocional e substitui o Básico; não é uma cobrança adicional.</small></div></div>
      </Dialog>

      <div className={`toast ${notice ? 'visible' : ''}`} role="status" aria-live="polite">{notice}</div>
    </>
  )
}

export default App
