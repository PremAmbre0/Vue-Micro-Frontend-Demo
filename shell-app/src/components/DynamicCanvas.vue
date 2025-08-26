<template>
  <div class="dynamic-canvas-container">
    <header class="canvas-header">
      <h1><span class="material-icons">palette</span> Welcome to Micro Frontend Showcase</h1>
      <p>Interactive landing page - Load and control federated micro frontend modules dynamically</p>
    </header>

    <!-- Dynamic Demo Loading Controls -->
    <div class="demo-loader-controls">
      <h2><span class="material-icons">view_module</span> Load Demo Modules</h2>
      <div class="loader-buttons">
        <button
          @click="loadDemoOne"
          :disabled="isLoading.demoOne"
          :class="['btn', loadedDemos.demoOne ? 'btn-success' : 'btn-primary']"
        >
          <span v-if="isLoading.demoOne" class="loading-spinner"></span>
          <span class="material-icons">
            {{ isLoading.demoOne ? 'autorenew' : loadedDemos.demoOne ? 'check_circle' : 'play_arrow' }}
          </span>
          {{ isLoading.demoOne ? 'Loading...' : loadedDemos.demoOne ? ' Demo One Loaded' : 'Load Demo One' }}
        </button>

        <button
          @click="loadDemoTwo"
          :disabled="isLoading.demoTwo"
          :class="['btn', loadedDemos.demoTwo ? 'btn-success' : 'btn-info']"
        >
          <span v-if="isLoading.demoTwo" class="loading-spinner"></span>
          <span class="material-icons">
            {{ isLoading.demoOne ? 'autorenew' : loadedDemos.demoTwo ? 'check_circle' : 'play_arrow' }}
          </span>
          {{ isLoading.demoTwo ? 'Loading...' : loadedDemos.demoTwo ? 'Demo Two Loaded' : 'Load Demo Two' }}
        </button>

        <button
          @click="loadDemoThree"
          :disabled="isLoading.demoThree"
          :class="['btn', loadedDemos.demoThree ? 'btn-success' : 'btn-warning']"
        >
          <span v-if="isLoading.demoThree" class="loading-spinner"></span>
          <span class="material-icons">
            {{ isLoading.demoOne ? 'autorenew' : loadedDemos.demoThree ? 'check_circle' : 'play_arrow' }}
          </span>
          {{ isLoading.demoThree ? 'Loading...' : loadedDemos.demoThree ? 'Demo Three Loaded' : 'Load Demo Three' }}
        </button>
      </div>
    </div>

    <!-- Canvas Container -->
    <div class="canvas-container">
      <canvas id="dynamic-canvas"></canvas>
    </div>

    <!-- Demo One Controls -->
    <div v-if="loadedDemos.demoOne" class="demo-controls demo-one-controls">
      <h3><span class="material-icons">category</span> Demo One Controls - Basic Shapes</h3>
      <div class="control-group">
        <button @click="addRectangle" class="btn btn-primary"><span class="material-icons">crop_square</span> Add Rectangle</button>
        <button @click="addCircle" class="btn btn-primary"><span class="material-icons">circle</span> Add Circle</button>
        <button @click="addTriangle" class="btn btn-primary"><span class="material-icons">change_history</span> Add Triangle</button>
        <input type="color" v-model="selectedColor" @input="changeColor" class="color-picker" />
        <button @click="deleteSelected" class="btn btn-danger"><span class="material-icons">delete</span> Delete Selected</button>
      </div>
    </div>

    <!-- Demo Two Controls -->
    <div v-if="loadedDemos.demoTwo" class="demo-controls demo-two-controls">
      <h3><span class="material-icons">edit_note</span> Demo Two Controls - Text & Images</h3>
      <div class="control-group">
        <input v-model="textInput" placeholder="Enter text" class="text-input" :disabled="imageLoading" />
        <button @click="addText" class="btn btn-info" :disabled="imageLoading"><span class="material-icons">add</span> Add Text</button>
        <input v-model="imageUrl" placeholder="Image URL" class="text-input" :disabled="imageLoading" />
        <button @click="addImage" class="btn btn-info" :disabled="imageLoading">
          <span v-if="imageLoading" class="loading-spinner"></span>
          <span class="material-icons" v-if="!imageLoading">image</span>
          {{ imageLoading ? 'Loading...' : 'Add Image' }}
        </button>
      </div>
    </div>

    <!-- Demo Three Controls -->
    <div v-if="loadedDemos.demoThree" class="demo-controls demo-three-controls">
      <h3><span class="material-icons">draw</span> Demo Three Controls - Drawing</h3>
      <div class="control-group">
        <button @click="toggleDrawing" :class="['btn', drawingMode ? 'btn-danger' : 'btn-warning']">
          <span class="material-icons" >{{ drawingMode ? 'stop' : 'edit' }}</span>
          {{ drawingMode ? 'Stop Drawing' : 'Start Drawing' }}
        </button>
        <label>Width: {{ brushWidth }}px</label>
        <input type="range" min="1" max="50" v-model="brushWidth" @input="updateBrushWidth" class="brush-slider" />
        <input type="color" v-model="brushColor" @input="updateBrushColor" class="color-picker" />
        <button @click="undoLast" class="btn btn-warning"><span class="material-icons" >undo</span> Undo Last</button>
      </div>
    </div>

    <!-- Clear All Button -->
    <div v-if="loadedDemos.demoOne || loadedDemos.demoTwo || loadedDemos.demoThree" class="global-controls">
      <button @click="clearCanvas" class="btn btn-secondary"> <span class="material-icons" >delete</span> Clear Canvas</button>
    </div>

    <!-- Navigation to All Demos -->
    <div v-if="!loadedDemos.demoOne && !loadedDemos.demoTwo && !loadedDemos.demoThree" class="quick-nav">
      <h3>Quick Navigation</h3>
      <router-link to="/all-demos" class="btn btn-info">
        <span class="material-icons">bolt</span> View All Demos Together
      </router-link>
    </div>

    <!-- Info Section -->
    <div class="info">
      <p><strong>Dynamic Module Loading Demo:</strong></p>
      <ul>
        <li>Click "Load Demo X" buttons to dynamically import federated modules</li>
        <li>Each module loads its own Fabric.js logic and controls</li>
        <li>All demos share the same canvas but maintain separate functionality</li>
        <li>This demonstrates on-demand loading of micro frontend bundles</li>
        <li><strong>Visit <router-link to="/all-demos">All Demos</router-link> to see all three demos running together</strong></li>
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
const selectedColor = ref('#0054C9');

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
    const canvasElement = document.getElementById('dynamic-canvas');
    if (!canvasElement) throw new Error('Canvas element not found');

    // Ensure canvas element stretches with CSS
    canvasElement.style.width = '100%';
    canvasElement.style.height = '600px';

    // Get container’s computed width in pixels
    const container = canvasElement.parentElement;
    const containerWidth = container.offsetWidth - 40 || 800;

    // Init Fabric.js with pixel width + fixed height
    canvas = await initializeFabricCanvas('dynamic-canvas', {
      width: containerWidth,
      height: 600,
      backgroundColor: '#ffffff',
    });

    if (canvas) {
      console.log('Canvas initialized successfully with responsive width');
      // Handle resize
      window.addEventListener('resize', resizeCanvas);
      return true;
    }
  } catch (error) {
    console.error('Failed to initialize canvas:', error);
    return false;
  }
};

