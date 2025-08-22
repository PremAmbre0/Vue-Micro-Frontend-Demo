<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'

// Import demo logic from all three apps
let demoOneLogic = null
let demoTwoLogic = null
let demoThreeLogic = null

const shellCanvas = ref(null)

// Define async components for each demo
const DemoOneCanvas = defineAsyncComponent({
  loader: () => import('demoOneApp/DemoOneCanvas'),
  errorComponent: {
    template: '<div class="error">❌ Failed to load Demo One</div>'
  }
})

const DemoTwoCanvas = defineAsyncComponent({
  loader: () => import('demoTwoApp/DemoTwoCanvas'),
  errorComponent: {
    template: '<div class="error">❌ Failed to load Demo Two</div>'
  }
})

const DemoThreeCanvas = defineAsyncComponent({
  loader: () => import('demoThreeApp/DemoThreeCanvas'),
  errorComponent: {
    template: '<div class="error">❌ Failed to load Demo Three</div>'
  }
})

onMounted(async () => {
  // Load demo logic for shell canvas
  try {
    demoOneLogic = await import('demoOneApp/demoOneLogic')
    console.log('✅ Demo One logic loaded')
  } catch (error) {
    console.error('❌ Failed to load Demo One logic:', error)
  }

  try {
    demoTwoLogic = await import('demoTwoApp/demoTwoLogic')
    console.log('✅ Demo Two logic loaded')
  } catch (error) {
    console.error('❌ Failed to load Demo Two logic:', error)
  }

  try {
    demoThreeLogic = await import('demoThreeApp/demoThreeLogic')
    console.log('✅ Demo Three logic loaded')
  } catch (error) {
    console.error('❌ Failed to load Demo Three logic:', error)
  }
})

// Methods to test demo logic on shell canvas
const testDemoOne = () => {
  if (demoOneLogic && shellCanvas.value) {
    // Initialize shell canvas with demo one logic
    const canvas = demoOneLogic.initDemoOneCanvas('shell-canvas')
    demoOneLogic.addRectangle(canvas, { fill: '#42b883' })
    demoOneLogic.addCircle(canvas, { fill: '#3b82f6' })
    demoOneLogic.addTriangle(canvas, { fill: '#ef4444' })
  }
}
</script>

