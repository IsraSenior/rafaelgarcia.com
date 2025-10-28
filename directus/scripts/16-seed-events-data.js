import 'dotenv/config';

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.NUXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || process.env.NUXT_PUBLIC_DIRECTUS_TOKEN;

const eventsData = [
  {
    status: 'published',
    title: 'Taller de Respiración Holotropica',
    slug: 'taller-respiracion-holotropica-marzo',
    featured: true,
    description: `<p>Únete a este transformador taller de <strong>Respiración Holotropica</strong>, una poderosa técnica de sanación y autoconocimiento desarrollada por Stanislav Grof.</p>

<p>En este espacio sagrado exploraremos:</p>
<ul>
  <li>Técnicas avanzadas de respiración consciente</li>
  <li>Integración de experiencias emocionales profundas</li>
  <li>Liberación de bloqueos energéticos</li>
  <li>Conexión con tu sabiduría interior</li>
</ul>

<p>La Respiración Holotropica facilita estados expandidos de consciencia que permiten acceder a memorias, emociones y experiencias que normalmente permanecen fuera de nuestro alcance consciente.</p>

<p><strong>¿Qué incluye?</strong></p>
<ul>
  <li>Sesión de respiración guiada (3 horas)</li>
  <li>Círculo de integración y compartir</li>
  <li>Material de apoyo</li>
  <li>Refrigerio saludable</li>
</ul>`,
    event_type: 'rafael_garcia',
    format: 'in_person',
    pricing_type: 'paid',
    price: 150000,
    location: 'Centro Holístico Semilla, Carrera 15 #93-30, Bogotá',
    date_start: new Date('2025-03-15T09:00:00').toISOString(),
    date_end: new Date('2025-03-15T18:00:00').toISOString(),
    capacity: 20,
    whatsapp_number: '+18092225466',
    whatsapp_message_template: 'Hola Rafael! Me gustaría reservar mi cupo para {event_title}. Mi nombre es {name} y mi email es {email}. Espero tu confirmación!',
    organizer_name: 'Rafael García',
    organizer_email: 'contacto@rafaelgarcia.com.co',
    tags: ['respiración', 'holotropica', 'sanación', 'taller']
  },
  {
    status: 'published',
    title: 'Conferencia: El Arte de Vivir Conscientemente',
    slug: 'conferencia-vivir-conscientemente',
    featured: true,
    description: `<p>Una conferencia transformadora sobre cómo vivir con mayor presencia, propósito y plenitud en tu día a día.</p>

<p><strong>Temas a explorar:</strong></p>
<ul>
  <li>La importancia de la consciencia plena en la vida moderna</li>
  <li>Herramientas prácticas para cultivar la presencia</li>
  <li>Cómo transformar hábitos inconscientes</li>
  <li>El poder de las pequeñas decisiones conscientes</li>
  <li>Conectar con tu propósito de vida</li>
</ul>

<p>Esta conferencia es ideal tanto para quienes inician su camino de crecimiento personal como para quienes buscan profundizar en su práctica.</p>

<p><strong>Modalidad:</strong> La conferencia será transmitida en vivo por Zoom con espacio para preguntas y respuestas.</p>`,
    event_type: 'rafael_garcia',
    format: 'virtual',
    pricing_type: 'free',
    price: 0,
    virtual_link: 'https://zoom.us/j/example',
    date_start: new Date('2025-03-08T19:00:00').toISOString(),
    date_end: new Date('2025-03-08T21:00:00').toISOString(),
    capacity: 0,
    whatsapp_number: '+18092225466',
    whatsapp_message_template: 'Hola! Me gustaría registrarme para {event_title}. Mi nombre es {name} y mi email es {email}.',
    organizer_name: 'Rafael García',
    organizer_email: 'contacto@rafaelgarcia.com.co',
    tags: ['conferencia', 'consciencia', 'mindfulness', 'gratuito']
  },
  {
    status: 'published',
    title: 'Retiro de Fin de Semana: Conexión Vital',
    slug: 'retiro-conexion-vital-abril',
    featured: true,
    description: `<p>Un retiro de inmersión total diseñado para reconectar con tu esencia, sanar y transformar tu vida desde adentro.</p>

<p><strong>Este retiro incluye:</strong></p>
<ul>
  <li>3 sesiones de Respiración Holotropica</li>
  <li>Talleres de gestión emocional creativa</li>
  <li>Meditaciones guiadas</li>
  <li>Círculos de palabra y compartir</li>
  <li>Tiempo en la naturaleza</li>
  <li>Todas las comidas vegetarianas</li>
  <li>Alojamiento en habitación compartida</li>
</ul>

<p>Este retiro es una oportunidad para alejarte del ruido cotidiano y sumergirte en un proceso profundo de autoconocimiento y sanación en un ambiente seguro y contenedor.</p>

<p><strong>Ubicación:</strong> Finca campestre a 2 horas de Bogotá, rodeada de naturaleza y paz.</p>

<p><strong>Cupos limitados</strong> - Solo 15 participantes para garantizar una experiencia íntima y personalizada.</p>`,
    event_type: 'rafael_garcia',
    format: 'in_person',
    pricing_type: 'paid',
    price: 850000,
    location: 'Finca El Refugio, La Calera, Cundinamarca',
    date_start: new Date('2025-04-05T15:00:00').toISOString(),
    date_end: new Date('2025-04-07T16:00:00').toISOString(),
    capacity: 15,
    whatsapp_number: '+18092225466',
    whatsapp_message_template: 'Hola Rafael! Me interesa el retiro {event_title}. Mi nombre es {name}, email: {email}. Me gustaría conocer más detalles y reservar mi cupo.',
    organizer_name: 'Rafael García',
    organizer_email: 'contacto@rafaelgarcia.com.co',
    tags: ['retiro', 'inmersión', 'conexión', 'naturaleza']
  },
  {
    status: 'published',
    title: 'Taller Online: Gestión Creativa de las Emociones',
    slug: 'taller-online-gestion-emociones',
    featured: false,
    description: `<p>Aprende a relacionarte con tus emociones de manera saludable y creativa en este taller online de 4 semanas.</p>

<p><strong>Contenido del programa:</strong></p>
<ul>
  <li><strong>Semana 1:</strong> Entendiendo el universo emocional</li>
  <li><strong>Semana 2:</strong> Identificación y expresión emocional</li>
  <li><strong>Semana 3:</strong> Herramientas de regulación emocional</li>
  <li><strong>Semana 4:</strong> Integración y práctica en la vida diaria</li>
</ul>

<p>Cada sesión incluye teoría, ejercicios prácticos y espacios de reflexión grupal.</p>

<p><strong>Modalidad:</strong> 4 sesiones en vivo por Zoom, con grabaciones disponibles para los participantes.</p>`,
    event_type: 'rafael_garcia',
    format: 'virtual',
    pricing_type: 'paid',
    price: 280000,
    virtual_link: 'https://zoom.us/j/example-emociones',
    date_start: new Date('2025-03-20T18:30:00').toISOString(),
    date_end: new Date('2025-03-20T20:30:00').toISOString(),
    capacity: 25,
    whatsapp_number: '+18092225466',
    whatsapp_message_template: 'Hola! Me interesa el taller {event_title}. Soy {name}, email: {email}. Quisiera más información para inscribirme.',
    organizer_name: 'Rafael García',
    organizer_email: 'contacto@rafaelgarcia.com.co',
    tags: ['taller', 'emociones', 'online', 'gestión emocional']
  },
  {
    status: 'published',
    title: 'Círculo de Hombres: Masculinidad Consciente',
    slug: 'circulo-hombres-marzo',
    featured: false,
    description: `<p>Un espacio sagrado para hombres que desean explorar y sanar su masculinidad, compartir desde la vulnerabilidad y crecer en comunidad.</p>

<p><strong>En este círculo exploraremos:</strong></p>
<ul>
  <li>Patrones heredados de masculinidad</li>
  <li>Expresión emocional auténtica</li>
  <li>Relaciones sanas con uno mismo y los demás</li>
  <li>Propósito y misión de vida</li>
  <li>Sanación del linaje masculino</li>
</ul>

<p>Este es un espacio confidencial, sin juicio, donde cada hombre puede ser completamente auténtico.</p>

<p><strong>Facilitado por:</strong> Rafael García junto con Juan Martínez, terapeuta especializado en masculinidad consciente.</p>`,
    event_type: 'third_party',
    format: 'in_person',
    pricing_type: 'paid',
    price: 80000,
    location: 'Centro Mandala, Calle 67 #7-35, Bogotá',
    date_start: new Date('2025-03-22T10:00:00').toISOString(),
    date_end: new Date('2025-03-22T14:00:00').toISOString(),
    capacity: 12,
    whatsapp_number: '+18092225466',
    whatsapp_message_template: 'Hola! Me interesa participar en {event_title}. Mi nombre es {name}, email: {email}.',
    organizer_name: 'Rafael García & Juan Martínez',
    organizer_email: 'circuloshombres@gmail.com',
    tags: ['círculo', 'hombres', 'masculinidad', 'comunidad']
  },
  {
    status: 'published',
    title: 'Webinar Gratuito: Introducción a la Respiración Consciente',
    slug: 'webinar-introduccion-respiracion',
    featured: false,
    description: `<p>Descubre el poder transformador de la respiración consciente en este webinar introductorio gratuito.</p>

<p><strong>Aprenderás:</strong></p>
<ul>
  <li>Fundamentos de la respiración consciente</li>
  <li>Beneficios para la salud física y mental</li>
  <li>Técnicas básicas que puedes practicar en casa</li>
  <li>Cómo la respiración puede ayudarte a gestionar el estrés</li>
</ul>

<p>Ideal para quienes quieren iniciarse en prácticas de respiración y autoconocimiento.</p>

<p><strong>Incluye:</strong> Sesión práctica guiada de 20 minutos.</p>`,
    event_type: 'rafael_garcia',
    format: 'virtual',
    pricing_type: 'free',
    price: 0,
    virtual_link: 'https://zoom.us/j/example-webinar',
    date_start: new Date('2025-03-01T20:00:00').toISOString(),
    date_end: new Date('2025-03-01T21:30:00').toISOString(),
    capacity: 0,
    whatsapp_number: '+18092225466',
    whatsapp_message_template: 'Hola! Quisiera registrarme para {event_title}. Mi nombre es {name} y mi email es {email}.',
    organizer_name: 'Rafael García',
    organizer_email: 'contacto@rafaelgarcia.com.co',
    tags: ['webinar', 'respiración', 'gratuito', 'introducción']
  }
];

