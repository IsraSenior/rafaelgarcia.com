/**
 * Endpoint para registrarse a un evento
 * Valida capacidad, crea el registro y retorna el link de WhatsApp
 */

import { eventRegistrationNotificationTemplate } from '../../utils/emailTemplates.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    // Leer el body del request
    const body = await readBody(event)

    // Validaciones básicas
    const errors = []

    if (!body.event_id) {
      errors.push('El ID del evento es requerido')
    }

    if (!body.name || body.name.trim() === '') {
      errors.push('El nombre es requerido')
    }

    if (!body.email || body.email.trim() === '') {
      errors.push('El correo electrónico es requerido')
    } else {
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        errors.push('El formato del correo electrónico no es válido')
      }
    }

    // Si hay errores, retornar
    if (errors.length > 0) {
      return {
        success: false,
        errors: errors
      }
    }

    // 1. Obtener información del evento
    const eventResponse = await $fetch(
      `${config.public.directusUrl}/items/events/${body.event_id}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    const eventData = eventResponse.data

    // Verificar que el evento esté publicado
    if (eventData.status !== 'published') {
      return {
        success: false,
        errors: ['Este evento no está disponible para registro']
      }
    }

    // 2. Verificar capacidad del evento
    if (eventData.capacity > 0) {
      const registrationsQuery = new URLSearchParams({
        'filter': JSON.stringify({
          event: { _eq: body.event_id },
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

      const currentRegistrations = registrationsResponse.data?.length || 0

      if (currentRegistrations >= eventData.capacity) {
        return {
          success: false,
          errors: ['Este evento ya alcanzó su capacidad máxima']
        }
      }
    }

    // 3. Verificar si el email ya está registrado para este evento
    const existingQuery = new URLSearchParams({
      'filter': JSON.stringify({
        event: { _eq: body.event_id },
        email: { _eq: body.email.trim().toLowerCase() },
        status: { _in: ['pending', 'confirmed'] }
      }),
      'limit': '1'
    })

    const existingResponse = await $fetch(
      `${config.public.directusUrl}/items/event_registrations?${existingQuery}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    if (existingResponse.data && existingResponse.data.length > 0) {
      return {
        success: false,
        errors: ['Ya estás registrado para este evento'],
        already_registered: true
      }
    }

    // 4. Crear el registro
    const registrationData = {
      event: body.event_id,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      status: 'pending',
      source: 'website',
      registration_date: new Date().toISOString()
    }

    const registrationResponse = await $fetch(
      `${config.public.directusUrl}/items/event_registrations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.public.directusToken}`
        },
        body: JSON.stringify(registrationData)
      }
    )

    // 5. Enviar email al webmaster
    try {
      const emailHtml = eventRegistrationNotificationTemplate({
        eventTitle: eventData.title,
        eventDate: eventData.date_start,
        eventLocation: eventData.location,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || null,
        status: 'pending',
        registrationId: registrationResponse.data.id
      })

      await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: config.resendSender,
          to: 'webmaster.conecttomas@gmail.com',
          subject: `Nuevo registro pendiente: ${eventData.title}`,
          html: emailHtml
        })
      })

      console.log('✅ Email de notificación enviado al webmaster')
    } catch (emailError) {
      console.error('❌ Error al enviar email al webmaster:', emailError)
      // No fallar el registro si el email falla
    }

    // 6. Generar link de WhatsApp
    const whatsappNumber = eventData.whatsapp_number || '+18092225466'
    let messageTemplate = eventData.whatsapp_message_template ||
      'Hola! Me gustaría reservar un cupo para el evento: {event_title}. Mi nombre es {name} y mi email es {email}.'

    // Reemplazar variables en el template
    const message = messageTemplate
      .replace(/{event_title}/g, eventData.title)
      .replace(/{name}/g, body.name.trim())
      .replace(/{email}/g, body.email.trim())

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`

    return {
      success: true,
      message: 'Registro exitoso. Por favor, confirma tu asistencia por WhatsApp.',
      registration_id: registrationResponse.data.id,
      whatsapp_url: whatsappUrl,
      event: {
        title: eventData.title,
        date_start: eventData.date_start,
        location: eventData.location,
        virtual_link: eventData.virtual_link
      }
    }

  } catch (error) {
    console.error('Error registering for event:', error)

    return {
      success: false,
      errors: ['Ocurrió un error al procesar tu registro. Por favor, intenta nuevamente.']
    }
  }
})
