<script setup lang="ts">
import EmailAccountItem from '@/components/EmailAccountItem.vue'
import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref } from 'vue'

const email_accounts = ref()

onMounted(async () => {
  email_accounts.value = (await supabase.from('email_accounts').select()).data
  console.log(email_accounts.value)
})
</script>

<template>
  <div class="flex flex-col flex-1 p-6 gap-y-6 bg-stone-100">
    <h1 class="text-3xl font-bold">Connected Email Accounts</h1>
    <div class="flex flex-col gap-y-2" v-if="email_accounts?.length > 0">
      <EmailAccountItem
        v-for="email_account in email_accounts"
        :key="email_account.id"
        :email="email_account.email"
        :provider="email_account.provider"
      />
    </div>
    <span v-else> No account connected. Connect an account to start using FindMyAccs! </span>
    <div
      class="bg-stone-200 flex items-center justify-between gap-y-2 p-4 rounded-xl border border-stone-300"
    >
      <span class="font-medium text-xl">Add Email Account</span>
      <div class="flex gap-x-4">
        <button
          class="bg-stone-100 hover:bg-stone-200 border border-stone-400 flex gap-x-2 p-3 rounded-xl cursor-pointer transition-colors"
        >
          <img src="/src/assets/google.svg" height="24" width="24" />
          Connect with Google
        </button>
        <button
          class="bg-stone-100 hover:bg-stone-200 border border-stone-400 flex gap-x-2 p-3 rounded-xl cursor-pointer transition-colors"
        >
          <img src="/src/assets/microsoft.svg" height="24" width="24" />
          Connect with Microsoft
        </button>
      </div>
    </div>
  </div>
</template>
