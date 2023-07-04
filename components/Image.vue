<script setup lang="ts">
import { ImageType } from '~/types/view'
const { isDesktop } = useDevice()
import { ref } from 'vue'

const props = defineProps<{image: ImageType, visible: boolean}>()
const isLoaded = ref(false);
const emit = defineEmits(['loaded']);

function loaded() {
  isLoaded.value = true;
  emit('loaded', true);
}

</script>

<template>
  <div v-show=props.visible>
    <ImageLoader :image=props.image @loaded=loaded />
    <div class="w-full opacity-0" :class="isLoaded && 'delay-500 transition-opacity ease-in duration-200 opacity-100'">
      <h2 class="leading-5 pt-2 pb-4" :class="isDesktop ? 'text-sm' : 'text-xs'">
        <span class="block font-semibold pb-2">
          {{ props.image.title }} <span v-if=props.image.year class="font-normal"> - {{ props.image.year }}</span>
        </span>
        <span class="block font-normal text-slate-800" v-if=props.image.description>{{ props.image.description }}</span>
        <span class="block font-normal text-slate-800" v-if=props.image.size?.width>{{ props.image.size.width }} x {{ props.image.size.height }} cm</span>
      </h2>
    </div>
  </div>
</template>