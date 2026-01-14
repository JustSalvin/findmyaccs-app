<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  name: String,
  url: String,
  emails: Number,
})
</script>

<template>
  <div
    class="flex justify-between items-center bg-stone-200 p-2 pl-4 rounded-xl border border-stone-300"
  >
    <div class="flex flex-col">
      <span class="font-bold">{{ name }}</span>
      <span class="text-sm text-stone-600">{{ emails }} emails</span>
    </div>
    <a
      :href="url"
      class="flex gap-x-2 p-3 border border-stone-400 cursor-pointer hover:text-stone-100 hover:bg-teal-700 transition-colors rounded-xl"
    >
      <span>Visit</span>
      <Icon icon="flowbite:arrow-right-to-bracket-outline" width="24" height="24" />
    </a>
  </div>
</template>
