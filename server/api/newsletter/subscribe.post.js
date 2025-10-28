/**
 * Endpoint para suscribirse al boletín informativo
 * Valida correos duplicados y crea la suscripción
 */

import { Resend } from 'resend'
import { subscriptionConfirmationTemplate, newSubscriberNotificationTemplate } from '../../utils/emailTemplates.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    // Leer el body del request
    const body = await readBody(event)

    // Validaciones básicas
    const errors = []

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

    const email = body.email.trim().toLowerCase()

    // Primero verificar si el email ya está suscrito
    const checkQuery = new URLSearchParams({
      'filter[email][_eq]': email,
      'filter[status][_neq]': 'unsubscribed', // Verificar que no esté desuscrito
      'limit': '1'
    })

    try {
      const existingSubscription = await $fetch(
        `${config.public.directusUrl}/items/subscriptions?${checkQuery}`,
        {
          headers: {
            'Authorization': `Bearer ${config.public.directusToken}`
          }
        }
      )

      // Si ya existe una suscripción activa, retornar mensaje apropiado
      if (existingSubscription.data && existingSubscription.data.length > 0) {
        return {
          success: true,
          message: '¡Ya estás suscrito a nuestro boletín!',
          already_subscribed: true
        }
      }
    } catch (checkError) {
      // Si hay error verificando, continuar con la creación
      console.error('Error checking existing subscription:', checkError)
    }

    // Obtener información del request
    const headers = getHeaders(event)
    const clientIp = headers['x-forwarded-for'] || headers['x-real-ip'] || 'unknown'

    // Determinar el origen de la suscripción
    let source = 'end_section' // default
    if (body.source) {
      source = body.source
    }

    // Preparar datos de la suscripción
    const subscriptionData = {
      status: 'active',
      email: email,
      name: body.name?.trim() || null,
      source: source,
      client_ip: clientIp,
      unsubscribe_token: generateUnsubscribeToken()
    }

    // Intentar crear la suscripción
    try {
      console.log('📧 Intentando crear suscripción con datos:', subscriptionData)

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

      console.log('✅ Suscripción creada exitosamente:', subscriptionResponse.data.id)

      // Enviar email de bienvenida al suscriptor
      try {
        const resend = new Resend(config.resendApiKey)

        await resend.emails.send({
          from: config.resendSender,
          to: email,
          subject: '¡Bienvenido a nuestro boletín!',
          html: subscriptionConfirmationTemplate({
            name: subscriptionData.name,
            email: email,
            unsubscribe_token: subscriptionData.unsubscribe_token
          })
        })
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError)
        // No fallar si el email no se puede enviar
      }

      // Enviar notificación al webmaster
      try {
        const resend = new Resend(config.resendApiKey)

        await resend.emails.send({
          from: config.resendSender,
          to: config.webmasterEmail,
          subject: 'Nuevo suscriptor al boletín',
          html: newSubscriberNotificationTemplate({
            name: subscriptionData.name,
            email: email,
            source: source
          })
        })
      } catch (emailError) {
        console.error('Error sending webmaster notification:', emailError)
        // No fallar si el email no se puede enviar
      }

      // Respuesta exitosa
      return {
        success: true,
        message: '¡Gracias por suscribirte! Pronto recibirás nuestro boletín.',
        subscription_id: subscriptionResponse.data.id,
        already_subscribed: false
      }

    } catch (createError) {
      console.error('❌ Error creando suscripción:', createError)
      console.error('Detalles del error:', JSON.stringify(createError, null, 2))

      // Si el error es por email único (duplicado), retornar mensaje amigable
      if (createError.message && (createError.message.includes('unique') || createError.message.includes('Unique'))) {
        return {
          success: true,
          message: '¡Ya estás suscrito a nuestro boletín!',
          already_subscribed: true
        }
      }

      // Si el error tiene datos de Directus, mostrarlos
      if (createError.data && createError.data.errors) {
        console.error('Errores de Directus:', createError.data.errors)
      }

      // Otro error
      throw createError
    }

  } catch (error) {
    console.error('Error subscribing to newsletter:', error)

    return {
      success: false,
      errors: ['Ocurrió un error al procesar tu suscripción. Por favor, intenta nuevamente.']
    }
  }
})

// Función auxiliar para generar token único de desuscripción
function generateUnsubscribeToken() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36)
}
