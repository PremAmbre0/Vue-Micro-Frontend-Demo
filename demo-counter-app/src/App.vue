<template>
  <div id="app">
    <header>
      <h1>Demo Counter App</h1>
      <p>Micro Frontend demonstrating shared state with Shell App</p>
    </header>
    
    <main>
      <CounterDemo />
    </main>
  </div>
</template>

<script>
import CounterDemo from './components/CounterDemo.vue'

export default {
  name: 'App',
  components: {
    CounterDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
}

header {
  margin-bottom: 30px;
}

h1 {
  color: #42b883;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 14px;
}
</style>
