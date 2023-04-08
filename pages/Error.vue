<template>
    <div>
        <h1>An error occurred - {{ error.statusCode }} </h1>
    </div>
</template>

<script setup lang="ts">
import {ImageType} from "~/types/view";
import {error404} from "@nuxt/ui-templates";
</script>