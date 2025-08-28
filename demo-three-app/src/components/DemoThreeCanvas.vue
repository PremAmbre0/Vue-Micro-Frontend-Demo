<template>
  <div class="demo-three-container">
    <!-- Header Section with fade-in animation -->
    <Transition name="fade-in" appear>
      <div class="demo-three-canvas-container">
        <h2><span class="material-icons">draw</span> Demo Three: Drawing Canvas</h2>
        <p>Free drawing with brush controls using Fabric.js</p>

        <!-- Controls with delayed fade-in -->
        <Transition name="fade-in-delayed" appear>
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
        </Transition>
        
        <!-- Canvas Container with slide-up animation -->
        <Transition name="slide-up" appear>
          <div class="canvas-container">
            <canvas id="demo-three-canvas"></canvas>
          </div>
        </Transition>
      </div>
    </Transition>
    
    <!-- Info Section with extra delayed fade-in -->
    <Transition name="fade-in-extra-delayed" appear>
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
    </Transition>
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

/* Animation Transitions */

/* Basic fade-in animation */
.fade-in-enter-active {
  transition: all 0.8s ease-out;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Delayed fade-in animation */
.fade-in-delayed-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.3s;
}

.fade-in-delayed-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-delayed-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Extra delayed fade-in animation */
.fade-in-extra-delayed-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.9s;
}

.fade-in-extra-delayed-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-extra-delayed-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Slide-up animation */
.slide-up-enter-active {
  transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.6s;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Enhanced header animations */
.demo-three-canvas-container h2 {
  animation: titleFadeIn 1s ease-out;
}

.demo-three-canvas-container p {
  animation: subtitleFadeIn 1s ease-out 0.3s both;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subtitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Control section animations */
.drawing-controls,
.brush-controls,
.action-controls {
  animation: controlSectionFadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.drawing-controls { animation-delay: 0.1s; }
.brush-controls { animation-delay: 0.2s; }
.action-controls { animation-delay: 0.3s; }

@keyframes controlSectionFadeIn {
  from {
    opacity: 0;
    transform: translateY(25px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Control section header animations */
.drawing-controls h3,
.brush-controls h3,
.action-controls h3 {
  animation: controlHeaderFadeIn 0.5s ease-out 0.2s both;
}

@keyframes controlHeaderFadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button staggered animations */
.btn {
  animation: buttonFadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

.drawing-controls .btn { animation-delay: 0.25s; }
.action-controls .btn:nth-child(2) { animation-delay: 0.35s; }
.action-controls .btn:nth-child(3) { animation-delay: 0.4s; }

@keyframes buttonFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Brush settings animations */
.brush-setting {
  animation: brushSettingFadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

.brush-setting:nth-child(1) { animation-delay: 0.3s; }
.brush-setting:nth-child(2) { animation-delay: 0.35s; }

@keyframes brushSettingFadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Brush slider animation */
.brush-slider {
  animation: sliderFadeIn 0.5s ease-out 0.4s both;
}

@keyframes sliderFadeIn {
  from {
    opacity: 0;
    transform: scaleX(0.8);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* Color picker animation */
.color-picker {
  animation: colorPickerFadeIn 0.5s ease-out 0.45s both;
}

@keyframes colorPickerFadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Label animations */
.brush-setting label {
  animation: labelFadeIn 0.5s ease-out 0.25s both;
}

@keyframes labelFadeIn {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Canvas animation */
#demo-three-canvas {
  animation: canvasFadeIn 0.8s ease-out 0.3s both;
}

@keyframes canvasFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Info section list animations */
.info ul li {
  animation: listItemSlideIn 0.5s ease-out;
  animation-fill-mode: both;
}

.info ul li:nth-child(1) { animation-delay: 0.1s; }
.info ul li:nth-child(2) { animation-delay: 0.15s; }
.info ul li:nth-child(3) { animation-delay: 0.2s; }
.info ul li:nth-child(4) { animation-delay: 0.25s; }
.info ul li:nth-child(5) { animation-delay: 0.3s; }
.info ul li:nth-child(6) { animation-delay: 0.35s; }
.info ul li:nth-child(7) { animation-delay: 0.4s; }

@keyframes listItemSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Info section header animation */
.info p {
  animation: infoHeaderFadeIn 0.6s ease-out 0.1s both;
}

@keyframes infoHeaderFadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced hover effects */
.btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.brush-slider:hover {
  transform: scaleY(1.2);
  transition: transform 0.2s ease;
}

.color-picker:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Container animation */
.demo-three-container {
  animation: containerFadeIn 0.6s ease-out;
}

@keyframes containerFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Drawing mode button special animation */
.btn.btn-danger {
  animation: drawingActiveButton 0.5s ease-out;
}

@keyframes drawingActiveButton {
  from {
    background: #10b981;
    transform: scale(1);
  }
  to {
    background: #ef4444;
    transform: scale(1.02);
  }
}
</style>
