<script setup>
const posts = [
    {
        name: "Ricardo Didomenico",
        title: "Cirujano general",
        image: "/team/ricardo-didomenico.webp",
        text: `Médico con especialización en Cirugía General. Su experiencia clínica por más de 40 años se ha centrado en el abordaje integral de los pacientes.

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
    <section class="py-16">
      <div class="container px-5 mx-auto lg:px-20">
        <article class="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div class="relative">
            <div class="">
              <div class="space-y-5">
                <div class="relative isolate">
                  <img src="/rafael-garcial.webp" alt=""
                    class="object-cover object-top w-full overflow-hidden lg:object-center aspect-square rounded-4xl group-hover:opacity-75 lg:aspect-3/4 drop-shadow-2xl drop-shadow-muted">
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-2">

                <h1 class="uppertitle">Sobre mí - Rafael García</h1>
                <div class="mt-6 space-y-6 text-lg leading-relaxed content">
                  <p>
                    Me formé como psicólogo, con más de 25 años de experiencia acompañando a personas en sus procesos
                    individuales y
                    grupales. A lo largo de mi trayectoria he aprendido que las crisis no son un final, sino una
                    oportunidad para
                    transformarnos y reconectar con lo que somos en esencia.
                  </p>

                  <p>
                    Mi formación en clínica y psicoterapia psicoanalítica me dio una base sólida para comprender la
                    complejidad del mundo interno. Más adelante, sentí el llamado a profundizar en la psicología transpersonal, formándome en el Grof Transpersonal Training, el Grof Legacy Training y la Asociación de Humanismo Transpersonal SASANA. También me formé como facilitador de respiración holotrópica, una herramienta poderosa para sanar desde adentro y abrirnos a nuestra sabiduría interior. Complementé este camino con estudios en programación neurolingüística desde la perspectiva de Richard Bandler, lo que amplió mi visión sobre el poder de la mente y el lenguaje en la transformación personal.
                  </p>
                  <p>
                    Mi experiencia —personal y profesional— me ha mostrado que el desarrollo humano necesita una mirada
                    integral. Por
                    eso, mi enfoque incluye las seis dimensiones del ser humano: física, emocional, mental, existencial,
                    espiritual y
                    relacional. En cada proceso busco que la persona pueda activar sus propios recursos, los más
                    naturales y
                    accesibles, para recuperar equilibrio, claridad y confianza.
                  </p>
                </div>
          </div>
          <div class="lg:col-span-3">
            <div class="content space-y-6 text-lg leading-relaxed ">
              <p>
                    Mi invitación siempre es a confiar en el proceso, a fortalecer las habilidades que nos ayudan a
                    atravesar los
                    desafíos con mayor equilibrio, y a tener paciencia para descubrir el aprendizaje que cada
                    experiencia trae consigo.
                    Porque cuando una crisis se acompaña con las herramientas adecuadas, puede convertirse en una gran
                    puerta de
                    sanación y crecimiento.
                  </p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="relative pb-16 lg:pb-32 lg:pt-24">
            <div class="container px-5 mx-auto lg:px-20">
                <!-- <article class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
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
                </article> -->

                <h2 class="max-w-3xl mx-auto text-center title title--headline text-primary">
                    Quienes te acompañan <br> <b><i> <u class="decoration-secondary-crecer">en este camino</u></i></b>
                </h2>
                <div id="equipo" class="grid grid-cols-1 gap-10 mt-32 md:grid-cols-2 lg:grid-cols-3">
                    <TeamTeaser v-for="(post, index) in posts" :key="index" :image="post?.image" :title="post?.title"
                        :text="post?.text" :name="post?.name" />
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

    <!-- <section class="relative pb-16 lg:pb-32 lg:pt-24">
      <div class="container px-5 mx-auto lg:px-20">
        <article class="container mx-auto rounded-[40px] bg-white mt-10 py-24 px-20 relative">
          <div class="flex flex-row-reverse justify-end">
            <div class="max-w-2xl space-y-5 lg:pr-20">
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
              <NuxtLink :to="{ path: '/equipo', hash: '#equipo'}" class="mt-10 btn crecer">
                <span>¡Conócenos!</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path fill-rule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
            <img src="/doctors-1.webp" alt=""
              class="aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 lg:absolute max-w-lg right-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-xl drop-shadow-primary/5 hidden lg:block">
          </div>
        </article>
      </div>
    </section> -->
  </div>
</template>