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
        <p>Interactive shape creation and manipulation</p>
      </div>

      <!-- Demo One Controls -->
      <div class="demo-controls demo-one-controls">
        <div class="control-group">
          <label>Color:</label>
          <input v-model="demoOneColor" type="color" class="color-input" />
        </div>
        <div class="control-buttons">
          <button @click="addRectangleToOne" class="btn btn-primary">
            ➕ Rectangle
          </button>
          <button @click="addCircleToOne" class="btn btn-primary">
            ⭕ Circle
          </button>
          <button @click="addTriangleToOne" class="btn btn-primary">
            🔺 Triangle
          </button>
          <button @click="clearDemoOne" class="btn btn-secondary">
            🗑️ Clear
          </button>
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
        <p>Dynamic text and image editing capabilities</p>
      </div>

      <!-- Demo Two Controls -->
      <div class="demo-controls demo-two-controls">
        <div class="control-group">
          <label>Text:</label>
          <input
            v-model="demoTwoText"
            type="text"
            placeholder="Enter text"
            class="text-input"
          />
          <button @click="addTextToTwo" class="btn btn-primary">
            ➕ Add Text
          </button>
        </div>
        <div class="control-group">
          <label>Image URL:</label>
          <input
            v-model="demoTwoImageUrl"
            type="text"
            placeholder="Image URL"
            class="text-input"
          />
          <button
            @click="addImageToTwo"
            class="btn btn-success"
            :disabled="isLoadingImage"
          >
            {{ isLoadingImage ? "⏳ Loading..." : "🖼️ Add Image" }}
          </button>
        </div>
        <div class="control-buttons">
          <button @click="clearDemoTwo" class="btn btn-secondary">
            🗑️ Clear
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
        <p>Free-hand drawing and artistic creation</p>
      </div>

      <!-- Demo Three Controls -->
      <div class="demo-controls demo-three-controls">
        <div class="control-group">
          <label>Drawing Mode:</label>
          <button
            @click="toggleDrawingMode"
            :class="['btn', isDrawingMode ? 'btn-danger' : 'btn-success']"
          >
            {{ isDrawingMode ? "🛑 Stop Drawing" : "✏️ Start Drawing" }}
          </button>
        </div>
        <div class="control-group">
          <label>Brush Width:</label>
          <input
            v-model="brushWidth"
            type="range"
            min="1"
            max="20"
            class="range-input"
          />
          <span>{{ brushWidth }}px</span>
        </div>
        <div class="control-group">
          <label>Brush Color:</label>
          <input v-model="brushColor" type="color" class="color-input" />
        </div>
        <div class="control-buttons">
          <button @click="clearDemoThree" class="btn btn-secondary">
            🗑️ Clear
          </button>
        </div>
      </div>

      <div class="demo-canvas-container">
        <canvas id="demo-three-canvas"></canvas>
      </div>
    </section>

    <!-- Info Section -->
    <div class="info">
      <p><strong>Micro Frontend Architecture Demo:</strong></p>
      <ul>
        <li>Each demo runs independently with its own Fabric.js canvas</li>
        <li>Demonstrates isolated micro frontend functionality</li>
        <li>All demos load automatically and showcase their core features</li>
        <li>Perfect for demonstrating the full capabilities of the system</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Reactive state for controls
const demoOneColor = ref("#0054C9");
const demoTwoText = ref("Hello World!");
const demoTwoImageUrl = ref("https://picsum.photos/200/150");
const isLoadingImage = ref(false);
const isDrawingMode = ref(false);
const brushWidth = ref(5);
const brushColor = ref("#ef4444");

// Canvas references
let demoOneCanvas = null;
let demoTwoCanvas = null;
let demoThreeCanvas = null;

// Demo modules
let demoOneModule = null;
let demoTwoModule = null;
let demoThreeModule = null;

onMounted(async () => {
  console.log("All Demos page mounted, initializing all demos...");

  // Initialize all demos
  await initializeDemoOne();
  await initializeDemoTwo();
  await initializeDemoThree();
});

