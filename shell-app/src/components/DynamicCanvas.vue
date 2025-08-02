<template>
  <div class="dynamic-canvas-container">
    <header class="canvas-header">
      <h1>🎯 Shell App - Dynamic Micro Frontend Canvas</h1>
      <p>Demonstrate dynamic loading and control of federated micro frontend modules</p>
    </header>

    <!-- Dynamic Demo Loading Controls -->
    <div class="demo-loader-controls">
      <h2>Load Demo Modules</h2>
      <div class="loader-buttons">
        <button
          @click="loadDemoOne"
          :disabled="isLoading.demoOne"
          :class="['btn', loadedDemos.demoOne ? 'btn-success' : 'btn-primary']"
        >
          <span v-if="isLoading.demoOne" class="loading-spinner"></span>
          {{ isLoading.demoOne ? 'Loading...' : loadedDemos.demoOne ? '✅ Demo One Loaded' : 'Load Demo One' }}
        </button>

        <button
          @click="loadDemoTwo"
          :disabled="isLoading.demoTwo"
          :class="['btn', loadedDemos.demoTwo ? 'btn-success' : 'btn-info']"
        >
          <span v-if="isLoading.demoTwo" class="loading-spinner"></span>
          {{ isLoading.demoTwo ? 'Loading...' : loadedDemos.demoTwo ? '✅ Demo Two Loaded' : 'Load Demo Two' }}
        </button>

        <button
          @click="loadDemoThree"
          :disabled="isLoading.demoThree"
          :class="['btn', loadedDemos.demoThree ? 'btn-success' : 'btn-warning']"
        >
          <span v-if="isLoading.demoThree" class="loading-spinner"></span>
          {{ isLoading.demoThree ? 'Loading...' : loadedDemos.demoThree ? '✅ Demo Three Loaded' : 'Load Demo Three' }}
        </button>
      </div>
    </div>

    <!-- Canvas Container -->
    <div class="canvas-container">
      <canvas id="dynamic-canvas"></canvas>
    </div>

    <!-- Demo One Controls -->
    <div v-if="loadedDemos.demoOne" class="demo-controls demo-one-controls">
      <h3>🎨 Demo One Controls - Basic Shapes</h3>
      <div class="control-group">
        <button @click="addRectangle" class="btn btn-primary">Add Rectangle</button>
        <button @click="addCircle" class="btn btn-primary">Add Circle</button>
        <button @click="addTriangle" class="btn btn-primary">Add Triangle</button>
        <input type="color" v-model="selectedColor" @input="changeColor" class="color-picker" />
        <button @click="deleteSelected" class="btn btn-danger">Delete Selected</button>
      </div>
    </div>

    <!-- Demo Two Controls -->
    <div v-if="loadedDemos.demoTwo" class="demo-controls demo-two-controls">
      <h3>📝 Demo Two Controls - Text & Images</h3>
      <div class="control-group">
        <input v-model="textInput" placeholder="Enter text" class="text-input" :disabled="imageLoading" />
        <button @click="addText" class="btn btn-info" :disabled="imageLoading">Add Text</button>
        <input v-model="imageUrl" placeholder="Image URL" class="text-input" :disabled="imageLoading" />
        <button @click="addImage" class="btn btn-info" :disabled="imageLoading">
          <span v-if="imageLoading" class="loading-spinner"></span>
          {{ imageLoading ? 'Loading...' : 'Add Image' }}
        </button>
      </div>
    </div>

    <!-- Demo Three Controls -->
    <div v-if="loadedDemos.demoThree" class="demo-controls demo-three-controls">
      <h3>🖌️ Demo Three Controls - Drawing</h3>
      <div class="control-group">
        <button @click="toggleDrawing" :class="['btn', drawingMode ? 'btn-danger' : 'btn-warning']">
          {{ drawingMode ? 'Stop Drawing' : 'Start Drawing' }}
        </button>
        <label>Width: {{ brushWidth }}px</label>
        <input type="range" min="1" max="50" v-model="brushWidth" @input="updateBrushWidth" class="brush-slider" />
        <input type="color" v-model="brushColor" @input="updateBrushColor" class="color-picker" />
        <button @click="undoLast" class="btn btn-warning">Undo Last</button>
      </div>
    </div>

    <!-- Clear All Button -->
    <div v-if="loadedDemos.demoOne || loadedDemos.demoTwo || loadedDemos.demoThree" class="global-controls">
      <button @click="clearCanvas" class="btn btn-secondary">Clear Canvas</button>
    </div>

    <!-- Info Section -->
    <div class="info">
      <p><strong>Dynamic Module Loading Demo:</strong></p>
      <ul>
        <li>Click "Load Demo X" buttons to dynamically import federated modules</li>
        <li>Each module loads its own Fabric.js logic and controls</li>
        <li>All demos share the same canvas but maintain separate functionality</li>
        <li>This demonstrates on-demand loading of micro frontend bundles</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { initializeFabricCanvas, isFabricAvailable, ensureFabricAvailable, clearCanvas as clearShellCanvas } from '../fabric/shellFabric.js';

