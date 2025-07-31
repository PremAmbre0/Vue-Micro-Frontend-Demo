<template>
  <div id="app">
    <OToast />
    <nav>
      <router-link to="/">Shell Home</router-link>
      <router-link to="/demo-one">Demo One</router-link>
      <router-link to="/demo-two">Demo Two</router-link>
      <router-link to="/demo-three">Demo Three</router-link>
    </nav>

    <main>
      <!-- Shell app's own counter display -->
      <div class="shell-counter">
        <h2>Shell App Counter: {{ commonStore.num }}</h2>
        <div class="shell-info">
          <span>Double: {{ commonStore.doubleNum }}</span>
          <span>Status: {{ storeStatus }}</span>
        </div>
        <div class="shell-controls">
          <button @click="commonStore.decrement()">Shell Decrement</button>
          <button @click="commonStore.increment()">Shell Increment</button>
        </div>
      </div>

      <!-- Demo One Canvas component using Suspense -->
      <Suspense>
        <template #default>
          <DemoOneCanvas />
        </template>
        <template #fallback>
          <div class="loading">
            <div class="spinner"></div>
            <div>Loading Demo One Canvas...</div>
          </div>
        </template>
      </Suspense>

      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { defineAsyncComponent, computed } from 'vue';
import OToast from './components/demoComponents/OToast.vue';
import { useCommonStore } from './stores/common.store.js';

// Define async component with error handling
const DemoOneCanvas = defineAsyncComponent({
  loader: () => import('demoOneApp/DemoOneCanvas'),
  errorComponent: {
    template: `
      <div class="error-component">
        <h3>❌ Failed to load Demo One Canvas</h3>
        <p>Make sure demo-one-app is running on port 3001</p>
      </div>
    `,
  },
  loadingComponent: {
    template: `
      <div class="loading-component">
        <div class="spinner"></div>
        <div>Loading Demo One Canvas...</div>
      </div>
    `,
  },
  delay: 200,
  timeout: 10000,
});

// Setup store
const commonStore = useCommonStore();

// Computed status for shell display
const storeStatus = computed(() => {
  if (commonStore.isZero) return 'Zero';
  if (commonStore.isPositive) return 'Positive';
  if (commonStore.isNegative) return 'Negative';
  return 'Unknown';
});

// Log store changes for debugging
commonStore.$subscribe((mutation, state) => {
  console.log('🏪 Store changed:', {
    type: mutation.type,
    newValue: state.num,
    mutation,
  });
});
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav a {
  margin-right: 1rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

nav a.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

main {
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.shell-counter {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 25px;
  border-radius: 12px;
  margin: 20px 0;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(25, 118, 210, 0.2);
}

.shell-counter h2 {
  color: #1976d2;
  margin-bottom: 15px;
  font-size: 1.8em;
  font-weight: 600;
}

.shell-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.shell-info span {
  background: rgba(255, 255, 255, 0.8);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9em;
  color: #1976d2;
  font-weight: 500;
}

.shell-controls {
  margin-top: 20px;
}

.shell-controls button {
  margin: 0 10px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #1976d2, #1565c0);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.3);
}

.shell-controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

.shell-controls button:active {
  transform: translateY(0);
}

.loading,
.loading-component {
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-style: italic;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.error-component {
  text-align: center;
  padding: 40px;
  color: #ef4444;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 8px;
  margin: 20px 0;
}

.error-component h3 {
  margin-bottom: 10px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  main {
    padding: 0 1rem;
  }

  nav a {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.9em;
  }

  .shell-info {
    flex-direction: column;
    align-items: center;
  }

  .shell-controls button {
    margin: 5px;
    padding: 8px 16px;
  }
}
</style>
