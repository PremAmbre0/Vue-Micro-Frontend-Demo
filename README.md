# 🎨 Micro Frontend Canvas Architecture with Vite + Vue 3 + Module Federation

A comprehensive demonstration of **Micro Frontend Architecture** using **Vite**, **Vue 3**, **Module Federation**, and **Fabric.js**. This repository showcases how to build scalable, independent micro frontends with shared canvas functionality, dynamic module loading, and real-time interactive demonstrations.

## 🏗️ Architecture Overview

This project consists of **five independent applications** that work together to demonstrate advanced micro frontend capabilities:

- **🏠 Shell App** (`shell-app/`) - The host application that orchestrates all micro frontends
- **🎨 Demo One App** (`demo-one-app/`) - Basic shapes and geometry micro frontend
- **📝 Demo Two App** (`demo-two-app/`) - Text and image editing micro frontend
- **🖌️ Demo Three App** (`demo-three-app/`) - Drawing and artistic creation micro frontend
- **🔢 Demo Counter App** (`demo-counter-app/`) - State management and interface communication demo

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              🏠 Shell App (Host)                                │
│                            Port 3000 - Main Orchestrator                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │  🎯 Features:                                                           │    │
│  │  • Dynamic Canvas with shared Fabric.js instance                       │    │
│  │  • On-demand module loading and control                                │    │
│  │  • All Demos showcase page                                             │    │
│  │  • Global canvas controls (clear all, delete selected)                 │    │
│  │  • Navigation and routing system                                       │    │
│  │  • Pinia store for shared state management                             │    │
│  │  • Interface communication system                                      │    │
│  │                                                                         │    │
│  │  🔗 Consumes:                                                           │    │
│  │  • demoOneApp/demoOneLogic (Shape creation functions)                  │    │
│  │  • demoTwoApp/demoTwoLogic (Text & image functions)                    │    │
│  │  • demoThreeApp/demoThreeLogic (Drawing functions)                     │    │
│  │  • demoOneApp/DemoOneCanvas (Complete component)                       │    │
│  │  • demoTwoApp/DemoTwoCanvas (Complete component)                       │    │
│  │  • demoThreeApp/DemoThreeCanvas (Complete component)                   │    │
│  │  • demoCounterApp/CounterDemo (State management demo)                  │    │
│  │                                                                         │    │
│  │  📤 Exposes:                                                            │    │
│  │  • shellApp/shellFabric (Canvas initialization utilities)              │    │
│  │  • shellApp/interfaces (State management interfaces)                   │    │
│  │  • shellApp/counterInterface (Counter-specific interface)              │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┬───────────────────┐
                    ▼                   ▼                   ▼                   ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│    🎨 Demo One App      │ │    📝 Demo Two App      │ │   🖌️ Demo Three App     │ │   🔢 Demo Counter App   │
│     Port 3001           │ │     Port 3002           │ │     Port 3003           │ │     Port 3004           │
│                         │ │                         │ │                         │ │                         │
│  📤 Exposes:            │ │  📤 Exposes:            │ │  📤 Exposes:            │ │  📤 Exposes:            │
│  • ./demoOneLogic      │ │  • ./demoTwoLogic      │ │  • ./demoThreeLogic    │ │  • ./CounterDemo       │
│    - addRectangle()    │ │    - addText()         │ │    - setDrawingMode()  │ │    (Full component)    │
│    - addCircle()       │ │    - addImage()        │ │    - setBrushWidth()   │ │                        │
│    - addTriangle()     │ │    - clearCanvas()     │ │    - setBrushColor()   │ │  🔗 Uses:              │
│    - clearCanvas()     │ │                        │ │    - clearCanvas()     │ │  • shellApp/interfaces │
│                        │ │  • ./DemoTwoCanvas     │ │                        │ │    (State management)  │
│  • ./DemoOneCanvas     │ │    (Full component)    │ │  • ./DemoThreeCanvas   │ │                        │
│    (Full component)    │ │                        │ │    (Full component)    │ │  🎯 Features:          │
│                        │ │  🔗 Uses:              │ │                        │ │  • Counter interface   │
│  🎯 Features:          │ │  • Fabric.js v5.3.0   │ │  🎯 Features:          │ │  • Real-time sync      │
│  • Basic shapes        │ │  • Image loading       │ │  • Free-hand drawing   │ │  • State subscription  │
│  • Color selection     │ │  • Text manipulation   │ │  • Brush customization │ │  • Interface demo      │
│  • Object manipulation │ │  • Canvas controls     │ │  • Drawing modes       │ │  • Activity logging    │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (Required for Vite 4+ and modern ES modules)
- **npm** or **yarn**
- **Modern browser** with ES2020+ support

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd mco-test-latest

# Install dependencies for all applications
npm run install-all

# Start all applications in development mode
npm run dev
```

This will start all five applications simultaneously:
- **🏠 Shell App**: Port 3000 (Main application)
- **🎨 Demo One**: Port 3001 (Basic shapes)
- **📝 Demo Two**: Port 3002 (Text & images)
- **🖌️ Demo Three**: Port 3003 (Drawing)
- **🔢 Demo Counter**: Port 3004 (State management demo)

All URLs and ports are now centrally managed through environment variables in `.env.local` for development and `.env.production` for production builds.

### 🌐 Application Routes

**Shell App (Port 3000):**
- **`/`** - Dynamic Canvas (Landing page with on-demand loading)
- **`/all-demos`** - All Demos Showcase (Complete feature demonstration)
- **`/demo-one`** - Individual Demo One page
- **`/demo-two`** - Individual Demo Two page
- **`/demo-three`** - Individual Demo Three page
- **`/demo-counter`** - Individual Demo Counter page
- **`/interface-demo`** - Interface Communication Demo (Shell + Counter interaction)

**Individual Demo Apps:**
- **Demo One**: Port 3001 (Standalone shapes demo)
- **Demo Two**: Port 3002 (Standalone text/image demo)
- **Demo Three**: Port 3003 (Standalone drawing demo)
- **Demo Counter**: Port 3004 (Standalone state management demo)

### Build Commands

```bash
# Development build (uses .env.local)
npm run build

# Production build - all apps (uses .env.production)
npm run build:prod

# Production build - individual apps (uses .env.production)
npm run build:shell
npm run build:demo-one
npm run build:demo-two
npm run build:demo-three
npm run build:demo-counter

# Preview development build
npm run preview

# Preview production build
npm run preview:prod

