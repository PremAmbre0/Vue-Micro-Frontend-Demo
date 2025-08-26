<template>
  <div class="demo-one-container">
    <div class="demo-one-canvas-container">
    <h2><span class="material-icons">category</span> Demo One: Basic Shapes & Drawing</h2>
    <p>Create and manipulate basic shapes with Fabric.js</p>

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

    <div class="canvas-container">
      <canvas id="demo-one-canvas"></canvas>
    </div>
  </div>

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
</style>
