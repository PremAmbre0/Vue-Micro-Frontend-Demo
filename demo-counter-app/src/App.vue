<template>
  <div id="app">
    <header>
      <h1>🔢 Demo Counter App</h1>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

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
  --font-family: "Inter", sans-serif;
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
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  min-height: 100vh;
  background: linear-gradient(135deg, var(--light-color) 0%, #FFFFFF 100%);
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--background-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
}

h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  /* background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%); */
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; */
}

p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
}

main {
  max-width: 800px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }

  header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>
