import type { DataItem, ITEM_TYPES, WithId } from '@/models/data'
import { useStorage } from '@vueuse/core'
import { watch } from 'vue'
import plants from '@/assets/data/plants.json'
import animals from '@/assets/data/animals.json'
import legendaryAnimals from '@/assets/data/legendary-animals.json'
import userDataJSON from '@/assets/data/userData.json'
const filteredUserDataPlants = userDataJSON.plant
  .filter((plant) => plant.trackerValues.isCollected)
  .map((plant) => plant.id)
const filteredUserDataAnimals = userDataJSON.animal.filter(
  (animal) =>
    animal.trackerValues.isTracked ||
    animal.trackerValues.isKilled ||
    animal.trackerValues.isSkinned ||
    animal.trackerValues.isStudied
)
const filteredUserDataLegendaryAnimals = userDataJSON?.legendaryAnimals?.filter(
  (animal) =>
    animal.trackerValues.isTracked ||
    animal.trackerValues.isKilled ||
    animal.trackerValues.isSkinned ||
    animal.trackerValues.isStudied
)

export function useUserData() {
  const initialUserData = {
    plant: plants.map((plant) => ({
      id: plant.id,
      trackerValues: {
        isCollected: filteredUserDataPlants.includes(plant.id)
      }
    })),
    animal: animals.map((animal) => ({
      id: animal.id,
      trackerValues: filteredUserDataAnimals.find((item) => item.id === animal.id)
        ?.trackerValues || {
        isTracked: false,
        isKilled: false,
        isSkinned: false,
        isPerfectSkinned: false,
        isStudied: false
      }
    })),
    legendaryAnimal: legendaryAnimals.map((animal) => ({
      id: animal.id,
      trackerValues: filteredUserDataLegendaryAnimals?.find((item) => item.id === animal.id)
        ?.trackerValues || {
        isTracked: false,
        isKilled: false,
        isSkinned: false,
        isPerfectSkinned: false,
        isStudied: false
      }
    }))
  } as const

  const { value: userData } = useStorage('userData', initialUserData)

  function add(key: keyof typeof initialUserData, value: DataItem<ITEM_TYPES>) {
    userData[key].push(value)
  }

  function remove(key: keyof typeof initialUserData, value: DataItem<ITEM_TYPES>) {
    userData[key] = userData[key].filter((item) => item !== value)
  }

  function updateList(key: keyof typeof initialUserData, value: DataItem<ITEM_TYPES>[]) {
    userData[key] = value
  }

  function updateItem(key: keyof typeof initialUserData, value: DataItem<ITEM_TYPES>) {
    const index = userData[key].findIndex((item) => item.id === value.id)
    if (index === -1) return
    const newData = userData[key]
    newData[index] = value
    userData[key] = newData
  }

  function updateOrCreateItem(key: keyof typeof initialUserData, value: DataItem<ITEM_TYPES>) {
    console.log('updateOrCreateItem', key, value)
    const index = userData[key].findIndex((item) => item.id === value.id)
    // console.log('index', index)
    if (index === -1) {
      add(key, value)
    } else {
      updateItem(key, value)
    }
  }

  // // downlaod userData
  // const a = document.createElement('a')
  // a.href = URL.createObjectURL(new Blob([JSON.stringify(userData)]))
  // a.download = 'userData.json'
  // a.click()

  return { userData, add, remove, updateList, updateItem, updateOrCreateItem }
}
