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
</script>

<template>
    <Header />
    <div class="bg-red-300">
    </div>
</template>
