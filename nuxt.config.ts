// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
})
