<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    bio: {
        type: String,
        required: false
    }
})

const { getAssetUrl, isUUID, isURL } = useDirectusAsset()
const more = ref(false)

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
    <div class="relative overflow-hidden bg-white rounded-4xl drop-shadow-xl drop-shadow-primary/5 isolate">
        <NuxtImg
            v-if="isDirectusAsset"
            provider="directus"
            :src="`/assets/${props.image}`"
            :alt="name"
            class="object-cover object-center w-full aspect-square h-96"
            width="800"
            height="800"
            fit="cover"
            quality="80"
            loading="lazy"
        />
        <img
            v-else
            class="object-cover object-center w-full aspect-square h-96"
            :src="imageUrl"
            :alt="name"
            loading="lazy"
        />
        <div class="flex flex-col items-start justify-between p-10">
            <h5 class="w-full mb-2 overflow-hidden title title--element text-primary line-clamp-2">
                {{ name }}
            </h5>
            <span class="text-base font-public text-paragraph">
                {{ title }}
            </span>

            <div v-if="more" class="absolute inset-0 h-full p-10 overflow-y-auto bg-white content"
                v-html="bio">
            </div>

            <button @click.prevent="more = !more"
                class="absolute z-10 flex items-center justify-center transition-all duration-300 ease-in-out rounded-full shadow-sm size-10 shadow-primary/15 text-primary bottom-5 right-5 hover:bg-primary hover:text-muted">
                <svg :class="'transition-all duration-300 ease-in-out transform', { 'rotate-45': !more }"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>