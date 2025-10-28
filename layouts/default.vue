<script setup>
const config = useRuntimeConfig()

// Structured Data (JSON-LD) for Organization and Person
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${config.public.siteUrl}/#person`,
            name: 'Rafael García',
            url: config.public.siteUrl,
            image: `${config.public.siteUrl}/rafael-garcial.webp`,
            jobTitle: 'Coach Ontológico y Comunicador Transformacional',
            description: 'Coach ontológico, comunicador y líder transformacional especializado en desarrollo personal, sanación emocional y crecimiento espiritual',
            knowsAbout: [
              'Coaching Ontológico',
              'Desarrollo Personal',
              'Transformación Personal',
              'Liderazgo',
              'Comunicación Efectiva',
              'Respiración Holotrópica',
              'Sanación Emocional',
              'Bienestar Emocional'
            ],
            sameAs: [
              'https://www.instagram.com/rafaelgarcia',
              'https://www.linkedin.com/in/rafaelgarcia',
              'https://twitter.com/rafaelgarcia',
              'https://www.facebook.com/rafaelgarcia'
            ]
          },
          {
            '@type': 'Organization',
            '@id': `${config.public.siteUrl}/#organization`,
            name: 'Rafael García - Transformación Personal',
            url: config.public.siteUrl,
            logo: `${config.public.siteUrl}/logo.png`,
            description: 'Centro de transformación personal y coaching ontológico dirigido por Rafael García. Ofrecemos el programa Camino Vital, talleres, retiros y servicios de desarrollo personal.',
            founder: {
              '@id': `${config.public.siteUrl}/#person`
            },
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'CO',
              addressLocality: 'Colombia'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              email: 'contacto@rafaelgarcia.com.co',
              availableLanguage: 'Spanish'
            }
          },
          {
            '@type': 'WebSite',
            '@id': `${config.public.siteUrl}/#website`,
            url: config.public.siteUrl,
            name: 'Rafael García',
            description: 'Coaching ontológico y transformación personal con Rafael García',
            publisher: {
              '@id': `${config.public.siteUrl}/#organization`
            },
            inLanguage: 'es-CO'
          }
        ]
      })
    }
  ]
})
</script>

<template>
    <div>
        <Header />
        <main>
            <slot />
        </main>
        <Footer />
        <Onboarding />
    </div>
</template>

<style>
/* Page transitions - Fade effect */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Layout transition */
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.3s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>