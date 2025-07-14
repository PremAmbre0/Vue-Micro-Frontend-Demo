<template>
  <div v-if="hasError" class="error-boundary">
    <h3>Something went wrong</h3>
    <p>{{ errorMessage }}</p>
    <button @click="retry" class="retry-button">Try Again</button>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((error, instance, info) => {
  console.error('Error captured by boundary:', error, info)
  hasError.value = true
  errorMessage.value = error.message || 'An unexpected error occurred'
  
  // Prevent the error from propagating further
  return false
})

const retry = () => {
  hasError.value = false
  errorMessage.value = ''
}
</script>

<style scoped>
.error-boundary {
  padding: 1rem;
  border: 1px solid #ff6b6b;
  border-radius: 8px;
  background-color: #ffe0e0;
  color: #d63031;
  text-align: center;
}

.retry-button {
  background-color: #0984e3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.retry-button:hover {
  background-color: #0770c4;
}
</style>
