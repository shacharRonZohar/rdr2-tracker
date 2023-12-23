<template>
  <ItemView :itemType="ITEM_TYPES.LEGENDARY_ANIMAL" />
</template>

<script setup lang="ts">
import ItemView from '@/components/Item/ItemView.vue'
import { ITEM_TYPES } from '@/models/data'
</script>
