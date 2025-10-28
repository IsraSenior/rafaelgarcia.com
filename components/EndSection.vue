<script setup>
import { ref } from 'vue'

const store = useMainStore()

const props = defineProps({
    variant: {
        type: String,
        default: 'subscribe', // 'subscribe' | 'cta'
    },
    title: {
        type: String,
        default: 'Permíteme <br> <b><i>mantenerte<u class="decoration-secondary-crecer"> informado</u></i></b>',
    },
    description: {
        type: String,
        default: 'Sé el primero en recibir información sobre nuestros programas, eventos, testimonios y mucho más.',
    },
    image: {
        type: String,
        default: '/home-6.png',
    },
    buttonText: {
        type: String,
        default: 'Inicia ahora',
    },
    buttonLink: {
        type: String,
        default: '/contacto',
    },
    disclaimer: {
        type: String,
        default: '* Al suscribirte aceptas recibir información sobre nuestros programas.',
    },
    openOnboarding: {
        type: Boolean,
        default: false,
    },
});

// Estado del formulario de suscripción
const email = ref('')
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleClick = () => {
    if (props.openOnboarding) {
        store.openOnboarding = true
    }
}

// Manejar suscripción
const handleSubscribe = async () => {
    // Limpiar mensajes
    errorMessage.value = ''
    successMessage.value = ''
    submitSuccess.value = false

    // Validar email
    if (!email.value.trim()) {
        errorMessage.value = 'Por favor ingresa tu correo electrónico'
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        errorMessage.value = 'El formato del correo no es válido'
        return
    }

    isSubmitting.value = true

    try {
        const response = await $fetch('/api/newsletter/subscribe', {
            method: 'POST',
            body: {
                email: email.value,
                source: 'end_section'
            }
        })

        if (response.success) {
            submitSuccess.value = true
            successMessage.value = response.message
            email.value = '' // Limpiar campo
        } else {
            errorMessage.value = response.errors?.join(', ') || 'Error al suscribirse'
        }
    } catch (error) {
        console.error('Error subscribing:', error)
        errorMessage.value = 'Ocurrió un error al procesar tu suscripción. Por favor, intenta nuevamente.'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section class="">
        <div class="mx-auto ">
            <div class="bg-primary rounded-t-[40px] p-5 md:p-10">
                <article class="relative min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] flex items-center justify-start px-5 md:px-10 lg:px-20">
                    <img :src="image" alt=""
                        class="w-full h-full absolute inset-0 transform scale-x-[-1] overflow-hidden rounded-4xl object-cover object-center">

                    <div class="relative lg:max-w-2xl space-y-5">
                        <h2 class="text-left text-white title title--headline" v-html="title"></h2>

                        <p class="!text-white">{{ description }}</p>

                        <!-- Mensajes de éxito/error para suscripción -->
                        <div v-if="variant === 'subscribe' && (successMessage || errorMessage)" class="p-4 rounded-2xl" :class="submitSuccess ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'">
                            <p class="text-sm font-medium">{{ successMessage || errorMessage }}</p>
                        </div>

                        <!-- Variante Subscribe -->
                        <div v-if="variant === 'subscribe'" class="flex flex-col md:flex-row items-center mt-10 space-y-3 md:space-y-0 md:space-x-5 justif-start">
                            <input
                                type="email"
                                v-model="email"
                                @keyup.enter="handleSubscribe"
                                placeholder="Correo electrónico"
                                :disabled="isSubmitting"
                                class="btn !border-2 !border-white border-solid placeholder:text-white outline-none !text-white focus:!bg-white focus:!text-primary w-full md:!w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                            <button
                                @click="handleSubscribe"
                                :disabled="isSubmitting"
                                class="btn primary w-full md:!w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span>{{ isSubmitting ? 'Suscribiendo...' : 'Subscribirme' }}</span>
                            </button>
                        </div>

                        <!-- Variante CTA -->
                        <div v-else class="flex items-center mt-10 space-x-5 justif-start">
                            <button v-if="openOnboarding" @click="handleClick" class="btn primary w-full md:!w-auto">
                                <span>{{ buttonText }}</span>
                            </button>
                            <NuxtLink v-else :to="buttonLink" class="btn primary w-full md:!w-auto">
                                <span>{{ buttonText }}</span>
                            </NuxtLink>
                        </div>

                        <p v-if="variant === 'subscribe'" class="text-white text-sm">{{ disclaimer }}</p>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>