// Resize handler to keep it responsive
const resizeCanvas = () => {
  if (canvas) {
    const container = document.querySelector('.canvas-container');
    const newWidth = container.offsetWidth - 40 || 800;
    canvas.setWidth(newWidth);
    canvas.setHeight(600); // keep fixed height or make dynamic if needed
    canvas.renderAll();
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
      width: '100%',
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
  font-size: 2.5rem;
  color: #0054C9;
  margin-bottom: 10px;
}

.canvas-header p {
  font-size: 1.2rem;
  color: #495057;
}

.canvas-header h1 .material-icons{
  vertical-align: middle;
  font-size: 2.5rem;
  padding-bottom: 0.3rem;
}

.demo-loader-controls {
  background: #f8f9fa;
  border: 2px solid #0054c9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
}

.demo-loader-controls h2 {
  color: #0054c9;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.4em;
}

.demo-loader-controls h2 .material-icons{
  font-size: 1.5rem;
  vertical-align: middle;
  padding-bottom: 5px;
}

.loader-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn .material-icons{
  font-size: 1.1rem;
  vertical-align: middle;
}

.btn-primary {
  background: #0054C9;
  color: white;
}

.btn-info {
  background: #6AAAEB;
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
  background: #031F3C;
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
  border-left: 4px solid #0054c9;
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
  border-left-color: #0054C9;
}

.demo-two-controls {
  border-left-color: #6AAAEB;
}

.demo-three-controls {
  border-left-color: #f59e0b;
}

.demo-controls h3 {
  margin: 0 0 15px 0;
  color: #495057;
}

.demo-controls h3 .material-icons{
  font-size: 1.25rem;
  vertical-align: middle;
  padding-bottom: 4px;
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

.quick-nav {
  text-align: center;
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #6AAAEB;
}

.quick-nav h3 {
  color: #0054C9;
  margin-bottom: 15px;
}

.quick-nav .btn {
  font-size: 1.1em;
  padding: 12px 24px;
}

.quick-nav a{
  text-decoration: none;
}

.info {
  background: #e3f2fd;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #0054C9;
  margin-top: 20px;
}

.info ul {
  margin: 10px 0 0 20px;
}

.info li {
  margin: 5px 0;
}
</style>
