export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  const queryParams = new URLSearchParams({
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    'limit': '1'
  })

  try {
    const response = await $fetch(`${config.public.directusUrl}/items/blog_posts?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${config.public.directusToken}`
      }
    })

    const post = response.data?.[0] || null

    if (!post) {
      throw createError({
        statusCode: 404,
        message: 'Post not found'
      })
    }

    return post
  } catch (error) {
    if (error.statusCode === 404) {
      throw error
    }
    console.error('Error fetching post by slug:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching blog post'
    })
  }
})
