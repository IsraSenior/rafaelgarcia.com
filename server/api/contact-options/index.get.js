export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    // Obtener todos los servicios publicados
    const servicesQuery = new URLSearchParams({
      'filter[status][_eq]': 'published',
      'sort': 'sort',
      'limit': '-1',
      'fields': 'slug,title,type'
    })

    const servicesResponse = await $fetch(
      `${config.public.directusUrl}/items/services?${servicesQuery}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    const services = servicesResponse.data || []

    // Obtener módulos de Camino Vital
    const modulesQuery = new URLSearchParams({
      'filter[status][_eq]': 'published',
      'sort': 'sort',
      'limit': '-1',
      'fields': 'slug,name'
    })

    const modulesResponse = await $fetch(
      `${config.public.directusUrl}/items/camino_vital_modules?${modulesQuery}`,
      {
        headers: {
          'Authorization': `Bearer ${config.public.directusToken}`
        }
      }
    )

    const modules = modulesResponse.data || []

    // Construir array de opciones
    const options = []

    // Agregar servicios regulares (excepto Camino Vital)
    services.forEach(service => {
      if (service.type !== 'camino-vital') {
        options.push({
          value: service.slug,
          label: service.title,
          type: service.type
        })
      }
    })

    // Agregar Camino Vital como opción principal
    const caminoVital = services.find(s => s.type === 'camino-vital')
    if (caminoVital) {
      options.push({
        value: 'camino-vital',
        label: caminoVital.title,
        type: 'camino-vital'
      })

      // Agregar módulos de Camino Vital como sub-opciones
      modules.forEach(module => {
        options.push({
          value: `camino-vital-${module.slug}`,
          label: `${caminoVital.title} - Módulo ${module.name}`,
          type: 'module',
          parent: 'camino-vital',
          moduleSlug: module.slug
        })
      })
    }

    // Agregar opción "Otro"
    options.push({
      value: 'otro',
      label: 'Otro / Consulta general',
      type: 'other'
    })

    return options

  } catch (error) {
    console.error('Error fetching contact options:', error)
    return []
  }
})
