<template>
  <ul>
    <ListItem
      v-for="item in array"
      :key="item.id"
      :item="item"
      :model-value="isItemInItemsInArray(item)"
      @update:model-value="emit('update', item.id, $event)"
    />
  </ul>
</template>

<script setup lang="ts" generic="DT extends DataType">
import type { DataItem, DataType } from '@/models/data'
import { useItemsInArray } from '@/composables/useItemsInArray'
import ListItem from './ListItem.vue'
import { toRefs } from 'vue'

const props = defineProps<{
  array: DataItem<DT>[]
  items: number[]
}>()

const emit = defineEmits<{
  update: [id: number, value: boolean]
}>()

const { itemsInArray } = useItemsInArray(toRefs(props))

function isItemInItemsInArray(item: DataItem<DT>) {
  return itemsInArray.value.some((itemInArray) => itemInArray === item.id)
}
</script>