// Dynamic imports for demo modules
let demoOneModule = null;
let demoTwoModule = null;
let demoThreeModule = null;

// Reactive state
const loadedDemos = ref({
  demoOne: false,
  demoTwo: false,
  demoThree: false,
});

const isLoading = ref({
  demoOne: false,
  demoTwo: false,
  demoThree: false,
});

// Canvas and demo state
let canvas = null;

// Demo One state
const selectedColor = ref('#42b883');

// Demo Two state
const textInput = ref('Hello World!');
const imageUrl = ref('https://picsum.photos/200/300');
const imageLoading = ref(false);

// Demo Three state
const drawingMode = ref(false);
const brushWidth = ref(5);
const brushColor = ref('#ef4444');

// Initialize canvas
onMounted(async () => {
  // Try to initialize canvas immediately using shell fabric
  console.log('DynamicCanvas mounted, attempting canvas initialization...');
  await initializeShellCanvas();
});

onUnmounted(() => {
  if (canvas) {
    canvas.dispose();
  }
});

// Canvas initialization using shell fabric
const initializeShellCanvas = async () => {
  if (canvas) return true; // Already initialized

  try {
    // Try to initialize Fabric.js canvas using shell fabric
    canvas = await initializeFabricCanvas('dynamic-canvas', {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    });

    if (canvas) {
      console.log('Canvas initialized successfully using shell fabric');
      return true;
    } else {
      // Fabric.js not available yet, prepare basic canvas
      const canvasElement = document.getElementById('dynamic-canvas');
      if (!canvasElement) {
        throw new Error('Canvas element not found');
      }

      canvasElement.width = 800;
      canvasElement.height = 600;

      // Mark as needing Fabric.js initialization
      canvas = {
        element: canvasElement,
        needsFabricInit: true,
        width: 800,
        height: 600,
      };

      console.log('Canvas element prepared, Fabric.js will be initialized when demo loads');
      return true;
    }
  } catch (error) {
    console.error('Failed to initialize canvas:', error);
    return false;
  }
};

// Ensure canvas is Fabric.js canvas (called before demo operations)
const ensureCanvasInitialized = async () => {
  if (!canvas) {
    throw new Error('Canvas not found');
  }

  if (canvas.needsFabricInit) {
    // Try to initialize Fabric.js canvas now
    const fabricCanvas = await initializeFabricCanvas('dynamic-canvas', {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    });

    if (fabricCanvas) {
      canvas = fabricCanvas;
      console.log('Canvas upgraded to Fabric.js successfully');
      return true;
    } else {
      throw new Error('Failed to initialize Fabric.js canvas');
    }
  }

  return true;
};

// Dynamic module loading functions
const loadDemoOne = async () => {
  if (loadedDemos.value.demoOne) return;

  isLoading.value.demoOne = true;
  try {
    // Ensure canvas is initialized as Fabric.js canvas
    await ensureCanvasInitialized();

    // Dynamic import of demo one module
    demoOneModule = await import('demoOneApp/demoOneLogic');

    loadedDemos.value.demoOne = true;
    console.log('Demo One loaded successfully');
  } catch (error) {
    console.error('Failed to load Demo One:', error);
    alert('Failed to load Demo One module: ' + error.message);
  } finally {
    isLoading.value.demoOne = false;
  }
};

const loadDemoTwo = async () => {
  if (loadedDemos.value.demoTwo) return;

  isLoading.value.demoTwo = true;
  try {
    // Ensure canvas is initialized as Fabric.js canvas
    await ensureCanvasInitialized();

    // Dynamic import of demo two module
    demoTwoModule = await import('demoTwoApp/demoTwoLogic');

    loadedDemos.value.demoTwo = true;
    console.log('Demo Two loaded successfully');
  } catch (error) {
    console.error('Failed to load Demo Two:', error);
    alert('Failed to load Demo Two module: ' + error.message);
  } finally {
    isLoading.value.demoTwo = false;
  }
};

