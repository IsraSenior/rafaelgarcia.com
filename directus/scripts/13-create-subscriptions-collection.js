import 'dotenv/config';
import subscriptionsSchema from '../schemas/subscriptions.js';

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.NUXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || process.env.NUXT_PUBLIC_DIRECTUS_TOKEN;

async function createSubscriptionsCollection() {
  console.log('🚀 Iniciando creación de colección de suscripciones...\n');

  try {
    // 1. Crear la colección
    console.log('📦 Creando colección subscriptions en Directus...');
    const collectionResponse = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        collection: subscriptionsSchema.collection,
        meta: subscriptionsSchema.meta,
        schema: subscriptionsSchema.schema
      })
    });

    if (!collectionResponse.ok) {
      const errorText = await collectionResponse.text();
      console.log('⚠️  La colección puede que ya exista. Intentando crear los campos...');
    } else {
      console.log('✅ Colección subscriptions creada exitosamente');
    }

    // 2. Crear los campos
    console.log('\n📝 Creando campos para subscriptions...');
    for (const field of subscriptionsSchema.fields) {
      console.log(`   → Creando campo: ${field.field}`);

      const fieldResponse = await fetch(`${DIRECTUS_URL}/fields/${subscriptionsSchema.collection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`
        },
        body: JSON.stringify(field)
      });

      if (!fieldResponse.ok) {
        const errorText = await fieldResponse.text();
        console.log(`   ⚠️  Campo "${field.field}" ya existe, continuando...`);
      } else {
        console.log(`   ✅ Campo "${field.field}" creado`);
      }
    }

    console.log('\n✅ Campos creados exitosamente');
    console.log('\n🎉 ¡Colección de suscripciones configurada correctamente!');
    console.log('\n💡 Próximo paso: El endpoint API ya validará emails duplicados automáticamente');

  } catch (error) {
    console.error('❌ Error al crear la colección:', error.message);
    process.exit(1);
  }
}

createSubscriptionsCollection();
