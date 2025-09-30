<script setup>
const posts = [
    {
        name: "Ricardo Didomenico",
        title: "Cirujano general",
        image: "/team/ricardo-didomenico.webp",
        text: `<b>Médico con especialización en Cirugía General</b>. Su experiencia clínica por más de 40 años se ha centrado en el abordaje integral de los pacientes.

En los últimos 20 años ha explorado el potencial terapéutico de los estados ampliados de conciencia.

Certificado por Grof Transpersonal Training en el 2014. Actualmente es facilitador de Talleres de Respiración Holotrópica.

Desde el año 2016 es terapeuta certificado en Imaginación Guiada con Música (GIM) por Atlantis Institute (USA), Fellow y Primary Trainer de AMI (Association for Music & Imagery) y facilitador de Hologim (Respiración Holotrópica en combinación con GIM).

        `,
        links: []
    },
    {
        name: "Carolina Nensthiel",
        title: "Psicóloga social",
        image: "/team/carolina-nensthiel.webp",
        text: `Psicóloga Social y Magíster en Psicología Clínica de la Universidad Javeriana. Terapeuta Familiar Sistémica, Supervisora en Psicoterapia y Consteladora Cuántica.
        
Durante más de 13 años fue docente universitaria y consultora internacional, acompañando procesos en género, cuidado emocional y formación de profesionales que trabajan con víctimas del conflicto armado.

Integra en su práctica terapéutica la conexión con la naturaleza, la espiritualidad y saberes ancestrales, ofreciendo un acompañamiento profundo y humano. Su mirada combina lo académico, lo espiritual y lo vivencial, con la sencillez de quien se reconoce como eterna aprendiz y alquimista de su propia vida.`,
        links: []
    },
    {
        name: "Carolina Amado",
        title: "Psicóloga",
        image: "/team/carolina-amado.webp",
        text: `Psicóloga de la Pontificia Universidad Javeriana, con sólida formación en terapias corporales y artísticas. Es Formadora y Facilitadora TRE®️ de TREforAll®️, con estudios complementarios en Bioenergética, Musicoterapia y Danzaterapia.
        
Su trabajo integra la psicoterapia centrada en el cuerpo, la comprensión de la historia personal y el acompañamiento emocional, utilizando diversas herramientas que promueven la sanación y el equilibrio. Acompaña especialmente a personas que viven altos niveles de estrés laboral y familiar, como ejecutivos y cuidadores, a través de la técnica TRE®️.

Además, facilita espacios de exploración y autoconocimiento con la herramienta del tarot terapéutico y holístico, ofreciendo una mirada integradora y sensible que conecta lo emocional, lo corporal y lo espiritual.`,
        links: []
    },
    {
        name: "Lina Maria Hoyos",
        title: "Mentora de Marca Personal Consciente",
        image: "/team/lina-hoyos.webp",
        text: `Mentora de Marca Personal Consciente, Coach en Propósito de Vida y estratega en Mercadeo Consciente y Sostenible.

Acompaña a personas, equipos y organizaciones a conectar con su valor esencial, integrando el SER con el HACER, para construir proyectos y caminos de vida con sentido, prosperidad e impacto positivo en el mundo.

Se ha formado como Coach Ontológica en Newfield Network, Coach en PNL avalada por Richard Bandler, Meaning Change Maker, Administradora de Empresas del CESA y Máster en Dirección de Marketing Estratégico (EOI). Su experiencia une la visión estratégica con una profunda mirada humana, ofreciendo acompañamientos transformadores que inspiran claridad, autenticidad y coherencia.
`,
        links: []
    },
    {
        name: "Gustavo Lara",
        title: "Cirujano general",
        image: "/team/gustavo-lara.webp",
        text: `Psicólogo de la Universidad Nacional de Colombia, con amplia experiencia académica y clínica. Complementó su formación con estudios en música —Especialización Instrumental en Flauta Traversa— y una Maestría en Educación en la Universidad Pedagógica Nacional.

Durante más de una década fue profesor en el Programa de Psicología de la Universidad del Rosario (2006-2020) y posteriormente dirigió el Centro de Mindfulness Integral y Meditación (2022-2023). Actualmente hace parte del cuerpo docente de posgrados en la Escuela de Medicina y Ciencias de la Salud.

Es psicoterapeuta de orientación transpersonal integral, certificado por el Mindfulness-Based Professional Training Institute de la Universidad de California San Diego (UCSD). Su trayectoria se enriquece con más de 40 años de práctica meditativa en tradiciones como el budismo, el sufismo y diversas disciplinas somáticas y psicoterapéuticas.`,
        links: []
    },
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

                <div id="equipo" class="grid grid-cols-1 gap-10 mt-32 md:mt-44 md:grid-cols-2 lg:grid-cols-3">
                    <TeamTeaser v-for="(post, index) in posts" :key="index" :image="post?.image" :title="post?.title"
                        :text="post?.text" :name="post?.name" />
                </div>
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