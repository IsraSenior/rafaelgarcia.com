<script setup>
</script>

<template>
  <div class="gradient-muted">
    <section class="py-16">
      <div class="container px-5 mx-auto lg:px-20">
        <article class="grid grid-cols-1 gap-10 lg:gap-20 lg:grid-cols-2">
          <div class="relative">
            <div class="flex items-center lg:sticky lg:top-5">
              <div class="space-y-5">
                <div class="relative mt-16 isolate">
                  <img src="/rafael-garcial.webp" alt=""
                    class="object-cover object-top w-full overflow-hidden lg:object-center aspect-square rounded-4xl group-hover:opacity-75 lg:aspect-5/7 drop-shadow-2xl drop-shadow-muted">
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <section class="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto">

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
            </section>
          </div>
        </article>
      </div>
    </section>

    <section class="relative pb-16 lg:pb-32 lg:pt-24">
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
    </section>
  </div>
</template>