/**
 * Endpoint para obtener la lista de eventos
 * Retorna eventos publicados ordenados por fecha
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  try {
    // Filtros opcionales
    const filters = {
      status: { _eq: 'published' }
    }

    // Filtro por tipo de evento
    if (query.event_type) {
      filters.event_type = { _eq: query.event_type }
    }

    // Filtro por formato
    if (query.format) {
      filters.format = { _eq: query.format }
    }

    // Filtro por destacado
    if (query.featured === 'true') {
      filters.featured = { _eq: true }
    }

    // Filtro por eventos futuros (por defecto)
    if (query.upcoming !== 'false') {
      filters.date_start = { _gte: '$NOW' }
    }

    // Construir query params
    const queryParams = new URLSearchParams({
      'filter': JSON.stringify(filters),
      'sort': query.sort || 'date_start',
      'limit': query.limit || '50',
      'fields': query.fields || '*,image.*'
    })

    // Obtener eventos de Directus
    const response = await $fetch(
      `${config.public.directusUrl}/items/events?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    // Para cada evento, obtener el conteo de registros
    const eventsWithCounts = await Promise.all(
      response.data.map(async (eventItem) => {
        try {
          const registrationsQuery = new URLSearchParams({
            'filter': JSON.stringify({
              event: { _eq: eventItem.id },
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

          return {
            ...eventItem,
            registrations_count: registrationsResponse.data?.length || 0,
            available_spots: eventItem.capacity > 0
              ? Math.max(0, eventItem.capacity - (registrationsResponse.data?.length || 0))
              : null,
            is_full: eventItem.capacity > 0 && (registrationsResponse.data?.length || 0) >= eventItem.capacity
          }
        } catch (error) {
          console.error(`Error getting registrations for event ${eventItem.id}:`, error)
          return {
            ...eventItem,
            registrations_count: 0,
            available_spots: eventItem.capacity > 0 ? eventItem.capacity : null,
            is_full: false
          }
        }
      })
    )

    return {
      success: true,
      data: eventsWithCounts,
      total: eventsWithCounts.length
    }

  } catch (error) {
    console.error('Error fetching events:', error)

    return {
      success: false,
      error: 'No se pudieron obtener los eventos',
      data: []
    }
  }
})
