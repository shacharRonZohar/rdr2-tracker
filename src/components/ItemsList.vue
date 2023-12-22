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

<script setup lang="ts" generic="T extends ItemType">
import type { DataItem, ItemType } from '@/models/data'
import { useItemsInArray } from '@/composables/useItemsInArray'
import ListItem from './ListItem.vue'
import { toRefs } from 'vue'

const props = defineProps<{
  itemType: T
  // allItems: DataItem<T>[]
  items: DataItem<T>[]
}>()

const emit = defineEmits<{
  update: [id: number, value: (typeof props.items)[0]['trackerValues']]
}>()

function onUpdateTrackerValues(id: number, value: (typeof props.items)[0]['trackerValues']) {
  emit('update', id, value)
}

// const { itemsInArray } = useItemsInArray(toRefs(props))

// function isItemInItemsInArray(item: DataItem<T>) {
//   return itemsInArray.value.some((itemInArray) => itemInArray === item.id)
// }
</script>
