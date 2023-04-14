<script setup lang="ts">
import { ImageType } from '~/types/view'
const { isDesktop } = useDevice()

const props = defineProps<{images: ImageType[]}>()
</script>

<template>
    <client-only>
        <div class="w-screen flex flex-row justify-center pb-16">
            <div ref=gallery class="grid grid-flow-col" :class="isDesktop ? 'w-2/3' : 'w-10/12'">
                <ul>
                    <li v-for="image in props.images">
                        <div :class="isDesktop ? 'mb-16' : 'mb-8'">
                            <ImageLoader :image=image />
                            <div class="w-ful">
                                <h2 class="text-xs italic leading-5 pt-2">
                                    <span class="font-semibold">
                                        {{ image.title }} <span v-if=image.year> - {{ image.year }}</span>
                                    </span>
                                    <span class="block font-normal" v-if=image.description>{{ image.description }}</span>
                                    <span class="block font-normal" v-if=image.size?.width>{{ image.size.width }} x {{ image.size.height }} cm</span>
                                </h2>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </client-only>
</template>
