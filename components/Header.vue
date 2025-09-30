<script setup>
const store = useMainStore();
</script>

<template>
   <header>
      <BannerAnnouncement />

      <nav class="px-20 py-12 bg-primary">
         <div class="flex items-center justify-between">
            <div class="flex items-center justify-start space-x-10 ">
               <NuxtLink to="/">
                  <Logo class="h-12 lg:h-14" primary="text-white" secondary="text-white" />
               </NuxtLink>

               <ul class="hidden header-nav lg:block">
                  <li>
                     <NuxtLink to="/sobre-mi"><span>Sobre mí</span></NuxtLink>
                  </li>
                  <li>
                     <NuxtLink to="/camino-vital"><span>Camino Vital</span></NuxtLink>
                  </li>
                  <li>
                     <NuxtLink to="/servicios"><span>Servicios</span> <svg xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 20 20" fill="currentColor" class="size-5">
                           <path fill-rule="evenodd"
                              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                              clip-rule="evenodd" />
                        </svg>
                     </NuxtLink>
                  </li>
                  <li>
                     <NuxtLink to="/equipo"><span>Equipo</span></NuxtLink>
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
</template>
