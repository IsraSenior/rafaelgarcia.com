<script setup>
const show = ref(true);
</script>

<template>
    <div v-if="show" class="flex items-center gap-x-6 bg-gradient-muted px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <p class="text-base font-public text-primary">
            <a href="#" class="hover:text-white">
                <strong class="font-semibold">GeneriCon 2025</strong><svg viewBox="0 0 2 2"
                    class="mx-5 inline size-0.5 fill-current" aria-hidden="true">
                    <circle cx="1" cy="1" r="1" />
                </svg>Participa de este evento con nosotros en Cajicá del 7 al 9 de junio&nbsp;<span
                    aria-hidden="true">&rarr;</span>
            </a>
        </p>
        <div class="flex flex-1 justify-end">
            <button type="button" @click.prevent="show = false"
                class="-m-3 p-3 focus-visible:-outline-offset-4 text-primary hover:text-white">
                <span class="sr-only">Dismiss</span>
                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path
                        d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </button>
        </div>
    </div>
</template>