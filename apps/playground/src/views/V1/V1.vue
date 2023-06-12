<script setup lang="ts">
import TestUnRender from '@/components/TestUnRender.vue'
</script>

<template>
  <TestUnRender v-slot="bindSlot">
    <div>
      {{ bindSlot.a }}
    </div>
    <div>
      {{ bindSlot.b }}
    </div>
  </TestUnRender>
</template>

<style scoped></style>
