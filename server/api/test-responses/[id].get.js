/**
 * Endpoint para obtener resultados de un test específico por ID
 * Retorna los datos completos del test junto con la configuración de preguntas
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID del test es requerido'
    })
  }

  try {
    // Obtener el test response desde Directus
    const testResponse = await $fetch(
      `${config.public.directusUrl}/items/test_responses/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    // Obtener la configuración del test de onboarding (singleton)
    const testConfig = await $fetch(
      `${config.public.directusUrl}/items/onboarding_test`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    if (!testResponse.data) {
      throw createError({
        statusCode: 404,
        message: 'Test no encontrado'
      })
    }

    // Combinar los datos del test con la configuración
    return {
      success: true,
      data: {
        response: testResponse.data,
        config: testConfig.data || testConfig
      }
    }

  } catch (error) {
    console.error('Error fetching test response:', error)

    if (error.statusCode === 403 || error.message?.includes('403')) {
      throw createError({
        statusCode: 403,
        message: 'No tienes permisos para acceder a este test'
      })
    }

    if (error.statusCode === 404) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Error al obtener los resultados del test'
    })
  }
})