# Serve built applications locally for testing
npm run serve
```

**Production Deployment:**
1. **Build all apps**: `npm run build`
2. **Deploy each dist folder** to your hosting service:
   - `shell-app/dist/` → Main domain (e.g., https://your-app.com)
   - `demo-one-app/dist/` → Subdomain (e.g., https://demo1.your-app.com)
   - `demo-two-app/dist/` → Subdomain (e.g., https://demo2.your-app.com)
   - `demo-three-app/dist/` → Subdomain (e.g., https://demo3.your-app.com)
3. **Configure CORS** on all servers to allow cross-origin module federation
4. **Update module federation URLs** in production configs if needed

## 📁 Project Structure

```
mco-test-latest/
├── package.json                    # Root workspace configuration & scripts
├── README.md                      # Comprehensive documentation (this file)
├──
├── 🏠 shell-app/                  # Main host application
│   ├── src/
│   │   ├── App.vue               # Main app with navigation
│   │   ├── main.js               # Entry point
│   │   ├── router/
│   │   │   └── index.js          # Vue Router configuration
│   │   ├── components/
│   │   │   ├── DynamicCanvas.vue # Landing page with dynamic loading
│   │   │   └── AllDemos.vue      # Showcase page with all demos
│   │   ├── stores/
│   │   │   └── common.store.js   # Pinia store for shared state
│   │   ├── interfaces/
│   │   │   ├── index.js          # Interface exports
│   │   │   └── counter.js        # Counter interface implementation
│   │   ├── views/
│   │   │   └── InterfaceDemo.vue # Interface communication demo
│   │   ├── fabric/
│   │   │   └── shellFabric.js    # Shared Fabric.js utilities
│   │   └── components/demoComponents/
│   │       └── OToast.vue        # Toast notification system
│   ├── vite.config.js            # Module Federation configuration
│   └── package.json
│
├── 🎨 demo-one-app/              # Basic shapes micro frontend
│   ├── src/
│   │   ├── App.vue               # Demo One main component
│   │   ├── main.js               # Entry point
│   │   ├── components/
│   │   │   └── DemoOneCanvas.vue # Shapes canvas component (exposed)
│   │   └── fabric/
│   │       └── demoOne.js        # Shape creation logic (exposed)
│   ├── vite.config.js            # Module Federation configuration
│   └── package.json
│
├── 📝 demo-two-app/              # Text & image micro frontend
│   ├── src/
│   │   ├── App.vue               # Demo Two main component
│   │   ├── main.js               # Entry point
│   │   ├── components/
│   │   │   └── DemoTwoCanvas.vue # Text/image canvas component (exposed)
│   │   └── fabric/
│   │       └── demoTwo.js        # Text/image logic (exposed)
│   ├── vite.config.js            # Module Federation configuration
│   └── package.json
│
├── 🖌️ demo-three-app/           # Drawing micro frontend
│   ├── src/
│   │   ├── App.vue               # Demo Three main component
│   │   ├── main.js               # Entry point
│   │   ├── components/
│   │   │   └── DemoThreeCanvas.vue # Drawing canvas component (exposed)
│   │   └── fabric/
│   │       └── demoThree.js      # Drawing logic (exposed)
│   ├── vite.config.js            # Module Federation configuration
│   └── package.json
│
└── 🔢 demo-counter-app/          # State management micro frontend
    ├── src/
    │   ├── App.vue               # Demo Counter main component
    │   ├── main.js               # Entry point
    │   ├── components/
    │   │   └── CounterDemo.vue   # Counter component (exposed)
    │   └── test-store-federation.js # Store federation testing utilities
    ├── vite.config.js            # Module Federation configuration
    └── package.json
```

## 🔧 Module Federation Configuration

### Shell App Configuration (Host)

```javascript
// shell-app/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@module-federation/vite'

export default defineConfig({
  plugins: [
    federation({
      name: 'shellApp',
      remotes: {
        // Dynamic imports from all demo applications
        demoOneApp: {
          type: 'module',
          name: 'demoOneApp',
          entry: 'http://localhost:3005/remoteEntry.js',
          entryGlobalName: 'demoOneApp',
          format: 'esm'
        },
        demoTwoApp: {
          type: 'module',
          name: 'demoTwoApp',
          entry: 'http://localhost:3007/remoteEntry.js',
          entryGlobalName: 'demoTwoApp',
          format: 'esm'
        },
        demoThreeApp: {
          type: 'module',
          name: 'demoThreeApp',
          entry: 'http://localhost:3006/remoteEntry.js',
          entryGlobalName: 'demoThreeApp',
          format: 'esm'
        }
      },
      exposes: {
        // Shared utilities for demo applications
        './shellFabric': './src/fabric/shellFabric.js'
      },
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
        fabric: { singleton: true }
      }
    }),
    vue()
  ],
  server: {
    port: 3004,
    cors: true
  }
})
```

### Demo App Configurations (Remotes)

**Demo One App:**
```javascript
// demo-one-app/vite.config.js
export default defineConfig({
  plugins: [
    federation({
      name: 'demoOneApp',
      exposes: {
        './DemoOneCanvas': './src/components/DemoOneCanvas.vue',
        './demoOneLogic': './src/fabric/demoOne.js'
      },
      shared: {
        vue: { singleton: true },
        fabric: { singleton: true }
      }
    }),
    vue()
  ],
  server: { port: 3005, cors: true }
})
```

**Demo Two App:**
```javascript
// demo-two-app/vite.config.js
export default defineConfig({
  plugins: [
    federation({
      name: 'demoTwoApp',
      exposes: {
        './DemoTwoCanvas': './src/components/DemoTwoCanvas.vue',
        './demoTwoLogic': './src/fabric/demoTwo.js'
      },
      shared: {
        vue: { singleton: true },
        fabric: { singleton: true }
      }
    }),
    vue()
  ],
  server: { port: 3007, cors: true }
})
```

**Demo Three App:**
```javascript
// demo-three-app/vite.config.js
export default defineConfig({
  plugins: [
    federation({
      name: 'demoThreeApp',
      exposes: {
        './DemoThreeCanvas': './src/components/DemoThreeCanvas.vue',
        './demoThreeLogic': './src/fabric/demoThree.js'
      },
      shared: {
        vue: { singleton: true },
        fabric: { singleton: true }
      }
    }),
    vue()
  ],
  server: { port: 3006, cors: true }
})
```

## 📋 Implementation Examples

### 1. 🎨 Dynamic Canvas Module Loading

**Shell App - Dynamic Loading:**
```javascript
// shell-app/src/components/DynamicCanvas.vue
<script setup>
import { ref } from 'vue'
import { initializeFabricCanvas } from '../fabric/shellFabric.js'

let canvas = null
let demoOneModule = null

// Initialize shared canvas
onMounted(async () => {
  canvas = await initializeFabricCanvas('dynamic-canvas', {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff'
  })
})

// Dynamic module loading
const loadDemoOne = async () => {
  try {
    // Dynamically import demo module
    demoOneModule = await import('demoOneApp/demoOneLogic')

    // Use imported functions on shared canvas
    demoOneModule.addRectangle(canvas, {
      left: 100,
      top: 100,
      fill: '#0054C9'
    })

    console.log('Demo One loaded and executed')
  } catch (error) {
    console.error('Failed to load Demo One:', error)
  }
}
</script>

<template>
  <div>
    <canvas id="dynamic-canvas"></canvas>
    <button @click="loadDemoOne">Load Demo One</button>
  </div>
</template>
```

**Demo App - Exposed Logic:**
```javascript
// demo-one-app/src/fabric/demoOne.js
import { fabric } from 'fabric'

export function addRectangle(canvas, options = {}) {
  const rect = new fabric.Rect({
    left: options.left || 100,
    top: options.top || 100,
    width: options.width || 100,
    height: options.height || 80,
    fill: options.fill || '#0054C9'
  })

  canvas.add(rect)
  canvas.setActiveObject(rect)
  canvas.renderAll()
  return rect
}

export function addCircle(canvas, options = {}) {
  const circle = new fabric.Circle({
    left: options.left || 200,
    top: options.top || 100,
    radius: options.radius || 50,
    fill: options.fill || '#6AAAEB'
  })

  canvas.add(circle)
  canvas.setActiveObject(circle)
  canvas.renderAll()
  return circle
}

