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

// Estado para el menú móvil
const isMobileMenuOpen = ref(false);

const measureHeader = () => {
    headerHeight.value = headerRef.value?.offsetHeight || 0;
};

const updateOffset = () => {
    offsetTop.value = window.pageYOffset || document.documentElement.scrollTop;
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

// Prevenir scroll cuando el menú está abierto
watch(isMobileMenuOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

onMounted(() => {
    updateOffset();
    measureHeader();
    window.addEventListener('scroll', updateOffset, { passive: true });
    window.addEventListener('resize', measureHeader);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateOffset);
    window.removeEventListener('resize', measureHeader);
    document.body.style.overflow = '';
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
         <!-- <BannerAnnouncement class="relative bg-muted"  /> -->
         <nav class="px-5 md:px-10 lg:px-20 transition-[padding,background-color,box-shadow] duration-300 ease-out"
            :class="isHeaderFixed ? 'py-5 shadow-none' : 'py-8'">
            <div class="flex items-center justify-between">
               <div class="flex items-center justify-start space-x-10 xl:space-x-20">
                  <NuxtLink to="/">
                     <Logo class="h-8 md:h-10 lg:h-12" primary="text-white" secondary="text-white" />
                  </NuxtLink>

                  <ul class="hidden header-nav xl:block">
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
               <div class="hidden space-x-5 xl:block">
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

               <!-- Botón hamburguesa para móvil -->
               <button @click="toggleMobileMenu" class="xl:hidden text-white p-2 focus:outline-none" aria-label="Toggle menu">
                  <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>
            </div>
         </nav>
      </header>
      <div :style="spacerStyle" aria-hidden="true" />

      <!-- Offcanvas móvil -->
      <Transition
         enter-active-class="transition-opacity duration-300"
         enter-from-class="opacity-0"
         enter-to-class="opacity-100"
         leave-active-class="transition-opacity duration-300"
         leave-from-class="opacity-100"
         leave-to-class="opacity-0"
      >
         <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/50 z-40 xl:hidden" @click="closeMobileMenu" />
      </Transition>

      <Transition
         enter-active-class="transition-transform duration-300 ease-out"
         enter-from-class="translate-x-full"
         enter-to-class="translate-x-0"
         leave-active-class="transition-transform duration-300 ease-in"
         leave-from-class="translate-x-0"
         leave-to-class="translate-x-full"
      >
         <div v-if="isMobileMenuOpen" class="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-primary shadow-2xl z-50 xl:hidden overflow-y-auto">
            <div class="flex flex-col h-full">
               <!-- Header del offcanvas -->
               <div class="flex items-center justify-end p-5 border-b border-white/10">
                  <button @click="closeMobileMenu" class="text-white p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close menu">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               </div>

               <!-- Menú de navegación -->
               <nav class="flex-1 px-5 py-8">
                  <ul class="space-y-2">
                     <li>
                        <NuxtLink to="/" @click="closeMobileMenu" class="block px-5 py-3 text-white hover:bg-white/10 rounded-lg transition-colors text-lg">
                           Inicio
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/equipo" @click="closeMobileMenu" class="block px-5 py-3 text-white hover:bg-white/10 rounded-lg transition-colors text-lg">
                           Equipo
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/servicios/camino-vital" @click="closeMobileMenu" class="block px-5 py-3 text-white hover:bg-white/10 rounded-lg transition-colors text-lg">
                           Camino Vital
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/servicios" @click="closeMobileMenu" class="block px-5 py-3 text-white hover:bg-white/10 rounded-lg transition-colors text-lg">
                           Servicios
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/eventos" @click="closeMobileMenu" class="block px-5 py-3 text-white hover:bg-white/10 rounded-lg transition-colors text-lg">
                           Eventos
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/blog" @click="closeMobileMenu" class="block px-5 py-3 text-white hover:bg-white/10 rounded-lg transition-colors text-lg">
                           Blog
                        </NuxtLink>
                     </li>
                  </ul>
               </nav>

               <!-- Botones del footer del offcanvas -->
               <div class="p-5 border-t border-white/10 space-y-3">
                  <NuxtLink to="/contacto" @click="closeMobileMenu" class="block text-center px-5 py-3 text-white border border-white rounded-lg hover:bg-white hover:text-primary transition-colors">
                     Contacto
                  </NuxtLink>
                  <button @click="closeMobileMenu(); store.openOnboarding = true" class="w-full btn crecer justify-center">
                     <span>Empieza Ahora</span>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd"
                           d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                           clip-rule="evenodd" />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
      </Transition>
   </div>
</template>
