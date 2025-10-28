/**
 * Script para poblar la colección de servicios con datos iniciales
 *
 * Uso: node directus/scripts/09-seed-services-data.js
 */

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar definidos en .env');
  process.exit(1);
}

/**
 * Datos de los servicios
 */
const services = [
  // 1. Sesiones Individuales
  {
    status: 'published',
    sort: 1,
    type: 'service',
    title: 'Sesiones Individuales',
    slug: 'sesiones-individuales',
    description: `
      <p>Las <b>sesiones de psicoterapia individual</b> son un espacio seguro para explorar lo que duele, comprender su raíz y transformar el sufrimiento en aprendizaje. Pero no nos quedamos solo en sanar lo difícil: también abrimos camino para que descubras y desarrolles <b>tu potencial interior</b>, tus recursos y la fuerza que ya habita en ti.</p>

      <p>Además, para quienes participan en el programa Camino Vital, las sesiones individuales representan un <b>recurso adicional</b>: permiten profundizar en los procesos de cada módulo, atender necesidades personales más específicas y acompañar de manera cercana el camino de transformación que estás emprendiendo.</p>

      <p>Cada encuentro es una invitación a mirar dentro de ti, liberar lo que pesa y <b>conectar con nuevas posibilidades de bienestar y crecimiento personal</b>.</p>
    `,
    featured_image: null,
    benefits: [
      { benefit: 'Acompañar y sanar heridas emocionales.' },
      { benefit: 'Manejar el estrés, la ansiedad o la tristeza.' },
      { benefit: 'Cultivar habilidades que te den equilibrio y claridad.' },
      { benefit: 'Potenciar tu capacidad de crecer, crear y vivir en coherencia con tu propósito.' }
    ]
  },

  // 2. Talleres de Respiración Holotrópica
  {
    status: 'published',
    sort: 2,
    type: 'workshop',
    title: 'Talleres de Respiración Holotrópica',
    slug: 'talleres-respiracion-holotropica',
    description: `
      <p>La <b>Respiración Holotrópica ®</b> fue desarrollada por <b>Stanislav y Christina Grof</b> en la década de 1970 en el Instituto Esalen (California). La palabra holotrópica proviene del griego <b><i>"holos"</i></b> que significa <b>"totalidad"</b> y <b><i>"trepein"</i></b> que significa <i><b>"moverse hacia"</b></i>, reflejando el espíritu de esta práctica: integrar cuerpo, mente, emociones y espíritu en un proceso de autodescubrimiento y transformación profunda.</p>

      <p>Este enfoque combina <b>respiración acelerada, música evocadora, trabajo corporal focalizado, expresión artística y procesos grupales</b>, creando un espacio seguro donde es posible acceder a <b>estados ampliados de conciencia</b>. En estos estados, la psique activa su capacidad natural de sanación y abre la puerta a distintos niveles de experiencia:</p>

      <ul>
        <li><b>Biográfico:</b> recuerdos y vivencias desde el nacimiento hasta la vida actual.</li>
        <li><b>Perinatal:</b> experiencias vinculadas al proceso de nacimiento.</li>
        <li><b>Transpersonal:</b> conexión con el inconsciente colectivo, símbolos arquetípicos y una dimensión espiritual más amplia.</li>
      </ul>

      <p>Durante los talleres, los participantes trabajan en parejas, alternando los roles de <b>"respirador"</b> y <b>"cuidador"</b>, siempre acompañados por facilitadores capacitados. El proceso incluye espacios de integración, como la pintura de mandalas, el compartir en grupo y el acompañamiento terapéutico cuando es necesario.</p>

      <p>En Camino Vital, la Respiración Holotrópica ® es una herramienta clave dentro del proceso integral de transformación en las seis dimensiones del ser humano. Sin embargo, también está abierta a quienes, sin participar en el programa completo, desean vivir una experiencia única de sanación y crecimiento interior.</p>
    `,
    featured_image: null,
    benefits: [
      { benefit: 'Liberación emocional y corporal, desbloqueando tensiones y traumas.' },
      { benefit: 'Sanación de heridas profundas y resignificación del dolor.' },
      { benefit: 'Mayor claridad y propósito vital, conectando con lo que da sentido a la vida.' },
      { benefit: 'Expansión de la conciencia, más allá de los límites del ego y del cuerpo.' },
      { benefit: 'Integración personal y espiritual, favoreciendo equilibrio, creatividad y resiliencia.' }
    ]
  },

  // 3. Talleres para el manejo creativo de las emociones
  {
    status: 'published',
    sort: 3,
    type: 'workshop',
    title: 'Talleres para el manejo creativo de las emociones',
    slug: 'talleres-manejo-creativo-emociones',
    description: `
      <p>Las emociones son parte esencial de nuestra vida. Sin embargo, cuando no aprendemos a manejarlas conscientemente, pueden convertirse en una fuente de tensión, sufrimiento o conflicto con los demás.</p>

      <p>En los <b>Talleres para el manejo creativo de las emociones</b> aprenderás a relacionarte de manera más sana con lo que sientes, utilizando recursos como <b>la respiración, el movimiento, la postura, el sonido y el diálogo mental</b>, entre otros. Estos métodos te permiten canalizar y transformar emociones intensas como <b>la rabia, la frustración, el miedo o la vergüenza</b>, para que dejen de ser un obstáculo y se conviertan en energía creativa y constructiva.</p>

      <p>Estos talleres forman parte del programa Camino Vital, pero también están abiertos a <b>todas las personas interesadas en fortalecer sus habilidades emocionales</b> y avanzar en un proceso de crecimiento personal.</p>

      <p>Cada encuentro es una invitación a descubrir que <b>las emociones no son un enemigo a controlar, sino una puerta hacia la transformación y el equilibrio interior</b>.</p>
    `,
    featured_image: null,
    benefits: [
      { benefit: 'Regular el estrés y recuperar el equilibrio interno.' },
      { benefit: 'Liberar bloqueos emocionales y generar mayor bienestar.' },
      { benefit: 'Desarrollar autoconciencia y confianza en tus propios recursos.' },
      { benefit: 'Aprender a transformar emociones difíciles en acciones más conscientes y constructivas.' }
    ]
  },

  // 4. Retiro Conexión Vital
  {
    status: 'published',
    sort: 4,
    type: 'service',
    title: 'Retiro Conexión Vital',
    slug: 'retiro-conexion-vital',
    description: `
      <p>Los Retiros son experiencias de varios días diseñadas para detener la rutina y abrir un espacio profundo de conexión, sanación y crecimiento. Se realizan en lugares donde se privilegia el contacto con la naturaleza, generando un ambiente de calma, vitalidad y renovación.</p>

      <p>En cada retiro trabajamos cinco conexiones esenciales que fortalecen las seis dimensiones del ser humano:</p>

      <ol>
        <li><b>Conexión con la naturaleza</b><p>El entorno natural se convierte en maestro y aliado, ayudándonos a soltar tensiones, recuperar equilibrio y sentirnos parte de algo más grande.</p></li>

        <li><b>Conexión mente-cuerpo</b><p>A través de la respiración consciente, el movimiento y el silencio interior, aprendemos a aquietar los pensamientos y activar la energía vital. Estas herramientas se convierten en recursos prácticos para la vida cotidiana</p></li>

        <li><b>Conexión con el ocio consciente</b><p>Redescubrimos el valor de descansar, disfrutar y estar presentes sin la presión de "hacer". El ocio consciente nos devuelve la capacidad de <b>ser</b>, de sentir gratitud y alegría genuina, recuperando la frescura en nuestra manera de vivir.</p></li>

        <li><b>Conexión con la esencia interior</b><p>Exploramos las seis dimensiones del ser humano (física, emocional, mental, existencial, espiritual y relacional) como puertas hacia la sanación y la transformación. El objetivo es encontrarnos con nuestra <b>esencia interior</b>, ese núcleo de autenticidad que sostiene nuestra vida.</p></li>

        <li><b>Conexión con otros</b><p>Las relaciones son espejos que nos muestran tanto nuestra luz como nuestra sombra. En la convivencia y el compartir, cultivamos virtudes como la empatía, la compasión y la solidaridad, generando vínculos auténticos y nutritivos.</p></li>
      </ol>

      <p>En los retiros utilizamos diferentes <b>herramientas de sanación y crecimiento</b> —como la respiración holotrópica, la meditación, el movimiento consciente, la expresión creativa y la reflexión grupal— que facilitan la integración de la experiencia y abren nuevas posibilidades de transformación personal.</p>
    `,
    featured_image: null,
    benefits: [
      { benefit: 'Recuperar energía y vitalidad en contacto con la naturaleza.' },
      { benefit: 'Sanar y transformar emociones profundas.' },
      { benefit: 'Manejar el estrés y liberar bloqueos emocionales.' },
      { benefit: 'Conectar con propósito y con la esencia interior.' },
      { benefit: 'Ampliar la conciencia y nutrir la espiritualidad.' },
      { benefit: 'Fortalecer vínculos y aprender de la relación con otros.' }
    ]
  },

  // 5. Camino Vital (especial con módulos)
  {
    status: 'published',
    sort: 5,
    type: 'camino-vital',
    title: 'Programa Camino Vital',
    slug: 'camino-vital',
    description: `
      <p>Camino Vital es un programa integral de desarrollo personal diseñado para acompañarte en los momentos en que más lo necesitas. Si estás atravesando una crisis y quieres recuperar el rumbo de tu vida con tus propios recursos, o si sientes el llamado a iniciar un proceso profundo de autoconocimiento y fortalecimiento interior, este camino es para ti.</p>

      <p>El programa dura treinta semanas y está organizado en tres módulos progresivos —Estabilizar, Sanar y Crecer— que integran de manera práctica y vivencial las seis dimensiones del ser humano: física, emocional, mental, existencial, espiritual y relacional. En Camino Vital encontrarás, en un mismo espacio y de forma articulada, el trabajo con herramientas como la Respiración Holotrópica, las Constelaciones Familiares, la Imaginación Guiada con Música, TRE® (Tension & Trauma Release Exercises), la Meditación, el Manejo Creativo de las Emociones y de la Comunicación, entre otras prácticas que potencian la transformación y el crecimiento interior.</p>

      <h5>Más que un curso, una experiencia transformadora</h5>

      <p>Camino Vital es más que un curso: es un mapa y una guía que se vive de manera individual y grupal. En cada encuentro respiras, reflexionas, sientes y practicas herramientas que te permiten transformar tu vida desde adentro hacia afuera. No se trata solo de aprender conceptos, sino de vivir procesos que generan cambios reales y duraderos.</p>

      <p>En esencia, Camino Vital es una experiencia transformadora que combina conocimiento, práctica y vivencia. Un proceso integral que te invita a caminar paso a paso hacia mayor equilibrio, plenitud y sentido en tu vida.</p>
    `,
    featured_image: null,
    main_video: null,
    benefits: [
      { benefit: 'Recuperar estabilidad y energía para tu vida diaria.' },
      { benefit: 'Sanar heridas emocionales y transformar el dolor en aprendizaje.' },
      { benefit: 'Desarrollar habilidades prácticas para manejar el estrés y las emociones difíciles.' },
      { benefit: 'Potenciar tu claridad mental, creatividad y resiliencia.' },
      { benefit: 'Conectar con tu propósito y darle dirección a tu vida.' },
      { benefit: 'Fortalecer tu dimensión espiritual, cultivando calma, introspección y trascendencia.' },
      { benefit: 'Aprender a relacionarte desde la empatía, la autenticidad y la confianza.' }
    ],
  }
];

/**
 * Insertar los servicios
 */
async function seedServices() {
  console.log('\n🔧 Insertando servicios...');

  for (const service of services) {
    console.log(`\n   → Insertando: ${service.title} (${service.type})`);

    const response = await fetch(`${DIRECTUS_URL}/items/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify(service)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`   ❌ Error al insertar ${service.title}:`, error);
    } else {
      const data = await response.json();
      console.log(`   ✅ ${service.title} insertado (ID: ${data.data.id})`);
    }
  }

  console.log('\n✅ Proceso de inserción completado');
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Iniciando seed de datos de servicios en Directus...');
  console.log(`📍 URL: ${DIRECTUS_URL}`);

  try {
    await seedServices();

    console.log('\n✨ ¡Datos de servicios insertados exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Servicios insertados: ${services.length}`);
    console.log(`   - 2 Servicios normales`);
    console.log(`   - 2 Talleres`);
    console.log(`   - 1 Camino Vital (con 3 módulos)`);
    console.log('\n💡 Nota: Las imágenes están como NULL por defecto.');
    console.log('   Puedes subirlas manualmente en Directus.\n');

  } catch (error) {
    console.error('\n❌ Error durante la ejecución:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