export function clearCanvas(canvas) {
  canvas.clear()
  canvas.backgroundColor = '#ffffff'
  canvas.renderAll()
}
```

### 2. 🧩 Complete Component Federation

**Exposing a Complete Canvas Component:**
```vue
<!-- demo-two-app/src/components/DemoTwoCanvas.vue -->
<template>
  <div class="demo-two-container">
    <h2>📝 Demo Two - Text & Images</h2>

    <!-- Text Controls -->
    <div class="controls">
      <div class="control-group">
        <input v-model="textInput" type="text" placeholder="Enter text">
        <button @click="addTextToCanvas" class="btn btn-primary">
          Add Text
        </button>
      </div>

      <div class="control-group">
        <input v-model="imageUrl" type="text" placeholder="Image URL">
        <button @click="addImageToCanvas" class="btn btn-success" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Add Image' }}
        </button>
      </div>
    </div>

    <!-- Canvas -->
    <div class="canvas-container">
      <canvas id="demo-two-canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { initDemoTwoCanvas, addText, addImage } from '../fabric/demoTwo.js'

const textInput = ref('Hello World!')
const imageUrl = ref('https://picsum.photos/200/150')
const isLoading = ref(false)
let canvas = null

onMounted(() => {
  canvas = initDemoTwoCanvas('demo-two-canvas')
})

const addTextToCanvas = () => {
  if (canvas && textInput.value.trim()) {
    addText(canvas, {
      text: textInput.value,
      left: Math.random() * 400,
      top: Math.random() * 300
    })
  }
}

const addImageToCanvas = async () => {
  if (canvas && imageUrl.value.trim()) {
    isLoading.value = true
    try {
      await addImage(canvas, imageUrl.value, {
        left: Math.random() * 300,
        top: Math.random() * 200
      })
    } finally {
      isLoading.value = false
    }
  }
}
</script>
```

**Consuming the Component (Shell App):**
```vue
<!-- shell-app/src/App.vue -->
<template>
  <div>
    <nav>
      <router-link to="/">🏠 Dynamic Canvas</router-link>
      <router-link to="/demo-two">📝 Demo Two</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
// Router configuration handles component loading
// Individual routes load complete federated components
</script>
```

**Router Configuration:**
```javascript
// shell-app/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/demo-two',
    name: 'demo-two',
    component: () => import('demoTwoApp/DemoTwoCanvas')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

### 3. 🎨 Shared Canvas Utilities

**Exposing Canvas Utilities (Shell App):**
```javascript
// shell-app/src/fabric/shellFabric.js
let fabricInstance = null

export async function initializeFabricCanvas(canvasId, options = {}) {
  try {
    const { fabric } = await import('fabric')
    fabricInstance = fabric

    const canvas = new fabric.Canvas(canvasId, {
      width: options.width || 800,
      height: options.height || 600,
      backgroundColor: options.backgroundColor || '#ffffff',
      selectionColor: 'rgba(0, 84, 201, 0.3)',
      selectionBorderColor: '#0054C9',
      selectionLineWidth: 2,
      ...options
    })

    console.log('Shell Fabric.js canvas initialized successfully')
    return canvas
  } catch (error) {
    console.error('Failed to initialize Fabric.js canvas:', error)
    return null
  }
}

export function clearCanvas(canvas) {
  if (canvas && canvas.clear) {
    canvas.clear()
    canvas.backgroundColor = '#ffffff'
    canvas.renderAll()
  }
}

export function isFabricAvailable() {
  return fabricInstance !== null
}

export default {
  initializeFabricCanvas,
  clearCanvas,
  isFabricAvailable
}
```

**Using Shared Utilities (Demo Apps):**
```javascript
// demo-one-app/src/fabric/demoOne.js
import { fabric } from 'fabric'

// Configure Fabric.js with consistent styling
if (fabric.Object) {
  const defaults = fabric.Object.prototype
  defaults.transparentCorners = false
  defaults.cornerColor = '#0054C9'
  defaults.cornerStyle = 'circle'
  defaults.borderColor = '#0054C9'
  defaults.cornerSize = 10
}

export function initDemoOneCanvas(canvasId) {
  const canvas = new fabric.Canvas(canvasId, {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff'
  })

  // Apply consistent selection styling
  canvas.selectionColor = 'rgba(0, 84, 201, 0.3)'
  canvas.selectionBorderColor = '#0054C9'
  canvas.selectionLineWidth = 2

  return canvas
}

export function addRectangle(canvas, options = {}) {
  const rect = new fabric.Rect({
    left: options.left || 100,
    top: options.top || 100,
    width: options.width || 100,
    height: options.height || 80,
    fill: options.fill || '#0054C9',
    stroke: options.stroke || '#031F3C',
    strokeWidth: options.strokeWidth || 2
  })

  canvas.add(rect)
  canvas.setActiveObject(rect)
  canvas.renderAll()
  return rect
}
```

### 4. 🎨 All Demos Showcase Implementation

