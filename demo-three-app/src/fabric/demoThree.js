// Demo Three: Drawing Canvas Logic
import { fabric } from 'fabric';

/**
 * Initialize Fabric.js canvas for Demo Three (Drawing Mode)
 * @param {string} canvasId - The canvas element ID
 * @returns {fabric.Canvas} - The initialized canvas
 */
export function initDemoThreeCanvas(canvasId) {
  const canvas = new fabric.Canvas(canvasId, {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff'
  });

  // Set up drawing brush defaults
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = '#ef4444';
  canvas.isDrawingMode = false; // Start with drawing mode off

  return canvas;
}

/**
 * Toggle drawing mode on/off
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {boolean} enabled - Enable/disable drawing
 */
export function setDrawingMode(canvas, enabled) {
  canvas.isDrawingMode = enabled;
}

/**
 * Set brush width
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {number} width - Brush width (1-50)
 */
export function setBrushWidth(canvas, width) {
  canvas.freeDrawingBrush.width = Math.max(1, Math.min(50, width));
}

/**
 * Set brush color
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {string} color - Brush color
 */
export function setBrushColor(canvas, color) {
  canvas.freeDrawingBrush.color = color;
}

/**
 * Get current drawing mode status
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @returns {boolean} - Whether drawing mode is enabled
 */
export function isDrawingMode(canvas) {
  return canvas.isDrawingMode;
}

/**
 * Clear the entire canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function clearCanvas(canvas) {
  canvas.clear();
  canvas.backgroundColor = '#ffffff';
  canvas.renderAll();
}

/**
 * Undo last drawing stroke (if possible)
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function undoLastStroke(canvas) {
  const objects = canvas.getObjects();
  if (objects.length > 0) {
    canvas.remove(objects[objects.length - 1]);
    canvas.renderAll();
  }
}

// Export all functions as default object
export default {
  initDemoThreeCanvas,
  setDrawingMode,
  setBrushWidth,
  setBrushColor,
  isDrawingMode,
  clearCanvas,
  undoLastStroke
};