async function seedEvents() {
  console.log('🌱 Iniciando seed de eventos...\n');

  try {
    let createdCount = 0;
    let skippedCount = 0;

    for (const eventData of eventsData) {
      console.log(`📅 Creando evento: ${eventData.title}`);

      try {
        // Verificar si ya existe un evento con este slug
        const checkQuery = new URLSearchParams({
          'filter[slug][_eq]': eventData.slug,
          'limit': '1'
        });

        const existingResponse = await fetch(
          `${DIRECTUS_URL}/items/events?${checkQuery}`,
          {
            headers: {
              'Authorization': `Bearer ${DIRECTUS_TOKEN}`
            }
          }
        );

        const existingData = await existingResponse.json();

        if (existingData.data && existingData.data.length > 0) {
          console.log(`   ⚠️  Evento "${eventData.title}" ya existe, omitiendo...`);
          skippedCount++;
          continue;
        }

        // Crear el evento
        const response = await fetch(`${DIRECTUS_URL}/items/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DIRECTUS_TOKEN}`
          },
          body: JSON.stringify(eventData)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.log(`   ❌ Error creando evento: ${errorText}`);
          continue;
        }

        console.log(`   ✅ Evento "${eventData.title}" creado exitosamente`);
        createdCount++;

      } catch (error) {
        console.error(`   ❌ Error procesando evento "${eventData.title}":`, error.message);
      }
    }

    console.log('\n📊 Resumen:');
    console.log(`   ✅ Eventos creados: ${createdCount}`);
    console.log(`   ⚠️  Eventos omitidos: ${skippedCount}`);
    console.log('\n🎉 ¡Seed de eventos completado!');
    console.log('\n💡 Ahora puedes ver los eventos en Directus y en el sitio web');

  } catch (error) {
    console.error('❌ Error durante el seed:', error.message);
    process.exit(1);
  }
}

seedEvents();
