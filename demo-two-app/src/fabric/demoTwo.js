// Demo Two: Text & Image Editor Logic
import { fabric } from 'fabric';

// Configure Fabric.js defaults (safer approach)
if (fabric.Object) {
  // Set default object properties without using prototype.set
  const originalObjectDefaults = fabric.Object.prototype;
  originalObjectDefaults.transparentCorners = false;
  originalObjectDefaults.cornerColor = '#0054C9';
  originalObjectDefaults.cornerStyle = 'circle';
  originalObjectDefaults.borderColor = '#0054C9';
  originalObjectDefaults.cornerSize = 10;
}

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
  canvas.selectionColor = 'rgba(0, 84, 201, 0.3)';
  canvas.selectionBorderColor = '#0054C9';
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
    // Remove textBaseline to let Fabric.js handle it automatically
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
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 */
export function addImage(canvas, imageUrl, options = {}, onSuccess = null, onError = null) {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        try {
          img.set({
            left: options.left || 200,
            top: options.top || 200,
            scaleX: options.scaleX || 0.5,
            scaleY: options.scaleY || 0.5,
          });

          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();

          if (onSuccess) onSuccess();
          resolve(img);
        } catch (error) {
          console.error('Error adding image to canvas:', error);
          if (onError) onError(error);
          reject(error);
        }
      },
      {
        crossOrigin: 'anonymous',
        // Add error handling in options
        onError: (error) => {
          console.error('Failed to load image:', error);
          if (onError) onError(error);
          reject(error);
        }
      }
    );
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