**Complete Multi-Canvas Architecture:**
```vue
<!-- shell-app/src/components/AllDemos.vue -->
<template>
  <div class="all-demos-container">
    <header class="demos-header">
      <h1>🎨 All Demos Showcase</h1>
      <p>Experience all three micro frontend demos in one unified view</p>
    </header>

    <!-- Global Controls -->
    <div class="global-controls">
      <h3>🌐 Global Controls</h3>
      <div class="global-buttons">
        <button @click="clearAllCanvases" class="btn btn-warning">
          🗑️ Clear All Canvases
        </button>
        <button @click="deleteSelectedFromAll" class="btn btn-danger">
          ❌ Delete Selected from All
        </button>
        <button @click="resetAllDemos" class="btn btn-secondary">
          🔄 Reset All Demos
        </button>
      </div>
    </div>

    <!-- Demo One Section -->
    <section class="demo-section demo-one-section">
      <div class="demo-header">
        <h2>🎨 Demo One - Basic Shapes</h2>
      </div>

      <!-- Demo One Controls -->
      <div class="demo-controls">
        <div class="control-group">
          <label>Color:</label>
          <input v-model="demoOneColor" type="color" class="color-input">
        </div>
        <div class="control-buttons">
          <button @click="addRectangleToOne" class="btn btn-primary">➕ Rectangle</button>
          <button @click="addCircleToOne" class="btn btn-primary">⭕ Circle</button>
          <button @click="addTriangleToOne" class="btn btn-primary">🔺 Triangle</button>
        </div>
      </div>

      <div class="demo-canvas-container">
        <canvas id="demo-one-canvas"></canvas>
      </div>
    </section>

    <!-- Demo Two Section -->
    <section class="demo-section demo-two-section">
      <div class="demo-header">
        <h2>📝 Demo Two - Text & Images</h2>
      </div>

      <!-- Demo Two Controls -->
      <div class="demo-controls">
        <div class="control-group">
          <input v-model="demoTwoText" type="text" placeholder="Enter text">
          <button @click="addTextToTwo" class="btn btn-primary">➕ Add Text</button>
        </div>
        <div class="control-group">
          <input v-model="demoTwoImageUrl" type="text" placeholder="Image URL">
          <button @click="addImageToTwo" class="btn btn-success" :disabled="isLoadingImage">
            {{ isLoadingImage ? '⏳ Loading...' : '🖼️ Add Image' }}
          </button>
        </div>
      </div>

      <div class="demo-canvas-container">
        <canvas id="demo-two-canvas"></canvas>
      </div>
    </section>

    <!-- Demo Three Section -->
    <section class="demo-section demo-three-section">
      <div class="demo-header">
        <h2>🖌️ Demo Three - Drawing</h2>
      </div>

      <!-- Demo Three Controls -->
      <div class="demo-controls">
        <div class="control-group">
          <button @click="toggleDrawingMode" :class="['btn', isDrawingMode ? 'btn-danger' : 'btn-success']">
            {{ isDrawingMode ? '🛑 Stop Drawing' : '✏️ Start Drawing' }}
          </button>
        </div>
        <div class="control-group">
          <label>Brush Width:</label>
          <input v-model="brushWidth" type="range" min="1" max="20">
          <span>{{ brushWidth }}px</span>
        </div>
        <div class="control-group">
          <label>Brush Color:</label>
          <input v-model="brushColor" type="color">
        </div>
      </div>

      <div class="demo-canvas-container">
        <canvas id="demo-three-canvas"></canvas>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// Reactive state for all controls
const demoOneColor = ref('#0054C9')
const demoTwoText = ref('Hello World!')
const demoTwoImageUrl = ref('https://picsum.photos/200/150')
const isLoadingImage = ref(false)
const isDrawingMode = ref(false)
const brushWidth = ref(5)
const brushColor = ref('#ef4444')

// Canvas references
let demoOneCanvas = null
let demoTwoCanvas = null
let demoThreeCanvas = null

// Demo modules
let demoOneModule = null
let demoTwoModule = null
let demoThreeModule = null

onMounted(async () => {
  // Initialize all demos simultaneously
  await Promise.all([
    initializeDemoOne(),
    initializeDemoTwo(),
    initializeDemoThree()
  ])
})

// Initialize each demo with its own canvas
const initializeDemoOne = async () => {
  try {
    demoOneModule = await import('demoOneApp/demoOneLogic')
    demoOneCanvas = demoOneModule.initDemoOneCanvas('demo-one-canvas')

    // Add sample content
    setTimeout(() => {
      demoOneModule.addRectangle(demoOneCanvas, { left: 50, top: 50, fill: '#0054C9' })
      demoOneModule.addCircle(demoOneCanvas, { left: 200, top: 100, fill: '#6AAAEB' })
    }, 500)
  } catch (error) {
    console.error('Failed to initialize Demo One:', error)
  }
}

// Global control functions
const clearAllCanvases = () => {
  if (demoOneCanvas && demoOneModule) demoOneModule.clearCanvas(demoOneCanvas)
  if (demoTwoCanvas && demoTwoModule) demoTwoModule.clearCanvas(demoTwoCanvas)
  if (demoThreeCanvas && demoThreeModule) demoThreeModule.clearCanvas(demoThreeCanvas)
}

const deleteSelectedFromAll = () => {
  [demoOneCanvas, demoTwoCanvas, demoThreeCanvas].forEach(canvas => {
    if (canvas && canvas.getActiveObject()) {
      canvas.remove(canvas.getActiveObject())
      canvas.renderAll()
    }
  })
}

// Demo-specific control functions
const addRectangleToOne = () => {
  if (demoOneCanvas && demoOneModule) {
    demoOneModule.addRectangle(demoOneCanvas, {
      left: Math.random() * 400,
      top: Math.random() * 300,
      fill: demoOneColor.value
    })
  }
}

// Watch for brush changes in Demo Three
watch(brushWidth, (newWidth) => {
  if (demoThreeCanvas && demoThreeModule && isDrawingMode.value) {
    demoThreeModule.setBrushWidth(demoThreeCanvas, newWidth)
  }
})
</script>
```

### 5. 🔗 Interface Communication & State Management

**Shell App - Interface Definition:**
```javascript
// shell-app/src/interfaces/counter.js
import { useCommonStore } from '../stores/common.store.js'

export const counterInterface = {
  // Get current value
  getValue() {
    const store = useCommonStore()
    return store.num
  },

  // Get computed values
  getComputedValues() {
    const store = useCommonStore()
    return {
      doubleNum: store.doubleNum,
      isPositive: store.isPositive,
      isNegative: store.isNegative,
      isZero: store.isZero,
      absoluteNum: store.absoluteNum
    }
  },

  // Modify state
  increment() {
    const store = useCommonStore()
    store.increment()
  },

  decrement() {
    const store = useCommonStore()
    store.decrement()
  },

  setValue(value) {
    const store = useCommonStore()
    store.setNum(value)
  },

  // Subscribe to changes
  subscribe(callback) {
    const store = useCommonStore()
    return store.$subscribe((mutation, state) => {
      callback(state.num, mutation)
    })
  }
}
```

**Shell App - Pinia Store:**
```javascript
// shell-app/src/stores/common.store.js
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    num: 0
  }),

  actions: {
    increment() {
      this.num++
    },

    decrement() {
      this.num--
    },

    setNum(value) {
      this.num = value
    },

    incrementBy(amount) {
      this.num += amount
    }
  },

  getters: {
    doubleNum: (state) => state.num * 2,
    isPositive: (state) => state.num > 0,
    isNegative: (state) => state.num < 0,
    isZero: (state) => state.num === 0,
    absoluteNum: (state) => Math.abs(state.num)
  }
})
```

**Demo Counter App - Interface Usage:**
```vue
<!-- demo-counter-app/src/components/CounterDemo.vue -->
<template>
  <div class="counter-demo">
    <div class="status-section">
      <div class="connection-status" :class="{ connected: isConnected }">
        {{ isConnected ? '🟢 Connected to Shell App' : '🔴 Disconnected' }}
      </div>

      <div class="counter-display">
        <div class="counter-value">{{ currentValue }}</div>
        <div class="computed-values">
          <span>Double: {{ computedValues.doubleNum }}</span>
          <span>Absolute: {{ computedValues.absoluteNum }}</span>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="increment" :disabled="!isConnected">+1</button>
      <button @click="decrement" :disabled="!isConnected">-1</button>
      <button @click="reset" :disabled="!isConnected">Reset</button>
    </div>

    <div class="activity-log">
      <h3>Activity Log</h3>
      <div v-for="entry in activityLog" :key="entry.timestamp" class="log-entry">
        {{ entry.timestamp }} - {{ entry.action }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    const isConnected = ref(false)
    const currentValue = ref(0)
    const computedValues = reactive({
      doubleNum: 0,
      isPositive: false,
      absoluteNum: 0
    })
    const activityLog = ref([])

    let counterInterface = null
    let unsubscribe = null

    const connectToShell = async () => {
      try {
        // Import the counter interface from shell app
        const { counterInterface: shellCounter } = await import('shellApp/interfaces')
        counterInterface = shellCounter

        // Subscribe to changes
        unsubscribe = counterInterface.subscribe((newValue) => {
          currentValue.value = newValue
          updateComputedValues()
          addToLog(`Value changed to ${newValue}`)
        })

        // Initial value update
        currentValue.value = counterInterface.getValue()
        updateComputedValues()
        isConnected.value = true
        addToLog('Connected to Shell App')
      } catch (error) {
        console.error('Failed to connect to Shell App:', error)
        isConnected.value = false
      }
    }

    const increment = () => {
      if (counterInterface) {
        counterInterface.increment()
        addToLog('Incremented counter')
      }
    }

    const addToLog = (action) => {
      const timestamp = new Date().toLocaleTimeString()
      activityLog.value.unshift({ timestamp, action })
      if (activityLog.value.length > 10) {
        activityLog.value.pop()
      }
    }

    onMounted(() => {
      connectToShell()
    })

    onUnmounted(() => {
      if (unsubscribe) {
        unsubscribe()
      }
    })

    return {
      isConnected,
      currentValue,
      computedValues,
      activityLog,
      increment
    }
  }
}
</script>
```