onUnmounted(() => {
  // Clean up all canvases
  if (demoOneCanvas && demoOneCanvas.dispose) {
    demoOneCanvas.dispose();
  }
  if (demoTwoCanvas && demoTwoCanvas.dispose) {
    demoTwoCanvas.dispose();
  }
  if (demoThreeCanvas && demoThreeCanvas.dispose) {
    demoThreeCanvas.dispose();
  }
});

// Initialize Demo One
const initializeDemoOne = async () => {
  try {
    // Import demo one module
    demoOneModule = await import("demoOneApp/demoOneLogic");

    // Initialize canvas
    demoOneCanvas = demoOneModule.initDemoOneCanvas("demo-one-canvas");

    // Add some sample content
    setTimeout(() => {
      if (demoOneCanvas && demoOneModule) {
        // Add sample shapes
        demoOneModule.addRectangle(demoOneCanvas, {
          left: 50,
          top: 50,
          fill: "#0054C9",
        });
        demoOneModule.addCircle(demoOneCanvas, {
          left: 200,
          top: 100,
          fill: "#6AAAEB",
        });
        demoOneModule.addTriangle(demoOneCanvas, {
          left: 350,
          top: 80,
          fill: "#031F3C",
        });
      }
    }, 500);

    console.log("Demo One initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Demo One:", error);
  }
};

// Initialize Demo Two
const initializeDemoTwo = async () => {
  try {
    // Import demo two module
    demoTwoModule = await import("demoTwoApp/demoTwoLogic");

    // Initialize canvas
    demoTwoCanvas = demoTwoModule.initDemoTwoCanvas("demo-two-canvas");

    // Add some sample content
    setTimeout(() => {
      if (demoTwoCanvas && demoTwoModule) {
        // Add sample text
        demoTwoModule.addText(demoTwoCanvas, {
          text: "Welcome to Demo Two!",
          left: 50,
          top: 50,
          fontSize: 28,
          fill: "#0054C9",
        });

        // Add sample image
        demoTwoModule.addImage(demoTwoCanvas, "https://picsum.photos/150/100", {
          left: 300,
          top: 150,
          scaleX: 0.8,
          scaleY: 0.8,
        });
      }
    }, 1000);

    console.log("Demo Two initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Demo Two:", error);
  }
};

// Initialize Demo Three
const initializeDemoThree = async () => {
  try {
    // Import demo three module
    demoThreeModule = await import("demoThreeApp/demoThreeLogic");

    // Initialize canvas
    demoThreeCanvas = demoThreeModule.initDemoThreeCanvas("demo-three-canvas");

    // Add some sample content
    setTimeout(() => {
      if (demoThreeCanvas && demoThreeModule) {
        // Enable drawing mode briefly to show capability
        demoThreeModule.setDrawingMode(demoThreeCanvas, true);

        // Add some sample drawing paths or disable after showing
        setTimeout(() => {
          demoThreeModule.setDrawingMode(demoThreeCanvas, false);
        }, 2000);
      }
    }, 1500);

    console.log("Demo Three initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Demo Three:", error);
  }
};

// Global Control Functions
const clearAllCanvases = () => {
  if (demoOneCanvas && demoOneModule) {
    demoOneModule.clearCanvas(demoOneCanvas);
  }
  if (demoTwoCanvas && demoTwoModule) {
    demoTwoModule.clearCanvas(demoTwoCanvas);
  }
  if (demoThreeCanvas && demoThreeModule) {
    demoThreeModule.clearCanvas(demoThreeCanvas);
  }
  console.log("All canvases cleared");
};

const deleteSelectedFromAll = () => {
  if (demoOneCanvas && demoOneCanvas.getActiveObject()) {
    demoOneCanvas.remove(demoOneCanvas.getActiveObject());
    demoOneCanvas.renderAll();
  }
  if (demoTwoCanvas && demoTwoCanvas.getActiveObject()) {
    demoTwoCanvas.remove(demoTwoCanvas.getActiveObject());
    demoTwoCanvas.renderAll();
  }
  if (demoThreeCanvas && demoThreeCanvas.getActiveObject()) {
    demoThreeCanvas.remove(demoThreeCanvas.getActiveObject());
    demoThreeCanvas.renderAll();
  }
  console.log("Selected objects deleted from all canvases");
};

