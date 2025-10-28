/**
 * Script para insertar datos de prueba en la colección Blog Posts
 *
 * Uso: node directus/scripts/02-seed-blog-data.js
 */

import 'dotenv/config'

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || process.env.DIRECTUS_TOKEN

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar configurados en .env')
  process.exit(1)
}

const samplePosts = [
  {
    status: 'published',
    title: 'Mi primera experiencia con la respiración Holotrópica',
    slug: 'primera-experiencia-respiracion-holotropica',
    excerpt: 'Un viaje profundo hacia el interior a través de la respiración consciente. Descubre cómo esta poderosa técnica puede transformar tu vida.',
    content: `
      <h2>El comienzo de un viaje interior</h2>
      <p>Cuando escuché por primera vez sobre la respiración holotrópica, no sabía qué esperar. Solo sabía que estaba lista para explorar nuevas dimensiones de mi ser y sanar aquello que llevaba cargando durante años.</p>

      <p>La sesión comenzó en un espacio seguro, acompañada por facilitadores experimentados. La música empezó a sonar, profunda y envolvente, y me entregué al ritmo de mi propia respiración.</p>

      <h2>La experiencia</h2>
      <p>Lo que sucedió después fue extraordinario. A medida que mi respiración se profundizaba, comencé a sentir oleadas de emociones que no sabía que estaban ahí. Lágrimas, risas, liberación. Todo emergió de forma natural, sin esfuerzo.</p>

      <blockquote>
        <p>"En ese momento comprendí que mi cuerpo guarda la memoria de todo lo vivido, y que a través de la respiración, podía acceder a esa sabiduría interior."</p>
      </blockquote>

      <h2>Integración y aprendizaje</h2>
      <p>Después de la sesión, en el espacio de integración grupal, compartí mi experiencia con otros participantes. Fue reconfortante saber que no estaba sola en este viaje, que cada uno tenía su propia historia de sanación.</p>

      <p>La respiración holotrópica me enseñó que:</p>
      <ul>
        <li>Nuestro cuerpo tiene una sabiduría innata para sanarse</li>
        <li>Las emociones bloqueadas necesitan ser sentidas para ser liberadas</li>
        <li>El acompañamiento profesional es esencial en procesos profundos</li>
        <li>La transformación es posible cuando nos permitimos sentir</li>
      </ul>

      <h2>Una invitación</h2>
      <p>Si sientes el llamado a explorar tu mundo interior, a sanar heridas emocionales o simplemente a conocerte más profundamente, la respiración holotrópica puede ser una herramienta poderosa en tu camino.</p>

      <p>Recuerda: este es un proceso que requiere apertura, valentía y confianza. Pero te aseguro que el viaje vale la pena.</p>
    `,
    author: 'Rafael García',
    author_avatar: 'https://avatar.iran.liara.run/public/48',
    featured_image: 'https://picsum.photos/800/800?random=1',
    tags: ['Respiración', 'Transformación', 'Experiencia personal'],
    date_published: new Date('2025-01-15T10:00:00').toISOString(),
    reading_time: 6,
    meta_title: 'Mi primera experiencia con la respiración Holotrópica - Blog',
    meta_description: 'Descubre cómo fue mi primera sesión de respiración holotrópica y cómo esta técnica puede ayudarte en tu proceso de transformación personal.'
  },
  {
    status: 'published',
    title: 'Regulación Emocional: La clave del bienestar',
    slug: 'regulacion-emocional-clave-bienestar',
    excerpt: 'Aprender a regular nuestras emociones es fundamental para vivir en equilibrio. Descubre técnicas prácticas para gestionar tu mundo emocional.',
    content: `
      <h2>¿Qué es la regulación emocional?</h2>
      <p>La regulación emocional es la capacidad de gestionar y modular nuestras respuestas emocionales de manera consciente y saludable. No se trata de reprimir o negar lo que sentimos, sino de aprender a relacionarnos con nuestras emociones de forma constructiva.</p>

      <h2>¿Por qué es importante?</h2>
      <p>Vivimos en un mundo que constantemente nos desafía emocionalmente. El estrés laboral, las relaciones personales, los cambios inesperados... todo esto genera respuestas emocionales que, si no sabemos gestionar, pueden afectar nuestra salud física y mental.</p>

      <p>Una buena regulación emocional nos permite:</p>
      <ul>
        <li>Tomar decisiones más conscientes y alineadas con nuestros valores</li>
        <li>Mantener relaciones más saludables y auténticas</li>
        <li>Reducir el estrés y la ansiedad</li>
        <li>Aumentar nuestra resiliencia ante adversidades</li>
        <li>Vivir con mayor equilibrio y bienestar</li>
      </ul>

      <h2>Técnicas prácticas de regulación emocional</h2>

      <h3>1. La respiración consciente</h3>
      <p>Cuando nos sentimos abrumados emocionalmente, la respiración es nuestra primera herramienta. Respirar profunda y conscientemente activa el sistema nervioso parasimpático, ayudándonos a calmarnos.</p>

      <p><strong>Práctica:</strong> Inhala en 4 tiempos, sostén 4 tiempos, exhala en 6 tiempos. Repite durante 3 minutos.</p>

      <h3>2. El registro emocional</h3>
      <p>Llevar un diario de emociones nos ayuda a identificar patrones y desencadenantes. Escribe qué sentiste, qué lo provocó y cómo respondiste.</p>

      <h3>3. La pausa consciente</h3>
      <p>Entre el estímulo y nuestra respuesta hay un espacio. En ese espacio está nuestro poder de elección. Practica hacer una pausa antes de reaccionar.</p>

      <h3>4. El movimiento corporal</h3>
      <p>Las emociones se almacenan en el cuerpo. Caminar, bailar, estirarse o practicar yoga puede ayudar a liberar tensiones emocionales acumuladas.</p>

      <blockquote>
        <p>"Entre el estímulo y la respuesta hay un espacio. En ese espacio está nuestro poder para elegir nuestra respuesta. En nuestra respuesta está nuestro crecimiento y nuestra libertad." - Viktor Frankl</p>
      </blockquote>

      <h2>El proceso es gradual</h2>
      <p>Desarrollar la capacidad de regular nuestras emociones no sucede de la noche a la mañana. Es un proceso que requiere práctica, paciencia y auto-compasión.</p>

      <p>En Camino Vital, trabajamos estas habilidades de forma integral, combinando conocimiento teórico con prácticas vivenciales que permiten una transformación real y duradera.</p>
    `,
    author: 'Rafael García',
    author_avatar: 'https://avatar.iran.liara.run/public/48',
    featured_image: 'https://picsum.photos/800/800?random=2',
    tags: ['Emociones', 'Bienestar', 'Herramientas prácticas'],
    date_published: new Date('2025-01-20T14:30:00').toISOString(),
    reading_time: 7,
    meta_title: 'Regulación Emocional: Técnicas para el Bienestar',
    meta_description: 'Aprende técnicas prácticas de regulación emocional para vivir con mayor equilibrio y bienestar en tu día a día.'
  },
  {
    status: 'published',
    title: 'Vive un día a la vez: El poder del presente',
    slug: 'vive-un-dia-a-la-vez',
    excerpt: 'La ansiedad por el futuro y el peso del pasado nos impiden disfrutar el único momento que realmente existe: el ahora.',
    content: `
      <h2>El peso de vivir en otros tiempos</h2>
      <p>¿Cuántas veces te has descubierto preocupándote por algo que aún no ha sucedido? ¿O reviviendo situaciones del pasado que ya no puedes cambiar?</p>

      <p>Vivir atrapados entre el pasado y el futuro es una de las principales causas de ansiedad, estrés y sufrimiento emocional. Nos perdemos la riqueza del presente, el único momento donde realmente podemos actuar, sentir y vivir.</p>

      <h2>¿Qué significa vivir un día a la vez?</h2>
      <p>Vivir un día a la vez no significa ser irresponsable o no planificar. Significa poner nuestra atención y energía en lo que está sucediendo ahora, en lo que podemos hacer hoy, en este momento.</p>

      <p>Es reconocer que:</p>
      <ul>
        <li>El pasado ya ocurrió y no podemos cambiarlo</li>
        <li>El futuro aún no existe y preocuparnos en exceso no lo controla</li>
        <li>El presente es el único lugar donde podemos actuar</li>
        <li>Cada día trae sus propios desafíos y también sus propias alegrías</li>
      </ul>

      <h2>Beneficios de vivir en el presente</h2>

      <h3>Reducción de la ansiedad</h3>
      <p>La mayoría de nuestras preocupaciones nunca se materializan. Al enfocarnos en el presente, reducimos significativamente nuestros niveles de ansiedad.</p>

      <h3>Mayor claridad mental</h3>
      <p>Cuando no estamos divididos entre pasado, presente y futuro, nuestra mente se aclara. Podemos tomar mejores decisiones y ver las situaciones con más objetividad.</p>

      <h3>Conexión más profunda</h3>
      <p>Estar presente nos permite conectar genuinamente con las personas que nos rodean, disfrutar de experiencias simples y apreciar lo que tenemos.</p>

      <h2>Prácticas para vivir el presente</h2>

      <h3>1. La práctica de la gratitud matutina</h3>
      <p>Cada mañana, antes de levantarte, agradece por tres cosas de tu vida. Esto entrena tu mente a enfocarse en lo que tienes, no en lo que te falta.</p>

      <h3>2. Meditación de atención plena</h3>
      <p>Dedica 10 minutos diarios a sentarte en silencio, observando tu respiración. Cuando tu mente divague hacia el pasado o futuro, suavemente regresa tu atención a la respiración.</p>

      <h3>3. La regla de las 24 horas</h3>
      <p>Cuando enfrentes un desafío, pregúntate: "¿Qué puedo hacer HOY sobre esto?" Enfócate solo en las acciones del día presente.</p>

      <h3>4. Pausas conscientes</h3>
      <p>Varias veces al día, detente y observa: ¿Dónde está mi mente ahora? ¿En el pasado, futuro o presente? Si no está en el presente, tráela de vuelta gentilmente.</p>

      <blockquote>
        <p>"El secreto de la salud mental y física no es lamentarse por el pasado, ni preocuparse por el futuro, sino vivir el momento presente sabia y sinceramente."</p>
      </blockquote>

      <h2>Un día, una oportunidad</h2>
      <p>Cada nuevo día es una oportunidad para comenzar de nuevo, para elegir cómo queremos vivir este momento. No necesitas resolver todo hoy, solo necesitas estar presente para lo que este día trae.</p>

      <p>En nuestros talleres y en el programa Camino Vital, practicamos constantemente el arte de estar presentes, de honrar cada momento como sagrado, de vivir con mayor consciencia y menos automático.</p>

      <p>Porque al final, la vida no se vive en años, se vive en momentos. Y cada momento presente es una invitación a estar verdaderamente vivos.</p>
    `,
    author: 'Rafael García',
    author_avatar: 'https://avatar.iran.liara.run/public/48',
    featured_image: 'https://picsum.photos/800/800?random=3',
    tags: ['Mindfulness', 'Presente', 'Bienestar'],
    date_published: new Date('2025-01-25T09:00:00').toISOString(),
    reading_time: 8,
    meta_title: 'Vive un día a la vez - El poder del momento presente',
    meta_description: 'Descubre cómo vivir en el presente puede transformar tu vida, reducir la ansiedad y aumentar tu bienestar emocional.'
  },
  {
    status: 'draft',
    title: 'Cuando tu cuerpo habla: señales de alerta',
    slug: 'cuando-tu-cuerpo-habla-senales-alerta',
    excerpt: 'El cuerpo es sabio y nos habla constantemente. Aprende a escuchar sus señales antes de que se conviertan en crisis.',
    content: `
      <h2>El cuerpo nunca miente</h2>
      <p>Nuestro cuerpo es un sistema inteligente que constantemente nos envía mensajes sobre nuestro estado emocional y físico. El problema es que hemos aprendido a ignorar estas señales hasta que se vuelven imposibles de ignorar.</p>

      <p>El dolor de espalda crónico, las migrañas recurrentes, los problemas digestivos, el insomnio... muchas veces son la forma en que nuestro cuerpo nos dice: "¡Hey, necesito que me prestes atención!"</p>

      <h2>Señales comunes que no debes ignorar</h2>

      <h3>Tensión muscular crónica</h3>
      <p>Especialmente en hombros, cuello y espalda. Es una de las manifestaciones físicas más comunes del estrés emocional sostenido.</p>

      <h3>Alteraciones del sueño</h3>
      <p>Dificultad para conciliar el sueño, despertares nocturnos frecuentes o despertar muy temprano pueden indicar ansiedad no procesada.</p>

      <h3>Problemas digestivos</h3>
      <p>El sistema digestivo es extremadamente sensible al estrés. Gastritis, colon irritable o acidez recurrente pueden tener un componente emocional.</p>

      <h3>Fatiga constante</h3>
      <p>Si duermes suficiente pero sigues sintiéndote agotado, puede ser que estés cargando con emociones no procesadas que drenan tu energía.</p>

      <h2>La conexión mente-cuerpo</h2>
      <p>La ciencia ha demostrado que existe una relación directa entre nuestros pensamientos, emociones y salud física. El estrés crónico puede:</p>

      <ul>
        <li>Debilitar el sistema inmunológico</li>
        <li>Aumentar la presión arterial</li>
        <li>Provocar inflamación crónica</li>
        <li>Alterar el equilibrio hormonal</li>
        <li>Afectar la función digestiva</li>
      </ul>

      <h2>¿Qué hacer cuando el cuerpo habla?</h2>

      <h3>1. Escucha sin juzgar</h3>
      <p>El primer paso es reconocer las señales sin criticarte por tenerlas. Tu cuerpo no está fallando, está comunicándose.</p>

      <h3>2. Pregúntate qué te está diciendo</h3>
      <p>¿Qué emoción podría estar detrás de este síntoma? ¿Hay algo en tu vida que necesita atención?</p>

      <h3>3. Busca apoyo profesional</h3>
      <p>A veces necesitamos ayuda para interpretar y procesar lo que el cuerpo nos dice. Un terapeuta o facilitador de procesos somáticos puede ser invaluable.</p>

      <h3>4. Practica técnicas de liberación somática</h3>
      <p>TRE (Tension & Trauma Release Exercises), respiración holotrópica, yoga terapéutico... existen muchas herramientas para ayudar al cuerpo a liberar lo que está guardando.</p>

      <blockquote>
        <p>"El cuerpo lleva el registro de todo. Él es el campo de información donde se almacena nuestra historia." - Bessel van der Kolk</p>
      </blockquote>

      <h2>Prevención vs. Crisis</h2>
      <p>No esperes a que el cuerpo grite para prestarle atención. Desarrolla una práctica regular de chequeo interno:</p>

      <ul>
        <li>¿Cómo está mi respiración ahora?</li>
        <li>¿Dónde siento tensión en mi cuerpo?</li>
        <li>¿Qué emociones estoy sintiendo?</li>
        <li>¿Qué necesito en este momento?</li>
      </ul>

      <p>En Camino Vital trabajamos profundamente la conexión cuerpo-mente-emoción, utilizando técnicas como TRE, respiración holotrópica y trabajo corporal integrativo para ayudarte a escuchar y atender las señales de tu cuerpo antes de que se conviertan en crisis.</p>
    `,
    author: 'Rafael García',
    author_avatar: 'https://avatar.iran.liara.run/public/48',
    featured_image: 'https://picsum.photos/800/800?random=4',
    tags: ['Cuerpo', 'Salud', 'Señales'],
    date_published: null,
    reading_time: 7
  }
]

