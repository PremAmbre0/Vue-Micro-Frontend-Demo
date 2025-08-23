<template>
  <div id="app" class="shell-app">
    <nav class="shell-nav">
      <router-link to="/">🏠 Dynamic Canvas</router-link>
      <router-link to="/all-demos">🎨 All Demos</router-link>
      <router-link to="/demo-one">Demo One</router-link>
      <router-link to="/demo-two">Demo Two</router-link>
      <router-link to="/demo-three">Demo Three</router-link>
      <router-link to="/demo-counter">🔢 Demo Counter</router-link>
      <router-link to="/interface-demo">🔗 Interface Demo</router-link>
    </nav>
    
    <main class="shell-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style>
/* CSS Custom Properties for Theme */
:root {
  --primary-color: #0054C9;
  --light-color: #F0F8FF;
  --dark-color: #031F3C;
  --text-primary: #031F3C;
  --text-secondary: #4A5568;
  --text-light: #718096;
  --background-primary: #FFFFFF;
  --background-secondary: #F0F8FF;
  --background-tertiary: #F7FAFC;
  --border-color: #E2E8F0;
  --border-light: #EDF2F7;
  --shadow-sm: 0 1px 3px rgba(3, 31, 60, 0.1);
  --shadow-md: 0 4px 6px rgba(3, 31, 60, 0.1);
  --shadow-lg: 0 10px 15px rgba(3, 31, 60, 0.1);
  --shadow-xl: 0 20px 25px rgba(3, 31, 60, 0.1);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: var(--background-secondary);
  font-family: var(--font-family);
  color: var(--text-primary);
  line-height: 1.6;
}

.shell-app #shell-app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  min-height: 100vh;
  background: linear-gradient(135deg, var(--light-color) 0%, #FFFFFF 100%);
}

.shell-nav {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  padding: 1.5rem 2rem;
  margin-bottom: 0;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.shell-nav a {
  margin-right: 1rem;
  padding: 0.875rem 1.75rem;
  text-decoration: none;
  color: white;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.shell-nav a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.shell-nav a:hover::before {
  left: 100%;
}

.shell-nav a:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.shell-nav a.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.shell-main {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
}


/* Global Component Styles */
.loading,
.loading-component {
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
  font-style: italic;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: var(--background-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.error-component {
  text-align: center;
  padding: 2.5rem;
  color: #DC2626;
  background: linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%);
  border: 2px solid #FECACA;
  border-radius: var(--radius-lg);
  margin: 1.5rem 0;
  box-shadow: var(--shadow-md);
}

.error-component h3 {
  margin-bottom: 1rem;
  color: #B91C1C;
  font-weight: 600;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-light);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Shell App Professional Button Styles */
.shell-app .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.shell-app .btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.shell-app .btn:active {
  transform: translateY(0);
}

.shell-app .btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, #0041A3 100%);
  color: white;
}

.shell-app .btn-secondary {
  background: linear-gradient(135deg, var(--text-secondary) 0%, #2D3748 100%);
  color: white;
}

.shell-app .btn-success {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
}

.shell-app .btn-danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
}

.shell-app .btn-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: white;
}

.shell-app .btn-info {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: white;
}

/* Shell App Card Styles */
.shell-app .card {
  background: var(--background-primary);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.shell-app .card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Shell App Responsive Design */
@media (max-width: 1024px) {
  .shell-main {
    padding: 1.5rem;
  }

  .shell-nav {
    padding: 1.25rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .shell-main {
    padding: 1rem;
  }

  .shell-nav {
    padding: 1rem;
  }

  .shell-nav a {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }

  .shell-info {
    flex-direction: column;
    align-items: center;
  }

  .shell-controls button {
    margin: 0.5rem;
    padding: 0.75rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .shell-nav a {
    display: block;
    margin-right: 0;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .shell-main {
    padding: 0.75rem;
  }
}
</style>
