<template>
  <li :class="itemClass">
    <label>
      <input type="checkbox" v-model="isMarked" />
      <span>{{ item.name }}</span>
    </label>
  </li>
</template>

<script setup lang="ts" generic="DT extends DataType">
import { computed } from 'vue'
import type { DataItem, DataType } from '@/models/data'

const props = defineProps<{
  item: DataItem<DT>
}>()

const isMarked = defineModel()

const itemClass = computed(() => ({
  'is-marked': isMarked.value,
  'is-new-austin': props.item.isNewAustin
}))
</script>
