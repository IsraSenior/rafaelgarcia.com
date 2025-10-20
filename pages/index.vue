<script setup>
const logos = [
    "https://brandlogos.net/wp-content/uploads/2023/09/humana-logo_brandlogos.net_ub8fy.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Aetna_logo.svg/1280px-Aetna_logo.svg.png",
    "https://static.cdnlogo.com/logos/c/62/cigna.svg",
    "https://brandlogos.net/wp-content/uploads/2023/09/humana-logo_brandlogos.net_ub8fy.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Aetna_logo.svg/1280px-Aetna_logo.svg.png",
    "https://static.cdnlogo.com/logos/c/62/cigna.svg",
];

const words = [
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
];

const testimonials = [
    {
        quote: "Es el mejor programa para conocerse a uno mismo, cuando uno cree que lleva toda la vida conviviendo y conociendose a uno mismo entra al taller y se da cuenta que falta mucho por auto conocerse.",
        name: "Sebastián Mejías",
        role: "",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        quote: "El programa de camino vital me ayudó a entender el camino que quiero escoger para mi vida, me dio las herramientas para calmar mis emociones cuando todo parece salirse de control y aprovecharlas para aprender de cada situación lo más que pueda. Para hacer parte de mi el conocimiento de cómo funciono yo personalmente, alejado de cómo funciona el mundo en general. Me dio un lugar donde me sentí entendida y acompañada.",
        name: "Yessica Ortiz",
        role: "",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        quote: "Camino Vital es una invitación para mirar hacia adentro y cuestionarte cómo vives tu vida desde las distintas dimensiones que nos hace seres humanos. Es un camino en donde dejas de ser víctima de tu realidad para empezar a asumir un papel más activo de cómo respondes a aquellas situaciones que no controlas y, en definitiva, para empezar a crear esa vida que tanto deseas.",
        name: "Alejandra Velandia",
        role: "Psicóloga",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        quote: "Gracias a Camino Vital volví a disfrutar de la vida en sus pequeñas cosas diarias, a priorizarme sin culpa y a reconectarme con lo que de verdad quiero para mi. Aprendí a hacer pausas, a cuidarme desde el amor y no desde la exigencia, y a elegir con más conciencia lo que me nutre y nutre mis relaciones. ",
        name: "Paula Elena Vasco",
        role: "",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    // {
    //     quote: "",
    //     name: "María Isabel Paz",
    //     role: "",
    //     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    // },
    {
        quote: "Para mí, Camino Vital fue mucho más que un programa; fue un compañero que me desafió a enfrentar lo que pensaba sobre mi vida. Fue un camino constante de búsqueda y descubrimiento personal. Me ayudó a reconocer quién soy y a crecer desde lo más profundo. Lo recomiendo de corazón, pero solo si estás realmente dispuesto a trabajar en ti y a abrirte al cambio.",
        name: "Fernanda Molina",
        role: "Psicóloga",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        quote: "Este programa me permitió darme cuenta de los superpoderes que tengo, que puedo potenciar y que elijo crear cuando trabajo en mí.",
        name: "Sandra Cruz",
        role: "",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        quote: "Camino vital es un regalo para el alma. Si bien la vida consiste en ser un continuo aprendizaje, que bonito cultivar y gestar dichos espacios desde el amor y la compasión.",
        name: "Jennifer Vargas",
        role: "Antropóloga",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        quote: "En Camino Vital me sentí profundamente afortunada de tener la posibilidad de trabajar en mi. Estuve muy motivada con los diferentes contenidos y experiencias. Descubrí versiones de mí de las que no era consciente, asombrada de todo lo que iba encontrando en mi proceso personal. Me sentí muy acompañada y respaldada en ese ciclo de ir y venir con las emociones y con los miedos.",
        name: "Diana Gamboa",
        role: "",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
]
</script>

<template>
    <div>
        <section class="mt-[125px]">
            <div class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
                <div class="flex">
                    <div class="max-w-2xl space-y-5">
                        <h1 class="title title--headline text-primary font-normal !text-5xl">Transforma tu crisis y
                            recupera el <b><i>rumbo de tu vida <u class="decoration-secondary-crecer">con tus propios
                                        recursos</u></i></b></h1>
                        <p>Convierte tus crisis en aprendizaje, sabiduría, sanación y crecimiento</p>

                        <button class="mt-10 btn crecer">
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
            <div class="container px-20 mx-auto">
                <p class="font-semibold">Empresas que confiaron en este camino:</p>

                <ul class="flex items-center justify-center mt-12 space-x-20">
                    <li class="w-1/5 transition-all duration-300 ease-in-out opacity-50 filter grayscale-100 hover:grayscale-0 hover:opacity-100"
                        v-for="(logo, index) in logos" :key="index">
                        <img class="object-contain object-center w-full h-20" :src="logo" alt="">
                    </li>
                </ul>
            </div>
        </section> -->

        <section class="py-16 overflow-x-hidden lg:py-32">
            <div class="container px-20 mx-auto">
                <h2 class="max-w-3xl mx-auto text-center title title--headline text-primary">Encuentra el equilibrio y
                    <b><i>despliega <u class="decoration-secondary-crecer">tu potencial</u></i></b>
                </h2>

                <div class="space-y-72 mt-96">
                    <article class="relative flex items-center justify-between w-full gap-10">
                        <IllustrationLine1 class="absolute left-0 -translate-y-1/2 -top-1/4 -translate-x-1/6"
                            color="text-white" />
                        <div
                            class="flex items-center justify-center px-12 py-10 w-1/2 order-1 bg-primary rounded-[40px]">
                            <div class="space-y-5">
                                <h3 class="text-white uppertitle">¿Para qué iniciar este camino?</h3>
                                <h4 class="text-white title title--headline">
                                    Conecta con tus recursos y 
                                     <b><i><u class="decoration-secondary-crecer">vive con autonomía y propósito</u></i></b>
                                </h4>
                                <p class="text-white mt-8">Con la combinación de mi experiencia personal y clínica, te
                                    ofrezco una guía profunda que integra conocimiento, práctica y vivencia para
                                    acompañarte en tu transformación personal y profesional.
                                </p>
                                <button class="mt-10 btn crecer">
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
                                class="object-cover w-full overflow-hidden aspect-square rounded-4xl group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                        </div>
                    </article>

                    <article class="relative flex items-center justify-between w-full gap-10">
                        <IllustrationLine2 class="absolute top-0 right-0 translate-x-full -translate-y-full"
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
                                    <button class="mt-10 link sanar">
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
                            <div class="max-w-2xl pl-20 space-y-5">
                                <h3 class="text-white uppertitle">Inicia ahora</h3>
                                <h4 class="text-white title title--headline">
                                    Descubre <br> <b><i>Tu Punto de Partida</i></b>
                                </h4>
                                <p class="text-white">Responde unas breves preguntas para identificar tus necesidades
                                    actuales y encontrar
                                    el programa perfecto para ti.</p>
                                <button class="mt-10 btn crecer">
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
                                class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 absolute max-w-lg left-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-xl drop-shadow-primary/5">
                        </div>
                    </article>

                    <!-- <article class="relative flex items-center justify-between w-full gap-10">
                        <IllustrationLine3 class="absolute left-0 -translate-x-full -translate-y-1/2 -top-1/4"
                            color="text-white" />
                        <div class="flex items-center h-full w-1/2 bg-white rounded-[40px] px-12 py-10 order-1">
                            <div class="space-y-5">
                                <h3 class="uppertitle">Inicia ahora</h3>
                                <h4 class="title title--headline text-primary">
                                    Descubre <br> <b><i>Tu Punto de Partida</i></b>
                                </h4>
                                <p>Responde unas breves preguntas para identificar tus necesidades actuales y encontrar
                                    el programa perfecto para ti.</p>
                                <button class="mt-10 btn crecer">
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
                                class="object-cover w-full overflow-hidden aspect-square rounded-4xl group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                        </div>
                    </article> -->
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32 bg-muted">
            <div class="container px-20 mx-auto">
                <h2 class="max-w-3xl mx-auto text-center title title--headline text-primary">
                    Te acompaño desde una <b><i><u class="decoration-secondary-crecer">visión integral</u></i></b>
                </h2>
                <VideoPlayer class="mt-16" />

            </div>
            <div class="flex mt-16 overflow-hidden">
                <div class="flex items-center grow-0 shrink-0 basis-auto marquee">
                    <span v-for="(word, index) in words" :key="index"
                        class="block px-20 py-2 tracking-widest title title--element text-primary">{{ word }}</span>
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32 bg-primary">
            <div class="container px-20 mx-auto">
                <h2 class="text-center text-white title title--headline">
                    ¿Cómo funciona <b><i><u class="max-w-3xl mx-auto decoration-secondary-crecer">Camino
                                Vital</u></i></b> ?
                </h2>

                <div class="relative grid grid-cols-1 gap-20 mt-16 md:grid-cols-2">
                    <!-- <img src="/ilustracion-spiral.svg"
                        class="absolute top-1/4 left-32 scale-x-[-1] -translate-y-1/2 -translate-x-full" /> -->
                    <div class="relative space-y-5">
                        <article class="flex p-10 space-x-10 bg-muted rounded-4xl">
                            <div>
                                <span class="title title--headline !text-secondary-estabilizar">1</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Estabilizar</h5>
                                <p>Recupera el equilibrio físico, emocional y mental. Aprende a cuidar tu energía y crea bases sólidas para tu bienestar.</p>
                            </div>
                        </article>
                        

                        <article class="flex p-10 space-x-10 bg-muted rounded-4xl">
                            <div>
                                <span class="title title--headline !text-secondary-sanar">2</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Sanar</h5>
                                <p>Libera bloqueos y sana heridas emocionales. Transforma el dolor en aprendizaje, sabiduría y autocompasión.</p>
                            </div>
                        </article>

                        <article class="flex p-10 space-x-10 bg-muted rounded-4xl">
                            <div>
                                <span class="title title--headline !text-secondary-crecer">3</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Crecer</h5>
                                <p>Expande tu potencial en las 6 dimensiones. Conecta con tu propósito y vive con claridad, confianza y sentido.</p>
                            </div>
                        </article>
                    </div>
                    <div>

                            <img src="/home-5.png" alt=""
                                    class="object-cover w-full overflow-hidden h-full rounded-4xl">
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
            <div class="container px-20 mx-auto">
                <div class="space-y-4 text-center">
                    <h2 class="text-center title title--headline text-primary">
                        ¿Qué dicen <b><i><u class="decoration-secondary-crecer">las personas</u></i></b> que he acompañado?
                    </h2>
                    <!-- <p>Personas han confiado en mi metodología</p> -->
                </div>
            </div>
            <div class="mt-16">
                <Carousel v-bind="{
                    itemsToShow: 3.5,
                    wrapAround: true,
                    gap: 40,
                    autoplay: 3000
                }">
                    <Slide v-for="(testimonial, index) in testimonials" :key="index">
                        <figure class="px-10 py-10 space-x-10 space-y-5 text-center bg-white rounded-4xl">
                            <blockquote class="w-full">
                                <p class="!text-primary text-base"> {{ testimonial?.quote }} </p>
                            </blockquote>
                            <figcaption class="flex items-center justify-center mt-10 gap-x-6">
                                <img class="rounded-full size-14 bg-gray-50" :src="testimonial?.image" :alt="testimonial?.name">
                                <div class="text-base text-left">
                                    <div class="paragrpah !text-primary !font-literata">{{testimonial?.name}}</div>
                                    <div class="mt-1 paragraph !text-sm">{{testimonial?.role}}</div>
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
                <div class="p-10 bg-primary rounded-4xl">
                    <article class="relative min-h-[60vh] flex items-center justify-start px-20">
                        <img src="/home-1-7.webp" alt=""
                            class="absolute inset-0 object-cover object-center w-full h-full overflow-hidden rounded-4xl">

                        <div class="relative max-w-lg space-y-5">
                            <h2 class="text-left text-white title title--headline">
                                ¿Te encuentras <b><i>desbordado</i></b>?
                            </h2>

                            <p class="!text-white">
                                Da el primer paso hacia tu estabilidad emocional encontrando la armonía interior y
                                recuperando
                                la calma en tu mente.
                            </p>

                            <button class="mt-10 btn sanar">
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

                    <div class="grid grid-cols-1 px-20 pt-10 divide-x-2 md:grid-cols-4 divide-dashed divide-muted">
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
            <div class="container px-20 mx-auto">
                <div class="space-y-4 text-center">
                    <h2 class="text-center title title--headline text-primary">
                        Inspiración para <b><i><u class="decoration-secondary-crecer">tu transformación</u></i></b>
                    </h2>
                </div>

                <div class="grid grid-cols-3 gap-10 mt-16">
                    <BlogTeaser image="/vista-frontal-mujer-meditando-en-estera.jpg"
                        title="Mi primera experiencia con la respiración Holotrópica" />
                    <BlogTeaser image="/proceso-de-curacion-de-la-mujer-de-vista-frontal.jpg"
                        title="Regulación Emocional" />
                    <BlogTeaser image="/concepto-de-lifestyle-de-chica-adolescente.jpg" title="Vive un día a la vez" />
                </div>

                <div class="flex items-center justify-center mt-20 md:col-span-2">
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
            <div class="container px-20 mx-auto">
                <article class="relative grid w-full grid-cols-1 gap-20 md:grid-cols-2">
                    <div class="relative">
                        <div class="sticky flex items-center top-10">
                            <div class="space-y-5">
                                <h3 class="uppertitle">¿Tienes alguna duda?</h3>
                                <h4 class="title title--headline text-primary">
                                    Preguntas <b><i><u class="decoration-secondary-crecer">frecuentes</u></i></b>
                                </h4>

                                <div class="relative mt-16 isolate">
                                    <img src="/home-4.png" alt=""
                                        class="object-cover w-full overflow-hidden aspect-square rounded-4xl group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <FAQs />
                    </div>
                </article>
            </div>
        </section>

        <section class="">
            <div class="mx-auto ">
                <div class="bg-primary rounded-t-[40px] p-10">
                    <article class="relative min-h-[60vh] flex items-center justify-start px-20">
                        <img src="/home-6.png" alt=""
                            class="w-full h-full absolute inset-0 transform scale-x-[-1] overflow-hidden rounded-4xl object-cover object-center">

                        <div class="relative max-w-2xl space-y-5">
                            <h2 class="text-left text-white title title--headline">Permíteme <br> <b><i>mantenerte<u
                                            class="decoration-secondary-crecer"> informado</u></i></b>
                            </h2>

                            <p class="!text-white">Sé el primero en recibir información sobre nuestros programas,
                                eventos,
                                testimonios y mucho más.</p>

                            <div class="flex items-center mt-10 space-x-5 justif-start">
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