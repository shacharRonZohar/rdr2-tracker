<template>
  <ul>
    <li v-for="objective in objectives" :key="objective">
      <!-- @vue-expect-error -->
      <component
        :is="objectiveComponentMap[objective]"
        :title="objective"
        :model-value="item.trackerValues[objective]"
        @update:model-value="updateTrackerValues(objective, $event)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends ITEM_TYPES">
import {
  type DataItem,
  ITEM_TYPES,
  type TrackerValues,
  type OBJECTIVE
  // type TrackerValuesKeys
} from '@/models/data'
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

const props = defineProps<{
  itemType: T
  item: DataItem<T>
  objectives: OBJECTIVE[] | readonly OBJECTIVE[]
}>()

const emit = defineEmits<{
  update: [id: number, value: TrackerValues[T]]
}>()

function updateTrackerValues(objective: OBJECTIVE, value: boolean) {
  const trackerValues = {
    ...props.item.trackerValues,
    [objective]: value
  }
  emit('update', props.item.id, trackerValues)
}

function objectiveAsKeyofObjectiveComponentMap(objective: OBJECTIVE) {
  return objective as keyof typeof objectiveComponentMap
}
</script>
