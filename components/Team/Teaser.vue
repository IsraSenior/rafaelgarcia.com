<script setup>
defineProps({
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
        required: true
    },
    text: {
        type: String,
        required: false
    }
})

const more = ref(false)
</script>

<template>
    <div class="relative overflow-hidden bg-white rounded-4xl drop-shadow-xl drop-shadow-primary/5 isolate">
        <img class="object-cover object-center w-full aspect-square h-96" :src="image" :alt="name" />
        <div class="flex flex-col items-start justify-between p-10">
            <h5 class="w-full mb-2 overflow-hidden title title--element text-primary line-clamp-2">
                {{ name }}
            </h5>
            <span class="text-base font-public text-paragraph">
                {{ title }}
            </span>

            <div v-if="more" class="absolute inset-0 h-full p-10 overflow-y-auto whitespace-pre-wrap bg-white content"
                v-html="text">
            </div>

            <button @click.prevent="more = !more"
                class="absolute z-10 flex items-center justify-center transition-all duration-300 ease-in-out rounded-full shadow-sm size-10 shadow-primary/15 text-primary bottom-5 right-5 hover:bg-primary hover:text-muted">
                <svg :class="'transition-all duration-300 ease-in-out transform', { 'rotate-45': !more }"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="flex items-center justify-start gap-4 mt-4">
                <a href="#">
                    <img src="/linkedin-svgrepo-com.svg" class="size-4" alt="">
                </a>
                <a href="#">
                    <img src="/instagram-svgrepo-com.svg" class="size-4" alt="">
                </a>
                <a href="#">
                    <img src="/twitter-svgrepo-com.svg" class="size-4" alt="">
                </a>
            </div>
        </div>
    </div>
</template>