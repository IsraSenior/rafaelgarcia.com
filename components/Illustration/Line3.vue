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
    <svg xmlns="http://www.w3.org/2000/svg" width="158" height="602" viewBox="0 0 158 602" fill="none" stroke="currentColor" :class="color">
        <path d="M147.86 10C33.1931 74.6667 -85.7741 322 129.86 592M129.86 592V540M129.86 592L80.8595 567"
            stroke-width="20" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>