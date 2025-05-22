<script setup>
const current = ref(0);
</script>

<template>
    <ul class="grid grid-cols-1 divide-dashed divide-y-2 divide-muted w-full">
        <li v-for="(item, index) in 5" :key="index" class="">
            <button type="button" @click.prevent="current = index"
                class="flex items-center justify-between w-full cursor-pointer hover:text-secondary-crecer group transition-all duration-300 ease-in-out">
                <h4 class="title title--element text-primary group-hover:!text-secondary-crecer py-8">Lorem ipsum dolor
                    sit
                    amet consectetur adipisicing?</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd"
                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                        clip-rule="evenodd" />
                    <path fill-rule="evenodd"
                        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <div
                :class="['transition-all duration-300 ease-in-out overflow-hidden', { 'h-0 opacity-0': current !== index }, { 'h-auto opacity-100 mb-5': current === index }]">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, repudiandae? Aspernatur ea rem amet
                    cumque dolorem, eligendi quod a beatae optio, itaque eius sint natus vel vero eos. Sunt itaque
                    veniam numquam, mollitia ea ex!</p>
            </div>
        </li>
    </ul>
</template>