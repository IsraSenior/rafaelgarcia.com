import 'dotenv/config';
import fetch from 'node-fetch';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar definidos en el archivo .env');
  process.exit(1);
}

async function resetOnboardingTest() {
  try {
    console.log('🗑️  Eliminando colección onboarding_test si existe...');

    const deleteResponse = await fetch(`${DIRECTUS_URL}/collections/onboarding_test`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_ADMIN_TOKEN}`
      }
    });

    if (deleteResponse.ok) {
      console.log('✅ Colección eliminada exitosamente');
    } else if (deleteResponse.status === 404) {
      console.log('ℹ️  La colección no existía');
    } else {
      const error = await deleteResponse.json();
      console.error('❌ Error al eliminar colección:', JSON.stringify(error, null, 2));
    }

    console.log('');
    console.log('✅ Listo para crear la colección nuevamente');
    console.log('   Ejecuta: npm run directus:onboarding:setup');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

resetOnboardingTest();
