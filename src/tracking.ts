import { siteConfig } from './config'

export type TrackingEvent =
  | 'PageView'
  | 'ViewOffers'
  | 'ClickBasic'
  | 'ClickPremium'
  | 'OpenUpgradeOffer'
  | 'AcceptUpgradeOffer'
  | 'DeclineUpgradeOffer'
  | 'InitiateCheckout'

const sentOnce = new Set<string>()

export function trackEvent(event: TrackingEvent, data: Record<string, unknown> = {}, once = false) {
  const { metaPixelId, consentGranted } = siteConfig.tracking
  if (!metaPixelId || !consentGranted) return
  const key = `${event}:${JSON.stringify(data)}`
  if (once && sentOnce.has(key)) return
  if (once) sentOnce.add(key)

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq
  if (typeof fbq === 'function') fbq('trackCustom', event, data)
}
