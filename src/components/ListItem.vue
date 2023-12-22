<template>
  <li>
    <div class="details">
      {{ item.id }}
      <span>{{ item.name }}</span>
      <ItemIcon :itemType="itemType" />
      <ItemIcon v-if="isNewAustin" itemType="newAustin" />
    </div>
    <ItemTracker
      :itemType="itemType"
      :item="item"
      :objectives="itemTypeObjectiveMap[itemType]"
      @update="onUpdateTrackerValues"
    />
  </li>
</template>

<script setup lang="ts" generic="T extends ItemType">
import { computed } from 'vue'
import ItemIcon from '@/components/Item/ItemIcon.vue'
import ItemTracker from './Item/ItemTracker.vue'
import type { DataItem, ItemType } from '@/models/data'

const itemTypeObjectiveMap = {
  plant: ['isCollected'],
  animal: ['isTracked', 'isKilled', 'isSkinned', 'isPerfectSkinned', 'isStudied']

  // newAustin: 'TrackCollected'
} as const

const props = defineProps<{
  itemType: T
  item: DataItem<T>
}>()

const emit = defineEmits<{
  update: [id: number, value: typeof props.item.trackerValues]
}>()

function onUpdateTrackerValues(id: number, value: typeof props.item.trackerValues) {
  emit('update', id, value)
}
// const isMarked = defineModel()
// console.log('isMarked', isMarked)
// console.log(props.item.locations)
const isNewAustin = computed(() => {
  // console.log('locations', props.item.locations)
  return props.item.locations.every((location, idx) => location.state === 'new-austin')
})
// const itemClass = computed(() => ({
//   // 'is-marked': isMarked.value,
//   'is-new-austin': isNewAustin.value
// }))
</script>
