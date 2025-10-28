<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const route = useRoute()
const { getContactOptions } = useDirectus()

// SEO Meta Tags
useSeoMeta({
  title: 'Contacto | Rafael García',
  description: 'Contáctanos para agendar una sesión, inscribirte en el programa Camino Vital o consultar sobre nuestros talleres y servicios de transformación personal.',
  ogTitle: 'Contacto | Rafael García',
  ogDescription: 'Contáctanos para agendar una sesión o consultar sobre nuestros servicios de transformación personal.',
  ogImage: `${config.public.siteUrl}/home-11.png`,
  ogUrl: `${config.public.siteUrl}/contacto`,
  ogType: 'website',
  ogLocale: 'es_CO',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Contacto | Rafael García',
  twitterDescription: 'Contáctanos para agendar una sesión o consultar sobre nuestros servicios.',
  twitterImage: `${config.public.siteUrl}/home-11.png`,
  keywords: 'contacto Rafael García, agendar sesión, Camino Vital, coaching ontológico, transformación personal, Colombia'
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/contacto`
    }
  ]
})

// Estados del dropdown
const isServiceDropdownOpen = ref(false)
const selectedService = ref('')
const selectedServiceLabel = ref('Selecciona una opción')
const dropdownRef = ref(null)
const services = ref([])
const isLoading = ref(true)

// Campos del formulario
const formData = ref({
  name: '',
  lastname: '',
  email: '',
  service: '',
  contact_preference: 'email',
  message: '',
  newsletter: false
})

// Estados de validación y envío
const errors = ref({})
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitMessage = ref('')

const toggleServiceDropdown = () => {
  isServiceDropdownOpen.value = !isServiceDropdownOpen.value
}

const selectService = (service) => {
  selectedService.value = service.value
  selectedServiceLabel.value = service.label
  formData.value.service = service.value
  isServiceDropdownOpen.value = false
  // Limpiar error de servicio al seleccionar
  if (errors.value.service) {
    delete errors.value.service
  }
}

// Validar formulario
const validateForm = () => {
  const newErrors = {}

  if (!formData.value.name.trim()) {
    newErrors.name = 'El nombre es requerido'
  }

  if (!formData.value.lastname.trim()) {
    newErrors.lastname = 'Los apellidos son requeridos'
  }

  if (!formData.value.email.trim()) {
    newErrors.email = 'El correo electrónico es requerido'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
      newErrors.email = 'El formato del correo no es válido'
    }
  }

  if (!formData.value.service) {
    newErrors.service = 'Por favor selecciona un servicio'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Enviar formulario
const handleSubmit = async () => {
  // Validar
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitSuccess.value = false
  submitMessage.value = ''

  try {
    const response = await $fetch('/api/contact/submit', {
      method: 'POST',
      body: formData.value
    })

    if (response.success) {
      submitSuccess.value = true

      // Mensaje personalizado según si se suscribió o no
      let message = '¡Mensaje enviado correctamente!'

      if (formData.value.newsletter && response.subscription) {
        if (response.subscription.already_subscribed) {
          message = '¡Mensaje enviado correctamente! Ya estabas suscrito a nuestro boletín.'
        } else if (response.subscription.success) {
          message = '¡Mensaje enviado correctamente! También te has suscrito a nuestro boletín informativo.'
        } else {
          message = '¡Mensaje enviado correctamente! (Hubo un problema al procesar la suscripción, pero tu mensaje fue recibido)'
        }
      }

      submitMessage.value = message

      // Limpiar formulario
      formData.value = {
        name: '',
        lastname: '',
        email: '',
        service: '',
        contact_preference: 'email',
        message: '',
        newsletter: false
      }
      selectedService.value = ''
      selectedServiceLabel.value = 'Selecciona una opción'

      // Scroll al mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      submitSuccess.value = false
      submitMessage.value = response.errors?.join(', ') || 'Error al enviar el formulario'
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    submitSuccess.value = false
    submitMessage.value = 'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}

// Limpiar error al escribir
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isServiceDropdownOpen.value = false
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)

  // Cargar opciones de contacto desde Directus
  try {
    isLoading.value = true
    services.value = await getContactOptions()
  } catch (error) {
    console.error('Error loading contact options:', error)
    services.value = []
  } finally {
    isLoading.value = false
  }

  // Detectar parámetros de query y preseleccionar servicio
  const serviceParam = route.query.service
  const moduleParam = route.query.module

  if (serviceParam) {
    let optionValue = serviceParam

    // Si hay módulo, buscar la opción con formato "camino-vital-{module}"
    if (moduleParam) {
      optionValue = `camino-vital-${moduleParam}`
    }

    // Buscar la opción correspondiente
    const foundService = services.value.find(s => {
      // Comparar con el value directo
      if (s.value === optionValue) return true
      // Si no hay módulo y es camino-vital, comparar también
      if (!moduleParam && s.value === serviceParam) return true
      // Para opciones de módulo, verificar el moduleSlug
      if (moduleParam && s.type === 'module' && s.parent === serviceParam && s.moduleSlug === moduleParam) return true
      return false
    })

    if (foundService) {
      selectedService.value = foundService.value
      selectedServiceLabel.value = foundService.label
      formData.value.service = foundService.value
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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

        <section class="py-16 md:py-24 lg:py-32">
            <div class="container mx-auto px-5 md:px-10 lg:px-20">
                <div class="relative flex flex-col lg:flex-row items-stretch justify-between w-full gap-10">
                    <div class="flex items-stretch justify-center w-full lg:w-1/2 order-1 lg:order-0">
                        <div class="space-y-5 w-full">
                            <img src="https://img.freepik.com/fotos-premium/mujer-joven-usando-telefono-movil-mientras-esta-sentada-sofa-casa_1048944-9040732.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80"
                            alt=""
                            class="rounded-4xl aspect-5/6 object-cover object-top group-hover:opacity-75 drop-shadow-2xl drop-shadow-muted w-full">
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 flex items-center justify-center">
                        <div>
                            <h3 class="uppertitle text-secondary">¿Cómo puedo apoyarte?</h3>
                            <h4 class="title title--headline text-secondary">
                                Hazme una pregunta
                            </h4>
                            <p class="text-paragraph mt-6">
                                Si tienes alguna duda sobre los talleres, programas o servicios, no dudes en contactarme.
                            </p>

                            <!-- Mensaje de éxito/error -->
                            <div v-if="submitMessage" class="mt-6 p-4 rounded-2xl" :class="submitSuccess ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
                                <p class="text-sm font-medium">{{ submitMessage }}</p>
                            </div>

                        <form @submit.prevent="handleSubmit" class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">

                                <div>
                                    <label for="name"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Nombre</label>
                                    <div class="mt-2">
                                        <input
                                            id="name"
                                            type="text"
                                            v-model="formData.name"
                                            @input="clearError('name')"
                                            placeholder="Jane"
                                            :class="errors.name ? 'outline-red-500 focus:outline-red-500' : 'outline-primary/15 focus:outline-primary'"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 placeholder:text-paragraph focus:outline-2 focus:-outline-offset-2 sm:text-base" />
                                        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                                    </div>
                                </div>

                                <div>
                                    <label for="lastname"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Apellidos</label>
                                    <div class="mt-2">
                                        <input
                                            id="lastname"
                                            type="text"
                                            v-model="formData.lastname"
                                            @input="clearError('lastname')"
                                            placeholder="Smith"
                                            :class="errors.lastname ? 'outline-red-500 focus:outline-red-500' : 'outline-primary/15 focus:outline-primary'"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 placeholder:text-paragraph focus:-outline-offset-1 sm:text-base" />
                                        <p v-if="errors.lastname" class="mt-1 text-sm text-red-600">{{ errors.lastname }}</p>
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="email"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Correo
                                        electrónico</label>
                                    <div class="mt-2">
                                        <input
                                            id="email"
                                            type="email"
                                            v-model="formData.email"
                                            @input="clearError('email')"
                                            placeholder="jane.smith@gmail.com"
                                            :class="errors.email ? 'outline-red-500 focus:outline-red-500' : 'outline-primary/15 focus:outline-primary'"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 placeholder:text-paragraph focus:-outline-offset-1 sm:text-base" />
                                        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                                    </div>
                                </div>

                                <div>
                                    <label class="ml-px block pl-4 text-base font-public font-medium text-primary">Servicio o taller de interés</label>
                                    <div class="mt-2 relative" ref="dropdownRef">
                                        <input type="hidden" name="service" :value="selectedService" />
                                        <button
                                            type="button"
                                            @click="toggleServiceDropdown"
                                            :disabled="isLoading"
                                            class="block w-full rounded-full bg-white px-4 py-2.5 text-base outline-1 -outline-offset-1 outline-primary/15 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-crecer sm:text-base text-left flex items-center justify-between transition-all"
                                            :class="[selectedService ? 'text-primary' : 'text-paragraph', isLoading ? 'opacity-50 cursor-wait' : '']"
                                        >
                                            <span>{{ isLoading ? 'Cargando opciones...' : selectedServiceLabel }}</span>
                                            <svg
                                                v-if="!isLoading"
                                                class="w-5 h-5 transition-transform duration-200"
                                                :class="isServiceDropdownOpen ? 'rotate-180' : ''"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </button>

                                        <Transition
                                            enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95"
                                        >
                                            <div
                                                v-if="isServiceDropdownOpen"
                                                class="absolute z-10 mt-2 w-full bg-white rounded-3xl shadow-xl border border-primary/10 overflow-hidden"
                                            >
                                                <div class="py-2 max-h-64 overflow-y-auto">
                                                    <button
                                                        v-for="service in services"
                                                        :key="service.value"
                                                        type="button"
                                                        @click="selectService(service)"
                                                        class="w-full text-left px-4 py-3 text-base transition-colors hover:bg-secondary-crecer/10 flex items-center justify-between group"
                                                        :class="selectedService === service.value ? 'bg-secondary-crecer/5 text-secondary-crecer font-medium' : 'text-paragraph'"
                                                    >
                                                        <span>{{ service.label }}</span>
                                                        <svg
                                                            v-if="selectedService === service.value"
                                                            class="w-5 h-5 text-secondary-crecer"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </Transition>
                                        <p v-if="errors.service" class="mt-1 text-sm text-red-600">{{ errors.service }}</p>
                                    </div>
                                </div>

                                <div>
                                    <label class="ml-px block pl-4 text-base font-public font-medium text-primary mb-3">Preferencia de contacto</label>
                                    <div class="flex flex-col gap-3">
                                        <label class="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                v-model="formData.contact_preference"
                                                value="email"
                                                class="w-5 h-5 text-secondary-crecer border-primary/30 focus:ring-secondary-crecer focus:ring-offset-0" />
                                            <span class="flex items-center gap-2 text-base text-paragraph group-hover:text-primary transition-colors">
                                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                    <polyline points="22,6 12,13 2,6" />
                                                </svg>
                                                Correo electrónico
                                            </span>
                                        </label>
                                        <label class="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                v-model="formData.contact_preference"
                                                value="whatsapp"
                                                class="w-5 h-5 text-secondary-crecer border-primary/30 focus:ring-secondary-crecer focus:ring-offset-0" />
                                            <span class="flex items-center gap-2 text-base text-paragraph group-hover:text-primary transition-colors">
                                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                                </svg>
                                                WhatsApp
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="message"
                                        class="ml-px block pl-4 text-base font-public font-medium text-primary">Tu
                                        mensaje</label>
                                    <div class="mt-2">
                                        <textarea
                                            id="message"
                                            v-model="formData.message"
                                            placeholder="Cuéntame cómo puedo ayudarte..."
                                            class="block w-full rounded-3xl bg-white px-4 py-2.5 text-base text-paragraph outline-1 -outline-offset-1 outline-primary/15 placeholder:text-paragraph focus:-outline-offset-1 focus:outline-primary sm:text-base h-44"
                                        ></textarea>
                                    </div>
                                </div>

                                <div class="flex items-center">
                                    <label class="flex items-start gap-3 cursor-pointer group">
                                        <div class="relative flex items-center">
                                            <input type="checkbox" v-model="formData.newsletter" class="sr-only" />
                                            <div
                                                class="mt-1 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center"
                                                :class="formData.newsletter
                                                    ? 'bg-gradient-to-br from-secondary-sanar to-secondary-crecer border-transparent shadow-md'
                                                    : 'border-primary/20 bg-white group-hover:border-primary/40'"
                                            >
                                                <svg
                                                    class="w-4 h-4 text-white transition-all duration-200"
                                                    :class="formData.newsletter ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="3"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-sm text-paragraph group-hover:text-primary transition-colors">
                                            Sí, quiero suscribirme al boletín informativo para recibir novedades, recursos y contenido exclusivo sobre transformación personal y bienestar emocional.
                                        </span>
                                    </label>
                                </div>

                                <div class="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        :disabled="isSubmitting"
                                        class="btn primary"
                                        :class="isSubmitting ? 'opacity-70 cursor-not-allowed' : ''"
                                    >
                                        <span>{{ isSubmitting ? 'Enviando...' : 'Enviar ahora' }}</span>
                                        <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="size-6">
                                            <path fill-rule="evenodd"
                                                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <svg v-else class="animate-spin size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <EndSection variant="subscribe" />
        </div>
</template>