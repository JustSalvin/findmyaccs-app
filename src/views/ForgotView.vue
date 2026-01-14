<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import AuthForm from '@/components/auth/AuthForm.vue'
import AuthError from '@/components/auth/AuthError.vue'
import AuthFooter from '@/components/auth/AuthFooter.vue'

const email = ref('')
const errorMessage = ref('')

async function resetPassword() {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'http://tobeimplemented.com/update-password',
  })
  errorMessage.value = error?.message ?? ''
  console.log(data)
  console.log(error)
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <auth-form title="Reset your Password">
      <!-- Form -->
      <form id="form" class="w-full" @submit.prevent="resetPassword">
        <div class="flex flex-col mb-4">
          <label class="text-sm text-stone-800"> Email Address </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email Address"
            autocomplete="email"
            class="px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-teal-400"
          />
        </div>
      </form>

      <!-- Error -->
      <auth-error v-if="errorMessage" :error-message="errorMessage" />

      <!-- Button -->
      <button
        class="px-4 py-3 hover:bg-teal-600 transition-colors cursor-pointer text-lg font-medium rounded-xl w-full mt-4 text-stone-100 bg-teal-700"
        type="submit"
        form="form"
      >
        Reset Password
      </button>
    </auth-form>
    <auth-footer />
  </div>
</template>
