<script setup>
const posts = [
    {
        name: "Mark Hoffman",
        title: "Neuropsychology",
        image: "/doctor-6-1.webp",
        links: []
    },
    {
        name: "Anne Middleton",
        title: "Child Psychiatry",
        image: "/doctor-5-1.webp",
        links: []
    },
    {
        name: "Whitney Pratt",
        title: "Clinical Psychology",
        image: "/doctor-4-1.webp",
        links: []
    },
    {
        name: "Jane Goodman",
        title: "Neuropsychology",
        image: "/doctor-3-1.webp",
        links: []
    },
    {
        name: "Martha Ruiz, MD",
        title: "Clinical Psychology",
        image: "/doctor-2-1.webp",
        links: []
    },
    {
        name: "Kate Adams",
        title: "Child Psychiatry",
        image: "/doctor-1-1.webp",
        links: []
    }
]
</script>

<template>
    <div class="gradient-muted">
        <section class="relative pb-16 lg:pb-32 lg:pt-24">
            <div class="container px-5 mx-auto lg:px-20">
                <article class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
                    <div class="flex flex-row justify-end">
                        <div class="max-w-2xl space-y-5 lg:pl-20">
                            <h3 class="uppertitle text-primary">Mi equipo</h3>
                            <h4 class="title title--headline text-primary">
                                Quienes te acompañan <br> <b><i>en este camino</i></b>
                            </h4>
                            <p class="text-primary">
                                Creemos en el poder de la escucha empática, la ciencia del bienestar y la sabiduría
                                interna
                                que cada persona posee. Juntos creamos un espacio seguro donde tu crisis se convierte en
                                oportunidad y cada paso se da a tu ritmo.
                            </p>
                            <a href="#equipo" class="mt-10 btn crecer">
                                <span>¡Conócenos!</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6">
                                    <path fill-rule="evenodd"
                                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <img src="/doctors-1.webp" alt=""
                            class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 lg:absolute max-w-lg left-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-xl drop-shadow-primary/5 hidden lg:block">
                    </div>
                </article>
            </div>
        </section>

        <section class="pb-32">
            <div class="container px-20 mx-auto">
                <div class="relative flex items-stretch justify-between w-full gap-10">
                    <div class="flex items-center justify-center order-1 w-1/2 px-12 py-10">
                        <div class="space-y-5">
                            <!-- <h3 class="uppertitle text-secondary">¿Para qué iniciar este camino?</h3> -->
                            <h4 class="title title--headline text-secondary">
                                Regístrese para concertar una cita
                            </h4>
                            <p class="text-paragraph">
                                Si tiene alguna pregunta, puede ponerse en contacto con nosotros. Por favor, rellene el
                                siguiente formulario.
                            </p>

                            <form @submit.prevent="" class="grid grid-cols-1 gap-10 mt-16 md:grid-cols-2">

                                <div>
                                    <label for="name"
                                        class="block pl-4 ml-px text-base font-medium font-public text-primary">Nombre</label>
                                    <div class="mt-2">
                                        <input id="name" type="text" name="name" placeholder="Jane"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div>
                                    <label for="lastname"
                                        class="block pl-4 ml-px text-base font-medium font-public text-primary">Apellidos</label>
                                    <div class="mt-2">
                                        <input id="lastname" type="text" name="lastname" placeholder="Smith"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div>
                                    <label for="email"
                                        class="block pl-4 ml-px text-base font-medium font-public text-primary">Correo
                                        electrónico</label>
                                    <div class="mt-2">
                                        <input id="email" type="email" name="email" placeholder="jane.smith@gmail.com"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div>
                                    <label for="phone"
                                        class="block pl-4 ml-px text-base font-medium font-public text-primary">Teléfono</label>
                                    <div class="mt-2">
                                        <input id="phone" type="tel" name="phone" placeholder="+57 (325) 45 8223"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div>
                                    <label for="date"
                                        class="block pl-4 ml-px text-base font-medium font-public text-primary">Fecha</label>
                                    <div class="mt-2">
                                        <input id="date" type="date" name="date" placeholder="+57 (325) 45 8223"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div>
                                    <label for="date"
                                        class="block pl-4 ml-px text-base font-medium font-public text-primary">Horario</label>
                                    <div class="mt-2">
                                        <input id="date" type="time" name="date" placeholder="+57 (325) 45 8223"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>


                                <div>
                                    <button class="btn estabilizar">
                                        <span>Agenda ahora</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="size-6">
                                            <path fill-rule="evenodd"
                                                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="w-1/2 min-h-full">
                        <img src="https://img.freepik.com/foto-gratis/serio-cliente-asiatico-pensativo-llegando-soporte-telefono_1262-17540.jpg"
                            alt=""
                            class="object-cover object-top w-full h-full overflow-hidden rounded-4xl group-hover:opacity-75 drop-shadow-2xl drop-shadow-muted">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>