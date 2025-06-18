<script setup>
const logos = ref([
    "https://brandlogos.net/wp-content/uploads/2023/09/humana-logo_brandlogos.net_ub8fy.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Aetna_logo.svg/1280px-Aetna_logo.svg.png",
    "https://static.cdnlogo.com/logos/c/62/cigna.svg",
    "https://brandlogos.net/wp-content/uploads/2023/09/humana-logo_brandlogos.net_ub8fy.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Aetna_logo.svg/1280px-Aetna_logo.svg.png",
    "https://static.cdnlogo.com/logos/c/62/cigna.svg",
]);

const words = ref([
    "Respira con calma",
    "Aquí y ahora",
    "Observa sin juzgar",
    "Silencio interior profundo",
    "Mente en paz",
    "Gracias por todo",
    "Bendiciones diarias presentes",
    "Aprecio este momento",
    "Valorar lo pequeño",
    "Amor y gratitud",
    "Sana con amor",
    "Libera tus cargas",
    "Abraza tu dolor",
    "Reconstruyete con paciencia",
    "Escucha tu alma",
    "Equilibrio en ti",
    "Calma tus pensamientos",
    "Centro en paz",
    "Fluir sin resistir",
    "Raíces bien firmes",
    "Crece cada día",
    "Aprende y evoluciona",
    "Conócete a ti",
    "Sueña sin miedo",
    "Transforma tu vida",
])
</script>

