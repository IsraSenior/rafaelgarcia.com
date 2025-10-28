/**
 * Templates de email para Resend
 * Diseñados para coincidir con el look and feel del website Rafael García
 */

// Estilo base común para todos los emails
const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Literata:wght@300;400;600&family=Public+Sans:wght@300;400;600&display=swap');

  body {
    font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #4e555d;
    background: linear-gradient(135deg, rgba(66, 168, 252, 0.1) 0%, rgba(254, 132, 65, 0.1) 100%);
    margin: 0;
    padding: 20px;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .header {
    background-color: #313745;
    padding: 50px 30px;
    text-align: center;
  }
  .header h1 {
    color: #ffffff;
    margin: 0;
    font-family: 'Literata', serif;
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -1px;
    line-height: 1.1;
  }
  .content {
    padding: 40px 35px;
  }
  .content p {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
    color: #4e555d;
    margin-bottom: 16px;
  }
  .content ul {
    color: #4e555d;
    line-height: 1.8;
    font-size: 16px;
    font-weight: 300;
  }
  .content ul li {
    margin-bottom: 8px;
  }
  .info-box {
    background-color: #f8f9fa;
    border-left: 4px solid #42a8fc;
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
  }
  .info-box strong {
    color: #313745;
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .info-box p {
    margin: 0;
    font-size: 16px;
    color: #4e555d;
  }
  .info-box a {
    color: #42a8fc;
    text-decoration: none;
  }
  .highlight-box {
    background: linear-gradient(135deg, rgba(66, 168, 252, 0.1) 0%, rgba(254, 132, 65, 0.1) 100%);
    border-left: 4px solid #fe8441;
    padding: 20px;
    margin: 25px 0;
    border-radius: 8px;
  }
  .button {
    display: inline-block;
    padding: 14px 36px;
    background-color: #fe8441;
    color: #ffffff !important;
    text-decoration: none;
    border-radius: 50px;
    margin: 20px 0;
    font-weight: 600;
    font-size: 18px;
    font-family: 'Public Sans', sans-serif;
  }
  .footer {
    background-color: #f8f9fa;
    padding: 35px 30px;
    text-align: center;
    font-size: 14px;
    color: #4e555d;
  }
  .footer strong {
    font-family: 'Literata', serif;
    font-size: 18px;
    font-weight: 400;
    color: #313745;
    display: block;
    margin-bottom: 8px;
  }
  .footer p {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 300;
  }
  .unsubscribe {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e5ebec;
    font-size: 12px;
    color: #4e555d;
  }
  .unsubscribe a {
    color: #42a8fc;
    text-decoration: underline;
  }
  .highlight {
    color: #fe8441;
    font-weight: 600;
  }
`

/**
 * Template: Notificación de nuevo lead (para webmaster)
 */
export const contactNotificationTemplate = (data) => {
  const { name, lastname, email, service, contact_preference, message, newsletter_subscribed } = data

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo mensaje de contacto</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nuevo Contacto</h1>
    </div>

    <div class="content">
      <p>Has recibido un nuevo mensaje desde el formulario de contacto del sitio web.</p>

      <div class="info-box">
        <strong>Nombre completo</strong>
        <p>${name} ${lastname}</p>
      </div>

      <div class="info-box">
        <strong>Correo electrónico</strong>
        <p><a href="mailto:${email}">${email}</a></p>
      </div>

      <div class="info-box">
        <strong>Servicio de interés</strong>
        <p>${service}</p>
      </div>

      <div class="info-box">
        <strong>Preferencia de contacto</strong>
        <p>${contact_preference === 'email' ? 'Correo electrónico' : 'WhatsApp'}</p>
      </div>

      ${message ? `
      <div class="info-box">
        <strong>Mensaje</strong>
        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>
      ` : ''}

      ${newsletter_subscribed ? `
      <div class="highlight-box">
        <p style="margin: 0; color: #313745; font-weight: 600;">
          ✓ Esta persona también se suscribió al boletín informativo
        </p>
      </div>
      ` : ''}
    </div>

    <div class="footer">
      <strong>Rafael García</strong>
      <p>Transformación y Bienestar Emocional</p>
      <p style="margin-top: 15px; color: #4e555d; font-size: 12px;">
        Este correo fue enviado automáticamente desde rafaelgarcia.com.co
      </p>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Template: Confirmación de suscripción (para el suscriptor)
 */
export const subscriptionConfirmationTemplate = (data) => {
  const { name, email, unsubscribe_token } = data
  const unsubscribeUrl = `${process.env.NUXT_PUBLIC_SITE_URL || 'https://rafaelgarcia.com.co'}/api/newsletter/unsubscribe?token=${unsubscribe_token}`
  const firstName = name ? name.split(' ')[0] : ''

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a nuestro boletín</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${firstName ? `¡Bienvenid@ ${firstName}!` : '¡Bienvenid@!'}</h1>
    </div>

    <div class="content">
      <p style="font-size: 20px; color: #313745; font-weight: 400; font-family: 'Literata', serif; margin-bottom: 20px;">
        Gracias por unirte a nuestra comunidad
      </p>

      <p>
        Te has unido a una comunidad dedicada a la <span class="highlight">transformación personal</span> y el
        <span class="highlight">bienestar emocional</span>.
      </p>

      <p>Pronto empezarás a recibir:</p>

      <ul>
        <li>Información sobre programas y talleres de crecimiento personal</li>
        <li>Recursos y contenido exclusivo para tu desarrollo</li>
        <li>Testimonios e historias inspiradoras</li>
        <li>Eventos especiales y novedades</li>
      </ul>

      <div class="highlight-box">
        <p style="margin: 0; font-size: 16px; line-height: 1.6;">
          <strong style="color: #313745; font-size: 16px; margin-bottom: 8px; text-transform: none; letter-spacing: 0;">
            Tu viaje hacia el bienestar comienza aquí
          </strong><br>
          <span style="color: #4e555d;">
            Estamos emocionados de acompañarte en tu proceso de transformación y crecimiento personal.
          </span>
        </p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
        <a href="https://rafaelgarcia.com.co/servicios" class="button">
          Conoce nuestros servicios
        </a>
      </div>
    </div>

    <div class="footer">
      <strong>Rafael García</strong>
      <p>Psicólogo especialista en transformación y bienestar emocional</p>

      <div class="unsubscribe">
        <p>
          ¿No deseas recibir más correos?
          <a href="${unsubscribeUrl}">Cancelar suscripción</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Template: Notificación de nuevo suscriptor (para webmaster)
 */
export const newSubscriberNotificationTemplate = (data) => {
  const { name, email, source } = data

  const sourceLabels = {
    'contact_form': 'Formulario de contacto',
    'end_section': 'Sección de suscripción',
    'footer': 'Footer',
    'manual': 'Manual'
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo suscriptor</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nuevo Suscriptor</h1>
    </div>

    <div class="content">
      <p>Una nueva persona se ha suscrito a tu boletín informativo.</p>

      <div class="info-box">
        <strong>Nombre</strong>
        <p>${name || 'No proporcionado'}</p>
      </div>

      <div class="info-box">
        <strong>Correo electrónico</strong>
        <p><a href="mailto:${email}">${email}</a></p>
      </div>

      <div class="info-box">
        <strong>Origen de la suscripción</strong>
        <p>${sourceLabels[source] || source}</p>
      </div>

      <div class="highlight-box">
        <p style="margin: 0; color: #313745; font-weight: 600;">
          ✓ El suscriptor ya recibió un correo de bienvenida
        </p>
      </div>
    </div>

    <div class="footer">
      <strong>Rafael García</strong>
      <p>Transformación y Bienestar Emocional</p>
      <p style="margin-top: 15px; color: #4e555d; font-size: 12px;">
        Este correo fue enviado automáticamente desde rafaelgarcia.com.co
      </p>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Template: Confirmación de desuscripción
 */
export const unsubscribeConfirmationTemplate = (data) => {
  const { email } = data

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desuscripción confirmada</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header" style="background-color: #4e555d;">
      <h1>Desuscripción Confirmada</h1>
    </div>

    <div class="content">
      <p style="font-size: 20px; color: #313745; font-weight: 400; margin-bottom: 20px;">
        Has sido desuscrito exitosamente
      </p>

      <div class="info-box" style="border-left-color: #4e555d;">
        <strong>Correo desuscrito</strong>
        <p>${email}</p>
      </div>

      <p>
        Ya no recibirás correos de nuestro boletín informativo.
      </p>

      <p style="margin-top: 25px;">
        Lamentamos verte partir. Si cambias de opinión en el futuro,
        siempre puedes volver a suscribirte desde nuestro sitio web.
      </p>

      <div style="text-align: center; margin: 35px 0;">
        <a href="https://rafaelgarcia.com.co" class="button" style="background-color: #313745;">
          Volver al sitio web
        </a>
      </div>
    </div>

    <div class="footer">
      <strong>Rafael García</strong>
      <p>Psicólogo especialista en transformación y bienestar emocional</p>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Template: Notificación de registro a evento
 */
export const eventRegistrationNotificationTemplate = (data) => {
  const { eventTitle, eventDate, eventLocation, name, email, phone, status, registrationId } = data

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const statusLabels = {
    'pending': 'Pendiente de confirmación',
    'confirmed': 'Confirmado',
    'cancelled': 'Cancelado'
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo registro a evento</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nuevo Registro a Evento</h1>
    </div>

    <div class="content">
      <p>Una persona se ha registrado para asistir a uno de tus eventos.</p>

      <div class="highlight-box">
        <strong style="color: #313745; font-size: 20px; display: block; margin-bottom: 10px; font-weight: 600;">
          ${eventTitle}
        </strong>
        <p style="margin: 0; color: #4e555d;">
          📅 ${formatDate(eventDate)}${eventLocation ? `<br>📍 ${eventLocation}` : ''}
        </p>
      </div>

      <div class="info-box">
        <strong>Nombre</strong>
        <p>${name}</p>
      </div>

      <div class="info-box">
        <strong>Correo electrónico</strong>
        <p><a href="mailto:${email}">${email}</a></p>
      </div>

      ${phone ? `
      <div class="info-box">
        <strong>Teléfono</strong>
        <p><a href="tel:${phone}">${phone}</a></p>
      </div>
      ` : ''}

      <div class="info-box">
        <strong>Estado del registro</strong>
        <p>${statusLabels[status] || status}</p>
      </div>

      <div class="highlight-box">
        <p style="margin: 0; color: #313745; font-weight: 600;">
          ⚠️ Pendiente: El usuario debe confirmar su asistencia por WhatsApp
        </p>
      </div>

      <p style="margin-top: 25px;">
        Puedes gestionar este registro y cambiar su estado desde el panel de administración de Directus.
      </p>

      <div style="text-align: center; margin: 35px 0;">
        <a href="https://admin.rafaelgarcia.com.co/admin/content/event_registrations/${registrationId}" class="button">
          Ver registro en Directus
        </a>
      </div>
    </div>

    <div class="footer">
      <strong>Rafael García</strong>
      <p>Transformación y Bienestar Emocional</p>
      <p style="margin-top: 15px; color: #4e555d; font-size: 12px;">
        Este correo fue enviado automáticamente desde rafaelgarcia.com.co
      </p>
    </div>
  </div>
</body>
</html>
  `
}
