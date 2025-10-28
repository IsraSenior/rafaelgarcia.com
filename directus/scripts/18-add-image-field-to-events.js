/**
 * Script para agregar el campo image a la colección events
 */

import 'dotenv/config'

const DIRECTUS_URL = process.env.DIRECTUS_URL
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN

async function addImageField() {
  console.log('🔄 Agregando campo image a la colección events...')

  try {
    // Crear el campo image
    const response = await fetch(`${DIRECTUS_URL}/fields/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        field: 'image',
        type: 'uuid',
        meta: {
          interface: 'file-image',
          width: 'full',
          note: 'Imagen principal del evento'
        },
        schema: {
          is_nullable: true
        }
      })
    })

    if (response.ok) {
      console.log('✅ Campo image creado exitosamente')
    } else {
      const errorData = await response.json()
      if (errorData.errors?.[0]?.extensions?.code === 'RECORD_NOT_UNIQUE') {
        console.log('ℹ️  El campo image ya existe')
      } else {
        console.error('❌ Error creando campo:', errorData)
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Ejecutar el script
addImageField().catch(console.error)
