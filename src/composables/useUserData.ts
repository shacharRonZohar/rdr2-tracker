import type { DataItem, ITEM_TYPES, UserDataItem, WithId } from '@/models/data'
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
const filteredUserDataLegendaryAnimals = userDataJSON?.legendaryAnimal?.filter(
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

  function add<T extends ITEM_TYPES>(key: T, value: UserDataItem<T>) {
    userData[key].push(value as any)
  }

  function remove<T extends ITEM_TYPES>(key: T, value: UserDataItem<T>) {
    userData[key] = userData[key].filter((item) => item !== value) as any
  }

  function updateList<T extends ITEM_TYPES>(key: T, value: UserDataItem<T>[]) {
    userData[key] = value as any
  }

  function updateItem<T extends ITEM_TYPES>(key: T, value: UserDataItem<T>) {
    const index = userData[key].findIndex((item) => item.id === value.id)
    if (index === -1) return
    const newData = userData[key]
    newData[index] = value as any
    userData[key] = newData
  }

  function updateOrCreateItem<T extends ITEM_TYPES>(key: T, value: UserDataItem<T>) {
    console.log('updateOrCreateItem', key, value)
    const index = userData[key].findIndex((item) => item.id === value.id)
    // console.log('index', index)
    if (index === -1) {
      add(key, value)
    } else {
      updateItem(key, value)
    }
  }

  return { userData, add, remove, updateList, updateItem, updateOrCreateItem }
}
