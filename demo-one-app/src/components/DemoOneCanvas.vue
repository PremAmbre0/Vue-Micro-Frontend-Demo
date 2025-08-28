<template>
  <div class="demo-one-container">
    <!-- Header Section with fade-in animation -->
    <Transition name="fade-in" appear>
      <div class="demo-one-canvas-container">
        <h2><span class="material-icons">category</span> Demo One: Basic Shapes & Drawing</h2>
        <p>Create and manipulate basic shapes with Fabric.js</p>

        <!-- Controls with delayed fade-in -->
        <Transition name="fade-in-delayed" appear>
          <div class="controls">
            <div class="shape-controls">
              <h3>Add Shapes</h3>
              <button @click="addRect" class="btn btn-primary"><span class="material-icons">crop_square</span> Add Rectangle</button>
              <button @click="addCirc" class="btn btn-success"> <span class="material-icons">circle</span> Add Circle</button>
              <button @click="addTri" class="btn btn-danger"><span class="material-icons">change_history</span> Add Triangle</button>
            </div>

            <div class="color-controls">
              <h3>Colors</h3>
              <div class="color-controls-content">
              <label for="colorPicker">Change Selected Color:</label>
              <input
                id="colorPicker"
                type="color"
                v-model="selectedColor"
                @input="changeColor"
                class="color-picker"
              />
              </div>
            </div>

            <div class="action-controls">
              <h3>Actions</h3>
              <button @click="deleteSelected" class="btn btn-warning">
                <span class="material-icons">delete_sweep</span> Delete Selected
              </button>
              <button @click="clearCanvas" class="btn btn-secondary">
               <span class="material-icons">clear_all</span> Clear Canvas
              </button>
            </div>
          </div>
        </Transition>

        <!-- Canvas Container with slide-up animation -->
        <Transition name="slide-up" appear>
          <div class="canvas-container">
            <canvas id="demo-one-canvas"></canvas>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Info Section with extra delayed fade-in -->
    <Transition name="fade-in-extra-delayed" appear>
      <div class="info">
        <p><strong>Instructions:</strong></p>
        <ul>
          <li>Click buttons to add shapes to the canvas</li>
          <li>Click and drag shapes to move them</li>
          <li>Select a shape and use the color picker to change its color</li>
          <li>Use Delete Selected to remove the selected shape</li>
          <li>Use Clear Canvas to remove all shapes</li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  initDemoOneCanvas,
  addRectangle,
  addCircle,
  addTriangle,
  changeSelectedColor,
  clearCanvas as clearCanvasLogic,
  deleteSelected as deleteSelectedLogic,
} from "../fabric/demoOne.js";

const selectedColor = ref("#0054C9");
let canvas = null;

onMounted(() => {
// Initialize the canvas with error handling + responsive sizing
try {
  const el = document.getElementById("demo-one-canvas");
  if (!el) throw new Error("Canvas element for Demo One not found");
  const container = el.parentElement;

  canvas = initDemoOneCanvas("demo-one-canvas");

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

  // Add some default shapes for demonstration
  setTimeout(() => {
    if (canvas) {
      addRectangle(canvas, { left: 50, top: 50, fill: "#42b883" });
      addCircle(canvas,   { left: 200, top: 100, fill: "#3b82f6" });
      addTriangle(canvas, { left: 350, top: 80,  fill: "#ef4444" });
    }
  }, 100);
} catch (error) {
  console.error('Error in Demo One canvas initialization:', error);
}
});

onUnmounted(() => {
  try {
    if (canvas && canvas.dispose) {
      canvas.dispose();
      canvas = null;
    }
  } catch (error) {
    console.error('Error disposing Demo One canvas:', error);
  }
});

// Methods with error handling
const addRect = () => {
  try {
    if (canvas && canvas.add) {
      addRectangle(canvas, {
        left: Math.random() * 600,
        top: Math.random() * 400,
        fill: selectedColor.value,
      });
    }
  } catch (error) {
    console.error('Error adding rectangle:', error);
  }
};

const addCirc = () => {
  try {
    if (canvas && canvas.add) {
      addCircle(canvas, {
        left: Math.random() * 600,
        top: Math.random() * 400,
        fill: selectedColor.value,
      });
    }
  } catch (error) {
    console.error('Error adding circle:', error);
  }
};

const addTri = () => {
  try {
    if (canvas && canvas.add) {
      addTriangle(canvas, {
        left: Math.random() * 600,
        top: Math.random() * 400,
        fill: selectedColor.value,
      });
    }
  } catch (error) {
    console.error('Error adding triangle:', error);
  }
};

const changeColor = () => {
  try {
    if (canvas && canvas.getActiveObject) {
      changeSelectedColor(canvas, selectedColor.value);
    }
  } catch (error) {
    console.error('Error changing color:', error);
  }
};

const deleteSelected = () => {
  try {
    if (canvas && canvas.getActiveObject) {
      deleteSelectedLogic(canvas);
    }
  } catch (error) {
    console.error('Error deleting selected:', error);
  }
};

const clearCanvas = () => {
  try {
    if (canvas && canvas.clear) {
      clearCanvasLogic(canvas);
    }
  } catch (error) {
    console.error('Error clearing canvas:', error);
  }
};
</script>

<style scoped>
.demo-one-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-one-canvas-container{
    border-left: 4px solid var(--primary-color);
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-lg);
    background: #f8f9fa;
    padding: 30px;
    text-align: center;
}

.demo-one-canvas-container h2 {
  color: #0054C9;
  margin-bottom: 10px;
  font-size: 2rem;
}

.demo-one-canvas-container h2 .material-icons{
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

.shape-controls,
.color-controls,
.action-controls {
  color: black;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.color-controls-content{
  display: flex;
  align-items: center;
  gap: 10px;
}

.shape-controls h3,
.color-controls h3,
.action-controls h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
  color: #495057;
}

.btn {
  padding: 8px 10px;
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
  bottom: 1px;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: #0054C9;
  color: white;
}

.btn-primary:hover {
  background: #003d96;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background: #d97706;
}

.btn-secondary {
  background: #031F3C;
  color: white;
}

.btn-secondary:hover {
  background: #021529;
}

.color-picker {
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

#demo-one-canvas {
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.info {
  background: #e3f2fd;
  color: black;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
  margin-top: 20px;
  box-shadow: var(--shadow-lg);
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
.demo-one-canvas-container h2 {
  animation: titleFadeIn 1s ease-out;
}

.demo-one-canvas-container p {
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
.shape-controls,
.color-controls,
.action-controls {
  animation: controlSectionFadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.shape-controls { animation-delay: 0.1s; }
.color-controls { animation-delay: 0.2s; }
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
.shape-controls h3,
.color-controls h3,
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

.shape-controls .btn:nth-child(2) { animation-delay: 0.1s; }
.shape-controls .btn:nth-child(3) { animation-delay: 0.15s; }
.shape-controls .btn:nth-child(4) { animation-delay: 0.2s; }

.action-controls .btn:nth-child(2) { animation-delay: 0.25s; }
.action-controls .btn:nth-child(3) { animation-delay: 0.3s; }

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

/* Color picker animation */
.color-picker {
  animation: colorPickerFadeIn 0.5s ease-out 0.25s both;
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

/* Label animation */
.color-controls-content label {
  animation: labelFadeIn 0.5s ease-out 0.2s both;
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
#demo-one-canvas {
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

/* Container animation */
.demo-one-container {
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
</style>