**Module Federation Configuration:**
```javascript
// shell-app/vite.config.js
exposes: {
  "./interfaces": "./src/interfaces/index.js",
  "./counterInterface": "./src/interfaces/counter.js",
}

// demo-counter-app/vite.config.js
remotes: {
  shellApp: {
    type: "module",
    name: "shellApp",
    entry: "http://localhost:3000/remoteEntry.js",
    entryGlobalName: "shellApp",
    shareScope: "default",
  },
}
```

### 6. 🏠 Exposing Entire Applications

**Exposing a Complete App (Test App):**
```vue
<!-- test-app/src/FederatedApp.vue -->
<template>
  <div class="test-app-federated">
    <h1>🎉 Test App (Federated)</h1>
    <p>This is the test-app loaded via Module Federation</p>

    <div class="content">
      <h2>Your App Content</h2>
      <p>Add your 3D components, UI features, business logic here</p>

      <!-- Test buttons for toast -->
      <div v-if="toast" class="toast-test-buttons">
        <button @click="showSuccessToast">Success Toast</button>
        <button @click="showErrorToast">Error Toast</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FederatedComponent',
  data() {
    return {
      toast: null,
    }
  },

  async mounted() {
    // Dynamically import the toast composable from shell-app
    try {
      const { useToast } = await import('shellApp/useToast')
      this.toast = useToast()
    } catch (error) {
      console.error('Failed to load toast composable:', error)
    }
  },

  methods: {
    showSuccessToast() {
      if (this.toast) {
        this.toast.success('Success from federated app!')
      }
    },

    showErrorToast() {
      if (this.toast) {
        this.toast.error('Error from federated app!')
      }
    }
  }
}
</script>

<style lang="scss">
.test-app-federated {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  margin: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
```

## ✨ Key Features Demonstrated

### 🔗 Interface Communication & State Management
- **🏪 Shared State Management**: Centralized Pinia store in Shell App accessible by all micro frontends
- **🔌 Interface System**: Clean API layer for cross-micro frontend communication
- **🔄 Real-time Synchronization**: Changes in one micro frontend instantly reflect in others
- **📡 Counter Demo**: Interactive demonstration of shared state with live activity logging
- **🎯 Subscription Pattern**: Event-driven updates using Pinia's reactive subscription system
- **🛡️ Type-safe Interfaces**: Well-defined contracts for inter-app communication
- **📦 Module Federation**: Seamless sharing of state management logic across applications

### 🎨 Canvas & Graphics Architecture
- **🖼️ Shared Canvas System**: Single Fabric.js canvas shared across multiple micro frontends
- **🎨 Dynamic Module Loading**: Load canvas functionality on-demand from different micro frontends
- **🖌️ Multi-Demo Integration**: Three independent canvas demos (shapes, text/images, drawing)
- **🎯 Real-time Interaction**: Live canvas manipulation with immediate visual feedback
- **🌐 Global Canvas Controls**: Actions that affect all canvases simultaneously
- **🎮 Canvas-Specific Controls**: Individual controls for each demo's unique features

### 🏗️ Advanced Micro Frontend Architecture
- **🔄 Module Federation**: Advanced Vite + Vue 3 + Module Federation implementation
- **🧩 Component Federation**: Complete Vue components shared across applications
- **📦 Logic Federation**: Shared JavaScript functions and utilities between apps
- **🌐 Independent Deployment**: Each micro frontend can be deployed separately
- **⚡ Hot Module Replacement**: Live updates across all micro frontends during development

### 🎮 Interactive Demonstration Features
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🎯 Multiple Demo Modes**: Landing page, All Demos showcase, individual demo pages
- **⚡ Real-time Updates**: Immediate visual feedback for all canvas interactions
- **🛠️ Professional UI**: Clean, modern interface with brand color consistency

### 🔗 Interface Communication Benefits
- **🔄 Real-time State Synchronization**: Changes in one micro frontend instantly reflect across all connected apps
- **🛡️ Type-safe Communication**: Well-defined interface contracts prevent runtime errors
- **🔌 Loose Coupling**: Micro frontends depend only on interface contracts, not implementation details
- **📦 Centralized State Management**: Single source of truth for shared state in Shell App
- **🎯 Event-driven Architecture**: Subscription-based updates using Pinia's reactive system
- **🚀 Independent Development**: Teams can develop features independently while sharing state
- **📈 Scalable Architecture**: Easy to add new micro frontends that consume existing interfaces

### 🛠️ Developer Experience & Production Ready
- **🚀 Production Optimized**: Optimized builds with proper error handling and fallbacks
- **🔧 TypeScript Ready**: Full TypeScript support across all applications
- **📋 Comprehensive Documentation**: Detailed examples and implementation guides
- **🎯 Error Boundaries**: Robust error handling and graceful degradation
- **🌐 Environment Management**: Easy configuration for different deployment environments
- **🔄 Async Loading**: Proper async component loading with error handling
- **📦 Build Optimization**: Optimized builds with shared dependencies

### 🛠️ Technical Highlights

- **Module Federation**: Using `@module-federation/vite` for seamless integration
- **Vue 3 Composition API**: Modern Vue patterns with `<script setup>`
- **Fabric.js Integration**: Advanced canvas manipulation with shared instances
- **Dynamic Imports**: Runtime module loading with proper error handling
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Brand Consistency**: Unified color scheme across all micro frontends
- **Error Boundaries**: Graceful error handling for failed module loads
- **Suspense**: Built-in loading states for async components

## 🚀 Complete Walkthrough: How Everything Works

### 🏗️ Architecture Flow

1. **🏠 Shell App Initialization**:
   ```javascript
   // shell-app/src/main.js - Entry point
   import { createApp } from 'vue'
   import { createRouter } from 'vue-router'
   import App from './App.vue'

   const app = createApp(App)
   app.use(router)
   app.mount('#app')
   ```

2. **🎨 Canvas System Setup**:
   ```javascript
   // shell-app/src/fabric/shellFabric.js - Shared canvas utilities
   export async function initializeFabricCanvas(canvasId, options = {}) {
     const { fabric } = await import('fabric')
     return new fabric.Canvas(canvasId, {
       width: 800,
       height: 600,
       backgroundColor: '#ffffff',
       selectionColor: 'rgba(0, 84, 201, 0.3)',
       selectionBorderColor: '#0054C9',
       ...options
     })
   }
   ```

3. **🔄 Dynamic Module Loading Process**:
   ```javascript
   // shell-app/src/components/DynamicCanvas.vue
   const loadDemoOne = async () => {
     try {
       // 1. Ensure canvas is initialized
       await ensureCanvasInitialized()

       // 2. Dynamically import demo module via Module Federation
       demoOneModule = await import('demoOneApp/demoOneLogic')

       // 3. Module is now available for canvas operations
       loadedDemos.value.demoOne = true
       console.log('Demo One loaded successfully')
     } catch (error) {
       console.error('Failed to load Demo One:', error)
       alert('Failed to load Demo One module: ' + error.message)
     }
   }
   ```

