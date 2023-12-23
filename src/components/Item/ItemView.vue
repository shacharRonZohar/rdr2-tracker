<template>
  <ItemsList :items="filteredUserData" :item-type="itemType" @update="update" />
</template>

<script setup lang="ts">
import ItemsList from '@/components/ItemsList.vue'

import { useUserData } from '@/composables/useUserData'
import type { DataItem, ITEM_TYPES, TrackerValues } from '@/models/data'
import { computed, watch, watchEffect } from 'vue'

const props = defineProps<{
  itemType: ITEM_TYPES
  // filterName?: string
  filterCondition?: (item: any, guards?: boolean[]) => boolean
  guards?: boolean[]
}>()
const { userData, updateOrCreateItem } = useUserData()

function update(id: number, trackerValues: TrackerValues[ITEM_TYPES]) {
  const item = userData[props.itemType].find((item) => item.id === id)!
  updateOrCreateItem(props.itemType, {
    ...item,
    trackerValues
  })
}

// watchEffect(() => {
//   // console.log(props.filterCondition)
//   console.log(props.guard)
// })

const filteredUserData = computed(() => {
  if (!props.filterCondition) return userData[props.itemType]
  // console.log(props.filterCondition)
  return userData[props.itemType].filter(
    (item) => props.filterCondition && props.filterCondition(item, props.guards)
  )
})
</script>
