<template>
  {{ title }}
  <div v-for="titleItem in titles" :key="titleItem">
    <!-- {{ title }} -->
    <!-- asdas -->
    <TrackBoolean :title="titleItem" v-model="values[titleItem]" />
  </div>
</template>

<script setup lang="ts">
import TrackBoolean from './TrackBoolean.vue'
const props = defineProps<{
  title: string
}>()

const titles = ['isTracked', 'isKilled', 'isSkinned', 'isPerfectSkinned', 'isStudied']

const values = defineModel<{
  [key: string]: boolean
}>({
  required: true
})
</script>
