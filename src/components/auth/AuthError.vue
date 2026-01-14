<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  errorMessage: String,
})
</script>

<template>
  <div class="flex gap-x-2 mt-4 bg-stone-200 p-2 rounded-xl w-full">
    <Icon
      icon="flowbite:close-circle-outline"
      class="text-red-700 shrink-0"
      width="24"
      height="24"
    />
    <p>{{ errorMessage }}</p>
  </div>
</template>
