/**
 * Endpoint para desuscribirse del boletín
 * Se accede mediante un link único con token
 */

import { Resend } from 'resend'
import { unsubscribeConfirmationTemplate } from '../../utils/emailTemplates.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const token = query.token

  // Validar que venga el token
  if (!token) {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <h1 class="error">Token inválido</h1>
          <p>El enlace de desuscripción no es válido.</p>
        </body>
      </html>
    `
  }

  try {
    // Buscar la suscripción por token
    const queryParams = new URLSearchParams({
      'filter[unsubscribe_token][_eq]': token,
      'filter[status][_neq]': 'unsubscribed',
      'limit': '1'
    })

    const subscriptionResponse = await $fetch(
      `${config.public.directusUrl}/items/subscriptions?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    const subscriptions = subscriptionResponse.data || []

    if (subscriptions.length === 0) {
      return `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
              .error { color: #d32f2f; }
            </style>
          </head>
          <body>
            <h1 class="error">Suscripción no encontrada</h1>
            <p>Esta suscripción no existe o ya ha sido cancelada.</p>
            <a href="https://rafaelgarcia.com.co" style="color: #2D5F5D; text-decoration: none;">Volver al sitio web</a>
          </body>
        </html>
      `
    }

    const subscription = subscriptions[0]

    // Actualizar el estado a "unsubscribed"
    await $fetch(
      `${config.public.directusUrl}/items/subscriptions/${subscription.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.public.directusToken}`
        },
        body: JSON.stringify({
          status: 'unsubscribed',
          date_unsubscribed: new Date().toISOString()
        })
      }
    )

    // Enviar email de confirmación
    try {
      const resend = new Resend(config.resendApiKey)

      await resend.emails.send({
        from: config.resendSender,
        to: subscription.email,
        subject: 'Has sido desuscrito del boletín',
        html: unsubscribeConfirmationTemplate({
          email: subscription.email
        })
      })
    } catch (emailError) {
      console.error('Error sending unsubscribe confirmation email:', emailError)
      // No fallar si el email no se puede enviar
    }

    // Retornar página de confirmación
    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Desuscripción confirmada</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              padding: 40px 20px;
              margin: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              text-align: center;
            }
            h1 {
              color: #2D5F5D;
              margin-bottom: 20px;
            }
            .checkmark {
              font-size: 64px;
              color: #4CAF50;
              margin-bottom: 20px;
            }
            p {
              color: #666;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .email {
              background: #f5f5f5;
              padding: 10px 20px;
              border-radius: 5px;
              display: inline-block;
              margin: 20px 0;
              font-weight: 600;
            }
            .button {
              display: inline-block;
              padding: 14px 30px;
              background: linear-gradient(135deg, #2D5F5D 0%, #4A8F8A 100%);
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-weight: 600;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="checkmark">✓</div>
            <h1>Desuscripción confirmada</h1>
            <p>Te has desuscrito exitosamente de nuestro boletín informativo.</p>
            <div class="email">${subscription.email}</div>
            <p>Ya no recibirás correos de nuestra parte.</p>
            <p>Si cambias de opinión, siempre puedes volver a suscribirte desde nuestro sitio web.</p>
            <a href="https://rafaelgarcia.com.co" class="button">Volver al sitio web</a>
          </div>
        </body>
      </html>
    `

  } catch (error) {
    console.error('Error unsubscribing:', error)

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <h1 class="error">Error</h1>
          <p>Ocurrió un error al procesar tu desuscripción. Por favor, intenta nuevamente.</p>
        </body>
      </html>
    `
  }
})
