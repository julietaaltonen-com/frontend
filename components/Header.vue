<script setup lang="ts">
import { ref } from 'vue'

const { isDesktop } = useDevice();

const menuDefault = 'ant-design:menu-outlined'
const menuPressed = 'ant-design:close-outlined'
let menuState = ref(menuDefault)
let isMenuPressed = false

function pressMenu() {
    isMenuPressed = !isMenuPressed
    menuState.value = isMenuPressed ? menuPressed : menuDefault
}
</script>

<template>
    <div class="flex flex-col" :class="isMenuPressed && 'bg-white fixed h-full w-full'">
        <div class="w-screen flex flex-row justify-center items-center" :class="isDesktop ? 'pt-10 pb-10' : 'pt-8 pb-8'">
            <div class="flex flex-row" :class="isDesktop ? 'w-2/3' : 'w-10/12'">
                <h1 class="font-normal text-xl">Juliet Aaltonen</h1>
                <div class="grow" />
                <Icon v-show=false :name=menuPressed />
                <Icon @click=pressMenu :name=menuState size=1.5em class="cursor-pointer" />
            </div>
        </div>
        <Nav v-show=isMenuPressed scroll />
    </div>
</template>
