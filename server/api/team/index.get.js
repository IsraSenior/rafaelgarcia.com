/**
 * API route para obtener todos los miembros del equipo
 * GET /api/team
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const queryParams = new URLSearchParams({
    'filter[status][_eq]': 'published',
    'sort': 'sort',
    ...query
  })

  try {
    const response = await $fetch(`${config.public.directusUrl}/items/team_members?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${config.public.directusToken}`
      }
    })

    return response.data || []
  } catch (error) {
    console.error('Error fetching team members:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching team members'
    })
  }
})