const resetAllDemos = async () => {
  clearAllCanvases();

  // Re-add sample content after a short delay
  setTimeout(() => {
    // Reset Demo One
    if (demoOneCanvas && demoOneModule) {
      demoOneModule.addRectangle(demoOneCanvas, {
        left: 50,
        top: 50,
        fill: demoOneColor.value,
      });
      demoOneModule.addCircle(demoOneCanvas, {
        left: 200,
        top: 100,
        fill: "#6AAAEB",
      });
      demoOneModule.addTriangle(demoOneCanvas, {
        left: 350,
        top: 80,
        fill: "#031F3C",
      });
    }

    // Reset Demo Two
    if (demoTwoCanvas && demoTwoModule) {
      demoTwoModule.addText(demoTwoCanvas, {
        text: "Welcome to Demo Two!",
        left: 50,
        top: 50,
        fontSize: 28,
        fill: "#0054C9",
      });
      demoTwoModule.addImage(demoTwoCanvas, "https://picsum.photos/150/100", {
        left: 300,
        top: 150,
        scaleX: 0.8,
        scaleY: 0.8,
      });
    }
  }, 300);
};

// Demo One Control Functions
const addRectangleToOne = () => {
  if (demoOneCanvas && demoOneModule) {
    demoOneModule.addRectangle(demoOneCanvas, {
      left: Math.random() * 400,
      top: Math.random() * 300,
      fill: demoOneColor.value,
    });
  }
};

const addCircleToOne = () => {
  if (demoOneCanvas && demoOneModule) {
    demoOneModule.addCircle(demoOneCanvas, {
      left: Math.random() * 400,
      top: Math.random() * 300,
      fill: demoOneColor.value,
    });
  }
};

const addTriangleToOne = () => {
  if (demoOneCanvas && demoOneModule) {
    demoOneModule.addTriangle(demoOneCanvas, {
      left: Math.random() * 400,
      top: Math.random() * 300,
      fill: demoOneColor.value,
    });
  }
};

const clearDemoOne = () => {
  if (demoOneCanvas && demoOneModule) {
    demoOneModule.clearCanvas(demoOneCanvas);
  }
};

// Demo Two Control Functions
const addTextToTwo = () => {
  if (demoTwoCanvas && demoTwoModule && demoTwoText.value.trim()) {
    demoTwoModule.addText(demoTwoCanvas, {
      text: demoTwoText.value,
      left: Math.random() * 400,
      top: Math.random() * 300,
      fontSize: 24,
      fill: "#0054C9",
    });
  }
};

const addImageToTwo = async () => {
  if (
    demoTwoCanvas &&
    demoTwoModule &&
    demoTwoImageUrl.value.trim() &&
    !isLoadingImage.value
  ) {
    isLoadingImage.value = true;
    try {
      await demoTwoModule.addImage(
        demoTwoCanvas,
        demoTwoImageUrl.value,
        {
          left: Math.random() * 300,
          top: Math.random() * 200,
          scaleX: 0.5,
          scaleY: 0.5,
        },
        () => {
          isLoadingImage.value = false;
        },
        () => {
          isLoadingImage.value = false;
          alert("Failed to load image. Please check the URL.");
        }
      );
    } catch (error) {
      isLoadingImage.value = false;
      console.error("Error adding image:", error);
    }
  }
};

const clearDemoTwo = () => {
  if (demoTwoCanvas && demoTwoModule) {
    demoTwoModule.clearCanvas(demoTwoCanvas);
  }
};

// Demo Three Control Functions
const toggleDrawingMode = () => {
  if (demoThreeCanvas && demoThreeModule) {
    isDrawingMode.value = !isDrawingMode.value;
    demoThreeModule.setDrawingMode(demoThreeCanvas, isDrawingMode.value);

    if (isDrawingMode.value) {
      demoThreeModule.setBrushWidth(demoThreeCanvas, brushWidth.value);
      demoThreeModule.setBrushColor(demoThreeCanvas, brushColor.value);
    }
  }
};

