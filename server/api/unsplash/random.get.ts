import { getUnsplashClient } from '../../utils/getUnsplashClient'

export interface RandomPhoto {
  url: string
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
  })
  if (result?.errors) {
    throw createError({
      statusCode: 401,
      statusMessage: `unsplash error: ${result.errors[0]}`,
    })
  }
  const photo = result.response as any
  return {
    url: photo.urls.raw,
    download_url: photo.links.download,
    author: {
      name: photo.user.name,
      url: photo.user.links.html,
    },
  }
})
