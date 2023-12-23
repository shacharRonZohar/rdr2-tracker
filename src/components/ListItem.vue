<template>
  <li>
    <div class="details">
      {{ item.id }}
      <span>{{ item.name }}</span>
      <ItemIcon :itemType="itemType" />
      <ItemIcon v-if="isNewAustin" :item-type="SPECIAL_ITEM_TYPES.NEW_AUSTIN" />
    </div>
    <ItemTracker
      :itemType="itemType"
      :item="item"
      :objectives="ITEM_TYPE_OBJECTIVE_MAP[itemType]"
      @update="onUpdateTrackerValues"
    />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ItemIcon from '@/components/Item/ItemIcon.vue'
import ItemTracker from './Item/ItemTracker.vue'
import {
  SPECIAL_ITEM_TYPES,
  ITEM_TYPE_OBJECTIVE_MAP,
  type DataItem,
  type ITEM_TYPES,
  type TrackerValues
} from '@/models/data'

const props = defineProps<{
  itemType: ITEM_TYPES
  item: DataItem<ITEM_TYPES>
}>()

const emit = defineEmits<{
  update: [id: number, value: TrackerValues[ITEM_TYPES]]
}>()

function onUpdateTrackerValues(id: number, value: TrackerValues[ITEM_TYPES]) {
  emit('update', id, value)
}

const isNewAustin = computed(() => {
  return props.item.locations.every((location, idx) => location.state === 'new-austin')
})
</script>
