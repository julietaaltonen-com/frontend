<script setup lang="ts">
import { ImageType } from '~/types/view'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['loaded']);

const props = defineProps<{image: ImageType}>()
const isLoaded = ref(false);
const image = ref(null);
const isSeen = ref(false);
const src = ref();

function loaded() {
  isLoaded.value = true;
  emit('loaded', true);
}

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !isSeen.value) {
                src.value = props.image.image.data.attributes.url
                isSeen.value = true
            }
        })
    }, {
        rootMargin: '7000px',
        threshold: 0,
    })

    observer.observe(image.value)
})
</script>

<template>
    <div class="bg-gray-100" ref=image>
          <img
              :height=props.image.image.data.attributes.height
              :width=props.image.image.data.attributes.width
              :alt=props.image.title
              ref=image
              class="w-full opacity-0"
              :class="isLoaded && 'delay-500 transition-opacity ease-in duration-200 opacity-100'"
              :src=src
              loading=lazy
              @load=loaded
          />
    </div>
</template>