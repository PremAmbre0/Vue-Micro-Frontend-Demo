// Demo One: Basic Shapes & Drawing Logic
import { fabric } from 'fabric';

/**
 * Initialize Fabric.js canvas for Demo One
 * @param {string} canvasId - The canvas element ID
 * @returns {fabric.Canvas} - The initialized canvas
 */
export function initDemoOneCanvas(canvasId) {
  const canvas = new fabric.Canvas(canvasId, {
    width: 800,
    height: 600,
    backgroundColor: '#f8f9fa'
  });

  // Add some default styling
  canvas.selectionColor = 'rgba(66, 184, 131, 0.3)';
  canvas.selectionBorderColor = '#42b883';
  canvas.selectionLineWidth = 2;

  return canvas;
}

/**
 * Add a rectangle to the canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {Object} options - Rectangle options
 */
export function addRectangle(canvas, options = {}) {
  const rect = new fabric.Rect({
    left: options.left || 100,
    top: options.top || 100,
    width: options.width || 100,
    height: options.height || 80,
    fill: options.fill || '#42b883',
    stroke: options.stroke || '#369970',
    strokeWidth: options.strokeWidth || 2,
    rx: options.rx || 5,
    ry: options.ry || 5,
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
  return rect;
}

/**
 * Add a circle to the canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {Object} options - Circle options
 */
export function addCircle(canvas, options = {}) {
  const circle = new fabric.Circle({
    left: options.left || 200,
    top: options.top || 150,
    radius: options.radius || 50,
    fill: options.fill || '#3b82f6',
    stroke: options.stroke || '#2563eb',
    strokeWidth: options.strokeWidth || 2,
  });

  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.renderAll();
  return circle;
}

/**
 * Add a triangle to the canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {Object} options - Triangle options
 */
export function addTriangle(canvas, options = {}) {
  const triangle = new fabric.Triangle({
    left: options.left || 300,
    top: options.top || 100,
    width: options.width || 80,
    height: options.height || 80,
    fill: options.fill || '#ef4444',
    stroke: options.stroke || '#dc2626',
    strokeWidth: options.strokeWidth || 2,
  });

  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  canvas.renderAll();
  return triangle;
}

/**
 * Change the fill color of the selected object
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {string} color - The new color
 */
export function changeSelectedColor(canvas, color) {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set('fill', color);
    canvas.renderAll();
  }
}

/**
 * Clear the entire canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function clearCanvas(canvas) {
  canvas.clear();
  canvas.backgroundColor = '#f8f9fa';
  canvas.renderAll();
}

/**
 * Delete the selected object
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function deleteSelected(canvas) {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.renderAll();
  }
}

/**
 * Get canvas data as JSON
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @returns {string} - JSON representation of the canvas
 */
export function getCanvasData(canvas) {
  return JSON.stringify(canvas.toJSON());
}

/**
 * Load canvas data from JSON
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {string} jsonData - JSON data to load
 */
export function loadCanvasData(canvas, jsonData) {
  canvas.loadFromJSON(jsonData, () => {
    canvas.renderAll();
  });
}

// Export all functions as default object
export default {
  initDemoOneCanvas,
  addRectangle,
  addCircle,
  addTriangle,
  changeSelectedColor,
  clearCanvas,
  deleteSelected,
  getCanvasData,
  loadCanvasData
};
