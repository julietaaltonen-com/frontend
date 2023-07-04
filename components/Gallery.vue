<script setup lang="ts">
import { ImageType } from '~/types/view'
import {ref} from "vue";
const { isDesktop } = useDevice()

const props = defineProps<{images: ImageType[]}>()

const renderIndex = ref(0);
</script>

<template>
    <client-only>
        <div class="z-10 w-screen flex flex-row justify-center pb-16">
            <div ref=gallery class="grid grid-flow-col" :class="isDesktop ? 'w-2/3' : 'w-10/12'">
                <ul>
                    <li v-for="(image, index) in props.images">
                        <div :class="isDesktop ? 'mb-16' : 'mb-8'">
                            <Image :image=image @loaded="renderIndex++" :visible="index <= renderIndex" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </client-only>
</template>
