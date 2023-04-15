<script setup lang="ts">
import { View } from '~/types/view'
import {useAsyncData} from "#app";
import Nav from "~/components/Nav.vue";

const route = useRoute()
const slug = route.params.view as string

const { find } = useStrapi()

const { data: views } = await useAsyncData('views', () =>
    find<View>('views', {
        sort: 'rank',
        populate: { images: { populate: '*' } }
    }), {
    transform: (i) => i.data
});

useState('views', () => views);

const view = views.value?.find((view) => view.attributes.url === slug)
if (!view) {
    throw createError({ statusCode: 404 })
}

const pageTitle = `Juliet Aaltonen - ${view.attributes.title}`
const pageDescription = 'Juliet Aaltonen (b. 1992) London, UK, lives and works between Amsterdam, the Netherlands and London, UK, and is currently pursuing an MA in Painting at the Royal College of Art.'
const pageUrl = `https://julietaaltonen.com/view/${view.attributes.url}/`

useHead({
    title: pageTitle,
    meta: [
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:url', content: pageUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        {
            name: 'description',
            content: pageDescription
        },
    ],
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'canonical', href: pageUrl }],
});
</script>

<template>
   <Header />
    <Gallery :images=view.attributes.images />
    <Nav :scroll=false />
</template>