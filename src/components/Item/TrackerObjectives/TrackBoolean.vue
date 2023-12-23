<template>
  <div>
    <label>{{ title }}: </label>
    <input type="checkbox" v-model="isValue" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
const isValue = defineModel()
</script>
