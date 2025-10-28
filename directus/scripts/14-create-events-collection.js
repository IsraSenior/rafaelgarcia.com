import 'dotenv/config';
import eventsSchema from '../schemas/events.js';

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.NUXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || process.env.NUXT_PUBLIC_DIRECTUS_TOKEN;

async function createEventsCollection() {
  console.log('🚀 Iniciando creación de colección de eventos...\n');

  try {
    // 1. Crear la colección
    console.log('📦 Creando colección events en Directus...');
    const collectionResponse = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        collection: eventsSchema.collection,
        meta: eventsSchema.meta,
        schema: eventsSchema.schema
      })
    });

    if (!collectionResponse.ok) {
      const errorText = await collectionResponse.text();
      console.log('⚠️  La colección puede que ya exista. Intentando crear los campos...');
    } else {
      console.log('✅ Colección events creada exitosamente');
    }

    // 2. Crear los campos
    console.log('\n📝 Creando campos para events...');
    for (const field of eventsSchema.fields) {
      console.log(`   → Creando campo: ${field.field}`);

      const fieldResponse = await fetch(`${DIRECTUS_URL}/fields/${eventsSchema.collection}`, {
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
    console.log('\n🎉 ¡Colección de eventos configurada correctamente!');
    console.log('\n💡 Próximo paso: Crear la colección de registros a eventos');

  } catch (error) {
    console.error('❌ Error al crear la colección:', error.message);
    process.exit(1);
  }
}

createEventsCollection();
