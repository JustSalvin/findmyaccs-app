<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import SidebarItem from '@/components/SidebarItem.vue'

const router = useRouter()
const route = useRoute()

async function signOut() {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="flex flex-col min-w-2xs border-r border-stone-200">
      <h1 class="flex items-center justify-center gap-x-2 font-bold text-2xl p-4 mt-2 text-center">
        <img src="/src/assets/logo.png" width="32" height="32" />
        <span>FindMyAccs</span>
      </h1>
      <ul class="flex flex-col p-4 gap-y-2">
        <SidebarItem
          name="Dashboard"
          path="/dashboard"
          icon="flowbite:home-outline"
          :is-active="route.path === '/dashboard'"
        />
        <SidebarItem
          name="Accounts"
          path="/accounts"
          icon="flowbite:users-outline"
          :is-active="route.path === '/accounts'"
        />
      </ul>
      <div class="mt-auto flex gap-x-2 p-2 border-t border-stone-200">
        <SidebarItem
          class="w-full"
          name="Settings"
          path="/settings"
          icon="flowbite:cog-outline"
          :is-active="route.path === '/settings'"
        />
        <button
          class="p-3 bg-stone-100 rounded-xl hover:bg-red-200 transition-colors cursor-pointer"
          @click="signOut"
        >
          <Icon icon="flowbite:arrow-left-to-bracket-outline" width="24" height="24" />
        </button>
      </div>
    </aside>
    <router-view />
  </div>
</template>
