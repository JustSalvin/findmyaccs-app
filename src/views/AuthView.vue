<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import AuthForm from '@/components/auth/AuthForm.vue'
import AuthFooter from '@/components/auth/AuthFooter.vue'
import AuthError from '@/components/auth/AuthError.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const route = useRoute()
const router = useRouter()
const isSignup = computed(() => route.name === 'Signup')

async function auth() {
  errorMessage.value = ''

  const { error } = isSignup.value
    ? await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
    : await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

  if (error) {
    errorMessage.value = error.message
    console.error(error)
    return
  }

  router.push('/dashboard')
}

watch(route, async () => {
  errorMessage.value = ''
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <auth-form title="Start using FindMyAccs">
      <!-- Slider -->
      <div class="flex rounded-xl font-medium mb-8">
        <router-link
          to="/login"
          class="rounded-l-xl border border-r-0 border-stone-300 px-4 py-2 cursor-pointer transition-colors"
          :class="
            !isSignup ? 'bg-teal-700 shadow text-stone-100' : 'bg-neutral-200 hover:bg-stone-300'
          "
          >Log In</router-link
        >
        <router-link
          to="/signup"
          class="rounded-r-xl border border-l-0 border-stone-300 px-4 py-2 cursor-pointer transition-colors"
          :class="
            isSignup ? 'bg-teal-700 shadow text-stone-100' : 'bg-neutral-200 hover:bg-stone-300'
          "
          >Sign Up</router-link
        >
      </div>

      <!-- Form -->
      <form id="form" class="w-full" @submit.prevent="auth">
        <div class="flex flex-col mb-4">
          <label class="text-sm"> Email Address </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email Address"
            autocomplete="email"
            class="px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-teal-400"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm"> Password </label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Password"
            :autocomplete="isSignup ? 'new-password' : 'current-password'"
            class="px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-teal-400"
          />
        </div>
      </form>

      <!-- Forgot -->
      <router-link
        v-if="!isSignup"
        to="/forgot"
        class="w-full mt-1 text-sm text-stone-500 cursor-pointer hover:text-stone-600 transition-colors"
      >
        Forgot password?
      </router-link>

      <!-- Error -->
      <auth-error v-if="errorMessage" :error-message="errorMessage" />

      <!-- Button -->
      <button
        class="px-4 py-3 hover:bg-teal-600 transition-colors cursor-pointer text-lg font-medium rounded-xl w-full mt-4 text-stone-100 bg-teal-700"
        type="submit"
        form="form"
      >
        {{ isSignup ? 'Sign Up' : 'Log In' }}
      </button>
    </auth-form>
    <auth-footer />
  </div>
</template>
