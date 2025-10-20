<script setup>

</script>

<template>
    <div class="gradient-muted">
        <!-- <section class="py-16 md:pt-24 md:pb-44 relative">
            <div class="container mx-auto px-20">
                <article class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
                    <div class="flex justify-end">
                        <div class="max-w-2xl space-y-5 pl-20">
                            <h3 class="uppertitle text-primary">Contáctame</h3>
                            <h4 class="title title--headline text-primary">
                                <i><b>Póngase en contacto conmigo </b></i>fácilmente
                            </h4>
                            <p class="text-primary">
                                Comience su camino hacia el bienestar emocional con nuestro equipo cuidadosamente
                                seleccionados.
                            </p>
                            <div class="mt-10 flex items-center justify-start gap-10 divide-primary">
                                <button class="btn crecer">
                                    <span>Agenda tu cita!</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>

                                <span class="h-20 w-0.5 bg-primary/15"></span>

                                <div class="">
                                    <p class="font-public text-paragraph text-sm">
                                        Hazme una llamada:
                                    </p>
                                    <a href="#" class="text-primary text-base hover:text-secondary-crecer">+57 (312) 444
                                        23 23</a>
                                </div>
                            </div>

                        </div>
                        <img src="https://img.freepik.com/foto-gratis/mujer-vista-frontal-que-trabaja-como-agente-viajes_23-2150455569.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80"
                            alt=""
                            class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 absolute max-w-lg left-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-xl drop-shadow-primary/5">
                    </div>
                </article>
            </div>
        </section> -->

        <!-- <section clasS="py-16 md:py-32 bg-primary">
            <div class="container mx-auto px-20">
                <h2 class="title title--headline text-white text-center">
                     <b><i><u class="decoration-secondary-crecer max-w-3xl mx-auto">Información</u></i></b> de contacto
                </h2>

                <div class="relative grid grid-cols-1 md:grid-cols-3 gap-20 mt-16 lg:mt-24">
                    <div class="space-y-5 relative">
                        <article class="bg-muted rounded-4xl p-10 flex space-x-10">
                            <div class="space-y-5">
                                <h5 class="title title--element">Dirección</h5>
                                <p>
                                    14960 Florence Trail <br>
                                    Apple Valley, MN 55124
                                </p>
                            </div>
                        </article>

                        <article class="bg-muted rounded-4xl p-10 flex space-x-10">
                            <div class="space-y-5">
                                <h5 class="title title--element">Horarios</h5>
                                <p>
                                    Lunes - Viernes,<br>
                                    9am - 7pm EST
                                </p>
                            </div>
                        </article>
                    </div>
                    <div class="md:col-span-2">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15136.673121924749!2d-69.94312275409936!3d18.476035186962548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1schia!5e0!3m2!1sen!2sdo!4v1754418181727!5m2!1sen!2sdo"
                            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade" class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 drop-shadow-2xl"></iframe>
                    </div>

                </div>
            </div>
        </section> -->

        <section class="py-32">
            <div class="container mx-auto px-20">
                <div class="relative flex items-stretch justify-between w-full gap-10">
                    <div class="flex items-stretch justify-center w-1/2 order-0">
                        <div class="space-y-5">
                            <img src="https://img.freepik.com/fotos-premium/mujer-joven-usando-telefono-movil-mientras-esta-sentada-sofa-casa_1048944-9040732.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80"
                            alt=""
                            class="rounded-4xl aspect-5/6 object-cover object-top group-hover:opacity-75 drop-shadow-2xl drop-shadow-muted">
                        </div>
                    </div>
                    <div class="w-1/2 flex items-center justify-center">
                        <div>
                            <h3 class="uppertitle text-secondary">¿Cómo puedo apoyarte?</h3>
                            <h4 class="title title--headline text-secondary">
                                Hazme una pregunta
                            </h4>
                            <p class="text-paragraph mt-6">
                                Si tienes alguna duda sobre los talleres, programas o servicios, no dudes en contactarme.
                            </p>
                        <form @submit.prevent="" class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">

                                <div>
                                    <label for="name"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Nombre</label>
                                    <div class="mt-2">
                                        <input id="name" type="text" name="name" placeholder="Jane"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div>
                                    <label for="lastname"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Apellidos</label>
                                    <div class="mt-2">
                                        <input id="lastname" type="text" name="lastname" placeholder="Smith"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="email"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Correo
                                        electrónico</label>
                                    <div class="mt-2">
                                        <input id="email" type="email" name="email" placeholder="jane.smith@gmail.com"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base" />
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="message"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Tu
                                        mensaje</label>
                                    <div class="mt-2">
                                        <textarea id="message" name="message" placeholder=""
                                            class="block w-full rounded-3xl bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base h-44" />
                                    </div>
                                </div>


                                <div>
                                    <button class="btn primary">
                                        <span>Enviar ahora</span>
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
                            <p class="text-white">* Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
        </div>
</template>