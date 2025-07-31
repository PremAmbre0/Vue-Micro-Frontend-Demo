<script setup>
import DemoThreeCanvas from './components/DemoThreeCanvas.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1>🎯 Demo Three App - Interactive Canvas</h1>
      <p>Standalone Fabric.js demo for advanced interactions and object manipulation</p>
    </header>

    <main>
      <DemoThreeCanvas />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

header {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  margin-bottom: 2rem;
}

header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5em;
  font-weight: 600;
}

header p {
  margin: 0;
  font-size: 1.1em;
  opacity: 0.9;
}

main {
  padding: 0 1rem 2rem 1rem;
}
</style>
