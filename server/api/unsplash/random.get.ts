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

export default defineEventHandler<RandomPhoto[]>(async (event) => {
  // https://github.com/unsplash/unsplash-js#photosgetrandomarguments-additionalfetchoptions
  const secFetchSite = getRequestHeader(event, 'Sec-Fetch-Site')
  const errorStatus = {
    statusCode: 401,
    statusMessage: 'Unauthorized Request',
  }
  if (secFetchSite && secFetchSite !== 'same-origin')
    throw createError(errorStatus)
  const unsplash = getUnsplashClient(event)
  try {
    const result = await unsplash?.photos.getRandom({
      query: 'Winter',
      orientation: 'landscape',
      count: 20,
    })
    if (result?.errors) {
      throw createError({
        statusCode: 500,
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
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'unsplash error',
    })
  }
})
