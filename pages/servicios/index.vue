<script setup>
const posts = [
    {
        image: "/vista-frontal-mujer-meditando-en-estera.jpg",
        title: "Talleres de respiración holotrópica",
        to: "talleres-respiracion-holotropica",
        intro: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus natus aspernatur quibusdam molestiae fugiat quod eligendi. Et quia odit odio sapiente, voluptatibus sit ea, qui facilis nihil expedita ipsa ut?'
    },
    {
        image: "/vista-frontal-mujer-meditando-en-estera.jpg",
        title: "Talleres de manejo creativo de las emociones",
        to: "talleres-manejo-creativo-emociones",
        intro: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus natus aspernatur quibusdam molestiae fugiat quod eligendi. Et quia odit odio sapiente, voluptatibus sit ea, qui facilis nihil expedita ipsa ut?'
    },
    {
        image: "/vista-frontal-mujer-meditando-en-estera.jpg",
        title: "Sesiones individuales",
        to: "sesiones-individuales",
        intro: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus natus aspernatur quibusdam molestiae fugiat quod eligendi. Et quia odit odio sapiente, voluptatibus sit ea, qui facilis nihil expedita ipsa ut?'
    },
    {
        image: "/vista-frontal-mujer-meditando-en-estera.jpg",
        title: "Retiro Conexión Vital",
        to: "retiro-conexion-vital",
        intro: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus natus aspernatur quibusdam molestiae fugiat quod eligendi. Et quia odit odio sapiente, voluptatibus sit ea, qui facilis nihil expedita ipsa ut?'
    }
]
</script>

<template>
    <div>
        <section class="gradient-muted py-16 md:pt-24 md:pb-32 relative">
        <div class="container mx-auto px-20">
            <h2 class="title title--headline text-primary text-center max-w-3xl mx-auto">Inspiración para
                <b><i>para <br class="hidden lg:block"> <u class="decoration-secondary-crecer">tu
                            transformación”</u></i></b>
            </h2>

            <div class="mt-32">
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <ServicesTeaser v-for="(service, index) in posts" :key="index" :service="service" />
                </div>
            </div>
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