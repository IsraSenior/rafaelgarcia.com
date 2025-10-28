import 'dotenv/config';
import fetch from 'node-fetch';
import testResponsesSchema from '../schemas/test-responses.js';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar definidos en el archivo .env');
  process.exit(1);
}

async function createTestResponsesCollection() {
  try {
    console.log('🚀 Creando colección test_responses...');

    // 1. Crear la colección
    const collectionResponse = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      },
      body: JSON.stringify({
        collection: testResponsesSchema.collection,
        meta: testResponsesSchema.meta,
        schema: testResponsesSchema.schema
      })
    });

    if (!collectionResponse.ok) {
      const error = await collectionResponse.json();
      console.error('❌ Error al crear colección:', JSON.stringify(error, null, 2));
      return;
    }

    console.log('✅ Colección test_responses creada exitosamente');

    // 2. Crear los campos
    console.log('📝 Creando campos de la colección...');

    for (const field of testResponsesSchema.fields) {
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

    console.log('');
    console.log('🎉 Colección test_responses configurada completamente');
    console.log('');
    console.log('💡 Próximos pasos:');
    console.log('   1. Verifica la colección en Directus Admin');
    console.log('   2. Configura los permisos de la colección si es necesario');
    console.log('   3. La API /api/test-responses/submit ya está lista para recibir respuestas');

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

createTestResponsesCollection();
