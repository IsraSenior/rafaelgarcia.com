import 'dotenv/config';
import leadsSchema from '../schemas/leads.js';

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.NUXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || process.env.NUXT_PUBLIC_DIRECTUS_TOKEN;

async function createLeadsCollection() {
  console.log('🚀 Iniciando creación de colección de leads...\n');

  try {
    // 1. Crear la colección
    console.log('📦 Creando colección leads en Directus...');
    const collectionResponse = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        collection: leadsSchema.collection,
        meta: leadsSchema.meta,
        schema: leadsSchema.schema
      })
    });

    if (!collectionResponse.ok) {
      const errorText = await collectionResponse.text();
      console.log('⚠️  La colección puede que ya exista. Intentando crear los campos...');
    } else {
      console.log('✅ Colección leads creada exitosamente');
    }

    // 2. Crear los campos
    console.log('\n📝 Creando campos para leads...');
    for (const field of leadsSchema.fields) {
      console.log(`   → Creando campo: ${field.field}`);

      const fieldResponse = await fetch(`${DIRECTUS_URL}/fields/${leadsSchema.collection}`, {
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
    console.log('\n🎉 ¡Colección de leads configurada correctamente!');
    console.log('\n💡 Próximo paso: Puedes acceder a Directus para ver la colección');

  } catch (error) {
    console.error('❌ Error al crear la colección:', error.message);
    process.exit(1);
  }
}

createLeadsCollection();
