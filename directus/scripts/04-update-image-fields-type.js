/**
 * Script para actualizar el tipo de los campos de imagen de uuid a string
 *
 * Uso: node directus/scripts/04-update-image-fields-type.js
 */

import 'dotenv/config'

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || process.env.DIRECTUS_TOKEN

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar configurados en .env')
  process.exit(1)
}

const fieldUpdates = [
  {
    field: 'featured_image',
    type: 'string',
    meta: {
      interface: 'input',
      note: 'URL de la imagen principal del artículo',
      options: {
        placeholder: 'https://example.com/imagen.jpg'
      }
    }
  },
  {
    field: 'author_avatar',
    type: 'string',
    meta: {
      interface: 'input',
      note: 'URL del avatar del autor',
      options: {
        placeholder: 'https://example.com/avatar.jpg'
      }
    }
  }
]

/**
 * Actualizar los campos
 */
async function updateFields() {
  try {
    console.log('🔧 Actualizando tipos de campos...\n')

    for (const fieldUpdate of fieldUpdates) {
      console.log(`  → Actualizando campo: ${fieldUpdate.field}`)

      const response = await fetch(`${DIRECTUS_URL}/fields/blog_posts/${fieldUpdate.field}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`
        },
        body: JSON.stringify(fieldUpdate)
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`    ❌ Error:`, error)
        continue
      }

      console.log(`    ✅ Campo ${fieldUpdate.field} actualizado a tipo string`)
    }

    console.log('\n✅ Todos los campos han sido actualizados')
    return true
  } catch (error) {
    console.error('❌ Error al actualizar campos:', error.message)
    return false
  }
}

/**
 * Ejecutar el script
 */
async function main() {
  console.log('🚀 Iniciando actualización de tipos de campos\n')
  console.log(`📍 Directus URL: ${DIRECTUS_URL}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const updated = await updateFields()

  if (!updated) {
    console.error('\n⚠️  Hubo errores al actualizar algunos campos')
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✨ Proceso completado!')
  console.log('\n📋 Próximos pasos:')
  console.log('   1. Ejecuta: node directus/scripts/03-update-blog-images.js')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
