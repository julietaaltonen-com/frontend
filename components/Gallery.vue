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
                                <h2 class="leading-5 pt-2 pb-4" :class="isDesktop ? 'text-sm' : 'text-xs'">
                                    <div class="font-semibold pb-2">
                                        {{ image.title }} <span v-if=image.year class="font-normal"> - {{ image.year }}</span>
                                    </div>
                                    <span class="block font-normal text-slate-800" v-if=image.description>{{ image.description }}</span>
                                    <div class="block font-normal text-slate-800" v-if=image.size?.width>{{ image.size.width }} x {{ image.size.height }} cm</div>
                                </h2>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </client-only>
</template>
