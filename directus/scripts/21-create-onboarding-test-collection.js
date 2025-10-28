import 'dotenv/config';
import fetch from 'node-fetch';
import { onboardingTestCollectionSchema, onboardingTestFields } from '../schemas/onboarding-test.js';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar definidos en el archivo .env');
  process.exit(1);
}

async function createOnboardingTestCollection() {
  try {
    console.log('🚀 Creando colección singleton onboarding_test...');

    // 1. Crear la colección
    const collectionResponse = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify(onboardingTestCollectionSchema)
    });

    if (!collectionResponse.ok) {
      const error = await collectionResponse.json();
      console.error('❌ Error al crear colección:', JSON.stringify(error, null, 2));
      return;
    }

    console.log('✅ Colección onboarding_test creada exitosamente');

    // 2. Crear los campos
    console.log('📝 Creando campos de la colección...');

    for (const field of onboardingTestFields) {
      try {
        const fieldResponse = await fetch(`${DIRECTUS_URL}/fields/${field.collection}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
          },
          body: JSON.stringify(field)
        });

        if (!fieldResponse.ok) {
          const error = await fieldResponse.json();
          console.error(`❌ Error al crear campo ${field.field}:`, JSON.stringify(error, null, 2));
        } else {
          console.log(`✅ Campo ${field.field} creado`);
        }
      } catch (error) {
        console.error(`❌ Error al crear campo ${field.field}:`, error.message);
      }
    }

    console.log('🎉 Colección onboarding_test configurada completamente');

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

createOnboardingTestCollection();
