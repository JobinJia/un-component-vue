<script setup lang="ts">
import { ref } from 'vue'

interface SlotBind {
  a: number
  b: string
}
const slotBind = ref<SlotBind>({
  a: 1,
  b: 'aaa',
})

defineSlots<{
  'default': (slotdBind: SlotBind) => any
}>()
</script>

<template>
  <slot name="default" v-bind="slotBind" />
</template>

<style scoped>
</style>