<template>
    <div class="">
        <section>
            <div class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
                <div class="flex">
                    <div class="max-w-2xl space-y-5">
                        <h1 class="title title--headline text-primary font-normal !text-5xl">Transforma tu crisis y
                            recupera el <b><i>rumbo de tu vida <u class="decoration-secondary-crecer">con tus propios
                                        recursos</u></i></b></h1>
                        <p>Convierte tus crisis en aprendizaje, sabiduría, sanación y crecimiento</p>

                        <button class="btn crecer mt-10">
                            <span>Comienza Tu Camino</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6">
                                <path fill-rule="evenodd"
                                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <img src="/home-1.png" alt=""
                        class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 absolute max-w-2xl right-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-2xl drop-shadow-muted">
                </div>
            </div>
        </section>

        <!-- <section class="py-16">
            <div class="container mx-auto px-20">
                <p class="font-semibold">Empresas que confiaron en este camino:</p>

                <ul class="flex items-center justify-center space-x-20 mt-12">
                    <li class="w-1/5 filter grayscale-100 opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out"
                        v-for="(logo, index) in logos" :key="index">
                        <img class="w-full h-20 object-contain object-center" :src="logo" alt="">
                    </li>
                </ul>
            </div>
        </section> -->

        <section class="py-16 lg:py-32 overflow-x-hidden">
            <div class="container mx-auto px-20">
                <h2 class="title title--headline text-primary text-center max-w-3xl mx-auto">Encuentra el equilibrio y
                    <b><i>despliega <u class="decoration-secondary-crecer">tu potencial</u></i></b>
                </h2>

                <div class="space-y-72 mt-96">
                    <article class="relative flex items-center justify-between w-full gap-10">
                        <IllustrationLine1 class="absolute -top-1/4 left-0 -translate-y-1/2 -translate-x-1/6"
                            color="text-white" />
                        <div
                            class="flex items-center justify-center px-12 py-10 w-1/2 order-1 bg-primary rounded-[40px]">
                            <div class="space-y-5">
                                <h3 class="uppertitle text-white">¿Para qué iniciar este camino?</h3>
                                <h4 class="title title--headline text-white">
                                    Transforma tu crisis y recupera el <b><i>rumbo de tu vida</i></b>
                                </h4>
                                <p class="text-white">Con la combinación de mi experiencia clínica, transpersonal y
                                    organizacional, te
                                    ofezco una guía profunda para tu transformación personal y profesional.
                                </p>
                                <button class="btn estabilizar mt-10">
                                    <span>Descubre más</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <img src="/home-2.png" alt=""
                                class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                        </div>
                    </article>

                    <article class="relative flex items-center justify-between w-full gap-10">
                        <IllustrationLine2 class="absolute top-0 right-0 -translate-y-full translate-x-full"
                            color="text-white" />
                        <div class="flex items-center w-1/2 bg-white rounded-[40px] px-12 py-10">
                            <div class="space-y-5">
                                <h3 class="uppertitle">Hecho para ti</h3>
                                <h4 class="title title--headline text-primary">
                                    Tu Camino hacia el <b><i>Bienestar y la Transformación</i></b>
                                </h4>
                                <p class="">Una gama de programas y talleres diseñados para acompañarte en tu
                                    viaje de desarrollo
                                    personal.</p>

                                <div class="mt-10 space-x-5">
                                    <button class="btn sanar">
                                        <span>Camino Vital</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="size-6">
                                            <path fill-rule="evenodd"
                                                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button class="link sanar mt-10">
                                        <span>Conoce mis talleres</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2 flex gap-10 min-h-[500px]">
                            <div class="self-end w-1/2">
                                <img src="/home-3.png" alt=""
                                    class="aspect-square max-h-[450px] w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-1/2 drop-shadow-2xl drop-shadow-muted">
                            </div>
                            <div class="w-1/2">
                                <img src="/home-5.png" alt=""
                                    class="aspect-square max-h-[450px] w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-1/2 drop-shadow-2xl drop-shadow-muted">
                            </div>
                        </div>
                    </article>

                    <article class="container mx-auto rounded-[40px] bg-primary mt-10 py-24 px-20 relative">
                        <div class="flex justify-end">
                            <div class="max-w-2xl space-y-5 pl-20">
                                <h3 class="uppertitle text-white">Inicia ahora</h3>
                                <h4 class="title title--headline text-white">
                                    Descubre <br> <b><i>Tu Punto de Partida</i></b>
                                </h4>
                                <p class="text-white">Responde unas breves preguntas para identificar tus necesidades actuales y encontrar
                                    el programa perfecto para ti.</p>
                                <button class="btn crecer mt-10">
                                    <span>Realizar el Test</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <img src="/home-10.png" alt=""
                                class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 absolute max-w-lg left-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-2xl drop-shadow-primary/5">
                        </div>
                    </article>

                    <!-- <article class="relative flex items-center justify-between w-full gap-10">
                        <IllustrationLine3 class="absolute -top-1/4 left-0 -translate-y-1/2 -translate-x-full"
                            color="text-white" />
                        <div class="flex items-center h-full w-1/2 bg-white rounded-[40px] px-12 py-10 order-1">
                            <div class="space-y-5">
                                <h3 class="uppertitle">Inicia ahora</h3>
                                <h4 class="title title--headline text-primary">
                                    Descubre <br> <b><i>Tu Punto de Partida</i></b>
                                </h4>
                                <p>Responde unas breves preguntas para identificar tus necesidades actuales y encontrar
                                    el programa perfecto para ti.</p>
                                <button class="btn crecer mt-10">
                                    <span>Realizar el Test</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <img src="/home-10.png" alt=""
                                class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                        </div>
                    </article> -->
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32 bg-muted">
            <div class="container mx-auto px-20">
                <h2 class="title title--headline text-primary text-center max-w-3xl mx-auto">
                    Te acompaño desde una <b><i><u class="decoration-secondary-crecer">visión integral</u></i></b>
                </h2>
                <VideoPlayer class="mt-16" />

            </div>
            <div class="flex overflow-hidden mt-16">
                <div class="flex grow-0 shrink-0 basis-auto items-center marquee">
                    <span v-for="(word, index) in words" :key="index"
                        class="title title--element text-primary block py-2 px-20 tracking-widest">{{ word }}</span>
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32 bg-primary">
            <div class="container mx-auto px-20">
                <h2 class="title title--headline text-white text-center">
                    ¿Cómo funciona <b><i><u class="decoration-secondary-crecer max-w-3xl mx-auto">Camino
                                Vital</u></i></b> ?
                </h2>

                <div class="relative grid grid-cols-1 md:grid-cols-2 gap-20 mt-16">
                    <!-- <img src="/ilustracion-spiral.svg"
                        class="absolute top-1/4 left-32 scale-x-[-1] -translate-y-1/2 -translate-x-full" /> -->
                    <div class="space-y-5 relative">
                        <article class="bg-muted rounded-4xl p-10 flex space-x-10">
                            <div>
                                <span class="title title--headline !text-secondary-crecer">3</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Crecer</h5>
                                <p>Vive la vida con una comprensión más profunda, una expresión más auténtica y una
                                    mayor atención.</p>
                            </div>
                        </article>

                        <article class="bg-muted rounded-4xl p-10 flex space-x-10">
                            <div>
                                <span class="title title--headline !text-secondary-sanar">2</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Sanar</h5>
                                <p>Reescribe tu historia: tus heridas emocionales pueden ser el origen de tu sabiduría y
                                    tu camino hacia la libertad.</p>
                            </div>
                        </article>

                        <article class="bg-muted rounded-4xl p-10 flex space-x-10">
                            <div>
                                <span class="title title--headline !text-secondary-estabilizar">1</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Estabilizar</h5>
                                <p>Encuentra la armonía interior y recupera la calma en tu mente.</p>
                            </div>
                        </article>
                    </div>
                    <div>
                        <!-- <img src="/home-11.png" alt=""
                            class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 drop-shadow-2xl drop-shadow-muted"> -->
                    </div>

                    <div class="flex items-center justify-center md:col-span-2">
                        <button class="btn crecer">
                            <span>Comienza tu Camino Vital </span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6">
                                <path fill-rule="evenodd"
                                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32">
            <div class="container mx-auto px-20">
                <div class="text-center space-y-4">
                    <h2 class="title title--headline text-primary text-center">
                        ¿Qué dicen <b><i><u class="decoration-secondary-crecer">mis pacientes</u></i></b>?
                    </h2>
                    <p>Más de 250 personas han confiado en mi metodología</p>
                </div>
            </div>
            <div class="mt-16">
                <Carousel v-bind="{
                    itemsToShow: 3.5,
                    wrapAround: true,
                    gap: 40,
                    autoplay: 3000
                }">
                    <Slide v-for="slide in 10" :key="slide">
                        <figure class="bg-white rounded-4xl py-10 px-20 space-x-10 space-y-5 text-center">
                            <div class="flex items-center justify-center w-full mb-10">
                                <svg class="w-4 h-4 text-secondary-crecer ms-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-secondary-crecer ms-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-secondary-crecer ms-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-secondary-crecer ms-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 ms-1 text-muted dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </div>
                            <blockquote class="w-full">
                                <p class="!text-primary">Fill out a contact form with your information and a patient
                                    access coordinator
                                    will be in contact to schedule an intake appointment within 24 hours.</p>
                            </blockquote>
                            <figcaption class="mt-10 flex justify-center items-center gap-x-6">
                                <img class="size-14 rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="">
                                <div class="text-base text-left">
                                    <div class="paragrpah !text-primary !font-literata">Joseph Rodriguez</div>
                                    <div class="mt-1 paragraph !text-sm">CEO of Reform</div>
                                </div>
                            </figcaption>
                        </figure>
                    </Slide>

                    <template #addons>
                        <!-- <Navigation /> -->
                        <!-- <Pagination /> -->
                    </template>
                </Carousel>
            </div>
        </section>

        <section class="py-16 md:py-32">
            <div class="container mx-auto">
                <div class="bg-primary rounded-4xl p-10">
                    <article class="relative min-h-[60vh] flex items-center justify-start px-20">
                        <img src="/home-1-7.webp" alt=""
                            class="w-full h-full absolute inset-0 overflow-hidden rounded-4xl object-cover object-center">

                        <div class="relative max-w-lg space-y-5">
                            <h2 class="title title--headline text-white text-left">
                                ¿Te encuentras <b><i>desbordado</i></b>?
                            </h2>

                            <p class="!text-white">
                                Da el primer paso hacia tu estabilidad emocional encontrando la armonía interior y
                                recuperando
                                la calma en tu mente.
                            </p>

                            <button class="btn sanar mt-10">
                                <span>Módulo Estabilizar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6">
                                    <path fill-rule="evenodd"
                                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </article>

                    <div class="pt-10 grid grid-cols-1 md:grid-cols-4 px-20 divide-dashed divide-x-2 divide-muted">
                        <div class="space-y-5 text-center">
                            <p class="text-white title title--headline">10</p>
                            <p class="text-white title title--element">Therapists</p>
                        </div>

                        <div class="space-y-5 text-center">
                            <p class="text-white title title--headline">59</p>
                            <p class="text-white title title--element">Specialties</p>
                        </div>

                        <div class="space-y-5 text-center">
                            <p class="text-white title title--headline">4</p>
                            <p class="text-white title title--element">Services</p>
                        </div>

                        <div class="space-y-5 text-center">
                            <p class="text-white title title--headline">1</p>
                            <p class="text-white title title--element">Location</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-24">
            <div class="container mx-auto px-20">
                <div class="text-center space-y-4">
                    <h2 class="title title--headline text-primary text-center">
                        Inspiración para <b><i><u class="decoration-secondary-crecer">tu transformación</u></i></b>
                    </h2>
                </div>

                <div class="mt-16 grid grid-cols-3 gap-10">
                    <BlogTeaser image="/vista-frontal-mujer-meditando-en-estera.jpg"
                        title="Mi primera experiencia con la respiración Holotrópica" />
                    <BlogTeaser image="/proceso-de-curacion-de-la-mujer-de-vista-frontal.jpg"
                        title="Regulación Emocional" />
                    <BlogTeaser image="/concepto-de-lifestyle-de-chica-adolescente.jpg" title="Vive un día a la vez" />
                </div>

                <div class="flex items-center justify-center md:col-span-2 mt-20">
                    <button class="btn crecer">
                        <span>Ver Más Inspiración</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd"
                                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <section class="py-16 md:pt-24 md:pb-32">
            <div class="container mx-auto px-20">
                <article class="relative flex items-center justify-between w-full gap-20">
                    <div class="flex items-center w-2/5">
                        <div class="space-y-5">
                            <h3 class="uppertitle">¿Tienes alguna duda?</h3>
                            <h4 class="title title--headline text-primary">
                                Preguntas <b><i><u class="decoration-secondary-crecer">frecuentes</u></i></b>
                            </h4>

                            <div class="mt-16">
                                <img src="/home-4.png" alt=""
                                    class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2 flex items-center justify-center">
                        <Accordion />
                    </div>
                </article>
            </div>
        </section>

        <section class="">
            <div class=" mx-auto">
                <div class="bg-primary rounded-t-[40px] p-10">
                    <article class="relative min-h-[60vh] flex items-center justify-start px-20">
                        <img src="/home-6.png" alt=""
                            class="w-full h-full absolute inset-0 transform scale-x-[-1] overflow-hidden rounded-4xl object-cover object-center">

                        <div class="relative max-w-2xl space-y-5">
                            <h2 class="title title--headline text-white text-left">Permíteme <br> <b><i>mantenerte<u
                                            class="decoration-secondary-crecer"> informado</u></i></b>
                            </h2>

                            <p class="!text-white">Sé el primero en recibir información sobre nuestros programas,
                                eventos,
                                testimonios y mucho más.</p>

                            <div class="flex items-center justif-start space-x-5 mt-10">
                                <input type="email" placeholder="Correo electrónico"
                                    class="btn !border-2 !border-white border-solid placeholder:text-white outline-none !text-white focus:!bg-white focus:!text-primary">
                                <button class="btn primary !w-auto">
                                    <span>Subscribirme</span>
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>