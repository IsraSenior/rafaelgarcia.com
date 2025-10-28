/**
 * Script para actualizar las fechas de los eventos a fechas futuras
 */

import 'dotenv/config'

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN

async function updateEventsDates() {
  console.log('🔄 Actualizando fechas de eventos...')

  // Obtener eventos existentes
  const eventsResponse = await fetch(`${DIRECTUS_URL}/items/events`, {
    headers: {
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`
    }
  })

  const eventsData = await eventsResponse.json()
  const events = eventsData.data

  if (!events || events.length === 0) {
    console.log('⚠️  No hay eventos para actualizar')
    return
  }

  console.log(`📋 Encontrados ${events.length} eventos`)

  // Nuevas fechas futuras
  const newDates = [
    {
      date_start: '2025-11-15T19:00:00.000Z', // Nov 15, 2025 - 2:00 PM (COT)
      date_end: '2025-11-15T22:00:00.000Z'
    },
    {
      date_start: '2025-11-20T23:00:00.000Z', // Nov 20, 2025 - 6:00 PM (COT)
      date_end: '2025-11-21T01:00:00.000Z'
    },
    {
      date_start: '2025-12-06T14:00:00.000Z', // Dec 6-8, 2025 (Weekend Retreat)
      date_end: '2025-12-08T18:00:00.000Z'
    },
    {
      date_start: '2025-12-10T00:00:00.000Z', // Dec 9, 2025 - 7:00 PM (COT)
      date_end: '2025-12-10T02:00:00.000Z'
    },
    {
      date_start: '2025-12-14T19:00:00.000Z', // Dec 14, 2025 - 2:00 PM (COT)
      date_end: '2025-12-14T22:00:00.000Z'
    },
    {
      date_start: '2026-01-05T01:00:00.000Z', // Jan 4, 2026 - 8:00 PM (COT)
      date_end: '2026-01-05T02:30:00.000Z'
    }
  ]

  // Actualizar cada evento
  for (let i = 0; i < events.length && i < newDates.length; i++) {
    const event = events[i]
    const newDate = newDates[i]

    try {
      const response = await fetch(`${DIRECTUS_URL}/items/events/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date_start: newDate.date_start,
          date_end: newDate.date_end
        })
      })

      if (response.ok) {
        console.log(`✅ Evento actualizado: "${event.title}" - Nueva fecha: ${newDate.date_start}`)
      } else {
        const errorData = await response.json()
        console.error(`❌ Error actualizando evento ${event.id}:`, errorData)
      }
    } catch (error) {
      console.error(`❌ Error actualizando evento ${event.id}:`, error.message)
    }
  }

  console.log('✨ Actualización de fechas completada')
}

// Ejecutar el script
updateEventsDates().catch(console.error)
