<template>
  <div>
    <!-- asd -->
    <label>{{ title }}: </label>
    <input type="checkbox" v-model="isValue" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
const isValue = defineModel()
</script>
