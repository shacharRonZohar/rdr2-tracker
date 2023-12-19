import type { WithId } from '@/models/data'
import { ref, type MaybeRef, computed } from 'vue'

export interface useItemsInArratParams<T> {
  array: MaybeRef<T[]>
  items: MaybeRef<number[]>
}

export function useItemsInArray<T extends WithId>({ array, items }: useItemsInArratParams<T>) {
  const arrRef = ref(array)
  const itemsRef = ref(items)
  const itemsInArray = computed(() => {
    console.log('itemsInArray computed')
    return arrRef.value
      .filter((item) => itemsRef.value.some((i) => i === item.id))
      .map((item) => item.id)
  })

  return { itemsInArray }
}
