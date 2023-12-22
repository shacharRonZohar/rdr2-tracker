<template>
  <span :title="formattedItemType">{{ icons[itemType] }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ItemType } from '@/models/data'

const icons = {
  plant: '🌱',
  animal: '🐮',
  fish: '🐟',
  horse: '🐴',
  newAustin: '🌵'
  // more icons
} as const

const props = defineProps<{
  itemType: ItemType
}>()

const formattedItemType = computed(() => {
  return props.itemType
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase()
})
</script>

<style scoped>
span {
  font-size: 1.5rem;
  text-transform: capitalize;
}
</style>
