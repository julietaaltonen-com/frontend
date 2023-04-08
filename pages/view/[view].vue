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
</script>

<template>
   <Header />
    <Gallery :images=view.attributes.images />
    <Nav :scroll=false />
</template>