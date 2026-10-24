import { siteConfig } from './config'

export type TrackingEvent = 'PageView' | 'ViewContent'

type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: MetaPixelFunction
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: MetaPixelFunction
    _fbq?: MetaPixelFunction
    __prismaMetaPixelId?: string
  }
}

const sentOnce = new Set<string>()

function getMetaPixel(): MetaPixelFunction | null {
  const { metaPixelId, consentGranted } = siteConfig.tracking
  if (!metaPixelId || !consentGranted || typeof window === 'undefined') return null

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    } as MetaPixelFunction

    fbq.queue = []
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    window.fbq = fbq
    window._fbq = fbq

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.onerror = () => {
      // Bloqueadores de rastreamento não devem afetar a página.
    }
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript)
    else document.head.appendChild(script)
  }

  if (window.__prismaMetaPixelId !== metaPixelId) {
    window.fbq('init', metaPixelId)
    window.__prismaMetaPixelId = metaPixelId
  }

  return window.fbq
}

export function trackEvent(event: TrackingEvent, data: Record<string, unknown> = {}, once = false) {
  const key = `${event}:${JSON.stringify(data)}`
  if (once && sentOnce.has(key)) return

  const fbq = getMetaPixel()
  if (!fbq) return

  if (once) sentOnce.add(key)
  fbq('track', event, data)
}
