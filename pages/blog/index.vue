<script setup>
const config = useRuntimeConfig()

// Obtener posts desde Directus
const { getPosts } = useDirectus()
const { data: allPostsData, error } = await useAsyncData('blog-posts', () => getPosts())

const allPosts = computed(() => allPostsData.value || [])

// SEO Meta Tags
useSeoMeta({
  title: 'Blog de Transformación Personal | Rafael García',
  description: 'Artículos sobre desarrollo personal, coaching ontológico, sanación emocional y crecimiento espiritual. Inspiración para tu transformación.',
  ogTitle: 'Blog de Transformación Personal | Rafael García',
  ogDescription: 'Artículos sobre desarrollo personal, coaching ontológico, sanación emocional y crecimiento espiritual.',
  ogImage: `${config.public.siteUrl}/home-4.png`,
  ogUrl: `${config.public.siteUrl}/blog`,
  ogType: 'website',
  ogLocale: 'es_CO',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Blog de Transformación Personal | Rafael García',
  twitterDescription: 'Artículos sobre desarrollo personal, coaching ontológico y crecimiento espiritual.',
  twitterImage: `${config.public.siteUrl}/home-4.png`,
  keywords: 'blog desarrollo personal, artículos transformación, coaching ontológico, sanación emocional, crecimiento espiritual, Rafael García'
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/blog`
    }
  ]
})

// Paginación
const postsPerPage = 6
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(allPosts.value.length / postsPerPage))

const posts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage
    const end = start + postsPerPage
    return allPosts.value.slice(start, end)
})

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const visiblePages = computed(() => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages.value <= maxVisible) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        if (currentPage.value <= 3) {
            for (let i = 1; i <= 4; i++) pages.push(i);
            pages.push('...');
            pages.push(totalPages.value);
        } else if (currentPage.value >= totalPages.value - 2) {
            pages.push(1);
            pages.push('...');
            for (let i = totalPages.value - 3; i <= totalPages.value; i++) pages.push(i);
        } else {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) pages.push(i);
            pages.push('...');
            pages.push(totalPages.value);
        }
    }

    return pages;
});
</script>

<template>
    <div>
        <section class="gradient-muted py-16 md:pt-24 md:pb-32 relative">
            <div class="container mx-auto px-5 md:px-10 lg:px-20">
                <h2 class="title title--headline text-primary text-center max-w-3xl mx-auto">Inspiración para
                    <b><i>para <br class="hidden lg:block"> <u class="decoration-secondary-crecer">tu
                                transformación"</u></i></b>
                </h2>

                <div class="mt-16 md:mt-24 lg:mt-32">
                    <div class="flex items-center justify-between">
                        <p class="font-public text-paragraph">
                            Mostrando {{ (currentPage - 1) * postsPerPage + 1 }} - {{ Math.min(currentPage * postsPerPage, allPosts.length) }} de {{ allPosts.length }} resultados
                        </p>
                    </div>
                    <div class="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        <BlogTeaser
                            v-for="post in posts"
                            :key="post.id"
                            :image="post.featured_image || '/vista-frontal-mujer-meditando-en-estera.jpg'"
                            :title="post.title"
                            :slug="post.slug"
                            :excerpt="post.excerpt"
                            :date="post.date_published"
                            :reading-time="post.reading_time"
                        />
                    </div>

                    <!-- Paginación -->
                    <div v-if="totalPages > 1" class="mt-16 flex justify-center items-center gap-2">
                        <!-- Botón anterior -->
                        <button
                            @click="goToPage(currentPage - 1)"
                            :disabled="currentPage === 1"
                            class="px-4 py-2 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <!-- Números de página -->
                        <template v-for="(page, index) in visiblePages" :key="index">
                            <span v-if="page === '...'" class="px-4 py-2 text-primary">...</span>
                            <button
                                v-else
                                @click="goToPage(page)"
                                :class="[
                                    'px-4 py-2 rounded-lg border transition-colors min-w-[44px]',
                                    currentPage === page
                                        ? 'bg-primary text-white border-primary'
                                        : 'border-primary/20 text-primary hover:bg-primary/10'
                                ]"
                            >
                                {{ page }}
                            </button>
                        </template>

                        <!-- Botón siguiente -->
                        <button
                            @click="goToPage(currentPage + 1)"
                            :disabled="currentPage === totalPages"
                            class="px-4 py-2 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <EndSection variant="subscribe" />
    </div>
</template>