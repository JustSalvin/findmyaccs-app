<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  // Maybe it would be better to just save in the DB a direct favicon URL
  provider: String,
  email: String,
})
</script>

<template>
  <div
    class="p-2 flex justify-between items-center bg-stone-200 border-stone-300 border rounded-xl"
  >
    <div class="flex items-center gap-x-2">
      <img :src="provider + '/favicon.ico'" height="32" width="32" />
      <span>
        {{ email }}
      </span>
    </div>
    <button
      class="border gap-x-2 flex items-center border-stone-400 cursor-pointer transition-colors p-3 rounded-xl hover:text-stone-100 hover:bg-red-700"
    >
      <span>Remove</span>
      <Icon icon="flowbite:trash-bin-outline" width="24" height="24" />
    </button>
  </div>
</template>
