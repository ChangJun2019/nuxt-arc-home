import type { H3Event } from 'h3'
import { createApi } from 'unsplash-js'

export function getUnsplashClient(event: H3Event) {
  const { unsplashAccessKey } = useRuntimeConfig()
  if (!event.context._unsplash) {
    const unsplash = createApi({
      accessKey: unsplashAccessKey,
    })
    event.context._unsplash = unsplash
  }
  return event.context._unsplash
}

declare module 'h3' {
  interface H3EventContext {
    _unsplash: ReturnType<typeof createApi>
  }
}
