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
    image: {
        type: Array,
        required: false
    }
})
</script>

<template>
    <div class="max-w-sm bg-white rounded-4xl overflow-hidden drop-shadow-xl drop-shadow-primary/5">
        <img class="object-cover object-center w-full aspect-square h-72" :src="image" :alt="name" />
        <div class="p-10 flex flex-col items-start justify-between">
            <h5 class="title title--element text-primary w-full mb-2 line-clamp-2 overflow-hidden">
                {{ name }}
            </h5>
            <span class="text-base font-public text-paragraph">
                {{ title }}
            </span>
            <div class="mt-4 flex items-center justify-start gap-4">
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