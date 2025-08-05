import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["vue3-carousel-nuxt", "@nuxtjs/seo", "@pinia/nuxt"],

  site: {
    // url: "https://example.com",
    name: "Rafael García",
    description: "Welcome to my awesome site!",
    // defaultLocale: "es", // not needed if you have @nuxtjs/i18n installed
  },

  ogImage: {
    enabled: false,
  },
  sitemap: {
    enabled: false,
  },
  robots: {
    enabled: false,
  },
  seo: {
    // seo utils
    enabled: true,
  },
  schemaOrg: {
    enabled: false,
  },
  linkChecker: {
    enabled: false,
  },
});