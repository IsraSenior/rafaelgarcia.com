<script setup>
defineProps({
    color: {
        type: String,
        required: false,
        default: "text-primary/10"
    }
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="822" height="407" viewBox="0 0 822 407" fill="none"
        stroke="currentColor" :class="color">
        <path
            d="M811.86 10.5659C769.227 137.566 467.86 96.5659 259.86 40.5659C-0.140289 -29.4341 -66.1403 312.566 105.86 396.566"
            stroke-width="20" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>