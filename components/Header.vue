<script setup>

</script>

<template>
   <header>
      <BannerAnnouncement />

      <nav class="container mx-auto py-12 px-20 rounded-full">
         <div class="flex justify-between items-center">
            <div class="flex items-center justify-start space-x-10 ">
               <Logo class="h-12" secondary="text-secondary-crecer" />

               <ul class="header-nav">
                  <li><a href="#"><span>Sobre mí</span></a></li>
                  <li><a href="#"><span>Camino Vital</span></a></li>
                  <li><a href="#"><span>Servicios</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                           fill="currentColor" class="size-5">
                           <path fill-rule="evenodd"
                              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                              clip-rule="evenodd" />
                        </svg>
                     </a></li>
                  <li><a href="#"><span>Equipo</span></a></li>
                  <li><a href="#"><span>Blog</span></a></li>
                  <!-- <li><a href="#"><span>Calendario</span></a></li> -->
               </ul>
            </div>
            <div class="space-x-5">
               <a class="link primary underline" href="#">Contacto</a>
               <button class="btn primary">
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
