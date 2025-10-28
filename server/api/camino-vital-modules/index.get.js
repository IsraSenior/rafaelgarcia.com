/**
 * API para obtener todos los módulos de Camino Vital
 * GET /api/camino-vital-modules
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const queryParams = new URLSearchParams({
    'filter[status][_eq]': 'published',
    'sort': 'sort',
    'limit': '-1'
  })

  try {
    const response = await $fetch(
      `${config.public.directusUrl}/items/camino_vital_modules?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    return response.data || []
  } catch (error) {
    console.error('Error fetching Camino Vital modules:', error)
    return []
  }
})
