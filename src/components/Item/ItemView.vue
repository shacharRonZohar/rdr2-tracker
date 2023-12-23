<template>
  <ItemsList :items="filteredDataToShow" :item-type="itemType" @update="update" />
</template>

<script setup lang="ts">
import plants from '@/assets/data/plants.json'
import animals from '@/assets/data/animals.json'
import legendaryAnimals from '@/assets/data/legendary-animals.json'
import ItemsList from '@/components/ItemsList.vue'
import { useUserData } from '@/composables/useUserData'
import { ITEM_TYPES, type TrackerValues, DEFAULT_TRACKER_VALUES } from '@/models/data'
import { computed } from 'vue'

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

//

const dataToShow = computed(() => {
  let data = []
  switch (props.itemType) {
    case ITEM_TYPES.PLANT:
      data = plants.map((plant) => ({
        ...plant,
        trackerValues: getTrackerValues(plant.id)
      }))
      break
    case ITEM_TYPES.ANIMAL:
      data = animals.map((animal) => ({
        ...animal,
        trackerValues: getTrackerValues(animal.id)
      }))
      break
    case ITEM_TYPES.LEGENDARY_ANIMAL:
      data = legendaryAnimals.map((legendaryAnimal) => ({
        ...legendaryAnimal,
        trackerValues: getTrackerValues(legendaryAnimal.id)
      }))
      break
  }

  return data
})

const filteredDataToShow = computed(() => {
  if (!props.filterCondition) return dataToShow.value
  // console.log(props.filterCondition)
  return dataToShow.value.filter(
    (item) => props.filterCondition && props.filterCondition(item, props.guards)
  )
})

function getTrackerValues(id: number) {
  return (
    userData[props.itemType].find((item) => item.id === id)?.trackerValues || DEFAULT_TRACKER_VALUES
  )
}
</script>
