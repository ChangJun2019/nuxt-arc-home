import { getUnsplashClient } from '../../utils/getUnsplashClient'

export interface RandomPhoto {
  url: string
  html: string
  download_url: string
  author: {
    name: string
    url: string
  }
}

export default defineEventHandler<RandomPhoto>(async (event) => {
  // https://github.com/unsplash/unsplash-js#photosgetrandomarguments-additionalfetchoptions
  const unsplash = getUnsplashClient(event)
  const result = await unsplash?.photos.getRandom({
    query: 'Winter',
    orientation: 'landscape',
    count: 20,
  })
  if (result?.errors) {
    throw createError({
      statusCode: 401,
      statusMessage: `unsplash error: ${result.errors[0]}`,
    })
  }
  const photos = result.response as any
  return photos.map((photo: any) => {
    return {
      url: photo.urls.raw,
      html: photo.links.html,
      download_url: photo.links.download,
      author: {
        name: photo.user.name,
        url: photo.user.links.html,
      },
    }
  })
})
