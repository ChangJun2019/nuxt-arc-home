import { parseURL, withQuery } from 'ufo'
import { consola } from 'consola'

export function parseImageUrl(url: string | undefined) {
  if (!url) {
    consola.error('url not null')
    return
  }
  const { pathname } = parseURL(url)
  const w = calculateWidth()
  const path = withQuery(pathname, { w, q: '85', fit: 'crop', auto: 'format' })
  return path
}

export function calculateWidth() {
  let r = 1920
  const { pixelRatio } = useDevicePixelRatio()
  const { width } = useWindowSize()
  const w = unref(width) * unref(pixelRatio)
  r = Math.min(w, 3840)
  return r
}
