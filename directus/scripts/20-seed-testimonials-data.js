/**
 * Script para poblar la colección de testimonios con datos iniciales
 *
 * Uso: node directus/scripts/20-seed-testimonials-data.js
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
 * Datos de los testimonios
 */
const testimonials = [
  {
    status: 'published',
    sort: 1,
    name: 'Sebastián Mejias',
    role: 'Director creativo',
    quote: 'Es el mejor programa para conocerse a uno mismo, cuando uno cree que lleva toda la vida conviviendo y conociendose a uno mismo entra al taller y se da cuenta que falta mucho por auto conocerse.',
    image: '/male-profile.webp'
  },
  {
    status: 'published',
    sort: 2,
    name: 'Yessica Ortiz',
    role: 'Diseñadora industrial',
    quote: 'El programa de camino vital me ayudó a entender el camino que quiero escoger para mi vida, me dio las herramientas para calmar mis emociones cuando todo parece salirse de control y aprovecharlas para aprender de cada situación lo más que pueda. Para hacer parte de mi el conocimiento de cómo funciono yo personalmente, alejado de cómo funciona el mundo en general. Me dio un lugar donde me sentí entendida y acompañada.',
    image: '/female-profile.webp'
  },
  {
    status: 'published',
    sort: 3,
    name: 'Alejandra Velandia',
    role: 'Psicóloga',
    quote: 'Camino Vital es una invitación para mirar hacia adentro y cuestionarte cómo vives tu vida desde las distintas dimensiones que nos hace seres humanos. Es un camino en donde dejas de ser víctima de tu realidad para empezar a asumir un papel más activo de cómo respondes a aquellas situaciones que no controlas y, en definitiva, para empezar a crear esa vida que tanto deseas.',
    image: '/female-profile.webp'
  },
  {
    status: 'published',
    sort: 4,
    name: 'Paula Elena Vasco',
    role: 'Comunicadora social y periodista',
    quote: 'Gracias a Camino Vital volví a disfrutar de la vida en sus pequeñas cosas diarias, a priorizarme sin culpa y a reconectarme con lo que de verdad quiero para mi. Aprendí a hacer pausas, a cuidarme desde el amor y no desde la exigencia, y a elegir con más conciencia lo que me nutre y nutre mis relaciones.',
    image: '/female-profile.webp'
  },
  {
    status: 'published',
    sort: 5,
    name: 'Fernanda Molina',
    role: 'Psicóloga',
    quote: 'Para mí, Camino Vital fue mucho más que un programa; fue un compañero que me desafió a enfrentar lo que pensaba sobre mi vida. Fue un camino constante de búsqueda y descubrimiento personal. Me ayudó a reconocer quién soy y a crecer desde lo más profundo. Lo recomiendo de corazón, pero solo si estás realmente dispuesto a trabajar en ti y a abrirte al cambio.',
    image: '/female-profile.webp'
  },
  {
    status: 'published',
    sort: 6,
    name: 'Sandra Cruz',
    role: '',
    quote: 'Este programa me permitió darme cuenta de los superpoderes que tengo, que puedo potenciar y que elijo crear cuando trabajo en mí.',
    image: '/female-profile.webp'
  },
  {
    status: 'published',
    sort: 7,
    name: 'Jennifer Vargas',
    role: 'Antropóloga',
    quote: 'Camino vital es un regalo para el alma. Si bien la vida consiste en ser un continuo aprendizaje, que bonito cultivar y gestar dichos espacios desde el amor y la compasión.',
    image: '/female-profile.webp'
  },
  {
    status: 'published',
    sort: 8,
    name: 'Diana Gamboa',
    role: 'Lic. en Humanidades',
    quote: 'En Camino Vital me sentí profundamente afortunada de tener la posibilidad de trabajar en mi. Estuve muy motivada con los diferentes contenidos y experiencias. Descubrí versiones de mí de las que no era consciente, asombrada de todo lo que iba encontrando en mi proceso personal. Me sentí muy acompañada y respaldada en ese ciclo de ir y venir con las emociones y con los miedos.',
    image: '/female-profile.webp'
  }
];

/**
 * Insertar los testimonios
 */
async function seedTestimonials() {
  console.log('\n💬 Insertando testimonios...');

  for (const testimonial of testimonials) {
    console.log(`\n   → Insertando: ${testimonial.name}`);

    const response = await fetch(`${DIRECTUS_URL}/items/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify(testimonial)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`   ❌ Error al insertar ${testimonial.name}:`, error);
    } else {
      const data = await response.json();
      console.log(`   ✅ ${testimonial.name} insertado (ID: ${data.data.id})`);
    }
  }

  console.log('\n✅ Proceso de inserción completado');
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Iniciando seed de testimonios en Directus...');
  console.log(`📍 URL: ${DIRECTUS_URL}`);

  try {
    await seedTestimonials();

    console.log('\n✨ ¡Testimonios insertados exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Testimonios insertados: ${testimonials.length}`);
    console.log(`   - Todos con status: published`);
    console.log('\n💡 Los testimonios ya están listos para ser consumidos en el frontend.\n');

  } catch (error) {
    console.error('\n❌ Error durante la ejecución:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
