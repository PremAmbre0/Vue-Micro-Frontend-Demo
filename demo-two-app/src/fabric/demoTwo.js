// Demo Two: Text & Image Editor Logic
import { fabric } from 'fabric';

/**
 * Initialize Fabric.js canvas for Demo Two
 * @param {string} canvasId - The canvas element ID
 * @returns {fabric.Canvas} - The initialized canvas
 */
export function initDemoTwoCanvas(canvasId) {
  const canvas = new fabric.Canvas(canvasId, {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff'
  });

  // Add some default styling
  canvas.selectionColor = 'rgba(59, 130, 246, 0.3)';
  canvas.selectionBorderColor = '#3b82f6';
  canvas.selectionLineWidth = 2;

  return canvas;
}

/**
 * Add text to the canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {Object} options - Text options
 */
export function addText(canvas, options = {}) {
  const text = new fabric.Text(options.text || 'Sample Text', {
    left: options.left || 100,
    top: options.top || 100,
    fontFamily: options.fontFamily || 'Arial',
    fontSize: options.fontSize || 24,
    fill: options.fill || '#333333',
    fontWeight: options.fontWeight || 'normal',
    fontStyle: options.fontStyle || 'normal',
  });

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
  return text;
}

/**
 * Add image to the canvas
 * @param {fabric.Canvas} canvas - The fabric canvas
 * @param {string} imageUrl - Image URL
 * @param {Object} options - Image options
 */
export function addImage(canvas, imageUrl, options = {}) {
  fabric.Image.fromURL(imageUrl, (img) => {
    img.set({
      left: options.left || 200,
      top: options.top || 200,
      scaleX: options.scaleX || 0.5,
      scaleY: options.scaleY || 0.5,
    });
    
    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();
  });
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

// Export all functions as default object
export default {
  initDemoTwoCanvas,
  addText,
  addImage,
  clearCanvas
};
