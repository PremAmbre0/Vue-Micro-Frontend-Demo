// Demo Three: Interactive Canvas Logic
import { fabric } from 'fabric';

/**
 * Initialize Fabric.js canvas for Demo Three
 * @param {string} canvasId - The canvas element ID
 * @returns {fabric.Canvas} - The initialized canvas
 */
export function initDemoThreeCanvas(canvasId) {
  const canvas = new fabric.Canvas(canvasId, {
    width: 800,
    height: 600,
    backgroundColor: '#f0f0f0'
  });

  // Add some default styling
  canvas.selectionColor = 'rgba(239, 68, 68, 0.3)';
  canvas.selectionBorderColor = '#ef4444';
  canvas.selectionLineWidth = 2;

  // Enable object controls
  canvas.selection = true;

  return canvas;
}

/**
 * Add interactive rectangle
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {Object} options - Rectangle options
 */
export function addInteractiveRect(canvas, options = {}) {
  const rect = new fabric.Rect({
    left: options.left || 100,
    top: options.top || 100,
    width: options.width || 100,
    height: options.height || 80,
    fill: options.fill || '#ef4444',
    stroke: options.stroke || '#dc2626',
    strokeWidth: options.strokeWidth || 2,
    rx: options.rx || 5,
    ry: options.ry || 5,
    // Enable interactions
    selectable: true,
    evented: true,
    hasControls: true,
    hasBorders: true,
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
  return rect;
}

/**
 * Group selected objects
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function groupSelected(canvas) {
  const activeSelection = canvas.getActiveSelection();
  if (activeSelection && activeSelection.type === 'activeSelection') {
    const group = activeSelection.toGroup();
    canvas.requestRenderAll();
    return group;
  }
  return null;
}

/**
 * Ungroup selected group
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function ungroupSelected(canvas) {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'group') {
    activeObject.toActiveSelection();
    canvas.requestRenderAll();
    return true;
  }
  return false;
}

/**
 * Enable drawing mode
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {boolean} enabled - Enable/disable drawing
 */
export function setDrawingMode(canvas, enabled) {
  canvas.isDrawingMode = enabled;
  if (enabled) {
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = '#ef4444';
  }
}

/**
 * Clear the entire canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function clearCanvas(canvas) {
  canvas.clear();
  canvas.backgroundColor = '#f0f0f0';
  canvas.renderAll();
}

/**
 * Delete selected object
 * @param {fabric.Canvas} canvas - The fabric canvas
 */
export function deleteSelected(canvas) {
  const activeObjects = canvas.getActiveObjects();
  if (activeObjects.length) {
    activeObjects.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.renderAll();
  }
}

// Export all functions as default object
export default {
  initDemoThreeCanvas,
  addInteractiveRect,
  groupSelected,
  ungroupSelected,
  setDrawingMode,
  clearCanvas,
  deleteSelected
};
