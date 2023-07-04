<script setup lang="ts">
const route = useRoute()
const slug = route.params.view as string
const { isDesktop } = useDevice();
const views = useState('views');

const props = defineProps<{scroll: boolean}>()
</script>

<template>
    <div class="w-screen h-screen flex flex-row justify-center" :class="props.scroll && 'overflow-y-scroll'">
        <div :class="isDesktop ? 'w-2/3' : 'w-10/12'">
            <div :class="!props.scroll && 'flex items-center justify-center h-screen'">
                <ul>
                    <li v-for="view in views" class="pt-4 pb-4">
                        <NuxtLink class="select-none text-m" :class="slug !== view.attributes.url ? 'font-semibold cursor-pointer underline' : 'cursor-default'" :to="`/view/${view.attributes.url}`">{{ view.attributes.title }}</NuxtLink>
                    </li>
                    <li class="pt-4 pb-4"><Icon name=ant-design:line-outlined /></li>
                    <li class="pt-4 pb-12">
                        <div class="flex flex-row">
                            <NuxtLink class="font-light select-none underline text-l cursor-pointer mr-12" to="https://www.instagram.com/julietaaltonen" target="_blank">Instagram</NuxtLink>
                            <NuxtLink class="font-light select-none underline text-l cursor-pointer mr-12" to="/info">Info</NuxtLink>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>