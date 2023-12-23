<template>
  <!-- <span>Total: {{ items.length }} / {{ allItems.length }}</span> -->
  <ul>
    <ListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :itemType="itemType"
      @update="onUpdateTrackerValues"
    />
  </ul>
</template>

<script setup lang="ts">
import { type DataItem, ITEM_TYPES, type TrackerValues } from '@/models/data'
import ListItem from './ListItem.vue'

defineProps<{
  itemType: ITEM_TYPES
  items: DataItem<ITEM_TYPES>[]
}>()

const emit = defineEmits<{
  update: [id: number, value: TrackerValues[ITEM_TYPES]]
}>()

function onUpdateTrackerValues(id: number, value: TrackerValues[ITEM_TYPES]) {
  emit('update', id, value)
}
</script>
