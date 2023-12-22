<template>
  <div>
    <label>Collected: </label>
    <input type="checkbox" v-model="isCollected" />
  </div>
</template>

<script setup lang="ts">
const isCollected = defineModel()
</script>
