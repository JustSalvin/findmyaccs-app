<script setup lang="ts">
import AccountItem from '@/components/AccountItem.vue'
import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref } from 'vue'

const email_accounts = ref()
const accounts = ref()

onMounted(async () => {
  email_accounts.value = (await supabase.from('email_accounts').select()).data
  accounts.value = (await supabase.from('accounts').select()).data
})
</script>

<template>
  <div class="flex flex-col flex-1 bg-stone-100">
    <!-- Header -->
    <div class="p-4 border-b border-stone-200 flex items-center justify-between">
      <div class="flex gap-x-3 items-center">
        <span class="font-medium text-lg">Accounts found</span>
        <span class="bg-teal-700 text-stone-100 rounded-xl px-2 py-0.5">483</span>
      </div>
      <div class="flex gap-x-4 items-center">
        <div class="flex items-center">
          <span>4738</span>
          <span class="text-stone-600">/5993 emails</span>
        </div>
        <span class="text-teal-700 font-bold">93%</span>
      </div>
    </div>

    <!-- Accounts -->
    <div v-if="email_accounts?.length > 0" class="p-6 flex flex-col gap-y-2">
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :name="account.name"
        :url="account.url"
        :emails="account.email_count"
      />
    </div>
    <div v-else class="my-auto flex flex-col items-center gap-y-4 font-medium">
      <p>You haven't connected any account yet.</p>
      <router-link
        to="/accounts"
        class="p-3 bg-teal-700 rounded-xl text-stone-100 cursor-pointer transition-colors hover:bg-teal-800"
        >Connect an Account</router-link
      >
    </div>
  </div>
</template>
