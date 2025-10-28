<script setup>
const config = useRuntimeConfig()
const { getTeamMembers, getFeaturedMember } = useDirectus()
const { getAssetUrl, isUUID, isURL } = useDirectusAsset()

// SEO Meta Tags
useSeoMeta({
  title: 'Sobre Rafael García | Coach Ontológico y Equipo',
  description: 'Conoce a Rafael García, coach ontológico y comunicador transformacional, y al equipo de especialistas que acompañan tu proceso de transformación personal.',
  ogTitle: 'Sobre Rafael García | Coach Ontológico y Equipo',
  ogDescription: 'Conoce a Rafael García y al equipo de especialistas en desarrollo personal y transformación.',
  ogImage: `${config.public.siteUrl}/rafael-garcial.webp`,
  ogUrl: `${config.public.siteUrl}/equipo`,
  ogType: 'profile',
  ogLocale: 'es_CO',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Sobre Rafael García | Coach Ontológico y Equipo',
  twitterDescription: 'Conoce a Rafael García y al equipo de especialistas en desarrollo personal.',
  twitterImage: `${config.public.siteUrl}/rafael-garcial.webp`,
  keywords: 'Rafael García, coach ontológico, equipo transformación, desarrollo personal, Colombia, comunicador, especialistas bienestar'
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/equipo`
    }
  ]
})

// Obtener el miembro destacado (Rafael García)
const { data: featuredMember } = await useAsyncData(
  'featured-member',
  () => getFeaturedMember()
)

// Obtener todos los demás miembros del equipo (no featured)
const { data: teamMembers } = await useAsyncData(
  'team-members',
  () => getTeamMembers({
    'filter[featured][_eq]': 'false'
  })
)

// Función para obtener la URL de la imagen
const getImageUrl = (image) => {
  if (!image) return '/rafael-garcial.webp'
  if (isUUID(image)) {
    return getAssetUrl(image, { width: 800, quality: 80 })
  }
  if (isURL(image)) {
    return image
  }
  return '/rafael-garcial.webp'
}

// Determinar si es un asset de Directus
const isDirectusImage = (image) => isUUID(image)
</script>

<template>
  <div class="gradient-muted">
    <section class="py-16">
      <div class="container px-5 mx-auto lg:px-20">
        <article v-if="featuredMember" class="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div class="relative">
            <div class="">
              <div class="space-y-5">
                <div class="relative isolate">
                  <NuxtImg
                    v-if="isDirectusImage(featuredMember.image)"
                    provider="directus"
                    :src="`/assets/${featuredMember.image}`"
                    :alt="featuredMember.name"
                    class="object-cover object-top w-full overflow-hidden lg:object-center aspect-square rounded-4xl group-hover:opacity-75 lg:aspect-3/4 drop-shadow-2xl drop-shadow-muted"
                    width="800"
                    height="1000"
                    quality="80"
                    loading="lazy"
                  />
                  <img
                    v-else
                    :src="getImageUrl(featuredMember.image)"
                    :alt="featuredMember.name"
                    class="object-cover object-top w-full overflow-hidden lg:object-center aspect-square rounded-4xl group-hover:opacity-75 lg:aspect-3/4 drop-shadow-2xl drop-shadow-muted"
                    loading="lazy"
                  >
                </div>
              </div>
            </div>
          </div>
          <div id="rafael-garcia" class="lg:col-span-2">
                <h1 class="uppertitle">Sobre mí - {{ featuredMember.name }}</h1>
                <div class="mt-6 space-y-6 text-lg leading-relaxed content" v-html="featuredMember.bio">
                </div>
          </div>
        </article>
      </div>
    </section>

    <section class="relative pb-16 lg:pb-32 lg:pt-24">
            <div class="container px-5 mx-auto lg:px-20">
                <!-- <article class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
                    <div class="flex flex-row justify-end">
                        <div class="max-w-2xl space-y-5 lg:pl-20">
                            <h3 class="uppertitle text-primary">Mi equipo</h3>
                            <h4 class="title title--headline text-primary">
                                Quienes te acompañan <br> <b><i>en este camino</i></b>
                            </h4>
                            <p class="text-primary">
                                Creemos en el poder de la escucha empática, la ciencia del bienestar y la sabiduría
                                interna
                                que cada persona posee. Juntos creamos un espacio seguro donde tu crisis se convierte en
                                oportunidad y cada paso se da a tu ritmo.
                            </p>
                            <a href="#equipo" class="mt-10 btn crecer">
                                <span>¡Conócenos!</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6">
                                    <path fill-rule="evenodd"
                                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <img src="/doctors-1.webp" alt=""
                            class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 lg:absolute max-w-lg left-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-xl drop-shadow-primary/5 hidden lg:block">
                    </div>
                </article> -->

                <h2 class="max-w-3xl mx-auto text-center title title--headline text-primary">
                    Quienes te acompañan <br> <b><i> <u class="decoration-secondary-crecer">en este camino</u></i></b>
                </h2>
                <div id="equipo" class="grid grid-cols-1 gap-10 mt-32 md:grid-cols-2 lg:grid-cols-3">
                    <TeamTeaser v-for="member in teamMembers" :key="member.id" :image="member?.image" :title="member?.title"
                        :bio="member?.bio" :name="member?.name" />
                </div>
            </div>
        </section>

        <EndSection variant="subscribe" />

    <!-- <section class="relative pb-16 lg:pb-32 lg:pt-24">
      <div class="container px-5 mx-auto lg:px-20">
        <article class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
          <div class="flex flex-row-reverse justify-end">
            <div class="max-w-2xl space-y-5 lg:pr-20">
              <h3 class="uppertitle text-primary">Mi equipo</h3>
              <h4 class="title title--headline text-primary">
                Quienes te acompañan <br> <b><i>en este camino</i></b>
              </h4>
              <p class="text-primary">
                Creemos en el poder de la escucha empática, la ciencia del bienestar y la sabiduría
                interna
                que cada persona posee. Juntos creamos un espacio seguro donde tu crisis se convierte en
                oportunidad y cada paso se da a tu ritmo.
              </p>
              <NuxtLink :to="{ path: '/equipo', hash: '#equipo'}" class="mt-10 btn crecer">
                <span>¡Conócenos!</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path fill-rule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
            <img src="/doctors-1.webp" alt=""
              class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 lg:absolute max-w-lg right-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-xl drop-shadow-primary/5 hidden lg:block">
          </div>
        </article>
      </div>
    </section> -->
  </div>
</template>