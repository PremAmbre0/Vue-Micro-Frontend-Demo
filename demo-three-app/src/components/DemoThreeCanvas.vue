<template>
  <div class="demo-three-container">
    <div class="demo-three-canvas-container">
    <h2><span class="material-icons">draw</span> Demo Three: Drawing Canvas</h2>
    <p>Free drawing with brush controls using Fabric.js</p>

    <div class="controls">
      <div class="drawing-controls">
        <h3>Drawing Mode</h3>
        <button @click="toggleDrawing" :class="['btn', drawingMode ? 'btn-danger' : 'btn-success']">
          <span class="material-icons" >{{ drawingMode ? 'stop' : 'edit' }}</span>
          {{ drawingMode ? 'Stop Drawing' : 'Start Drawing' }}
        </button>
      </div>

      <div class="brush-controls">
        <h3>Brush Settings</h3>
        <div class="brush-settings-container">
        <div class="brush-setting">
          <label for="brushWidth">Width: {{ brushWidth }}px</label>
          <input
            id="brushWidth"
            type="range"
            min="1"
            max="50"
            v-model="brushWidth"
            @input="updateBrushWidth"
            class="brush-slider"
          />
        </div>
        <div class="brush-setting">
          <label for="brushColor">Color:</label>
          <input
            id="brushColor"
            type="color"
            v-model="brushColor"
            @input="updateBrushColor"
            class="color-picker"
          />
        </div>
        </div>
      </div>

      <div class="action-controls">
        <h3>Actions</h3>
        <div>
        <button @click="undoLast" class="btn btn-warning"><span class="material-icons" >undo</span> Undo Last</button>
        <button @click="clearCanvas" class="btn btn-secondary"><span class="material-icons" >delete</span> Clear Canvas</button>
        </div>
      </div>
    </div>
    
    <div class="canvas-container">
      <canvas id="demo-three-canvas"></canvas>
    </div>
    </div>
    
    <div class="info">
      <p><strong>Instructions:</strong></p>
      <ul>
        <li>Click "Start Drawing" to enable free drawing mode</li>
        <li>Use the width slider to adjust brush thickness (1-50px)</li>
        <li>Use the color picker to change brush color</li>
        <li>Draw freely on the canvas when drawing mode is enabled</li>
        <li>Click "Stop Drawing" to disable drawing mode</li>
        <li>Use "Undo Last" to remove the most recent drawing stroke</li>
        <li>Use "Clear Canvas" to remove all drawings</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  initDemoThreeCanvas,
  setDrawingMode,
  setBrushWidth,
  setBrushColor,
  clearCanvas as clearCanvasLogic,
  undoLastStroke
} from '../fabric/demoThree.js'

const drawingMode = ref(false)
const brushWidth = ref(5)
const brushColor = ref('#ef4444')
let canvas = null

onMounted(() => {
  // Initialize the canvas
  const el = document.getElementById("demo-three-canvas");
  if (!el) throw new Error("Canvas element for Demo Three not found");
  const container = el.parentElement;

  canvas = initDemoThreeCanvas("demo-three-canvas");

  if (!canvas) {
    console.error('Failed to initialize Demo One canvas');
    return;
  }

  // Responsive sizing
  const resize = () => {
    if (!canvas || !container) return;
    canvas.setDimensions({
      width: (container.clientWidth || 0) - 40,
      height: 600,
    });
    canvas.renderAll();
  };

  // Ensure correct size on first paint, then keep it responsive
  setTimeout(resize,0);
  window.addEventListener("resize", () => resize());

  // Set initial brush settings
  setBrushWidth(canvas, brushWidth.value)
  setBrushColor(canvas, brushColor.value)
})

onUnmounted(() => {
  if (canvas) {
    canvas.dispose()
  }
})

// Methods
const toggleDrawing = () => {
  if (canvas) {
    drawingMode.value = !drawingMode.value
    setDrawingMode(canvas, drawingMode.value)
  }
}

const updateBrushWidth = () => {
  if (canvas) {
    setBrushWidth(canvas, brushWidth.value)
  }
}

const updateBrushColor = () => {
  if (canvas) {
    setBrushColor(canvas, brushColor.value)
  }
}

const undoLast = () => {
  if (canvas) {
    undoLastStroke(canvas)
  }
}

const clearCanvas = () => {
  if (canvas) {
    clearCanvasLogic(canvas)
    drawingMode.value = false
  }
}
</script>

<style scoped>
.demo-three-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-three-canvas-container{
  border-left: 4px solid var(--primary-color);
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-lg);
    background: #f8f9fa;
    padding: 30px;
    text-align: center;
}

.demo-three-canvas-container h2 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 2rem;
}

.demo-three-canvas-container h2 .material-icons{
  font-size: 2.5rem;
  vertical-align: middle;
  padding-bottom: 5px;
}

.controls {
  display: flex;
  gap: 30px;
  align-items: center;
  margin: 20px 0;
  flex-wrap: wrap;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--primary-color);
}

.brush-settings-container{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.drawing-controls,
.brush-controls,
.action-controls {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.drawing-controls,.action-controls{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.drawing-controls h3,
.brush-controls h3,
.action-controls h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
  color: #495057;
}

.brush-setting {
  margin: 2px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.brush-setting label {
  min-width: 80px;
  font-weight: 500;
  color: #495057;
}

.brush-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e9ecef;
  outline: none;
  cursor: pointer;
}

.brush-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ef4444;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.brush-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ef4444;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.color-picker {
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin: 0 5px 5px 0;
  transition: all 0.2s ease;
}

.btn .material-icons{
  font-size: 1rem;
  vertical-align: middle;
  position: relative;
  bottom: 2px;
}

.btn-primary {
  background: #ef4444;
  color: white;
}

.btn-primary:hover {
  background: #dc2626;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-info {
  background: #6AAAEB;
  color: white;
}

.btn-info:hover {
  background: #4a90d9;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background: #d97706;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-secondary {
  background: #031F3C;
  color: white;
}

.btn-secondary:hover {
  background: #021529;
}

.canvas-container {
  margin: 20px 0;
  text-align: center;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: var(--shadow-md);
}

#demo-three-canvas {
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.info {
  background: #fef2f2;
  color: black;

  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #ef4444;
  margin-top: 20px;
}

.info ul {
  margin: 10px 0 0 20px;
}

.info li {
  margin: 5px 0;
}
</style>
