<template>
  <ul>
    <li v-for="objective in objectives" :key="objective">
      <!-- {{ objective }} -->
      <!-- {{ objectiveComponentMap[objective] }} -->
      <!-- {{ item.trackerValues[objective] }} -->
      <!-- asd -->
      <component
        :is="objectiveComponentMap[objective]"
        :title="objective"
        :model-value="item.trackerValues[objective]"
        @update:model-value="updateTrackerValues(objective, $event)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends ItemType">
import { computed, ref, toRefs } from 'vue'
import type { DataItem, ItemType } from '@/models/data'
import TrackBoolean from './TrackerObjectives/TrackBoolean.vue'
// import TrackMultipuleBoolean from './TrackerObjectives/TrackMultipuleBoolean.vue'
const objectiveComponentMap = {
  isCollected: TrackBoolean,
  isTracked: TrackBoolean,
  isKilled: TrackBoolean,
  isSkinned: TrackBoolean,
  isPerfectSkinned: TrackBoolean,
  isStudied: TrackBoolean
} as const

type ObjectiveComponentMapKeys = keyof typeof objectiveComponentMap
const props = defineProps<{
  itemType: T
  item: DataItem<T>
  objectives: ObjectiveComponentMapKeys[]
}>()

const emit = defineEmits<{
  update: [id: number, value: typeof props.item.trackerValues]
}>()
// const trackerValues = ref({
//   ...props.item.trackerValues
// })

function updateTrackerValues(objective: ObjectiveComponentMapKeys, value: boolean) {
  const trackerValues = {
    ...props.item.trackerValues,
    [objective]: value
  }
  console.log('trackerValues', trackerValues)
  // trackerValues.value[objective] = value
  // console.log('trackerValues', trackerValues.value)
  // emit('update', props.item.id, trackerValues.value)
  emit('update', props.item.id, trackerValues)
}
</script>
