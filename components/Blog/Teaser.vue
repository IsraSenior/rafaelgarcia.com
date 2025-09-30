<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="relative overflow-hidden bg-white rounded-4xl drop-shadow-xl drop-shadow-primary/5 isolate">
        <img class="object-cover object-center w-full aspect-square h-72" :src="image" alt="" />
        <div class="flex flex-col items-center justify-between p-10">
            <h5 class="w-full mb-2 overflow-hidden title title--element text-primary h-14 line-clamp-2">
                {{ title }}
            </h5>
            <NuxtLink to="/blog/id" class="flex items-center justify-between w-full mt-10 link primary">
                <span>Leer más</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd" />
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>