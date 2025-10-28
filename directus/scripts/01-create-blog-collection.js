/**
 * Script para crear la colección de Blog Posts en Directus
 *
 * Uso: node directus/scripts/01-create-blog-collection.js
 *
 * Requisitos:
 * - DIRECTUS_URL configurado en .env
 * - DIRECTUS_ADMIN_TOKEN configurado en .env (token con permisos de administrador)
 */

import { blogCollection, blogFields } from '../schemas/blog.js'
import 'dotenv/config'

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || process.env.DIRECTUS_TOKEN

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  console.error('❌ Error: DIRECTUS_URL y DIRECTUS_ADMIN_TOKEN deben estar configurados en .env')
  process.exit(1)
}

/**
 * Crear la colección en Directus
 */
async function createCollection() {
  try {
    console.log('📦 Creando colección blog_posts...')

    const response = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify(blogCollection)
    })

    if (!response.ok) {
      const error = await response.json()

      // Si la colección ya existe, no es un error crítico
      if (error.errors?.[0]?.extensions?.code === 'RECORD_NOT_UNIQUE') {
        console.log('ℹ️  La colección blog_posts ya existe, continuando...')
        return true
      }

      throw new Error(`Error al crear colección: ${JSON.stringify(error)}`)
    }

    console.log('✅ Colección blog_posts creada exitosamente')
    return true
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

/**
 * Crear los campos de la colección
 */
async function createFields() {
  try {
    console.log('\n📝 Creando campos de la colección...')

    for (const field of blogFields) {
      // Saltar el campo ID ya que se crea automáticamente
      if (field.field === 'id') {
        continue
      }

      console.log(`  → Creando campo: ${field.field}`)

      const response = await fetch(`${DIRECTUS_URL}/fields/blog_posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DIRECTUS_TOKEN}`
        },
        body: JSON.stringify(field)
      })

      if (!response.ok) {
        const error = await response.json()

        // Si el campo ya existe, no es un error crítico
        if (error.errors?.[0]?.extensions?.code === 'RECORD_NOT_UNIQUE') {
          console.log(`    ℹ️  Campo ${field.field} ya existe`)
          continue
        }

        console.error(`    ❌ Error al crear campo ${field.field}:`, error)
        continue
      }

      console.log(`    ✅ Campo ${field.field} creado`)
    }

    console.log('\n✅ Todos los campos han sido procesados')
    return true
  } catch (error) {
    console.error('❌ Error al crear campos:', error.message)
    return false
  }
}

/**
 * Ejecutar el script
 */
async function main() {
  console.log('🚀 Iniciando creación de estructura Blog en Directus\n')
  console.log(`📍 Directus URL: ${DIRECTUS_URL}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const collectionCreated = await createCollection()

  if (!collectionCreated) {
    console.error('\n❌ No se pudo crear la colección. Abortando.')
    process.exit(1)
  }

  const fieldsCreated = await createFields()

  if (!fieldsCreated) {
    console.error('\n⚠️  Hubo errores al crear algunos campos')
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✨ Proceso completado!')
  console.log('\n📋 Próximos pasos:')
  console.log('   1. Verifica la colección en Directus Admin')
  console.log('   2. Ejecuta: node directus/scripts/02-seed-blog-data.js')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
