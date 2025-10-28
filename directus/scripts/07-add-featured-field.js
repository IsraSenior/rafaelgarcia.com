/**
 * Script para agregar el campo "featured" a la colección team_members
 *
 * Uso: node directus/scripts/07-add-featured-field.js
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

const featuredField = {
  collection: 'team_members',
  field: 'featured',
  type: 'boolean',
  meta: {
    interface: 'boolean',
    special: ['cast-boolean'],
    options: {
      label: 'Destacado'
    },
    display: 'boolean',
    note: 'Marcar si este miembro debe aparecer en la sección destacada (Rafael García)',
    width: 'half'
  },
  schema: {
    default_value: false,
    is_nullable: false
  }
};

/**
 * Agregar el campo featured
 */
async function addFeaturedField() {
  console.log('\n✨ Agregando campo "featured" a team_members...');

  const response = await fetch(`${DIRECTUS_URL}/fields/team_members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
    },
    body: JSON.stringify(featuredField)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al crear el campo: ${error}`);
  }

  console.log('✅ Campo "featured" creado exitosamente');
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Iniciando actualización de schema de equipo...');
  console.log(`📍 URL: ${DIRECTUS_URL}`);

  try {
    await addFeaturedField();

    console.log('\n✨ ¡Campo agregado exitosamente!');
    console.log('\n💡 Ahora puedes marcar miembros como "featured" en Directus\n');

  } catch (error) {
    console.error('\n❌ Error durante la ejecución:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