4. **🎨 Demo Module Execution**:
   ```javascript
   // demo-one-app/src/fabric/demoOne.js - Exposed functionality
   export function addRectangle(canvas, options = {}) {
     const rect = new fabric.Rect({
       left: options.left || 100,
       top: options.top || 100,
       width: options.width || 100,
       height: options.height || 80,
       fill: options.fill || '#0054C9'
     })

     canvas.add(rect)
     canvas.setActiveObject(rect)
     canvas.renderAll()
     return rect
   }
   ```

### 🌐 Page Navigation & User Flow

**🏠 Landing Page (`/`) - Dynamic Loading Demo**:
- **Purpose**: Demonstrate on-demand module loading
- **Features**: Shared canvas with progressive feature activation
- **User Experience**: Click "Load Demo X" → Module loads → Controls appear
- **Use Case**: Perfect for architecture demonstrations and client presentations

**🎨 All Demos Page (`/all-demos`) - Complete Showcase**:
- **Purpose**: Show all capabilities in one unified view
- **Features**: Three independent canvases with global and local controls
- **User Experience**: All demos load automatically with full interactivity
- **Use Case**: Perfect for feature showcasing and comprehensive demonstrations

**📱 Individual Demo Pages**:
- **`/demo-one`**: Standalone shapes demo with full controls
- **`/demo-two`**: Standalone text/image demo with full controls
- **`/demo-three`**: Standalone drawing demo with full controls
- **`/demo-counter`**: Standalone state management demo
- **Use Case**: Perfect for focused testing and development

**🔗 Interface Communication Pages**:
- **`/interface-demo`**: Demonstrates real-time state synchronization between Shell App and Demo Counter App
- **Features**: Side-by-side counters, shared state, activity logging, computed values display
- **Use Case**: Perfect for showcasing micro frontend communication patterns

### 🔄 Module Federation Deep Dive

1. **📦 Build Time Configuration**:
   ```bash
   # Each app builds with Module Federation
   npm run build

   # Generates federated modules:
   # shell-app/dist/remoteEntry.js (host)
   # demo-one-app/dist/remoteEntry.js (remote)
   # demo-two-app/dist/remoteEntry.js (remote)
   # demo-three-app/dist/remoteEntry.js (remote)
   ```

2. **🌐 Runtime Module Resolution**:
   ```javascript
   // When shell app executes: import('demoOneApp/demoOneLogic')
   // Module Federation:
   // 1. Fetches http://localhost:3005/remoteEntry.js
   // 2. Resolves the exposed 'demoOneLogic' module
   // 3. Loads dependencies (fabric.js shared)
   // 4. Returns module for immediate use
   ```

3. **🎯 Cross-App Function Execution**:
   ```javascript
   // Shell app uses demo functions on shared canvas
   const addShape = () => {
     if (demoOneModule && canvas) {
       demoOneModule.addRectangle(canvas, {
         left: Math.random() * 400,
         top: Math.random() * 300,
         fill: selectedColor.value
       })
     }
   }
   ```

### 🎨 Canvas Sharing Strategy

**🏠 Shell App Responsibilities**:
- Initialize and manage shared Fabric.js canvas
- Provide canvas reference to all demo modules
- Handle global canvas operations (clear all, delete selected)
- Manage canvas lifecycle and cleanup

**🎨 Demo App Responsibilities**:
- Receive canvas reference from shell app
- Add demo-specific functionality to shared canvas
- Maintain independent feature sets and controls
- Export reusable functions for shell app consumption

**🌐 Coordination Benefits**:
- Single canvas instance shared across all demos
- Consistent styling and behavior
- Global operations affect all demo content
- Unified user experience across micro frontends

### 🎯 Real-World Applications

This architecture pattern is ideal for:

- **🏢 Enterprise Applications**: Large teams developing independent features with shared state
- **🛒 E-commerce Platforms**: Product catalog, cart, checkout as separate apps sharing user/cart state
- **📊 Dashboard Systems**: Different widgets and panels sharing data and user preferences
- **🎮 Gaming Platforms**: Game lobby, profiles, instances sharing player state and settings
- **📱 Multi-tenant SaaS**: Customer-specific features with shared authentication and user data
- **🎨 Creative Tools**: Different editing capabilities sharing project state and user preferences
- **🔐 Authentication Systems**: Centralized user management accessible by all micro frontends
- **🛍️ Shopping Cart State**: Shared cart state across product browsing, checkout, and order tracking
- **🎨 Theme/UI State**: Consistent theming and user interface preferences across all apps
- **📢 Notification Systems**: Centralized notification management for all micro frontends

## 🚨 Common Issues & Solutions

### Canvas Not Initializing on Home Page

**Problem**: Canvas appears blank on first visit to home page (`/`), but works after visiting individual demo routes.

**Root Cause**: Fabric.js import failing in shell app before demo modules are loaded.

**Solution**:
```javascript
// ✅ Shell app initializes canvas with fallback
const initializeShellCanvas = async () => {
  try {
    canvas = await initializeFabricCanvas('dynamic-canvas', {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    })

    if (canvas) {
      console.log('Canvas initialized successfully')
      return true
    } else {
      // Fallback: prepare basic canvas element
      const canvasElement = document.getElementById('dynamic-canvas')
      canvas = { element: canvasElement, needsFabricInit: true }
      return true
    }
  } catch (error) {
    console.error('Failed to initialize canvas:', error)
    return false
  }
}
```

### Module Federation Import Errors

**Problem**: `Failed to load Demo X module` errors when clicking load buttons.

**Common Causes & Solutions**:

1. **Port Conflicts**:
   ```bash
   # Check if all ports are available
   netstat -an | findstr "3004 3005 3006 3007"

   # Kill processes if needed
   npx kill-port 3004 3005 3006 3007
   ```

2. **CORS Issues**:
   ```javascript
   // Ensure CORS is enabled in all vite.config.js
   export default defineConfig({
     server: {
       port: 3004,
       cors: true  // ✅ Enable CORS
     }
   })
   ```

3. **Module Not Exposed**:
   ```javascript
   // ✅ Verify modules are properly exposed
   federation({
     name: 'demoOneApp',
     exposes: {
       './DemoOneCanvas': './src/components/DemoOneCanvas.vue',
       './demoOneLogic': './src/fabric/demoOne.js'  // ✅ Must be exposed
     }
   })
   ```

### Fabric.js Version Conflicts

**Problem**: "Cannot read properties of undefined (reading 'Canvas')" errors.

**Solution**: Ensure consistent Fabric.js versions across all apps:
```bash
# Check versions in all apps
cd shell-app && npm list fabric
cd ../demo-one-app && npm list fabric
cd ../demo-two-app && npm list fabric
cd ../demo-three-app && npm list fabric

# Update to consistent version if needed
npm install fabric@5.3.0
```

### Canvas Features Not Working

**Problem**: Canvas loads but demo features (shapes, text, drawing) don't work.

**Debugging Steps**:

