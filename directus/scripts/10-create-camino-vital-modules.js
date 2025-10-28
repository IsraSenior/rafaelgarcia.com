/**
 * Script para crear la colección de módulos de Camino Vital en Directus
 *
 * Uso: node directus/scripts/10-create-camino-vital-modules.js
 */

import dotenv from 'dotenv';
import { caminoVitalModulesCollectionSchema, caminoVitalModulesFields } from '../schemas/camino-vital-modules.js';

// Cargar variables de entorno
dotenv.config();

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar definidos en .env');
  process.exit(1);
}

/**
 * Crear la colección de módulos de Camino Vital
 */
async function createCaminoVitalModulesCollection() {
  console.log('\n🎨 Creando colección camino_vital_modules en Directus...');

  try {
    const response = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify(caminoVitalModulesCollectionSchema)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error al crear la colección:', error);
      return false;
    }

    console.log('✅ Colección camino_vital_modules creada exitosamente');
    return true;
  } catch (error) {
    console.error('❌ Error al crear la colección:', error);
    return false;
  }
}

/**
 * Crear los campos de la colección
 */
async function createCaminoVitalModulesFields() {
  console.log('\n📝 Creando campos para camino_vital_modules...');

  for (const field of caminoVitalModulesFields) {
    try {
      console.log(`   → Creando campo: ${field.field}`);

      const response = await fetch(`${DIRECTUS_URL}/fields/camino_vital_modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
        },
        body: JSON.stringify(field)
      });

      if (!response.ok) {
        const error = await response.text();
        // Solo mostrar como warning si el campo ya existe
        if (error.includes('already exists')) {
          console.log(`   ⚠️  Campo "${field.field}" ya existe, continuando...`);
        } else {
          console.error(`   ❌ Error al crear campo ${field.field}:`, error);
        }
      } else {
        console.log(`   ✅ Campo ${field.field} creado`);
      }
    } catch (error) {
      console.error(`   ❌ Error al crear campo ${field.field}:`, error);
    }
  }

  console.log('\n✅ Campos creados exitosamente');
}

/**
 * Ejecutar el script
 */
async function main() {
  console.log('🚀 Iniciando creación de colección de módulos de Camino Vital...\n');

  const collectionCreated = await createCaminoVitalModulesCollection();

  if (collectionCreated) {
    await createCaminoVitalModulesFields();
    console.log('\n✨ ¡Proceso completado exitosamente!');
    console.log('\n💡 Próximo paso: Ejecutar el script de seed para agregar los módulos');
    console.log('   npm run directus:modules:seed\n');
  } else {
    console.log('\n⚠️  La colección puede que ya exista. Intentando crear los campos...');
    await createCaminoVitalModulesFields();
  }
}

main().catch(console.error);