<template>
  <div class="home-page-wrapper">
    <h1>🎨 Micro Frontend Fabric.js Demos</h1>
    <p>Explore Fabric.js integration across micro frontends</p>

    <div class="demo-grid">
      <!-- Demo One Preview -->
      <div class="demo-card">
        <h3>🟦 Demo One: Basic Shapes</h3>
        <p>Create and manipulate basic shapes with Fabric.js</p>
        <div class="demo-preview">
          <Suspense>
            <template #default>
              <DemoOneCanvas />
            </template>
            <template #fallback>
              <div class="loading">Loading Demo One...</div>
            </template>
          </Suspense>
        </div>
        <router-link to="/demo-one" class="demo-link">View Full Demo</router-link>
      </div>

      <!-- Demo Two Preview -->
      <div class="demo-card">
        <h3>📝 Demo Two: Text & Images</h3>
        <p>Add and edit text with image manipulation</p>
        <div class="demo-preview">
          <Suspense>
            <template #default>
              <DemoTwoCanvas />
            </template>
            <template #fallback>
              <div class="loading">Loading Demo Two...</div>
            </template>
          </Suspense>
        </div>
        <router-link to="/demo-two" class="demo-link">View Full Demo</router-link>
      </div>

      <!-- Demo Three Preview -->
      <div class="demo-card">
        <h3>🎯 Demo Three: Interactive Canvas</h3>
        <p>Advanced interactions and object manipulation</p>
        <div class="demo-preview">
          <Suspense>
            <template #default>
              <DemoThreeCanvas />
            </template>
            <template #fallback>
              <div class="loading">Loading Demo Three...</div>
            </template>
          </Suspense>
        </div>
        <router-link to="/demo-three" class="demo-link">View Full Demo</router-link>
      </div>
    </div>

    <!-- Shell Canvas Demo -->
    <div class="shell-demo">
      <h2>🏠 Shell App Canvas</h2>
      <p>This canvas uses imported logic from the demo apps</p>
      <div class="shell-controls">
        <button @click="testDemoOne" class="btn btn-primary">Test Demo One Logic</button>
        <button class="btn btn-success">Test Demo Two Logic</button>
        <button class="btn btn-danger">Test Demo Three Logic</button>
      </div>
      <div class="canvas-container">
        <canvas id="shell-canvas" ref="shellCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page-wrapper {
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--light-color) 0%, #FFFFFF 100%);
  min-height: calc(100vh - 120px);

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding: 3rem 2rem 0;
  }

  > p {
    text-align: center;
    margin-bottom: 4rem;
    color: var(--text-secondary);
    font-size: 1.25rem;
    font-weight: 400;
    padding: 0 2rem;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 2.5rem;
    margin-bottom: 4rem;
    padding: 0 2rem;
  }

  .demo-card {
    background: var(--background-primary);
    border-radius: var(--radius-xl);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-light);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .demo-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
  }

  .demo-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }

  .demo-card h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .demo-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .demo-preview {
    height: 320px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    margin-bottom: 1.5rem;
    overflow: hidden;
    background: var(--background-tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .demo-preview .loading {
    color: var(--text-light);
    font-style: italic;
    font-size: 1.1rem;
  }

  .demo-preview .error {
    color: #EF4444;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .demo-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
    color: white;
    text-decoration: none;
    border-radius: var(--radius-lg);
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    text-align: center;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
  }

  .demo-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .demo-link:hover::before {
    left: 100%;
  }

  .demo-link:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .shell-demo {
    background: linear-gradient(135deg, var(--background-primary) 0%, var(--background-secondary) 100%);
    border-radius: var(--radius-xl);
    padding: 3rem 2rem;
    text-align: center;
    border: 1px solid var(--border-light);
    box-shadow: var(--shadow-lg);
    margin: 0 2rem 2rem;
    position: relative;
  }

  .shell-demo::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }

  .shell-demo h2 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .shell-demo p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .shell-controls {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .shell-demo .btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
  }

  .shell-demo .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .shell-demo .btn:hover::before {
    left: 100%;
  }

  .shell-demo .btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .shell-demo .btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
    color: white;
  }

  .shell-demo .btn-success {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
  }

  .shell-demo .btn-danger {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    color: white;
  }

  .canvas-container {
    background: var(--background-primary);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    border: 2px solid var(--border-color);
    display: inline-block;
    box-shadow: var(--shadow-sm);
  }

  .canvas-container #shell-canvas {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .home-page-wrapper .demo-grid {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2rem;
  }

  .home-page-wrapper h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .home-page-wrapper {
    .demo-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 0 1rem;
    }

    h1 {
      font-size: 2rem;
      padding: 2rem 1rem 0;
    }

    > p {
      font-size: 1.1rem;
      padding: 0 1rem;
      margin-bottom: 3rem;
    }

    .shell-demo {
      margin: 0 1rem 2rem;
      padding: 2rem 1rem;
    }

    .shell-controls {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .shell-demo .btn {
      width: 100%;
      max-width: 280px;
    }
  }
}

@media (max-width: 480px) {
  .home-page-wrapper {
    .demo-grid {
      padding: 0 0.75rem;
    }

    h1 {
      font-size: 1.75rem;
      padding: 1.5rem 0.75rem 0;
    }

    > p {
      font-size: 1rem;
      padding: 0 0.75rem;
    }

    .demo-card {
      padding: 1.5rem;
    }

    .shell-demo {
      margin: 0 0.75rem 1.5rem;
      padding: 1.5rem 1rem;
    }

    .shell-demo h2 {
      font-size: 1.5rem;
    }
  }
}
</style>