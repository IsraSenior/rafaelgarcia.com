/**
 * Script para poblar la colección de módulos de Camino Vital con datos
 *
 * Uso: node directus/scripts/11-seed-camino-vital-modules.js
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
 * Datos de los módulos de Camino Vital
 */
const modules = [
  {
    status: 'published',
    sort: 1,
    name: 'Estabilizar',
    slug: 'estabilizar',
    color_class: 'estabilizar',
    description: '<p>En este primer módulo trabajamos en recuperar el equilibrio inicial. Se trata de fortalecer la base física, emocional y mental para que tengas la energía y la serenidad necesarias para continuar el proceso. Aquí aprendes a reconocer dónde estás, cuidar tu cuerpo, regular tus emociones, generar estados de bienestar y gestionar mejor tu atención y energía.</p>',
    video: null,
    benefits: [
      { benefit: 'Mejorar el sueño, la vitalidad y el manejo del estrés.' },
      { benefit: 'Aprender recursos para regular las emociones difíciles (miedo, rabia, frustración, ansiedad).' },
      { benefit: 'Desarrollar la capacidad de generar conscientemente calma, gratitud y alegría como estados de bienestar interno.' },
      { benefit: 'Recuperar claridad mental y capacidad de concentración.' },
      { benefit: 'Establecer hábitos de autocuidado que sostienen el bienestar diario.' },
      { benefit: 'Gestionar de manera consciente la energía, evitando el desgaste y potenciando la vitalidad.' },
      { benefit: 'Incorporar el ocio y el placer como recursos legítimos para nutrir el bienestar y la motivación en la vida cotidiana.' }
    ]
  },
  {
    status: 'published',
    sort: 2,
    name: 'Sanar',
    slug: 'sanar',
    color_class: 'sanar',
    description: '<p>En este módulo profundizamos en la sanación interior. Se trata de reconocer y trabajar las heridas emocionales, los bloqueos y los patrones repetitivos que generan sufrimiento. A través de prácticas experienciales y reflexivas, acompañamos la integración de experiencias pasadas para que dejen de condicionar tu presente y se transformen en recursos disponibles en el presente.</p>',
    video: null,
    benefits: [
      { benefit: 'Procesar y aliviar heridas emocionales para reducir su impacto en tu vida diaria.' },
      { benefit: 'Desarrollar autocompasión y una relación más amable y sostenida contigo mismo.' },
      { benefit: 'Liberar tensiones físicas y emocionales acumuladas.' },
      { benefit: 'Resignificar experiencias dolorosas, convirtiéndolas en aprendizaje y crecimiento.' },
      { benefit: 'Mejorar la regulación emocional y disminuir reacciones impulsivas.' },
      { benefit: 'Integrar la sombra en la vida consciente, reconociendo tanto la luz como los aspectos ocultos de tu ser.' },
      { benefit: 'Sanar es el puente entre la estabilidad alcanzada en el primer módulo y la expansión que te espera en Crecer.' }
    ]
  },
  {
    status: 'published',
    sort: 3,
    name: 'Crecer',
    slug: 'crecer',
    color_class: 'crecer',
    description: '<p>En este módulo el foco está en la expansión y el florecimiento personal. Una vez alcanzada la estabilidad y habiendo sanado heridas emocionales, se abre el espacio para desplegar tu potencial. Aquí trabajamos en alinear valores y acciones, clarificar el propósito de vida y fortalecer tanto la dimensión espiritual como la capacidad de crear relaciones nutritivas. Crecer significa consolidar lo aprendido y proyectarlo hacia una vida plena, coherente y con sentido.</p>',
    video: null,
    benefits: [
      { benefit: 'Conectar con un propósito de vida claro y orientar tus decisiones en coherencia con él.' },
      { benefit: 'Potenciar la visión creativa, la capacidad de imaginar y diseñar el futuro que deseas.' },
      { benefit: 'Desarrollar resiliencia consciente, para afrontar con confianza los retos de la vida.' },
      { benefit: 'Profundizar en la dimensión espiritual, cultivando calma, introspección y trascendencia.' },
      { benefit: 'Integrar hábitos sostenibles que mantienen equilibrio entre cuerpo, mente y emociones.' },
      { benefit: 'Mejorar tus vínculos a través de la empatía, la comunicación consciente y el apoyo mutuo.' },
      { benefit: 'Consolidar aprendizajes de los módulos anteriores, llevándolos a la acción en tu vida cotidiana.' }
    ]
  }
];

/**
 * Insertar los módulos
 */
async function seedModules() {
  console.log('\n🔧 Insertando módulos de Camino Vital...');

  for (const module of modules) {
    console.log(`\n   → Insertando: ${module.name}`);

    const response = await fetch(`${DIRECTUS_URL}/items/camino_vital_modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify(module)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`   ❌ Error al insertar ${module.name}:`, error);
    } else {
      const data = await response.json();
      console.log(`   ✅ ${module.name} insertado (ID: ${data.data.id})`);
    }
  }

  console.log('\n✅ Proceso de inserción completado');
}

/**
 * Ejecutar el script
 */
async function main() {
  console.log('🚀 Iniciando seed de módulos de Camino Vital...\n');
  await seedModules();
  console.log('\n✨ ¡Módulos creados exitosamente!');
  console.log('\n💡 Próximo paso: Actualizar el servicio de Camino Vital para que use estos módulos\n');
}

main().catch(console.error);
