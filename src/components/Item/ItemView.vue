<template>
  <ItemsList :items="userData[itemType]" :item-type="itemType" @update="updatePlant" />
</template>

<script setup lang="ts">
import ItemsList from '@/components/ItemsList.vue'

import { useUserData } from '@/composables/useUserData'
import type { ItemType } from '@/models/data'

const props = defineProps<{
  itemType: ItemType
}>()
const { userData, updateOrCreateItem } = useUserData()

function updatePlant(id: number, trackerValues: (typeof userData)[ItemType][0]['trackerValues']) {
  const item = userData[props.itemType].find((plant) => plant.id === id)!
  updateOrCreateItem(props.itemType, {
    ...item,
    trackerValues
  })
}
</script>
