import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },

  runtimeConfig: {
    // Private keys (only available server-side)
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendSender: process.env.RESEND_SENDER || '',
    webmasterEmail: 'webmaster.conecttomas@gmail.com',

    // Public keys (exposed to client)
    public: {
      directusUrl: process.env.DIRECTUS_URL || '',
      directusToken: process.env.DIRECTUS_TOKEN || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://rafaelgarcia.com.co',
    },
  },

  image: {
    directus: {
      baseURL: process.env.DIRECTUS_URL || 'https://admin.rafaelgarcia.com.co'
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["vue3-carousel-nuxt", "@nuxtjs/seo", "@pinia/nuxt", "@nuxt/image"],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://rafaelgarcia.com.co",
    name: "Rafael García",
    description: "Comunicador, coach ontológico y líder transformacional. Experto en comunicación efectiva, liderazgo y desarrollo personal. Conferencias, talleres y consultoría en Colombia.",
    defaultLocale: "es",
  },

  ogImage: {
    enabled: true,
  },

  sitemap: {
    enabled: true,
    strictNuxtContentPaths: true,
  },

  robots: {
    enabled: false
  },

  seo: {
    enabled: true,
  },

  schemaOrg: {
    enabled: true,
    identity: {
      type: 'Person',
      name: 'Rafael García',
      url: process.env.NUXT_PUBLIC_SITE_URL || 'https://rafaelgarcia.com.co',
      image: '/images/rafael-garcia.jpg',
      sameAs: [
        'https://www.instagram.com/rafaelgarcia',
        'https://www.linkedin.com/in/rafaelgarcia',
        'https://twitter.com/rafaelgarcia',
        'https://www.facebook.com/rafaelgarcia',
      ],
      jobTitle: 'Coach Ontológico y Comunicador',
      description: 'Coach ontológico, comunicador y líder transformacional especializado en desarrollo personal y liderazgo',
    },
  },

  linkChecker: {
    enabled: false,
  },
});