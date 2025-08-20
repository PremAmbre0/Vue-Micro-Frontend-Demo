<template>
  <div id="app">
    <nav>
      <router-link to="/">🏠 Dynamic Canvas</router-link>
      <router-link to="/all-demos">🎨 All Demos</router-link>
      <router-link to="/demo-one">Demo One</router-link>
      <router-link to="/demo-two">Demo Two</router-link>
      <router-link to="/demo-three">Demo Three</router-link>
      <router-link to="/demo-counter">🔢 Demo Counter</router-link>
      <router-link to="/interface-demo">🔗 Interface Demo</router-link>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
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
  background: linear-gradient(135deg, #0054C9 0%, #031F3C 100%);
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
  border-top: 4px solid #0054C9;
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
