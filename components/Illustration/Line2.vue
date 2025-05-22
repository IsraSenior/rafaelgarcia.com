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
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="662" viewBox="0 0 200 662" fill="none"
        stroke="currentColor" :class="color">
        <path d="M10 10C216 76 257 499 70.6331 652" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>