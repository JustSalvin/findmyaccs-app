<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  isActive: Boolean,
})
</script>

<template>
  <router-link
    :to="path"
    :class="
      isActive
        ? 'bg-teal-700 text-stone-100 cursor-default'
        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 cursor-pointer'
    "
    class="flex p-2 items-center gap-x-2 transition-colors rounded-xl"
  >
    <Icon :icon="icon" width="24" height="24" />
    <span>{{ name }}</span>
  </router-link>
</template>
