<script setup>
const props = defineProps({
    service: {
        type: Object,
        required: true
    },
})

const { getAssetUrl, isUUID, isURL } = useDirectusAsset()

// Determinar si la imagen es de Directus
const isDirectusImage = computed(() => isUUID(props.service?.featured_image || props.service?.image))

// Obtener URL de imagen
const getImageUrl = (image) => {
  if (!image) return '/vista-frontal-mujer-meditando-en-estera.jpg'
  if (isUUID(image)) {
    return getAssetUrl(image, { width: 800, quality: 80 })
  }
  if (isURL(image)) {
    return image
  }
  return '/vista-frontal-mujer-meditando-en-estera.jpg'
}

// Slug puede venir como "to" o "slug"
const slug = computed(() => props.service?.slug || props.service?.to)
</script>

<template>
    <div class="relative overflow-hidden bg-white rounded-4xl drop-shadow-xl drop-shadow-primary/5 isolate">
        <NuxtImg
            v-if="isDirectusImage"
            provider="directus"
            :src="`/assets/${service.featured_image || service.image}`"
            :alt="service.title"
            class="object-cover object-center w-full aspect-square h-72"
            width="800"
            height="800"
            quality="80"
            loading="lazy"
        />
        <img
            v-else
            class="object-cover object-center w-full aspect-square h-72"
            :src="getImageUrl(service.featured_image || service.image)"
            :alt="service.title"
        />
        <div class="flex flex-col items-end justify-between p-10">
            <h5 class="w-full mb-2 overflow-hidden title title--element text-primary h-14 line-clamp-2">
                {{ service.title }}
            </h5>
            <div v-html="props.service?.description" class="line-clamp-3"></div>
            <div>
                <NuxtLink :to="`/servicios/${slug}`" class="flex items-center justify-start mt-10 link primary">
                    <span>Leer más</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd"
                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>