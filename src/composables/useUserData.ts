import { useStorage } from '@vueuse/core'
import { watch } from 'vue'

export function useUserData() {
  const { value: userData } = useStorage('userData', {
    plants: [] as number[]
  })

  function addPlant(plantId: number) {
    userData.plants.push(plantId)
  }

  function removePlant(plantId: number) {
    userData.plants = userData.plants.filter((id) => id !== plantId)
  }

  watch(
    () => userData.plants,
    (newPlants) => {
      console.log('userData changed', newPlants)
    },
    { deep: true, immediate: true }
  )
  return { userData, addPlant, removePlant }
}
