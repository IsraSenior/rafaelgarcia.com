/**
 * Script para crear la colección de testimonios en Directus
 *
 * Uso: node directus/scripts/19-create-testimonials-collection.js
 */

import dotenv from 'dotenv';
import { testimonialsCollection, testimonialsFields } from '../schemas/testimonials.js';

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
  console.log('\n📦 Creando colección testimonials...');

  const response = await fetch(`${DIRECTUS_URL}/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
    },
    body: JSON.stringify(testimonialsCollection)
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

  for (const field of testimonialsFields) {
    console.log(`   → Creando campo: ${field.field}`);

    const response = await fetch(`${DIRECTUS_URL}/fields/testimonials`, {
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
  console.log('🚀 Iniciando creación de colección de testimonios en Directus...');
  console.log(`📍 URL: ${DIRECTUS_URL}`);

  try {
    // Crear la colección
    await createCollection();

    // Crear los campos
    await createFields();

    console.log('\n✨ ¡Colección de testimonios creada exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Colección: testimonials`);
    console.log(`   - Campos creados: ${testimonialsFields.length}`);
    console.log('\n💡 Siguiente paso: Ejecuta el seed para poblar con datos iniciales');
    console.log('   npm run directus:testimonials:seed\n');

  } catch (error) {
    console.error('\n❌ Error durante la ejecución:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
