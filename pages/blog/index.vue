<script setup>
const posts = [
    {
        image: "/vista-frontal-mujer-meditando-en-estera.jpg",
        title: "Mi primera experiencia con la respiración Holotrópica",
    },
    {
        image: "/proceso-de-curacion-de-la-mujer-de-vista-frontal.jpg",
        title: "Regulación Emocional",
    },
    {
        image: "/concepto-de-lifestyle-de-chica-adolescente.jpg",
        title: "Vive un día a la vez",
    },
    {
        image: "https://img.freepik.com/foto-gratis/joven-expresiva-posando-estudio_176474-75428.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80",
        title: "Cuando tu cuerpo habla: señales de alerta",
    },
    {
        image: "https://img.freepik.com/foto-gratis/mujer-joven-camiseta-haciendo-meditacion-ojos-cerrados-mirando-relajado-vista-frontal_176474-14353.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80",
        title: "Respira, siente y suelta",
    },
    {
        image: "https://img.freepik.com/foto-gratis/mujer-tiro-medio-estirando-trabajo_23-2150509961.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80",
        title: "Mindfulness en movimiento",
    },
    {
        image: "https://img.freepik.com/fotos-premium/imagen-retrato-hermosa-mujer-asiatica-pie-naturaleza-parque-antes-atardecer_9563-12090.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80",
        title: "Gratitud diaria: reto de 7 días",
    },
    {
        image: "https://img.freepik.com/foto-gratis/vista-lateral-hombre-encendiendo-incienso_23-2148847562.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80",
        title: "Rituales matutinos para enraizarte",
    },
    {
        image: "https://img.freepik.com/foto-gratis/violencia-lugar-trabajo-colegas_23-2149361831.jpg?ga=GA1.1.369728013.1746707732&semt=ais_hybrid&w=740&q=80",
        title: "Cuando el miedo se vuelve maestro",
    }
]
</script>

<template>
    <section class="gradient-muted py-16 md:pt-24 md:pb-32 relative">
        <div class="container mx-auto px-20">
            <h2 class="title title--headline text-primary text-center max-w-3xl mx-auto">Inspiración para
                <b><i>para <br class="hidden lg:block"> <u class="decoration-secondary-crecer">tu
                            transformación”</u></i></b>
            </h2>

            <div class="mt-32">
                <div class="flex items-center justify-between">
                    <p class="font-public text-paragraph">Mostrando los 6 resultados</p>
                    <div>
                        
                    </div>
                </div>
                <div class="mt-16 grid grid-cols-1 xl:grid-cols-3 gap-10">
                    <BlogTeaser v-for="(post, index) in posts" :key="index" :image="post?.image" :title="post?.title" />
                </div>
            </div>
        </div>
    </section>
</template>