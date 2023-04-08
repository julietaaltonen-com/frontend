<script setup lang="ts">
import { ImageType } from '~/types/view'
import {onMounted, ref} from 'vue'

const props = defineProps<{image: ImageType}>()
const isLoaded = ref(false);
const image = ref(null);
const isSeen = ref(false)
const src = ref()

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !isSeen.value) {
                src.value = props.image.image.data.attributes.url
                isSeen.value = true
            }
        })
    }, {
        rootMargin: '400px',
        threshold: 0,
    })

    observer.observe(image.value)
})
</script>

<template>
    <div class="bg-gray-100">
        <div ref=image class="opacity-0" :class="isLoaded && 'transition-opacity ease-in duration-200 opacity-100'">
            <img
                ref=image
                class="w-full"
                :src=src
                :width=props.image.image.data.attributes.width
                :height=props.image.image.data.attributes.height
                loading=lazy
                @load="isLoaded = true"
            />
        </div>
    </div>
</template>