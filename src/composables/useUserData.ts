import type { DataItem, ItemType, WithId } from '@/models/data'
import { useStorage } from '@vueuse/core'
import { watch } from 'vue'
import plants from '@/assets/data/plants.json'
import animals from '@/assets/data/animals.json'
export function useUserData() {
  const initialUserData = {
    plant: plants.map((plant) => ({
      ...plant,
      trackerValues: {
        isCollected: false
      }
    })),
    animal: animals.map((animal) => ({
      ...animal,
      trackerValues: {
        // animalTracking: {
        isTracked: false,
        isKilled: false,
        isSkinned: false,
        isPerfectSkinned: false,
        isStudied: false
        // }
      }
    }))
  }

  const { value: userData } = useStorage('userData', initialUserData)

  function add(key: keyof typeof initialUserData, value: DataItem<ItemType>) {
    userData[key].push(value)
  }

  function remove(key: keyof typeof initialUserData, value: DataItem<ItemType>) {
    userData[key] = userData[key].filter((item) => item !== value)
  }

  function updateList(key: keyof typeof initialUserData, value: DataItem<ItemType>[]) {
    userData[key] = value
  }

  function updateItem(key: keyof typeof initialUserData, value: DataItem<ItemType>) {
    const index = userData[key].findIndex((item) => item.id === value.id)
    if (index === -1) return
    const newData = userData[key]
    newData[index] = value
    userData[key] = newData
  }

  function updateOrCreateItem(key: keyof typeof initialUserData, value: DataItem<ItemType>) {
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
