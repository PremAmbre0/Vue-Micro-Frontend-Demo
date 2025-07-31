<template>
  <div class="demo-three-container">
    <h2>🎯 Demo Three: Interactive Canvas</h2>
    <p>Advanced interactions and object manipulation with Fabric.js</p>
    
    <div class="controls">
      <div class="object-controls">
        <h3>Add Objects</h3>
        <button @click="addRect" class="btn btn-primary">Add Rectangle</button>
        <button @click="addCircle" class="btn btn-success">Add Circle</button>
      </div>
      
      <div class="interaction-controls">
        <h3>Interactions</h3>
        <button @click="groupObjects" class="btn btn-info">Group Selected</button>
        <button @click="ungroupObjects" class="btn btn-warning">Ungroup</button>
        <button @click="toggleDrawing" :class="['btn', drawingMode ? 'btn-danger' : 'btn-secondary']">
          {{ drawingMode ? 'Stop Drawing' : 'Start Drawing' }}
        </button>
      </div>
      
      <div class="action-controls">
        <h3>Actions</h3>
        <button @click="deleteSelected" class="btn btn-warning">Delete Selected</button>
        <button @click="clearCanvas" class="btn btn-secondary">Clear Canvas</button>
      </div>
    </div>
    
    <div class="canvas-container">
      <canvas id="demo-three-canvas"></canvas>
    </div>
    
    <div class="info">
      <p><strong>Instructions:</strong></p>
      <ul>
        <li>Click buttons to add interactive objects to the canvas</li>
        <li>Click and drag objects to move them around</li>
        <li>Use corner handles to resize objects</li>
        <li>Hold Ctrl/Cmd and click multiple objects to select them</li>
        <li>Use "Group Selected" to group multiple objects together</li>
        <li>Use "Start Drawing" to enable free drawing mode</li>
        <li>Use "Delete Selected" to remove selected objects</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { fabric } from 'fabric'
import {
  initDemoThreeCanvas,
  addInteractiveRect,
  groupSelected,
  ungroupSelected,
  setDrawingMode,
  clearCanvas as clearCanvasLogic,
  deleteSelected as deleteSelectedLogic
} from '../fabric/demoThree.js'

const drawingMode = ref(false)
let canvas = null

onMounted(() => {
  // Initialize the canvas
  canvas = initDemoThreeCanvas('demo-three-canvas')
  
  // Add some default interactive objects for demonstration
  setTimeout(() => {
    addInteractiveRect(canvas, { left: 50, top: 50, fill: '#ef4444' })
    
    // Add a circle
    const circle = new fabric.Circle({
      left: 200,
      top: 100,
      radius: 40,
      fill: '#10b981',
      stroke: '#059669',
      strokeWidth: 2,
      selectable: true,
      evented: true,
      hasControls: true,
      hasBorders: true,
    })
    canvas.add(circle)
    
    // Add a triangle
    const triangle = new fabric.Triangle({
      left: 350,
      top: 80,
      width: 60,
      height: 60,
      fill: '#3b82f6',
      stroke: '#2563eb',
      strokeWidth: 2,
      selectable: true,
      evented: true,
      hasControls: true,
      hasBorders: true,
    })
    canvas.add(triangle)
    
    canvas.renderAll()
  }, 100)
})

onUnmounted(() => {
  if (canvas) {
    canvas.dispose()
  }
})

// Methods
const addRect = () => {
  if (canvas) {
    addInteractiveRect(canvas, {
      left: Math.random() * 600,
      top: Math.random() * 400,
      fill: `hsl(${Math.random() * 360}, 70%, 60%)`
    })
  }
}

const addCircle = () => {
  if (canvas) {
    const circle = new fabric.Circle({
      left: Math.random() * 600,
      top: Math.random() * 400,
      radius: 30 + Math.random() * 30,
      fill: `hsl(${Math.random() * 360}, 70%, 60%)`,
      stroke: '#333',
      strokeWidth: 2,
      selectable: true,
      evented: true,
      hasControls: true,
      hasBorders: true,
    })
    canvas.add(circle)
    canvas.setActiveObject(circle)
    canvas.renderAll()
  }
}

const groupObjects = () => {
  if (canvas) {
    groupSelected(canvas)
  }
}

const ungroupObjects = () => {
  if (canvas) {
    ungroupSelected(canvas)
  }
}

const toggleDrawing = () => {
  if (canvas) {
    drawingMode.value = !drawingMode.value
    setDrawingMode(canvas, drawingMode.value)
  }
}

const deleteSelected = () => {
  if (canvas) {
    deleteSelectedLogic(canvas)
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

.demo-three-container h2 {
  color: #ef4444;
  margin-bottom: 10px;
}

.controls {
  display: flex;
  gap: 30px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.object-controls,
.interaction-controls,
.action-controls {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.object-controls h3,
.interaction-controls h3,
.action-controls h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
  color: #495057;
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
  background: #3b82f6;
  color: white;
}

.btn-info:hover {
  background: #2563eb;
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
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.canvas-container {
  margin: 20px 0;
  text-align: center;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  background: white;
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
