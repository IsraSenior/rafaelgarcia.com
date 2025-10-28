/**
 * Composable para manejar assets de Directus
 * Transforma IDs de assets a URLs completas y permite transformaciones de imagen
 */
export const useDirectusAsset = () => {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl

  /**
   * Verifica si un string es un UUID válido
   */
  const isUUID = (str) => {
    if (!str || typeof str !== 'string') return false
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(str)
  }

  /**
   * Verifica si un string es una URL válida
   */
  const isURL = (str) => {
    if (!str || typeof str !== 'string') return false
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/')
  }

  /**
   * Obtiene la URL completa de un asset de Directus
   * @param {string} assetId - ID del asset o URL completa
   * @param {object} transforms - Transformaciones opcionales (width, height, quality, fit, format)
   * @returns {string|null} URL completa del asset o null si no es válido
   */
  const getAssetUrl = (assetId, transforms = {}) => {
    // Si no hay asset, retornar null
    if (!assetId) return null

    // Si ya es una URL completa, retornarla
    if (isURL(assetId)) return assetId

    // Si es un UUID, construir la URL
    if (isUUID(assetId)) {
      let url = `${directusUrl}/assets/${assetId}`

      // Agregar transformaciones si existen
      const params = new URLSearchParams()
      if (transforms.width) params.append('width', transforms.width)
      if (transforms.height) params.append('height', transforms.height)
      if (transforms.quality) params.append('quality', transforms.quality)
      if (transforms.fit) params.append('fit', transforms.fit)
      if (transforms.format) params.append('format', transforms.format)

      const queryString = params.toString()
      if (queryString) url += `?${queryString}`

      return url
    }

    // Si no es ni URL ni UUID, retornar null
    return null
  }

  /**
   * Obtiene la URL de un avatar con tamaño predeterminado
   */
  const getAvatarUrl = (assetId, size = 100) => {
    return getAssetUrl(assetId, { width: size, height: size, fit: 'cover' })
  }

  /**
   * Obtiene la URL de una imagen destacada con dimensiones predeterminadas
   */
  const getFeaturedImageUrl = (assetId, width = 800, height = null, quality = 80) => {
    const transforms = { width, quality }
    if (height) transforms.height = height
    return getAssetUrl(assetId, transforms)
  }

  return {
    getAssetUrl,
    getAvatarUrl,
    getFeaturedImageUrl,
    isUUID,
    isURL
  }
}
