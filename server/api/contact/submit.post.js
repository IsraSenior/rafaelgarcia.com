/**
 * Endpoint para enviar formulario de contacto
 * Crea un lead en Directus y opcionalmente suscribe al boletín
 */

import { Resend } from 'resend'
import { contactNotificationTemplate } from '../../utils/emailTemplates.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    // Leer el body del request
    const body = await readBody(event)

    // Validaciones básicas
    const errors = []

    if (!body.name || body.name.trim() === '') {
      errors.push('El nombre es requerido')
    }

    if (!body.lastname || body.lastname.trim() === '') {
      errors.push('Los apellidos son requeridos')
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

    if (!body.service || body.service.trim() === '') {
      errors.push('El servicio es requerido')
    }

    if (!body.contact_preference || !['email', 'whatsapp'].includes(body.contact_preference)) {
      errors.push('La preferencia de contacto no es válida')
    }

    // Si hay errores, retornar
    if (errors.length > 0) {
      return {
        success: false,
        errors: errors
      }
    }

    // Obtener información del request
    const headers = getHeaders(event)
    const clientIp = headers['x-forwarded-for'] || headers['x-real-ip'] || 'unknown'
    const userAgent = headers['user-agent'] || 'unknown'

    // Preparar datos del lead
    const leadData = {
      status: 'new',
      name: body.name.trim(),
      lastname: body.lastname.trim(),
      email: body.email.trim().toLowerCase(),
      service: body.service,
      contact_preference: body.contact_preference,
      message: body.message?.trim() || null,
      newsletter_subscribed: body.newsletter === true || body.newsletter === 'yes',
      client_ip: clientIp,
      user_agent: userAgent
    }

    // Crear el lead en Directus
    const leadResponse = await $fetch(
      `${config.public.directusUrl}/items/leads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.public.directusToken}`
        },
        body: JSON.stringify(leadData)
      }
    )

    // Si marcó la suscripción al newsletter, intentar suscribir
    let subscriptionResult = null
    if (leadData.newsletter_subscribed) {
      try {
        // Intentar crear la suscripción
        const subscriptionData = {
          status: 'active',
          email: leadData.email,
          name: `${leadData.name} ${leadData.lastname}`,
          source: 'contact_form',
          client_ip: clientIp,
          unsubscribe_token: generateUnsubscribeToken()
        }

        const subscriptionResponse = await $fetch(
          `${config.public.directusUrl}/items/subscriptions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.public.directusToken}`
            },
            body: JSON.stringify(subscriptionData)
          }
        )

        subscriptionResult = { success: true, message: 'Suscrito al boletín correctamente', already_subscribed: false }
      } catch (subscriptionError) {
        // Si el error es por email duplicado, está bien (ya está suscrito)
        if (subscriptionError.message && subscriptionError.message.includes('unique')) {
          subscriptionResult = { success: true, message: 'Ya estás suscrito al boletín', already_subscribed: true }
        } else {
          // Si es otro error, registrar pero no fallar el lead
          console.error('Error subscribing to newsletter:', subscriptionError)
          subscriptionResult = { success: false, message: 'Error al suscribir al boletín', already_subscribed: false }
        }
      }
    }

    // Enviar email de notificación al webmaster
    try {
      const resend = new Resend(config.resendApiKey)

      await resend.emails.send({
        from: config.resendSender,
        to: config.webmasterEmail,
        subject: `Nuevo mensaje de contacto - ${leadData.name} ${leadData.lastname}`,
        html: contactNotificationTemplate({
          name: leadData.name,
          lastname: leadData.lastname,
          email: leadData.email,
          service: leadData.service,
          contact_preference: leadData.contact_preference,
          message: leadData.message,
          newsletter_subscribed: leadData.newsletter_subscribed
        })
      })
    } catch (emailError) {
      console.error('Error sending contact notification email:', emailError)
      // No fallar si el email no se puede enviar
    }

    // Respuesta exitosa
    return {
      success: true,
      message: 'Mensaje enviado correctamente',
      lead_id: leadResponse.data.id,
      subscription: subscriptionResult
    }

  } catch (error) {
    console.error('Error submitting contact form:', error)

    return {
      success: false,
      errors: ['Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.']
    }
  }
})

// Función auxiliar para generar token único de desuscripción
function generateUnsubscribeToken() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36)
}
