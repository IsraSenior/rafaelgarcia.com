/**
 * API para obtener el test de onboarding (singleton)
 * GET /api/onboarding-test
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    // Para singletons en Directus, accedemos sin ID
    const response = await $fetch(
      `${config.public.directusUrl}/items/onboarding_test`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    // Directus devuelve el singleton directamente en response.data
    return response.data || response || null
  } catch (error) {
    console.error('Error fetching onboarding test:', error)
    return null
  }
})
