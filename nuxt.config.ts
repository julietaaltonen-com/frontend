// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // target: 'static',
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/device',
        'nuxt-icon',
        '@nuxtjs/strapi',
    ],
    vite: {
        server: {
            watch: {
                usePolling: true
            }
        }
    },
    runtimeConfig: {
        public: {
            siteUrl: 'https://julietaaltonen.com',
        }
    },
})