/**
 * Insertar los posts de prueba
 */
async function seedBlogPosts() {
  try {
    console.log('📝 Insertando posts de prueba en blog_posts...\n')

    for (const post of samplePosts) {
      console.log(`  → Creando: "${post.title}"`)

      const response = await fetch(`${DIRECTUS_URL}/items/blog_posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`
        },
        body: JSON.stringify(post)
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`    ❌ Error:`, error)
        continue
      }

      const data = await response.json()
      console.log(`    ✅ Post creado con ID: ${data.data.id}`)
    }

    console.log('\n✅ Todos los posts han sido insertados')
    return true
  } catch (error) {
    console.error('❌ Error al insertar posts:', error.message)
    return false
  }
}

/**
 * Ejecutar el script
 */
async function main() {
  console.log('🚀 Iniciando seed de datos para Blog\n')
  console.log(`📍 Directus URL: ${DIRECTUS_URL}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const seeded = await seedBlogPosts()

  if (!seeded) {
    console.error('\n⚠️  Hubo errores al insertar algunos posts')
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✨ Proceso completado!')
  console.log('\n📋 Próximos pasos:')
  console.log('   1. Verifica los posts en Directus Admin')
  console.log('   2. Actualiza el frontend para usar estos datos')
  console.log('   3. Sube imágenes de prueba si lo deseas')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
