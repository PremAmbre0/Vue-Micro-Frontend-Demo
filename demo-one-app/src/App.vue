<script setup>
import DemoOneCanvas from './components/DemoOneCanvas.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1>🎨 Demo One App - Basic Shapes & Drawings</h1>
      <p>Standalone Fabric.js demo for basic shape creation and manipulation</p>
    </header>
    <main>
      <DemoOneCanvas />
    </main>
  </div>
</template>

<style scoped>
/* Import theme variables */
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
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--light-color) 0%, #FFFFFF 100%);
  font-family: var(--font-family);
  color: var(--text-primary);
}

header {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  color: white;
  margin-bottom: 0;
  box-shadow: var(--shadow-lg);
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
  font-size: 3rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header p {
  margin: 0;
  font-size: 1.25rem;
  opacity: 0.95;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

main {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

</style>