1. **Check Console Errors**:
   ```javascript
   // Look for these common errors:
   // - "canvas.add is not a function" → Canvas not properly initialized
   // - "fabric is not defined" → Fabric.js import failed
   // - "Cannot read properties of undefined" → Module not loaded
   ```

2. **Verify Module Loading**:
   ```javascript
   // Add debugging to demo loading functions
   const loadDemoOne = async () => {
     console.log('Loading Demo One...')
     try {
       demoOneModule = await import('demoOneApp/demoOneLogic')
       console.log('Demo One module:', demoOneModule) // ✅ Should show exported functions
       console.log('Canvas:', canvas) // ✅ Should show Fabric.js canvas
     } catch (error) {
       console.error('Load failed:', error)
     }
   }
   ```

3. **Test Individual Routes**:
   ```bash
   # Test each demo independently
   # Visit: http://localhost:3005 (Demo One)
   # Visit: http://localhost:3007 (Demo Two)
   # Visit: http://localhost:3006 (Demo Three)
   ```
4. **Production detection** to load CSS only when needed

### Interface Communication Not Working

**Problem**: Demo Counter App can't connect to Shell App interfaces.

**Common Causes & Solutions**:

1. **Interface Import Errors**:
   ```javascript
   // ❌ Wrong import path
   import { counterInterface } from 'shellApp/counter'

   // ✅ Correct import path
   import { counterInterface } from 'shellApp/interfaces'
   ```

2. **Module Federation Configuration**:
   ```javascript
   // ✅ Ensure shell app exposes interfaces
   // shell-app/vite.config.js
   exposes: {
     "./interfaces": "./src/interfaces/index.js",
   }

   // ✅ Ensure demo app imports shell app
   // demo-counter-app/vite.config.js
   remotes: {
     shellApp: {
       entry: "http://localhost:3000/remoteEntry.js",
     }
   }
   ```

3. **Pinia Store Not Initialized**:
   ```javascript
   // ✅ Ensure Pinia is properly initialized in shell app
   // shell-app/src/main.js
   import { createPinia } from 'pinia'
   const pinia = createPinia()
   app.use(pinia)
   ```

### Store State Not Syncing

**Problem**: Pinia store changes in one app don't reflect in another.

**Solution**:
- Ensure `pinia` is marked as `singleton: true` in shared dependencies
- Verify the same Pinia instance is used across all micro frontends
- Import interfaces dynamically using `await import()`
- Check that subscriptions are properly set up and not being unsubscribed prematurely

### Component Loading Errors

**Problem**: Federated components fail to load or show errors.

**Solution**:
- Use `defineAsyncComponent` with proper error handling
- Implement `Suspense` for loading states
- Add timeout and retry logic
- Check network connectivity between apps

## 📚 Best Practices for Canvas Micro Frontends

### 1. **Shared Dependencies Management**
```javascript
// All apps should share these dependencies
shared: {
  vue: { singleton: true },
  'vue-router': { singleton: true },
  fabric: { singleton: true },  // ✅ Critical for canvas sharing
  // Add other shared libs here
}
```

### 2. **Canvas Initialization Strategy**
```javascript
// ✅ Shell app provides canvas utilities
export async function initializeFabricCanvas(canvasId, options = {}) {
  const { fabric } = await import('fabric')
  return new fabric.Canvas(canvasId, {
    width: options.width || 800,
    height: options.height || 600,
    backgroundColor: '#ffffff',
    selectionColor: 'rgba(0, 84, 201, 0.3)',
    selectionBorderColor: '#0054C9',
    ...options
  })
}

// ✅ Demo apps use consistent patterns
export function addShape(canvas, shapeType, options = {}) {
  // Validate canvas before use
  if (!canvas || typeof canvas.add !== 'function') {
    throw new Error('Invalid canvas provided')
  }

  // Create and add shape
  const shape = new fabric[shapeType](options)
  canvas.add(shape)
  canvas.renderAll()
  return shape
}
```

### 3. **Error Handling for Dynamic Loading**
```javascript
// ✅ Robust module loading with fallbacks
const loadDemoModule = async (moduleName) => {
  try {
    const module = await import(`${moduleName}App/${moduleName}Logic`)
    return module
  } catch (error) {
    console.error(`Failed to load ${moduleName}:`, error)

    // Show user-friendly error
    alert(`Failed to load ${moduleName} module. Please refresh and try again.`)

    // Optional: Try fallback or alternative loading
    return null
  }
}
```

### 4. **Canvas State Management**
```javascript
// ✅ Centralized canvas state
const canvasState = reactive({
  isInitialized: false,
  loadedModules: new Set(),
  activeDemo: null,
  globalSettings: {
    backgroundColor: '#ffffff',
    selectionColor: 'rgba(0, 84, 201, 0.3)'
  }
})

// ✅ Global canvas operations
const globalCanvasOperations = {
  clearAll: () => {
    Object.values(canvases).forEach(canvas => {
      if (canvas && canvas.clear) {
        canvas.clear()
        canvas.backgroundColor = canvasState.globalSettings.backgroundColor
        canvas.renderAll()
      }
    })
  },

  deleteSelected: () => {
    Object.values(canvases).forEach(canvas => {
      const activeObject = canvas?.getActiveObject()
      if (activeObject) {
        canvas.remove(activeObject)
        canvas.renderAll()
      }
    })
  }
}
```

### 5. **Development Workflow**
```bash
# Start all canvas demos for development
npm run dev

# Test individual demos
npm run dev:shell    # Shell app only
npm run dev:demo-one # Demo One only

# Build and test production
npm run build
npm run serve

# Debug specific issues
npm run dev:debug    # With additional logging
```

### 6. **Interface Communication Best Practices**
```javascript
// ✅ Define clear interface contracts
export const counterInterface = {
  // Always include JSDoc for interface methods
  /**
   * Get the current counter value
   * @returns {number} Current counter value
   */
  getValue() {
    const store = useCommonStore()
    return store.num
  },

  /**
   * Subscribe to counter changes
   * @param {Function} callback - Called when value changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    const store = useCommonStore()
    return store.$subscribe((mutation, state) => {
      callback(state.num, mutation)
    })
  }
}

// ✅ Handle interface loading gracefully
const connectToInterface = async () => {
  try {
    const { counterInterface } = await import('shellApp/interfaces')

    // Test interface availability
    if (typeof counterInterface.getValue !== 'function') {
      throw new Error('Interface contract mismatch')
    }

    return counterInterface
  } catch (error) {
    console.error('Interface connection failed:', error)
    // Provide fallback behavior
    return null
  }
}

// ✅ Clean up subscriptions properly
onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
})
```

### 7. **Performance Optimization**
```javascript
// ✅ Lazy load demo modules
const demoModules = {
  demoOne: () => import('demoOneApp/demoOneLogic'),
  demoTwo: () => import('demoTwoApp/demoTwoLogic'),
  demoThree: () => import('demoThreeApp/demoThreeLogic'),
  demoCounter: () => import('demoCounterApp/CounterDemo')
}

// ✅ Preload critical modules
const preloadCriticalModules = async () => {
  try {
    // Preload most commonly used demo
    await demoModules.demoOne()
    console.log('Critical modules preloaded')
  } catch (error) {
    console.warn('Preload failed, will load on demand')
  }
}
```

## 🔧 Extending This Canvas Architecture

### Adding New Canvas Demos

