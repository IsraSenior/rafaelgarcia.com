/**
 * Endpoint para enviar respuestas del test de onboarding
 * Crea un registro en Directus con todas las respuestas y datos capturados
 */

import { Resend } from 'resend'
import { testCompletionNotificationTemplate, testCompletionClientTemplate } from '../../utils/emailTemplates.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    // Leer el body del request
    const body = await readBody(event)

    // Validaciones básicas
    const errors = []

    if (!body.firstName || body.firstName.trim() === '') {
      errors.push('El nombre es requerido')
    }

    if (!body.lastName || body.lastName.trim() === '') {
      errors.push('El apellido es requerido')
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

    if (!body.answers || typeof body.answers !== 'object') {
      errors.push('Las respuestas del test son requeridas')
    }

    if (!body.scores || !Array.isArray(body.scores)) {
      errors.push('Los puntajes del test son requeridos')
    }

    // Si hay errores, retornar
    if (errors.length > 0) {
      return {
        success: false,
        errors: errors
      }
    }

    // Obtener información del request para la IP del servidor
    const headers = getHeaders(event)
    const serverIp = headers['x-forwarded-for'] || headers['x-real-ip'] || 'unknown'

    // Preparar datos del test
    const testResponseData = {
      status: 'new',

      // Datos del usuario
      first_name: body.firstName.trim(),
      last_name: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,

      // Datos técnicos (capturados en el cliente + IP del servidor)
      ip: body.technicalData?.ip || serverIp,
      country: body.technicalData?.country || null,
      city: body.technicalData?.city || null,
      browser: body.technicalData?.browser || null,
      browser_version: body.technicalData?.browserVersion || null,
      os: body.technicalData?.os || null,
      os_version: body.technicalData?.osVersion || null,
      device: body.technicalData?.device || null,
      screen_resolution: body.technicalData?.screenResolution || null,
      language: body.technicalData?.language || null,
      timezone: body.technicalData?.timezone || null,
      user_agent: body.technicalData?.userAgent || headers['user-agent'] || null,
      test_timestamp: body.technicalData?.timestamp || new Date().toISOString(),

      // Datos del test
      answers: body.answers,
      scores: body.scores,
      strongest_dimension: body.strongest?.label || null,
      strongest_score: body.strongest?.score || null,
      weakest_dimension: body.weakest?.label || null,
      weakest_score: body.weakest?.score || null,
      average_score: body.averageScore || null,
      completion_time: body.completionTime || null,
    }

    // Crear el registro en Directus
    const response = await $fetch(
      `${config.public.directusUrl}/items/test_responses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.public.directusToken}`
        },
        body: JSON.stringify(testResponseData)
      }
    )

    const responseId = response.data?.id || null

    // Enviar emails de notificación
    try {
      const resend = new Resend(config.resendApiKey)

      // Email al webmaster
      await resend.emails.send({
        from: config.resendSender,
        to: 'webmaster.conecttomas@gmail.com',
        subject: `Nuevo test completado - ${body.firstName} ${body.lastName}`,
        html: testCompletionNotificationTemplate({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,
          responseId: responseId,
          strongestDimension: body.strongest?.label || 'N/A',
          weakestDimension: body.weakest?.label || 'N/A',
          averageScore: body.averageScore || 0
        })
      })

      // Email al cliente
      await resend.emails.send({
        from: config.resendSender,
        to: body.email,
        subject: '¡Has completado tu test de diagnóstico!',
        html: testCompletionClientTemplate({
          firstName: body.firstName,
          responseId: responseId,
          strongestDimension: body.strongest?.label || 'N/A',
          weakestDimension: body.weakest?.label || 'N/A',
          averageScore: body.averageScore || 0
        })
      })
    } catch (emailError) {
      console.error('Error sending test completion emails:', emailError)
      // No fallar si los emails no se pueden enviar
    }

    // Respuesta exitosa
    return {
      success: true,
      message: 'Test completado exitosamente',
      response_id: responseId
    }

  } catch (error) {
    console.error('Error submitting test response:', error)

    return {
      success: false,
      errors: ['Ocurrió un error al guardar el test. Por favor, intenta nuevamente.']
    }
  }
})