const loadDemoThree = async () => {
  if (loadedDemos.value.demoThree) return;

  isLoading.value.demoThree = true;
  try {
    // Ensure canvas is initialized as Fabric.js canvas
    await ensureCanvasInitialized();

    // Dynamic import of demo three module
    demoThreeModule = await import('demoThreeApp/demoThreeLogic');

    loadedDemos.value.demoThree = true;
    console.log('Demo Three loaded successfully');
  } catch (error) {
    console.error('Failed to load Demo Three:', error);
    alert('Failed to load Demo Three module: ' + error.message);
  } finally {
    isLoading.value.demoThree = false;
  }
};

// Demo One Methods
const addRectangle = () => {
  if (canvas && demoOneModule) {
    demoOneModule.addRectangle(canvas, {
      left: Math.random() * 600,
      top: Math.random() * 400,
      fill: selectedColor.value,
    });
  }
};

const addCircle = () => {
  if (canvas && demoOneModule) {
    demoOneModule.addCircle(canvas, {
      left: Math.random() * 600,
      top: Math.random() * 400,
      fill: selectedColor.value,
    });
  }
};

const addTriangle = () => {
  if (canvas && demoOneModule) {
    demoOneModule.addTriangle(canvas, {
      left: Math.random() * 600,
      top: Math.random() * 400,
      fill: selectedColor.value,
    });
  }
};

const changeColor = () => {
  if (canvas && demoOneModule) {
    demoOneModule.changeSelectedColor(canvas, selectedColor.value);
  }
};

const deleteSelected = () => {
  if (canvas && demoOneModule) {
    demoOneModule.deleteSelected(canvas);
  }
};

// Demo Two Methods
const addText = () => {
  if (canvas && demoTwoModule && textInput.value.trim()) {
    demoTwoModule.addText(canvas, {
      text: textInput.value,
      left: Math.random() * 600,
      top: Math.random() * 400,
    });
  }
};

const addImage = () => {
  if (canvas && demoTwoModule && imageUrl.value.trim() && !imageLoading.value) {
    imageLoading.value = true;
    demoTwoModule.addImage(
      canvas,
      imageUrl.value,
      {
        left: Math.random() * 500,
        top: Math.random() * 300,
        scaleX: 0.5,
        scaleY: 0.5,
      },
      () => {
        imageLoading.value = false;
      },
      () => {
        imageLoading.value = false;
        alert('Failed to load image');
      }
    );
  }
};

// Demo Three Methods
const toggleDrawing = () => {
  if (canvas && demoThreeModule) {
    drawingMode.value = !drawingMode.value;
    demoThreeModule.setDrawingMode(canvas, drawingMode.value);
  }
};

const updateBrushWidth = () => {
  if (canvas && demoThreeModule) {
    demoThreeModule.setBrushWidth(canvas, brushWidth.value);
  }
};

const updateBrushColor = () => {
  if (canvas && demoThreeModule) {
    demoThreeModule.setBrushColor(canvas, brushColor.value);
  }
};

const undoLast = () => {
  if (canvas && demoThreeModule) {
    demoThreeModule.undoLastStroke(canvas);
  }
};

// Global Methods
const clearCanvas = () => {
  if (canvas) {
    clearShellCanvas(canvas);
    drawingMode.value = false;
  }
};
</script>

<style scoped>
.dynamic-canvas-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.canvas-header {
  text-align: center;
  margin-bottom: 30px;
}

.canvas-header h1 {
  color: #667eea;
  margin-bottom: 10px;
}

.demo-loader-controls {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 2px solid #e9ecef;
}

.demo-loader-controls h2 {
  margin: 0 0 15px 0;
  color: #495057;
}

.loader-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-info {
  background: #3b82f6;
  color: white;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.canvas-container {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

#dynamic-canvas {
  border: 2px solid #e9ecef;
  border-radius: 8px;
}

.demo-controls {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  border-left: 4px solid;
}

.demo-one-controls {
  border-left-color: #42b883;
}

.demo-two-controls {
  border-left-color: #3b82f6;
}

.demo-three-controls {
  border-left-color: #f59e0b;
}

.demo-controls h3 {
  margin: 0 0 15px 0;
  color: #495057;
}

.control-group {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.text-input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 200px;
}

.color-picker {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.brush-slider {
  width: 150px;
  height: 6px;
  border-radius: 3px;
  background: #e9ecef;
  outline: none;
  cursor: pointer;
}

.global-controls {
  text-align: center;
  margin: 20px 0;
}

.info {
  background: #e3f2fd;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
  margin-top: 20px;
}

.info ul {
  margin: 10px 0 0 20px;
}

.info li {
  margin: 5px 0;
}
</style>
