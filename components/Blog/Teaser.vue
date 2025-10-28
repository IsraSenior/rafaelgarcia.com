<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    slug: {
        type: String,
        required: false,
        default: ''
    },
    excerpt: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    readingTime: {
        type: Number,
        required: false
    }
})

const { getAssetUrl, isUUID, isURL } = useDirectusAsset()

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date)
}

// Obtener la URL de la imagen o usar fallback
const imageUrl = computed(() => {
    if (!props.image) return '/vista-frontal-mujer-meditando-en-estera.jpg'

    // Si es UUID, construir URL de Directus
    if (isUUID(props.image)) {
        return getAssetUrl(props.image, { width: 800, height: 800, fit: 'cover', quality: 80 })
    }

    // Si es URL, retornarla tal cual
    if (isURL(props.image)) {
        return props.image
    }

    // Fallback
    return '/vista-frontal-mujer-meditando-en-estera.jpg'
})

// Determinar si la imagen es de Directus para usar provider
const isDirectusAsset = computed(() => isUUID(props.image))
</script>

<template>
    <article class="relative overflow-hidden bg-white rounded-4xl drop-shadow-xl drop-shadow-primary/5 isolate flex flex-col">
        <div class="relative">
            <NuxtImg
                v-if="isDirectusAsset"
                provider="directus"
                :src="`/assets/${props.image}`"
                :alt="title"
                class="object-cover object-center w-full aspect-square h-72"
                width="800"
                height="800"
                fit="cover"
                quality="80"
                loading="lazy"
            />
            <img
                v-else
                class="object-cover object-center w-full aspect-square h-72"
                :src="imageUrl"
                :alt="title"
                loading="lazy"
            />
            <div v-if="readingTime" class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                {{ readingTime }} min lectura
            </div>
        </div>
        <div class="flex flex-col flex-1 p-8">
            <div v-if="date" class="text-xs text-primary/60 mb-3 uppercase tracking-wider">
                {{ formatDate(date) }}
            </div>
            <h3 class="mb-3 title title--element text-primary line-clamp-2">
                {{ title }}
            </h3>
            <p v-if="excerpt" class="text-paragraph text-sm mb-6 line-clamp-3 flex-1">
                {{ excerpt }}
            </p>
            <NuxtLink :to="`/blog/${slug || 'id'}`" class="flex items-center justify-between w-full mt-auto link primary">
                <span>Leer más</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd" />
                </svg>
            </NuxtLink>
        </div>
    </article>
</template>