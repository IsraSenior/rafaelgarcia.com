const fs = require('fs');

// Leer el archivo de onboarding original
const content = fs.readFileSync('components/Onboarding.vue', 'utf8');

// Extraer las dimensiones
const dimensionsStart = content.indexOf('const dimensions: Dimension[] = [');
const dimensionsEnd = content.indexOf('\n]', dimensionsStart) + 2;
const dimensionsCode = content.substring(dimensionsStart, dimensionsEnd);

// Extraer solo el array
const arrayMatch = dimensionsCode.match(/= (\[[\s\S]*\])/);
if (!arrayMatch) {
  console.error('❌ No se pudo extraer el array de dimensiones');
  process.exit(1);
}

const dimensionsArray = arrayMatch[1];

// Evaluar el código TypeScript para convertirlo a objeto JavaScript
const dimensions = eval('(' + dimensionsArray + ')');

// Crear el archivo de seed completo
const seedScript = `import 'dotenv/config';
import fetch from 'node-fetch';

const DIRECTUS_URL = process.env.NUXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

// Data exacta del test actual - 6 dimensiones, 25 preguntas
const testData = {
  title: 'Test de Diagnóstico - 6 Dimensiones del Ser Humano',
  description: 'Test de onboarding que evalúa las 6 dimensiones del ser humano: Física, Emocional, Mental, Existencial, Espiritual y Relacional',
  options: [
    { value: 0, label: 'Casi nunca' },
    { value: 1, label: 'Algunas veces' },
    { value: 2, label: 'A menudo' },
    { value: 3, label: 'Siempre' }
  ],
  dimensions: ${JSON.stringify(dimensions, null, 2)}
};

async function seedOnboardingTest() {
  try {
    console.log('🚀 Insertando data del test de onboarding...');
    console.log('📊 Dimensiones:', testData.dimensions.length);
    console.log('❓ Total preguntas:', testData.dimensions.reduce((sum, d) => sum + d.variables.length, 0));

    // Crear o actualizar el singleton
    let response = await fetch(\`\${DIRECTUS_URL}/items/onboarding_test/1\`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${DIRECTUS_ADMIN_TOKEN}\`
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      // Si no existe, intentar crear
      response = await fetch(\`\${DIRECTUS_URL}/items/onboarding_test\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${DIRECTUS_ADMIN_TOKEN}\`
        },
        body: JSON.stringify(testData)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Error al crear test:', JSON.stringify(error, null, 2));
        return;
      }

      console.log('✅ Test de onboarding creado exitosamente');
    } else {
      console.log('✅ Test de onboarding actualizado exitosamente');
    }

    console.log('🎉 Data del test configurada completamente');
    console.log('');
    console.log('📋 Resumen:');
    testData.dimensions.forEach(d => {
      console.log(\`  - \${d.label}: \${d.variables.length} preguntas\`);
    });

  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

seedOnboardingTest();
`;

fs.writeFileSync('directus/scripts/22-seed-onboarding-test-data.js', seedScript);
console.log('✅ Archivo de seed completo creado exitosamente');
console.log('📊 Dimensiones incluidas:', dimensions.length);
console.log('❓ Total de preguntas:', dimensions.reduce((sum, d) => sum + d.variables.length, 0));
console.log('');
console.log('📋 Resumen de dimensiones:');
dimensions.forEach(d => {
  console.log(`  - ${d.label}: ${d.variables.length} preguntas`);
});
