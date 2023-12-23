<template>
  <span :title="formattedItemType">{{ ICONS[itemType] }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type ITEM_TYPES, ICONS, type SPECIAL_ITEM_TYPES } from '@/models/data'

const props = defineProps<{
  itemType: ITEM_TYPES | SPECIAL_ITEM_TYPES
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
