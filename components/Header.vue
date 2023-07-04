<script setup lang="ts">
import { ref } from 'vue'

const { isDesktop } = useDevice();

const menuDefault = 'grommet-icons:menu'
const menuPressed = 'ic:round-close'

let menuState = ref(menuDefault)

let isMenuPressed = false

function pressMenu() {
    isMenuPressed = !isMenuPressed
    menuState.value = isMenuPressed ? menuPressed : menuDefault
}
</script>

<template>
    <div class="z-50 flex flex-col" :class="isMenuPressed && 'bg-white fixed h-full w-full'">
        <div class="w-screen flex flex-row justify-center items-center" :class="isDesktop ? 'pt-10 pb-12' : 'pt-8 pb-10'">
            <div class="flex flex-row" :class="isDesktop ? 'w-2/3' : 'w-10/12'">
                <NuxtLink to="/info"><h1 class="font-normal text-2xl">Juliet Aaltonen</h1></NuxtLink>
                <div class="grow" />
                <Icon @click=pressMenu :name=menuState size="1.6em" class="cursor-pointer" :class="isDesktop ? 'mt-2' : 'mt-1'" />
            </div>
        </div>
        <Nav v-show=isMenuPressed scroll />
    </div>
</template>
