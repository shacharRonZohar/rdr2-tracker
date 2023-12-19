<template>
  <ItemsList :array="formattedPlants" :items="userData.plants" @update="updatePlant" />
</template>

<script setup lang="ts">
import ItemsList from '@/components/ItemsList.vue'
import plants from '@/assets/data/plants.json'
import { useUserData } from '@/composables/useUserData'
import { watchEffect, ref } from 'vue'
const { userData, addPlant, removePlant } = useUserData()
const formattedPlants = plants.map((plant) => ({
  ...plant,
  type: 'plant' as const
}))

const plantIds = ref<number[] | null>(null)
// watchEffect(() => {
//   plantIds.value = userData.plants
// })
// watchEffect(() => {
//   console.log(plantIds.value)
// })

// watchEffect(() => {
//   console.log(userData.plants)
// })
function updatePlant(id: number, value: boolean) {
  console.log(id, value)
  if (value) {
    addPlant(id)
  } else {
    removePlant(id)
  }
}
</script>
