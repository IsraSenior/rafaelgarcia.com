<script setup>
const route = useRoute();
const { getPostBySlug } = useDirectus();
const { getAssetUrl, isUUID, isURL } = useDirectusAsset();

const { data: post, error } = await useAsyncData(
  `post-${route.params.id}`,
  () => getPostBySlug(route.params.id)
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  });
}

// Computeds para manejar imágenes
const featuredImageUrl = computed(() => {
  if (!post.value?.featured_image) return null;
  if (isUUID(post.value.featured_image)) {
    return getAssetUrl(post.value.featured_image, { width: 1200, quality: 85 });
  }
  if (isURL(post.value.featured_image)) {
    return post.value.featured_image;
  }
  return null;
});

const isFeaturedImageDirectus = computed(() => isUUID(post.value?.featured_image));

const avatarUrl = computed(() => {
  if (!post.value?.author_avatar) return null;
  if (isUUID(post.value.author_avatar)) {
    return getAssetUrl(post.value.author_avatar, { width: 100, height: 100, fit: 'cover' });
  }
  if (isURL(post.value.author_avatar)) {
    return post.value.author_avatar;
  }
  return null;
});

const isAvatarDirectus = computed(() => isUUID(post.value?.author_avatar));

const config = useRuntimeConfig();

useSeoMeta({
  title: `${post.value.meta_title || post.value.title} | Rafael García`,
  description: post.value.meta_description || post.value.excerpt || post.value.title,
  ogTitle: `${post.value.meta_title || post.value.title} | Rafael García`,
  ogDescription: post.value.meta_description || post.value.excerpt || post.value.title,
  ogImage: featuredImageUrl.value,
  ogUrl: `${config.public.siteUrl}/blog/${post.value.slug}`,
  ogType: 'article',
  ogLocale: 'es_CO',
  articlePublishedTime: post.value.date_published || post.value.date_created,
  articleAuthor: post.value.author || 'Rafael García',
  articleTag: post.value.tags,
  twitterCard: 'summary_large_image',
  twitterTitle: `${post.value.meta_title || post.value.title} | Rafael García`,
  twitterDescription: post.value.meta_description || post.value.excerpt || post.value.title,
  twitterImage: featuredImageUrl.value,
  keywords: post.value.tags?.join(', ') || 'desarrollo personal, transformación, Rafael García'
});

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/blog/${post.value.slug}`
    }
  ]
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
</script>

<template>
  <div class="gradient-muted">
    <!-- Hero Section -->
    <section class="py-16 md:py-24 lg:py-32">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="max-w-4xl mx-auto">
          <!-- Breadcrumb -->
          <nav class="mb-8 text-sm">
            <ol class="flex items-center space-x-2 text-primary/70">
              <li>
                <NuxtLink to="/" class="hover:text-primary transition-colors">Inicio</NuxtLink>
              </li>
              <li>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </li>
              <li>
                <NuxtLink to="/blog" class="hover:text-primary transition-colors">Blog</NuxtLink>
              </li>
              <li>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </li>
              <li class="text-primary font-medium truncate max-w-xs">{{ post?.title }}</li>
            </ol>
          </nav>

          <!-- Post Header -->
          <header class="mb-12">
            <h1 class="title title--headline text-primary mb-6">{{ post?.title }}</h1>

            <div class="flex flex-wrap items-center gap-4 text-sm text-primary/70">
              <div v-if="post?.author" class="flex items-center gap-3">
                <NuxtImg
                  v-if="isAvatarDirectus"
                  provider="directus"
                  :src="`/assets/${post.author_avatar}`"
                  :alt="post.author"
                  class="w-10 h-10 rounded-full object-cover"
                  width="100"
                  height="100"
                  fit="cover"
                  loading="lazy"
                />
                <img
                  v-else-if="avatarUrl"
                  :src="avatarUrl"
                  :alt="post.author"
                  class="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div v-else class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="text-primary font-semibold text-sm">
                    {{ post.author?.[0] }}{{ post.author?.split(' ')[1]?.[0] || '' }}
                  </span>
                </div>
                <span class="font-medium text-primary">
                  {{ post.author }}
                </span>
              </div>

              <span class="hidden md:inline text-primary/30">•</span>

              <time :datetime="post?.date_published || post?.date_created" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(post?.date_published || post?.date_created) }}
              </time>

              <span v-if="post?.reading_time" class="hidden md:inline text-primary/30">•</span>

              <div v-if="post?.reading_time" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ post.reading_time }} min lectura
              </div>

              <template v-if="post?.tags && post.tags.length > 0">
                <span class="hidden md:inline text-primary/30">•</span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </template>
            </div>
          </header>

          <!-- Featured Image -->
          <div v-if="featuredImageUrl" class="mb-12 rounded-4xl overflow-hidden">
            <NuxtImg
              v-if="isFeaturedImageDirectus"
              provider="directus"
              :src="`/assets/${post.featured_image}`"
              :alt="post.title"
              class="w-full h-auto object-cover aspect-video"
              width="1200"
              height="675"
              quality="85"
              loading="lazy"
            />
            <img
              v-else
              :src="featuredImageUrl"
              :alt="post.title"
              class="w-full h-auto object-cover aspect-video"
              loading="lazy"
            />
          </div>

          <!-- Post Excerpt -->
          <div v-if="post?.excerpt" class="mb-8 p-6 bg-white rounded-3xl border-l-4 border-secondary-crecer">
            <p class="text-lg text-primary/80 italic">{{ post.excerpt }}</p>
          </div>

          <!-- Post Content -->
          <article class="prose prose-lg max-w-none">
            <div v-html="post?.content" class="content text-primary/90 leading-relaxed"></div>
          </article>

          <!-- Share Section -->
          <div class="mt-16 pt-8 border-t border-primary/10">
            <h3 class="text-lg font-semibold text-primary mb-4">Compartir este artículo</h3>
            <div class="flex gap-3">
              <button
                @click="() => {
                  const url = window.location.href;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                }"
                class="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                aria-label="Compartir en Facebook"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </button>
              <button
                @click="() => {
                  const url = window.location.href;
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title)}&url=${encodeURIComponent(url)}`, '_blank');
                }"
                class="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                aria-label="Compartir en Twitter"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </button>
              <button
                @click="() => {
                  const url = window.location.href;
                  window.open(`https://wa.me/?text=${encodeURIComponent(post?.title + ' ' + url)}`, '_blank');
                }"
                class="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                aria-label="Compartir en WhatsApp"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.784 11.784 0 0 0 12 .198C5.589.198.322 5.465.322 11.874c0 2.09.547 4.052 1.6 5.79L0 24l6.585-1.895a11.79 11.79 0 0 0 5.417 1.378h.005c6.408 0 11.673-5.265 11.676-11.674a11.62 11.62 0 0 0-3.163-8.329zM12.167 21.41h-.004a9.534 9.534 0 0 1-4.858-1.337l-.349-.208-3.91 1.124 1.043-3.814-.23-.391a9.42 9.42 0 0 1-1.44-5.05c0-5.225 4.25-9.475 9.478-9.475a9.43 9.43 0 0 1 6.698 2.773 9.42 9.42 0 0 1 2.778 6.694c-.003 5.227-4.253 9.486-9.476 9.486z" />
                  <path d="M17.472 15.386c-.297-.149-1.758-.868-2.031-.967-.273-.1-.472-.149-.672.15-.198.297-.77.966-.944 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.607.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.1-.198.05-.372-.025-.52-.074-.149-.672-1.62-.921-2.217-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372-.272.297-1.041 1.016-1.041 2.475 0 1.458 1.065 2.873 1.213 3.071.149.198 2.095 3.204 5.081 4.487.71.305 1.263.487 1.692.623.713.227 1.362.195 1.875.118.572-.086 1.757-.718 2.008-1.409.248-.691.248-1.306.173-1.409-.074-.104-.274-.173-.571-.322z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Navigation -->
          <div class="mt-12 flex justify-between items-center">
            <NuxtLink
              to="/blog"
              class="inline-flex items-center gap-2 text-primary hover:text-secondary-crecer transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Volver al blog
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <EndSection variant="subscribe" />
  </div>
</template>

<style scoped>
.content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #313745;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #313745;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.content :deep(h4) {
  font-size: 1.125rem;
  font-weight: 600;
  color: #313745;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
  color: #4e555d;
}

.content :deep(ul),
.content :deep(ol) {
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  list-style-position: outside;
}

.content :deep(ul) {
  list-style-type: disc;
}

.content :deep(ol) {
  list-style-type: decimal;
}

.content :deep(li) {
  margin-bottom: 0.5rem;
  color: #4e555d;
}

.content :deep(a) {
  color: #fe8441;
  text-decoration: underline;
  transition: color 0.2s;
}

.content :deep(a:hover) {
  opacity: 0.8;
}

.content :deep(blockquote) {
  border-left: 4px solid #42a8fc;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-style: italic;
  background-color: rgba(49, 55, 69, 0.05);
  border-radius: 0 0.5rem 0.5rem 0;
}

.content :deep(img) {
  border-radius: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
}

.content :deep(code) {
  background-color: rgba(49, 55, 69, 0.05);
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.content :deep(pre) {
  background-color: rgba(49, 55, 69, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.content :deep(strong) {
  font-weight: 600;
  color: #313745;
}

.content :deep(em) {
  font-style: italic;
}
</style>
