<script setup>
import DemoTwoCanvas from './components/DemoTwoCanvas.vue'
</script>

<template>
  <div>
    <header class="demo-header">
      <h1><span class="material-icons">edit_note</span> Demo Two App - Text & Image Editor</h1>
      <p>Standalone Fabric.js demo for text and image manipulation</p>
    </header>
    <main>
      
      <DemoTwoCanvas />
    </main>
  </div>
</template>

<style>
/* Import theme variables */
:root {
  --primary-color: #0054C9;
  --secondary-color: #6AAAEB;
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
  /* background: var(--background-secondary); */
  font-family: var(--font-family);
}

#app {
  min-height: 100vh;
  /* background: linear-gradient(135deg, var(--light-color) 0%, #FFFFFF 100%); */
  font-family: var(--font-family);
  color: var(--text-primary);
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
}

.demo-header h1 {
  color: #0054c9;
  margin-bottom: 10px;
  font-size: 2.5em;
  font-weight: 700;
}

.demo-header h1 .material-icons{
  font-size: 3rem;
  vertical-align: middle;
  padding-bottom: 8px;
}

.demo-header p {
  color: #495057;
  font-size: 1.2em;
}

/* header {
  text-align: center;
  margin: 3rem 0;
  padding: 2rem;
  background: var(--background-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  border-top: 4px solid var(--primary-color);
  position: relative;
  overflow: hidden;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

header h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--primary-color);
}

header p {
  margin: 0;
  font-size: 1.25rem;
  opacity: 0.95;
  font-weight: 400;
  position: relative;
  z-index: 1;
} */

main {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  header {
    padding: 2rem 1rem;
  }

  header h1 {
    font-size: 2.25rem;
  }

  header p {
    font-size: 1.1rem;
  }

  main {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  header {
    padding: 1.5rem 1rem;
  }

  header h1 {
    font-size: 1.875rem;
  }

  header p {
    font-size: 1rem;
  }

  main {
    padding: 1rem;
  }
}
</style>