const clearDemoThree = () => {
  if (demoThreeCanvas && demoThreeModule) {
    demoThreeModule.clearCanvas(demoThreeCanvas);
    isDrawingMode.value = false;
  }
};

// Watch for brush changes
import { watch } from "vue";

watch(brushWidth, (newWidth) => {
  if (demoThreeCanvas && demoThreeModule && isDrawingMode.value) {
    demoThreeModule.setBrushWidth(demoThreeCanvas, newWidth);
  }
});

watch(brushColor, (newColor) => {
  if (demoThreeCanvas && demoThreeModule && isDrawingMode.value) {
    demoThreeModule.setBrushColor(demoThreeCanvas, newColor);
  }
});
</script>

<style scoped>
.all-demos-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demos-header {
  text-align: center;
  margin-bottom: 40px;
}

.demos-header h1 {
  color: #0054c9;
  margin-bottom: 10px;
  font-size: 2.5em;
}

.demos-header p {
  color: #495057;
  font-size: 1.2em;
}

/* Global Controls */
.global-controls {
  background: #f8f9fa;
  border: 2px solid #0054c9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
}

.global-controls h3 {
  color: #0054c9;
  margin-bottom: 15px;
  font-size: 1.4em;
}

.global-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.global-buttons .btn {
  font-size: 1.1em;
  padding: 12px 20px;
  min-width: 180px;
}

.demo-section {
  margin-bottom: 50px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.demo-one-section {
  border-left: 6px solid #0054c9;
}

.demo-two-section {
  border-left: 6px solid #6aaaeb;
}

.demo-three-section {
  border-left: 6px solid #f59e0b;
}

.demo-header {
  text-align: center;
  margin-bottom: 25px;
}

.demo-header h2 {
  margin: 0 0 10px 0;
  font-size: 1.8em;
}

.demo-one-section .demo-header h2 {
  color: #0054c9;
}

.demo-two-section .demo-header h2 {
  color: #6aaaeb;
}

.demo-three-section .demo-header h2 {
  color: #f59e0b;
}

.demo-header p {
  color: #6c757d;
  font-size: 1.1em;
  margin: 0;
}

/* Demo Controls */
.demo-controls {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-one-controls {
  border-left: 4px solid #0054c9;
}

.demo-two-controls {
  border-left: 4px solid #6aaaeb;
}

.demo-three-controls {
  border-left: 4px solid #f59e0b;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.control-group label {
  font-weight: 600;
  color: #495057;
  min-width: 80px;
}

.control-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.text-input {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
}

.text-input:focus {
  outline: none;
  border-color: #0054c9;
}

.color-input {
  width: 50px;
  height: 40px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  cursor: pointer;
}

.range-input {
  width: 120px;
  margin: 0 10px;
}

/* Button Styles */
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-primary {
  background: #0054c9;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #003d96;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-warning:hover:not(:disabled) {
  background: #d97706;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn-secondary {
  background: #031f3c;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #021529;
}

.demo-canvas-container {
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

canvas {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  max-width: 100%;
  height: auto;
}

.info {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #0054c9;
  margin-top: 30px;
}

.info ul {
  margin: 10px 0 0 20px;
}

.info li {
  margin: 8px 0;
  line-height: 1.5;
}

/* Responsive design */
@media (max-width: 768px) {
  .all-demos-container {
    padding: 15px;
  }

  .demo-section {
    padding: 20px;
    margin-bottom: 30px;
  }

  .demos-header h1 {
    font-size: 2em;
  }

  .demo-header h2 {
    font-size: 1.5em;
  }

  .global-buttons {
    flex-direction: column;
    align-items: center;
  }

  .global-buttons .btn {
    min-width: 250px;
  }

  .control-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .control-group label {
    min-width: auto;
  }

  .control-buttons {
    justify-content: flex-start;
  }

  .text-input {
    min-width: 100%;
  }

  .range-input {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
