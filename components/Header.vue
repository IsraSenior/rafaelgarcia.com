<script setup>
const store = useMainStore();
// const servicesDrop = ref(false);

const offsetTop = ref(0);
const headerRef = ref(null);
const headerHeight = ref(0);
const isHeaderFixed = computed(() => offsetTop.value > 0);
const spacerStyle = computed(() => ({
    height: isHeaderFixed.value ? `${headerHeight.value}px` : '0px'
}));

const measureHeader = () => {
    headerHeight.value = headerRef.value?.offsetHeight || 0;
};

const updateOffset = () => {
    offsetTop.value = window.pageYOffset || document.documentElement.scrollTop;
};

onMounted(() => {
    updateOffset();
    measureHeader();
    window.addEventListener('scroll', updateOffset, { passive: true });
    window.addEventListener('resize', measureHeader);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateOffset);
    window.removeEventListener('resize', measureHeader);
});

watch(isHeaderFixed, async () => {
    await nextTick();
    measureHeader();
});
</script>

<template>
   <div>
      <header ref="headerRef"
         :class="[
            'transition-all duration-300 ease-out will-change-transform',
            isHeaderFixed
               ? 'fixed top-0 inset-x-0 z-30 shadow-lg backdrop-blur-sm bg-primary/95'
               : 'relative bg-primary'
         ]">
         <BannerAnnouncement class="relative bg-muted"  />
         <nav class="px-20 transition-[padding,background-color,box-shadow] duration-300 ease-out"
            :class="isHeaderFixed ? 'py-5 shadow-none' : 'py-8'">
            <div class="flex items-center justify-between">
               <div class="flex items-center justify-start space-x-10 lg:space-x-20">
                  <NuxtLink to="/">
                     <Logo class="h-12" primary="text-white" secondary="text-white" />
                  </NuxtLink>

                  <ul class="hidden header-nav lg:block">
                     <li>
                        <NuxtLink to="/"><span>Inicio</span></NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/equipo"><span>Equipo</span></NuxtLink>
                     </li>
                     <!-- <li>
                        <NuxtLink to="/sobre-mi"><span>Sobre mí</span></NuxtLink>
                     </li> -->
                     <li>
                        <NuxtLink to="/servicios/camino-vital"><span>Camino Vital</span></NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/servicios"><span>Servicios</span></NuxtLink>
                     </li>
                     <!-- <li class="relative inline-block">
                        <button class="inline-flex text-white gap-x-5" @click.prevent="servicesDrop = !servicesDrop">
                           <span>Servicios</span>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                              <path fill-rule="evenodd"
                                 d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                 clip-rule="evenodd" />
                           </svg>
                        </button>

                        <Transition enter-active-class="transition duration-100 ease-out"
                           enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                           leave-active-class="transition duration-75 ease-in"
                           leave-from-class="transform scale-100 opacity-100"
                           leave-to-class="transform scale-95 opacity-0">
                           <div v-if="servicesDrop"
                              class="absolute z-10 bg-white w-72 origin-top-left mt-5 rounded-xl outline-1 -outline-offset-1 outline-primary/15 transition transition-discrete [--anchor-gap:--spacing(2)]">
                              <div class="py-5 px-2.5">
                                 <NuxtLink @click.native="servicesDrop = false"
                                    to="/servicios/talleres-respiracion-holotropica"
                                    class="block hover:bg-primary rounded-full hover:text-white px-5 py-2.5 text-primary">
                                    Talleres de respiración holotrópica</NuxtLink>

                                 <NuxtLink @click.native="servicesDrop = false" to="/servicios/talleres-manejo-creativo-emociones"
                                    class="block hover:bg-primary rounded-full hover:text-white px-5 py-2.5 text-primary">
                                    Talleres de manejo creativo de las emociones</NuxtLink>

                                 <NuxtLink @click.native="servicesDrop = false" to="/servicios/sesiones-individuales"
                                    class="block hover:bg-primary rounded-full hover:text-white px-5 py-2.5 text-primary">
                                    Sesiones individuales</NuxtLink>

                                 <NuxtLink @click.native="servicesDrop = false" to="/servicios/retiro-conexion-vital"
                                    class="block hover:bg-primary rounded-full hover:text-white px-5 py-2.5 text-primary">
                                    Retiro Conexión Vital</NuxtLink>
                              </div>
                           </div>
                        </Transition>
                     </li> -->
                     <li>
                        <NuxtLink to="/eventos"><span>Eventos</span></NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/blog"><span>Blog</span></NuxtLink>
                     </li>
                     <!-- <li><a href="#"><span>Calendario</span></a></li> -->
                  </ul>
               </div>
               <div class="hidden space-x-5 lg:block">
                  <NuxtLink to="/contacto" class="underline link white">Contacto</NuxtLink>
                  <button @click.prevent="store.openOnboarding = true" class="btn crecer">
                     <span>Empieza Ahora</span>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd"
                           d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                           clip-rule="evenodd" />
                     </svg>
                  </button>
               </div>
            </div>
         </nav>
      </header>
      <div :style="spacerStyle" aria-hidden="true" />
   </div>
</template>
