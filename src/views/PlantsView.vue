<template>
  <label>
    No New Austin
    <input type="checkbox" v-model="noNewAustin" />
  </label>
  <label>
    Only New Austin
    <input type="checkbox" v-model="newAustin" />
  </label>
  <label>
    Not Completed
    <input type="checkbox" v-model="notCompleted" />
  </label>
  <ItemView
    :itemType="ITEM_TYPES.PLANT"
    :guards="[notCompleted, newAustin, noNewAustin]"
    :filterCondition="filterCondition"
  />
</template>

<script setup lang="ts">
import ItemView from '@/components/Item/ItemView.vue'
import { ITEM_TYPES, SPECIAL_ITEM_TYPES } from '@/models/data'

import { ref, watchEffect } from 'vue'

const notCompleted = ref(false)
const newAustin = ref(false)
const noNewAustin = ref(false)
// watchEffect(() => {
//   console.log(notCompleted.value)
// })

function filterCondition(item: any, guards?: boolean[]) {
  let value = true
  const isNotCompletedGuard = guards && guards[0]
  const isNewAustinGuard = guards && guards[1]
  const isNoNewAustinGuard = guards && guards[2]
  if (isNotCompletedGuard) {
    value = !item.trackerValues.isCollected
  }
  if (isNoNewAustinGuard) {
    value = value && item.locations.every((loc) => loc.state !== SPECIAL_ITEM_TYPES.NEW_AUSTIN)
  } else if (isNewAustinGuard) {
    value = value && item.locations.some((loc) => loc.state === SPECIAL_ITEM_TYPES.NEW_AUSTIN)
  }

  return value
}
</script>
