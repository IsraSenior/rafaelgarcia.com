export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const queryParams = new URLSearchParams({
    'filter[status][_eq]': 'published',
    'sort': '-date_published',
    ...query
  })

  try {
    const response = await $fetch(`${config.public.directusUrl}/items/blog_posts?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${config.public.directusToken}`
      }
    })

    return response.data || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching blog posts'
    })
  }
})
