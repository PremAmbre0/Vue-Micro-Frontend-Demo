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

<style scoped lang="scss">
.home-page-wrapper {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: #42b883;
    font-size: 2.5em;
  }

  > p {
    text-align: center;
    margin-bottom: 3rem;
    color: #666;
    font-size: 1.2em;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .demo-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 1.3em;
    }

    p {
      color: #6b7280;
      margin-bottom: 1rem;
      font-size: 0.95em;
    }

    .demo-preview {
      height: 300px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 1rem;
      overflow: hidden;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;

      .loading {
        color: #6b7280;
        font-style: italic;
      }

      .error {
        color: #ef4444;
        font-weight: 500;
      }
    }

    .demo-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #42b883, #369970);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s ease;
      width: 100%;
      text-align: center;

      &:hover {
        background: linear-gradient(135deg, #369970, #2d7a5f);
        transform: translateY(-1px);
      }
    }
  }

  .shell-demo {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    border: 2px solid #dee2e6;

    h2 {
      color: #495057;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6c757d;
      margin-bottom: 1.5rem;
    }

    .shell-controls {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      &.btn-primary {
        background: linear-gradient(135deg, #42b883, #369970);
        color: white;
      }

      &.btn-success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
      }

      &.btn-danger {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
      }
    }

    .canvas-container {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      border: 2px solid #dee2e6;
      display: inline-block;

      #shell-canvas {
        border: 1px solid #ced4da;
        border-radius: 4px;
      }
    }
  }
}

@media (max-width: 768px) {
  .home-page-wrapper {
    padding: 1rem;

    .demo-grid {
      grid-template-columns: 1fr;
    }

    .shell-controls {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>