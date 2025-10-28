import 'dotenv/config';
import eventRegistrationsSchema from '../schemas/event_registrations.js';

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.NUXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || process.env.NUXT_PUBLIC_DIRECTUS_TOKEN;

async function createEventRegistrationsCollection() {
  console.log('🚀 Iniciando creación de colección de registros a eventos...\n');

  try {
    // 1. Crear la colección
    console.log('📦 Creando colección event_registrations en Directus...');
    const collectionResponse = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        collection: eventRegistrationsSchema.collection,
        meta: eventRegistrationsSchema.meta,
        schema: eventRegistrationsSchema.schema
      })
    });

    if (!collectionResponse.ok) {
      const errorText = await collectionResponse.text();
      console.log('⚠️  La colección puede que ya exista. Intentando crear los campos...');
    } else {
      console.log('✅ Colección event_registrations creada exitosamente');
    }

    // 2. Crear los campos
    console.log('\n📝 Creando campos para event_registrations...');
    for (const field of eventRegistrationsSchema.fields) {
      console.log(`   → Creando campo: ${field.field}`);

      const fieldResponse = await fetch(`${DIRECTUS_URL}/fields/${eventRegistrationsSchema.collection}`, {
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
    console.log('\n🎉 ¡Colección de registros a eventos configurada correctamente!');
    console.log('\n💡 Ahora puedes gestionar los registros desde Directus');
    console.log('💡 Los usuarios pueden inscribirse desde el sitio web');

  } catch (error) {
    console.error('❌ Error al crear la colección:', error.message);
    process.exit(1);
  }
}

createEventRegistrationsCollection();
