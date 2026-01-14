<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<template>
  <div class="flex flex-col items-center my-auto">
    <h1 class="text-3xl text-stone-900 font-black mb-12">{{ title }}</h1>
    <!-- Card -->
    <div class="flex flex-col items-center w-full max-w-120 bg-stone-100 p-8 rounded-xl">
      <slot></slot>
    </div>
  </div>
</template>
