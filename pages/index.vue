<script setup lang="ts">
import { useAsyncData } from '#app'

import { View } from 'types/view'

const { find } = useStrapi()

const { data: views } = await useAsyncData('views', () =>
    find<View>('views', {
        sort: 'rank',
        populate: { images: { populate: '*' } }
    }), {
        transform: (i) => i.data
    });

useState('views', () => views);
navigateTo('/view/' + views.value[0].attributes.url)

const pageTitle = 'Juliet Aaltonen'
const pageDescription = 'Juliet Aaltonen (b. 1992) London, UK, lives and works between Amsterdam, the Netherlands and London, UK, and is currently pursuing an MA in Painting at the Royal College of Art.'
const pageUrl = 'https://julietaaltonen.com/'

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
    <div class="bg-red-300">
    </div>
</template>
