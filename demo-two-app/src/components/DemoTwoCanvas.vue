<template>
  <div class="demo-two-container">
    <!-- Header Section with fade-in animation -->
    <Transition name="fade-in" appear>
      <div class="demo-two-canvas-container">
        <h2><span class="material-icons">edit_note</span> Demo Two: Text & Image Editor</h2>
        <p>Add and edit text with image manipulation using Fabric.js</p>

        <!-- Controls with delayed fade-in -->
        <Transition name="fade-in-delayed" appear>
          <div class="controls">
            <div class="text-controls">
              <h3> Add Text</h3>
              <input
                v-model="textInput"
                placeholder="Enter text"
                class="text-input"
                :disabled="isLoading"
              />
              <button
                @click="addTextToCanvas"
                class="btn btn-primary"
                :class="{ mounted: isMounted }"
                :disabled="isLoading"
              >
              <span class="material-icons">add</span>
                Add Text
              </button>
            </div>

            <div class="image-controls">
              <h3>Add Image</h3>
              <input
                v-model="imageUrl"
                placeholder="Image URL"
                class="text-input"
                :disabled="isLoading"
              />
              <button
                @click="addImageToCanvas"
                class="btn btn-success"
                :class="{ mounted: isMounted }"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="loading-spinner"></span>
                <span class="material-icons" v-if="!isLoading">image</span>
                {{ isLoading ? "Loading..." : "Add Image" }}
              </button>
            </div>

            <div class="action-controls">
              <h3>Actions</h3>
              <button
                @click="clearCanvas"
                class="btn btn-secondary"
                :class="{ mounted: isMounted }"
                :disabled="isLoading"
              >
              <span class="material-icons">delete</span>
                Clear Canvas
              </button>
            </div>
          </div>
        </Transition>

        <!-- Canvas Container with slide-up animation -->
        <Transition name="slide-up" appear>
          <div class="canvas-container">
            <canvas id="demo-two-canvas"></canvas>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Info Section with extra delayed fade-in -->
    <Transition name="fade-in-extra-delayed" appear>
      <div class="info">
        <p><strong>Instructions:</strong></p>
        <ul>
          <li>Enter text and click "Add Text" to add text objects</li>
          <li>Enter an image URL and click "Add Image" to add images</li>
          <li>Click and drag objects to move them</li>
          <li>Double-click text to edit it directly</li>
          <li>Use Clear Canvas to remove all objects</li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  initDemoTwoCanvas,
  addText,
  addImage,
  clearCanvas as clearCanvasLogic,
} from "../fabric/demoTwo.js";

const textInput = ref("Hello World!");
const imageUrl = ref("https://picsum.photos/200/300");
const isLoading = ref(false);
const isMounted = ref(false);
let canvas = null;

onMounted(() => {
  // Initialize the canvas
  const el = document.getElementById("demo-two-canvas");
  if (!el) throw new Error("Canvas element for Demo Two not found");
  const container = el.parentElement;

  canvas = initDemoTwoCanvas("demo-two-canvas");

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

  // Add some default content for demonstration
  setTimeout(() => {
    addText(canvas, {
      text: "Welcome to Demo Two!",
      left: 50,
      top: 50,
      fontSize: 28,
      fill: "#3b82f6",
    });
    addImage(canvas, "https://picsum.photos/150/100", {
      left: 300,
      top: 150,
      scaleX: 0.8,
      scaleY: 0.8,
    });
  }, 100);

  // Mark as mounted after animations complete
  setTimeout(() => {
    isMounted.value = true;
  }, 1500); // After all animations should be complete
});

onUnmounted(() => {
  if (canvas) {
    canvas.dispose();
  }
});

// Methods
const addTextToCanvas = () => {
  if (canvas && textInput.value.trim()) {
    addText(canvas, {
      text: textInput.value,
      left: Math.random() * 600,
      top: Math.random() * 400,
      fontSize: 24,
      fill: "#333333",
    });
  }
};

const addImageToCanvas = () => {
  if (canvas && imageUrl.value.trim() && !isLoading.value) {
    isLoading.value = true;
    addImage(
      canvas,
      imageUrl.value,
      {
        left: Math.random() * 500,
        top: Math.random() * 300,
        scaleX: 0.5,
        scaleY: 0.5,
      },
      () => {
        // Success callback
        isLoading.value = false;
      },
      () => {
        // Error callback
        isLoading.value = false;
        alert("Failed to load image. Please check the URL.");
      }
    );
  }
};

const clearCanvas = () => {
  if (canvas) {
    clearCanvasLogic(canvas);
  }
};
</script>

<style scoped>
.demo-two-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-two-canvas-container{
  border-left: 4px solid var(--primary-color);
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-lg);
    background: #f8f9fa;
    padding: 30px;
    text-align: center;
}

.demo-two-canvas-container h2 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 2rem;
}

.demo-two-canvas-container h2 .material-icons{
  font-size: 3.25rem;
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

.text-controls,
.image-controls,
.action-controls {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.text-controls h3,
.image-controls h3,
.action-controls h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
  color: #495057;
}

.text-input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 200px;
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
  bottom: 1px;
}

.btn-primary {
  background: #6AAAEB;
  color: white;
}

.btn-primary:hover {
  background: #4a90d9;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-secondary {
  background: #031F3C;
  color: white;
}

.btn-secondary:hover {
  background: #021529;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn:disabled:hover {
  background: inherit;
}

.loading-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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

#demo-two-canvas {
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.info {
  background: #e3f2fd;
  padding: 15px;
  color: black;

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
.demo-two-canvas-container h2 {
  animation: titleFadeIn 1s ease-out;
}

.demo-two-canvas-container p {
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
.text-controls,
.image-controls,
.action-controls {
  animation: controlSectionFadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.text-controls { animation-delay: 0.1s; }
.image-controls { animation-delay: 0.2s; }
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
.text-controls h3,
.image-controls h3,
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

/* Input field animations */
.text-input {
  animation: inputFadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

.text-controls .text-input { animation-delay: 0.25s; }
.image-controls .text-input { animation-delay: 0.35s; }

@keyframes inputFadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Button staggered animations - only on initial mount */
.btn {
  animation: buttonFadeIn 0.5s ease-out;
  animation-fill-mode: both;
  animation-play-state: running;
}

.text-controls .btn { animation-delay: 0.3s; }
.image-controls .btn { animation-delay: 0.4s; }
.action-controls .btn { animation-delay: 0.45s; }

/* Prevent button re-animation after initial mount */
.btn.mounted {
  animation: none;
}

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

/* Loading spinner enhanced animation */
.loading-spinner {
  animation: spin 1s ease-in-out infinite, spinnerFadeIn 0.3s ease-out;
}

@keyframes spinnerFadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Canvas animation */
#demo-two-canvas {
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

.text-input:focus {
  animation: inputFocus 0.3s ease-out;
}

@keyframes inputFocus {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.02);
  }
}

/* Container animation */
.demo-two-container {
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

/* Enhanced disabled state animation */
.btn:disabled {
  animation: disabledPulse 2s infinite;
}

@keyframes disabledPulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
