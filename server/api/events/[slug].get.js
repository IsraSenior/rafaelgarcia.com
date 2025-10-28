/**
 * Endpoint para obtener un evento específico por su slug
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  try {
    // Construir query params
    const queryParams = new URLSearchParams({
      'filter[slug][_eq]': slug,
      'filter[status][_eq]': 'published',
      'limit': '1',
      'fields': '*,image.*'
    })

    // Obtener evento de Directus
    const response = await $fetch(
      `${config.public.directusUrl}/items/events?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Event Not Found',
        message: 'El evento no existe'
      })
    }

    const eventData = response.data[0]

    // Obtener registros del evento
    try {
      const registrationsQuery = new URLSearchParams({
        'filter': JSON.stringify({
          event: { _eq: eventData.id },
          status: { _in: ['pending', 'confirmed'] }
        }),
        'aggregate[count]': 'id'
      })

      const registrationsResponse = await $fetch(
        `${config.public.directusUrl}/items/event_registrations?${registrationsQuery}`,
        {
          headers: {
            'Authorization': `Bearer ${config.public.directusToken}`
          }
        }
      )

      const registrationsCount = registrationsResponse.data?.length || 0

      return {
        success: true,
        data: {
          ...eventData,
          registrations_count: registrationsCount,
          available_spots: eventData.capacity > 0
            ? Math.max(0, eventData.capacity - registrationsCount)
            : null,
          is_full: eventData.capacity > 0 && registrationsCount >= eventData.capacity
        }
      }
    } catch (error) {
      console.error('Error getting registrations count:', error)
      return {
        success: true,
        data: {
          ...eventData,
          registrations_count: 0,
          available_spots: eventData.capacity > 0 ? eventData.capacity : null,
          is_full: false
        }
      }
    }

  } catch (error) {
    console.error(`Error fetching event ${slug}:`, error)

    if (error.statusCode === 404) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Error al obtener el evento'
    })
  }
})
