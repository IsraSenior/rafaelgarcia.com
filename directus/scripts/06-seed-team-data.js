/**
 * Script para poblar la colección de equipo con datos iniciales
 *
 * Uso: node directus/scripts/06-seed-team-data.js
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
 * Convertir texto plano a HTML con párrafos
 */
function textToHtml(text) {
  return text
    .trim()
    .split('\n\n')
    .filter(p => p.trim())
    .map(p => `<p>${p.trim()}</p>`)
    .join('\n\n');
}

/**
 * Generar slug desde el nombre
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Datos del equipo
 */
const teamMembers = [
  {
    status: 'published',
    sort: 1,
    name: 'Ricardo Didomenico',
    slug: 'ricardo-didomenico',
    title: 'Cirujano general',
    bio: textToHtml(`Médico con especialización en Cirugía General. Su experiencia clínica por más de 40 años se ha centrado en el abordaje integral de los pacientes.

En los últimos 20 años ha explorado el potencial terapéutico de los estados ampliados de conciencia.

Certificado por Grof Transpersonal Training en el 2014. Actualmente es facilitador de Talleres de Respiración Holotrópica.

Desde el año 2016 es terapeuta certificado en Imaginación Guiada con Música (GIM) por Atlantis Institute (USA), Fellow y Primary Trainer de AMI (Association for Music & Imagery) y facilitador de Hologim (Respiración Holotrópica en combinación con GIM).`),
    image: null,
    links: []
  },
  {
    status: 'published',
    sort: 2,
    name: 'Carolina Nensthiel',
    slug: 'carolina-nensthiel',
    title: 'Psicóloga social',
    bio: textToHtml(`Psicóloga Social y Magíster en Psicología Clínica de la Universidad Javeriana. Terapeuta Familiar Sistémica, Supervisora en Psicoterapia y Consteladora Cuántica.

Durante más de 13 años fue docente universitaria y consultora internacional, acompañando procesos en género, cuidado emocional y formación de profesionales que trabajan con víctimas del conflicto armado.

Integra en su práctica terapéutica la conexión con la naturaleza, la espiritualidad y saberes ancestrales, ofreciendo un acompañamiento profundo y humano. Su mirada combina lo académico, lo espiritual y lo vivencial, con la sencillez de quien se reconoce como eterna aprendiz y alquimista de su propia vida.`),
    image: null,
    links: []
  },
  {
    status: 'published',
    sort: 3,
    name: 'Carolina Amado',
    slug: 'carolina-amado',
    title: 'Psicóloga',
    bio: textToHtml(`Psicóloga de la Pontificia Universidad Javeriana, con sólida formación en terapias corporales y artísticas. Es Formadora y Facilitadora TRE®️ de TREforAll®️, con estudios complementarios en Bioenergética, Musicoterapia y Danzaterapia.

Su trabajo integra la psicoterapia centrada en el cuerpo, la comprensión de la historia personal y el acompañamiento emocional, utilizando diversas herramientas que promueven la sanación y el equilibrio. Acompaña especialmente a personas que viven altos niveles de estrés laboral y familiar, como ejecutivos y cuidadores, a través de la técnica TRE®️.

Además, facilita espacios de exploración y autoconocimiento con la herramienta del tarot terapéutico y holístico, ofreciendo una mirada integradora y sensible que conecta lo emocional, lo corporal y lo espiritual.`),
    image: null,
    links: []
  },
  {
    status: 'published',
    sort: 4,
    name: 'Lina Maria Hoyos',
    slug: 'lina-maria-hoyos',
    title: 'Mentora de Marca Personal Consciente',
    bio: textToHtml(`Mentora de Marca Personal Consciente, Coach en Propósito de Vida y estratega en Mercadeo Consciente y Sostenible.

Acompaña a personas, equipos y organizaciones a conectar con su valor esencial, integrando el SER con el HACER, para construir proyectos y caminos de vida con sentido, prosperidad e impacto positivo en el mundo.

Se ha formado como Coach Ontológica en Newfield Network, Coach en PNL avalada por Richard Bandler, Meaning Change Maker, Administradora de Empresas del CESA y Máster en Dirección de Marketing Estratégico (EOI). Su experiencia une la visión estratégica con una profunda mirada humana, ofreciendo acompañamientos transformadores que inspiran claridad, autenticidad y coherencia.`),
    image: null,
    links: []
  },
  {
    status: 'published',
    sort: 5,
    name: 'Gustavo Lara',
    slug: 'gustavo-lara',
    title: 'Psicólogo',
    bio: textToHtml(`Psicólogo de la Universidad Nacional de Colombia, con amplia experiencia académica y clínica. Complementó su formación con estudios en música —Especialización Instrumental en Flauta Traversa— y una Maestría en Educación en la Universidad Pedagógica Nacional.

Durante más de una década fue profesor en el Programa de Psicología de la Universidad del Rosario (2006-2020) y posteriormente dirigió el Centro de Mindfulness Integral y Meditación (2022-2023). Actualmente hace parte del cuerpo docente de posgrados en la Escuela de Medicina y Ciencias de la Salud.

Es psicoterapeuta de orientación transpersonal integral, certificado por el Mindfulness-Based Professional Training Institute de la Universidad de California San Diego (UCSD). Su trayectoria se enriquece con más de 40 años de práctica meditativa en tradiciones como el budismo, el sufismo y diversas disciplinas somáticas y psicoterapéuticas.`),
    image: null,
    links: []
  }
];

/**
 * Insertar los miembros del equipo
 */
async function seedTeamMembers() {
  console.log('\n👥 Insertando miembros del equipo...');

  for (const member of teamMembers) {
    console.log(`\n   → Insertando: ${member.name}`);

    const response = await fetch(`${DIRECTUS_URL}/items/team_members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify(member)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`   ❌ Error al insertar ${member.name}:`, error);
    } else {
      const data = await response.json();
      console.log(`   ✅ ${member.name} insertado (ID: ${data.data.id})`);
    }
  }

  console.log('\n✅ Proceso de inserción completado');
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Iniciando seed de datos del equipo en Directus...');
  console.log(`📍 URL: ${DIRECTUS_URL}`);

  try {
    await seedTeamMembers();

    console.log('\n✨ ¡Datos del equipo insertados exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Miembros insertados: ${teamMembers.length}`);
    console.log(`   - Todos con status: published`);
    console.log('\n💡 Nota: Las imágenes están como NULL por defecto.');
    console.log('   Puedes subirlas manualmente en Directus o crear un script para ello.\n');

  } catch (error) {
    console.error('\n❌ Error durante la ejecución:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
