/**
 * API route para obtener un servicio por slug
 * GET /api/services/:slug
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  const queryParams = new URLSearchParams({
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    'limit': '1'
  })

  try {
    const response = await $fetch(`${config.public.directusUrl}/items/services?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${config.public.directusToken}`
      }
    })

    const service = response.data?.[0] || null

    if (!service) {
      throw createError({
        statusCode: 404,
        message: 'Service not found'
      })
    }

    return service
  } catch (error) {
    if (error.statusCode === 404) {
      throw error
    }
    console.error('Error fetching service:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching service'
    })
  }
})
