<template>
  <input type="text" v-model="filterName" />
  <ItemView :itemType="ITEM_TYPES.ANIMAL" :filterCondition="filterCondition" />
  <ItemView :itemType="ITEM_TYPES.PLANT" :filterCondition="filterCondition" />
  <ItemView :itemType="ITEM_TYPES.LEGENDARY_ANIMAL" :filterCondition="filterCondition" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ITEM_TYPES } from '@/models/data'
import ItemView from '@/components/Item/ItemView.vue'
const filterName = ref('')

function filterCondition(item: any) {
  return item.name.toLowerCase().includes(filterName.value.toLowerCase())
}
</script>
