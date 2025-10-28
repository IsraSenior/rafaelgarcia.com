/**
 * Script para crear la colección de miembros del equipo en Directus
 *
 * Uso: node directus/scripts/05-create-team-collection.js
 */

import dotenv from 'dotenv';
import { teamCollectionSchema, teamFields } from '../schemas/team.js';

// Cargar variables de entorno
dotenv.config();

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar definidos en .env');
  process.exit(1);
}

/**
 * Crear la colección
 */
async function createCollection() {
  console.log('\n📦 Creando colección team_members...');

  const response = await fetch(`${DIRECTUS_URL}/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
    },
    body: JSON.stringify(teamCollectionSchema)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al crear la colección: ${error}`);
  }

  const data = await response.json();
  console.log('✅ Colección creada exitosamente');
  return data;
}

/**
 * Crear los campos de la colección
 */
async function createFields() {
  console.log('\n📝 Creando campos de la colección...');

  for (const field of teamFields) {
    console.log(`   → Creando campo: ${field.field}`);

    const response = await fetch(`${DIRECTUS_URL}/fields/${field.collection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify(field)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Error al crear campo ${field.field}:`, error);
      // Continuamos con los demás campos incluso si uno falla
    } else {
      console.log(`   ✅ Campo ${field.field} creado`);
    }
  }

  console.log('\n✅ Todos los campos han sido procesados');
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Iniciando creación de colección de equipo en Directus...');
  console.log(`📍 URL: ${DIRECTUS_URL}`);

  try {
    // Crear la colección
    await createCollection();

    // Crear los campos
    await createFields();

    console.log('\n✨ ¡Colección de equipo creada exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Colección: team_members`);
    console.log(`   - Campos creados: ${teamFields.length}`);
    console.log('\n💡 Siguiente paso: Ejecuta el seed para poblar con datos iniciales');
    console.log('   npm run directus:team:seed\n');

  } catch (error) {
    console.error('\n❌ Error durante la ejecución:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
