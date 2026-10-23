# PRISMA — Gestão na Prática

Landing page local em React + TypeScript + Vite. Não há backend, publicação ou integração de checkout ativa nesta etapa.

## Executar

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run lint
npm run build
```

## Configurar imagens

1. Coloque os arquivos otimizados em `public/images/`.
2. Edite somente o objeto `imageConfig` em `src/config.ts`.
3. Use caminhos como `/images/hero-prisma.webp`.

Há campos para hero, pacotes, bônus, aplicação prática, 8 slides e 6 módulos. Enquanto um campo estiver `null`, o placeholder correspondente permanece visível sem erro de imagem.

## Configurar checkouts

Edite `siteConfig.checkouts` em `src/config.ts`:

- `checkoutBasico`: checkout de R$9,90;
- `checkoutPremium`: checkout de R$19,90;
- `checkoutPromocional`: checkout Premium promocional de R$14,90 no total.

Parâmetros `utm_*`, `fbclid` e `gclid` recebidos na landing page são preservados no redirecionamento quando não existem na URL de destino. Sem URL configurada, o site mostra um aviso e não redireciona.

## Alterar preços, textos e dados pendentes

- Preços: `siteConfig.prices` em `src/config.ts`.
- Textos da página: arrays e seções em `src/App.tsx`.
- Contato, suporte, termos e privacidade: `siteConfig.contact` e `siteConfig.legal` em `src/config.ts`.
- Instruções reais de entrega: `siteConfig.delivery.instructions`.
- Pagamento, entrega, reembolso e suporte: `siteConfig.trust`. A seção de confiança só aparece quando houver informações reais preenchidas.
- Meta Pixel futuro: `siteConfig.tracking`. O rastreamento permanece inativo sem Pixel ID e consentimento.

Ao alterar um preço, revise também o checkout correspondente antes de publicar.
