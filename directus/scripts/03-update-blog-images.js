/**
 * Script para actualizar los posts existentes con imágenes de prueba
 *
 * Uso: node directus/scripts/03-update-blog-images.js
 */

import 'dotenv/config'

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || process.env.DIRECTUS_TOKEN

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar configurados en .env')
  process.exit(1)
}

const updates = [
  {
    id: 1,
    featured_image: 'https://picsum.photos/800/800?random=1',
    author_avatar: 'https://avatar.iran.liara.run/public/48'
  },
  {
    id: 2,
    featured_image: 'https://picsum.photos/800/800?random=2',
    author_avatar: 'https://avatar.iran.liara.run/public/48'
  },
  {
    id: 3,
    featured_image: 'https://picsum.photos/800/800?random=3',
    author_avatar: 'https://avatar.iran.liara.run/public/48'
  },
  {
    id: 4,
    featured_image: 'https://picsum.photos/800/800?random=4',
    author_avatar: 'https://avatar.iran.liara.run/public/48'
  }
]

/**
 * Actualizar los posts con imágenes
 */
async function updatePostImages() {
  try {
    console.log('🖼️  Actualizando posts con imágenes de prueba...\n')

    for (const update of updates) {
      console.log(`  → Actualizando post ID ${update.id}`)

      const response = await fetch(`${DIRECTUS_URL}/items/blog_posts/${update.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`
        },
        body: JSON.stringify({
          featured_image: update.featured_image,
          author_avatar: update.author_avatar
        })
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`    ❌ Error:`, error)
        continue
      }

      console.log(`    ✅ Post ID ${update.id} actualizado`)
    }

    console.log('\n✅ Todos los posts han sido actualizados con imágenes')
    return true
  } catch (error) {
    console.error('❌ Error al actualizar posts:', error.message)
    return false
  }
}

/**
 * Ejecutar el script
 */
async function main() {
  console.log('🚀 Iniciando actualización de imágenes para posts\n')
  console.log(`📍 Directus URL: ${DIRECTUS_URL}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const updated = await updatePostImages()

  if (!updated) {
    console.error('\n⚠️  Hubo errores al actualizar algunos posts')
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✨ Proceso completado!')
  console.log('\n📋 Próximos pasos:')
  console.log('   1. Verifica las imágenes en Directus Admin')
  console.log('   2. Refresca la página del blog en el navegador')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
