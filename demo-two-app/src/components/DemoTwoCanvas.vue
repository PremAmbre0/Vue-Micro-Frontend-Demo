<template>
  <div class="demo-two-container">
    <h2>📝 Demo Two: Text & Image Editor</h2>
    <p>Add and edit text with image manipulation using Fabric.js</p>

    <div class="controls">
      <div class="text-controls">
        <h3>Add Text</h3>
        <input
          v-model="textInput"
          placeholder="Enter text"
          class="text-input"
          :disabled="isLoading"
        />
        <button
          @click="addTextToCanvas"
          class="btn btn-primary"
          :disabled="isLoading"
        >
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
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ isLoading ? "Loading..." : "Add Image" }}
        </button>
      </div>

      <div class="action-controls">
        <h3>Actions</h3>
        <button
          @click="clearCanvas"
          class="btn btn-secondary"
          :disabled="isLoading"
        >
          Clear Canvas
        </button>
      </div>
    </div>

    <div class="canvas-container">
      <canvas id="demo-two-canvas"></canvas>
    </div>

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
let canvas = null;

onMounted(() => {
  // Initialize the canvas
  canvas = initDemoTwoCanvas("demo-two-canvas");

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

<style>
.demo-two-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-two-container h2 {
  color: #6AAAEB;
  margin-bottom: 10px;
}

.controls {
  display: flex;
  gap: 30px;
  margin: 20px 0;
  flex-wrap: wrap;
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
</style>
