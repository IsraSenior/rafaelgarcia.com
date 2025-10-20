<script setup>

</script>

<template>
    <div class="relative">
        <img src="/home-9.png" alt=""
            class="aspect-video w-full max-h-[60vh] overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-5/6 drop-shadow-2xl drop-shadow-primary/25">

        <div class="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span class="relative flex size-24">
                <span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-crecer opacity-75 z-0"></span>
                <button class="relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="size-24 text-secondary-crecer">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </span>
        </div>
    </div>
</template>