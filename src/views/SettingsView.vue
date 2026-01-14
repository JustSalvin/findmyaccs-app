<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const new_password = ref('')
const confirm_new_password = ref('')
const passwordMismatch = ref(false)

async function updatePassword() {
  if (new_password.value !== confirm_new_password.value) {
    passwordMismatch.value = true
    return
  }
  await supabase.auth.updateUser({ password: new_password.value })
}
</script>

<template>
  <div class="flex flex-col flex-1 bg-stone-100 gap-y-6 p-6">
    <h1 class="text-3xl font-bold">Account Settings</h1>
    <div class="bg-stone-200 gap-y-4 flex flex-col rounded-xl p-4 border border-stone-300">
      <h3 class="text-lg font-medium">Change Password</h3>
      <form id="form" class="flex flex-col gap-y-2" @submit.prevent="updatePassword">
        <div class="flex flex-col gap-y-1">
          <label class="text-sm text-stone-600">New Password</label>
          <input
            v-model="new_password"
            type="password"
            required
            placeholder="Password"
            autocomplete="new-password"
            class="px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-teal-400"
          />
        </div>
        <div class="flex flex-col gap-y-1">
          <label class="text-sm text-stone-600">Confirm New Password</label>
          <input
            v-model="confirm_new_password"
            type="password"
            required
            placeholder="Password"
            autocomplete="new-password"
            class="px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-teal-400"
          />
        </div>
      </form>
      <div v-if="passwordMismatch" class="flex gap-x-2 bg-stone-300 p-2 rounded-xl">
        <Icon
          icon="flowbite:close-circle-outline"
          class="text-red-700 shrink-0"
          width="24"
          height="24"
        />
        <p>Passwords must match</p>
      </div>
      <button
        form="form"
        type="submit"
        :disabled="!new_password || !confirm_new_password"
        class="p-3 disabled:bg-stone-300 mt-2 disabled:cursor-default disabled:text-stone-400 bg-teal-700 cursor-pointer hover:bg-teal-800 transition-colors text-stone-100 rounded-xl max-w-3xs"
      >
        Change Password
      </button>
    </div>
    <div class="bg-stone-200 gap-y-4 flex flex-col rounded-xl p-4 border border-stone-300">
      <h3 class="text-lg font-medium">Delete Account</h3>
      <p class="text-stone-800">
        By pressing this button, you will delete your account and ALL YOUR DATA stored on
        FindMyAccs, and you will be logged out.
      </p>
      <button
        class="p-3 bg-red-700 transition-colors hover:bg-red-800 rounded-xl text-stone-100 cursor-pointer max-w-3xs"
      >
        Delete Account
      </button>
    </div>
  </div>
</template>
