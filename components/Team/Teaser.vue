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
        type: String,
        required: false
    }
})
</script>

<template>
    <div class="overflow-hidden bg-white rounded-4xl drop-shadow-xl drop-shadow-primary/5">
        <img class="object-cover object-top w-full aspect-square h-72" :src="image" :alt="name" />
        <div class="flex flex-col items-start justify-between p-10">
            <h5 class="w-full mb-2 overflow-hidden title title--element text-primary line-clamp-2">
                {{ name }}
            </h5>
            <span class="text-base font-public text-paragraph">
                {{ title }}
            </span>
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