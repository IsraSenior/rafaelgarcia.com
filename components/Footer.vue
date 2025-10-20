<script setup>

</script>

<template>
    <footer class="bg-primary py-16">
        <div class="container mx-auto px-20">
            <div class="pb-12 grid grid-cols-2 md:grid-cols-5 gap-20">
                <div class="md:col-span-2">
                    <Logo class="h-16" primary="text-white" secondary="text-white" />
                    <p class="mt-10 text-white">
                        Transforma tu crisis y recupera el rumbo de tu vida.
                    </p>
                </div>
                <div clasS="mt-5">
                    <h6 class="title title--element !text-white mb-5">Camino Vital</h6>
                    <ul class="space-y-3">
                        <li>
                            <a href="#" class="link !text-secondary-estabilizar hover:!text-white">Módulo
                                Estabilizar</a>
                        </li>
                        <li>
                            <a href="#" class="link !text-secondary-sanar hover:!text-whiteer">Módulo Sanar</a>
                        </li>
                        <li>
                            <a href="#" class="link !text-secondary-crecer hover:!text-white">Módulo Crecer</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div clasS="mt-5">
                        <h6 class="title title--element !text-white mb-5">Talleres</h6>
                        <ul class="space-y-3">
                            <li>
                                <a href="#" class="link !text-white hover:!text-secondary-crecer">Respiración
                                    Holotrópica</a>
                            </li>
                            <li>
                                <a href="#" class="link !text-white hover:!text-secondary-crecer">Manejo de
                                    emociones</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div>
                    <div clasS="mt-5">
                        <h6 class="title title--element !text-white mb-5">Legal</h6>
                        <ul class="space-y-3">
                            <li>
                                <a href="#" class="link !text-white hover:!text-secondary-crecer">Términos y
                                    condiciones</a>
                            </li>
                            <li>
                                <a href="#" class="link !text-white hover:!text-secondary-crecer">Políticas de
                                    privacidad</a>
                            </li>
                            <li>
                                <a href="#" class="link !text-white hover:!text-secondary-crecer">Políticas de
                                    cookies</a>
                            </li>
                        </ul>
                    </div>
                </div> -->
                <div>
                    <div clasS="mt-5">
                        <h6 class="title title--element !text-white mb-5">Servicios</h6>
                        <ul class="space-y-3">
                            <li>
                                <a href="#" class="link !text-white hover:!text-secondary-crecer">Sesiones individuales</a>
                            </li>
                            <li>
                                <a href="#" class="link !text-white hover:!text-secondary-crecer">Retiro conexión vital</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between pt-12 border-t border-muted/15">
                <p class="order-1 !text-white !text-base">Rafael García @ 2025 - Todos los derechos reservados</p>
                <div class="flex gap-x-5 order-2">
                    <a href="#" class="text-white hover:text-secondary-crecer">
                        <span class="sr-only">Facebook</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" class="text-white hover:text-secondary-crecer">
                        <span class="sr-only">Instagram</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <!-- <a href="#" class="text-white hover:text-secondary-crecer">
                        <span class="sr-only">X</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                        </svg>
                    </a> -->
                    <a href="https://wa.me/57325458223" target="_blank" rel="noopener noreferrer"
                        class="text-white hover:text-secondary-crecer">
                        <span class="sr-only">WhatsApp</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M20.52 3.48A11.784 11.784 0 0 0 12 .198C5.589.198.322 5.465.322 11.874c0 2.09.547 4.052 1.6 5.79L0 24l6.585-1.895a11.79 11.79 0 0 0 5.417 1.378h.005c6.408 0 11.673-5.265 11.676-11.674a11.62 11.62 0 0 0-3.163-8.329zM12.167 21.41h-.004a9.534 9.534 0 0 1-4.858-1.337l-.349-.208-3.91 1.124 1.043-3.814-.23-.391a9.42 9.42 0 0 1-1.44-5.05c0-5.225 4.25-9.475 9.478-9.475a9.43 9.43 0 0 1 6.698 2.773 9.42 9.42 0 0 1 2.778 6.694c-.003 5.227-4.253 9.486-9.476 9.486z" />
                            <path
                                d="M17.472 15.386c-.297-.149-1.758-.868-2.031-.967-.273-.1-.472-.149-.672.15-.198.297-.77.966-.944 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.607.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.1-.198.05-.372-.025-.52-.074-.149-.672-1.62-.921-2.217-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372-.272.297-1.041 1.016-1.041 2.475 0 1.458 1.065 2.873 1.213 3.071.149.198 2.095 3.204 5.081 4.487.71.305 1.263.487 1.692.623.713.227 1.362.195 1.875.118.572-.086 1.757-.718 2.008-1.409.248-.691.248-1.306.173-1.409-.074-.104-.274-.173-.571-.322z" />
                        </svg>
                    </a>
                    <a href="#" class="text-white hover:text-secondary-crecer">
                        <span class="sr-only">YouTube</span>
                        <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>
