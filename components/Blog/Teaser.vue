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
    <div class="max-w-sm bg-white rounded-4xl overflow-hidden drop-shadow-xl drop-shadow-primary/5">
        <img class="object-cover object-center w-full aspect-square h-72" :src="image" alt="" />
        <div class="p-10 flex flex-col items-center justify-between">
            <h5 class="title title--element text-primary mb-2 w-full h-14 line-clamp-2 overflow-hidden">
                {{ title }}
            </h5>
            <a href="#" class="link primary mt-10 w-full flex items-center justify-between">
                <span>Leer más</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd" />
                </svg>
            </a>
        </div>
    </div>
</template>