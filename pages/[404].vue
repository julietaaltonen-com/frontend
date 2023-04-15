<script setup lang="ts">
const pageTitle = 'Juliet Aaltonen'
const pageDescription = 'Juliet Aaltonen (b. 1992) London, UK, lives and works between Amsterdam, the Netherlands and London, UK, and is currently pursuing an MA in Painting at the Royal College of Art.'

useHead({
    title: pageTitle,
    meta: [
        {
            name: 'description',
            content: pageDescription
        },
    ],
    htmlAttrs: { lang: 'en' },
});
</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <h1 class="font-light select-none text-l">Page not found :(</h1>
    </div>
</template>