1. **Create New Demo App**:
   ```bash
   mkdir demo-four-app
   cd demo-four-app
   npm init -y
   npm install vue@3 fabric@5.3.0 @vitejs/plugin-vue @module-federation/vite
   ```

2. **Configure Module Federation**:
   ```javascript
   // demo-four-app/vite.config.js
   export default defineConfig({
     plugins: [
       federation({
         name: 'demoFourApp',
         exposes: {
           './DemoFourCanvas': './src/components/DemoFourCanvas.vue',
           './demoFourLogic': './src/fabric/demoFour.js'
         },
         shared: {
           vue: { singleton: true },
           fabric: { singleton: true }
         }
       }),
       vue()
     ],
     server: { port: 3008, cors: true }
   })
   ```

3. **Update Shell App**:
   ```javascript
   // shell-app/vite.config.js - Add new remote
   remotes: {
     demoFourApp: {
       type: 'module',
       name: 'demoFourApp',
       entry: 'http://localhost:3008/remoteEntry.js'
     }
   }
   ```

4. **Add to Root Scripts**:
   ```json
   // package.json
   "scripts": {
     "dev:demo-four": "cd demo-four-app && npm run dev",
     "build:demo-four": "cd demo-four-app && npm run build"
   }
   ```

### Adding Advanced Canvas Features

1. **3D Canvas Integration**:
   ```javascript
   // Add Three.js for 3D capabilities
   export function init3DCanvas(canvasId) {
     const scene = new THREE.Scene()
     const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000)
     const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId) })

     return { scene, camera, renderer }
   }
   ```

2. **Real-time Collaboration**:
   ```javascript
   // Add WebSocket for real-time updates
   export function enableCollaboration(canvas) {
     const ws = new WebSocket('ws://localhost:8080')

     canvas.on('object:added', (e) => {
       ws.send(JSON.stringify({ type: 'object:added', data: e.target }))
     })

     ws.onmessage = (event) => {
       const { type, data } = JSON.parse(event.data)
       // Handle remote changes
     }
   }
   ```

3. **Canvas Export/Import**:
   ```javascript
   // Add save/load functionality
   export function exportCanvas(canvas) {
     return JSON.stringify(canvas.toJSON())
   }

   export function importCanvas(canvas, jsonData) {
     canvas.loadFromJSON(jsonData, () => {
       canvas.renderAll()
     })
   }
   ```

### Adding TypeScript Support

1. **Install TypeScript**:
   ```bash
   npm install -D typescript @types/fabric
   ```

2. **Add Type Definitions**:
   ```typescript
   // types/federation.d.ts
   declare module 'demoOneApp/demoOneLogic' {
     export function addRectangle(canvas: fabric.Canvas, options?: any): fabric.Rect
     export function addCircle(canvas: fabric.Canvas, options?: any): fabric.Circle
     export function clearCanvas(canvas: fabric.Canvas): void
   }
   ```

3. **Configure TypeScript**:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "ESNext",
       "moduleResolution": "node",
       "allowSyntheticDefaultImports": true,
       "esModuleInterop": true
     }
   }
   ```

### Adding Testing

1. **Unit Tests for Canvas Functions**:
   ```javascript
   // tests/canvas.test.js
   import { describe, it, expect, beforeEach } from 'vitest'
   import { fabric } from 'fabric'
   import { addRectangle, addCircle } from '../src/fabric/demoOne.js'

   describe('Canvas Functions', () => {
     let canvas

     beforeEach(() => {
       canvas = new fabric.Canvas(null, { width: 800, height: 600 })
     })

     it('should add rectangle to canvas', () => {
       const rect = addRectangle(canvas, { left: 100, top: 100 })
       expect(canvas.getObjects()).toHaveLength(1)
       expect(rect).toBeInstanceOf(fabric.Rect)
     })
   })
   ```

2. **E2E Tests for Module Federation**:
   ```javascript
   // e2e/federation.spec.js
   import { test, expect } from '@playwright/test'

   test('should load demo modules dynamically', async ({ page }) => {
     await page.goto('http://localhost:3004')

     // Test dynamic loading
     await page.click('button:has-text("Load Demo One")')
     await expect(page.locator('.demo-one-controls')).toBeVisible()

     // Test canvas functionality
     await page.click('button:has-text("Add Rectangle")')
     const canvas = page.locator('#dynamic-canvas')
     await expect(canvas).toBeVisible()
   })
   ```

## 🌟 Why This Canvas Architecture?

### 🎨 **Canvas-Specific Benefits**:
- **🖼️ Shared Canvas State**: Single source of truth for all visual elements
- **🎨 Modular Functionality**: Each demo adds specific capabilities without conflicts
- **🌐 Global Operations**: Actions that affect all canvas content simultaneously
- **⚡ Performance**: Shared Fabric.js instance reduces memory usage

### 🏗️ **Micro Frontend Benefits**:
- **🔄 Independent Development**: Teams can work on different canvas features independently
- **🚀 Independent Deployment**: Deploy new canvas capabilities without affecting others
- **📈 Scalability**: Add new canvas demos as separate micro frontends
- **🔧 Technology Flexibility**: Mix different canvas libraries (Fabric.js, Three.js, etc.)
- **🎯 Team Ownership**: Clear boundaries between different canvas functionalities
- **⚡ Performance**: Load only needed canvas features on demand

### 🎮 **User Experience Benefits**:
- **🎯 Progressive Enhancement**: Features activate as modules load
- **📱 Responsive Design**: Works seamlessly across all devices
- **🎨 Consistent Branding**: Unified color scheme and styling
- **⚡ Fast Loading**: Optimized bundle splitting and lazy loading

## 📖 Further Reading

- **Canvas & Graphics**:
  - [Fabric.js Documentation](http://fabricjs.com/docs/)
  - [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  - [Three.js for 3D Graphics](https://threejs.org/docs/)

- **Micro Frontend Architecture**:
  - [Module Federation Documentation](https://module-federation.github.io/)
  - [Vite Module Federation Plugin](https://github.com/module-federation/vite)
  - [Micro Frontend Architecture Patterns](https://micro-frontends.org/)

- **Vue 3 & Modern Development**:
  - [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
  - [Vue Router 4](https://router.vuejs.org/)
  - [Vite Build Tool](https://vitejs.dev/)

---

## 🎉 **Conclusion**

This repository demonstrates a **production-ready micro frontend architecture** specifically designed for **canvas-based applications and interface communication**. It showcases:

✅ **Advanced Module Federation** with dynamic loading
✅ **Shared Canvas Architecture** with Fabric.js integration
✅ **Interface Communication System** with real-time state synchronization
✅ **Multiple Demo Applications** working together seamlessly
✅ **Centralized State Management** using Pinia with cross-app accessibility
✅ **Professional UI/UX** with responsive design and brand consistency
✅ **Comprehensive Documentation** with real-world examples
✅ **Best Practices** for scalable micro frontend development

**Perfect for teams building:**
- 🎨 **Creative Tools** (image editors, design platforms with shared state)
- 🎮 **Interactive Applications** (games, simulations with player state)
- 📊 **Data Visualization** (charts, dashboards with shared data)
- 🏢 **Enterprise Applications** (collaborative tools with user state)
- 🛒 **E-commerce Platforms** (shared cart and user state)
- 🔐 **Multi-app Systems** (shared authentication and preferences)

**🚀 Start building your own canvas micro frontend architecture today!**
