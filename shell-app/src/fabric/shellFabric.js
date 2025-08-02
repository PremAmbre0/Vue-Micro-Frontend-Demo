// Shell App Fabric.js Logic
// This file handles canvas initialization for the shell app

let fabricInstance = null;

/**
 * Initialize Fabric.js canvas from HTML canvas element
 * @param {string} canvasId - The HTML canvas element ID
 * @param {Object} options - Canvas options
 * @returns {Promise<Object>} - The initialized Fabric.js canvas or null
 */
export async function initializeFabricCanvas(canvasId, options = {}) {
  try {
    // Try to import Fabric.js with correct syntax for v5.3.0
    const { fabric } = await import('fabric');

    if (!fabric || !fabric.Canvas) {
      throw new Error('Fabric.js not available');
    }
    
    // Store fabric instance for later use
    fabricInstance = fabric;
    
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasId, {
      width: options.width || 800,
      height: options.height || 600,
      backgroundColor: options.backgroundColor || '#ffffff',
      ...options
    });
    
    console.log('Shell Fabric.js canvas initialized successfully');
    return canvas;
  } catch (error) {
    console.error('Failed to initialize Fabric.js canvas in shell app:', error);
    return null;
  }
}

/**
 * Check if Fabric.js is available
 * @returns {boolean} - Whether Fabric.js is available
 */
export function isFabricAvailable() {
  return fabricInstance !== null;
}

/**
 * Get the Fabric.js instance
 * @returns {Object|null} - The Fabric.js instance or null
 */
export function getFabricInstance() {
  return fabricInstance;
}

/**
 * Try to make Fabric.js available by importing it
 * @returns {Promise<boolean>} - Whether Fabric.js was successfully loaded
 */
export async function ensureFabricAvailable() {
  if (fabricInstance) return true;

  try {
    const { fabric } = await import('fabric');

    if (fabric && fabric.Canvas) {
      fabricInstance = fabric;
      console.log('Fabric.js loaded successfully in shell app');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to load Fabric.js in shell app:', error);
    return false;
  }
}

/**
 * Clear the canvas
 * @param {Object} canvas - The Fabric.js canvas
 */
export function clearCanvas(canvas) {
  if (canvas && canvas.clear) {
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
  }
}

export default {
  initializeFabricCanvas,
  isFabricAvailable,
  getFabricInstance,
  ensureFabricAvailable,
  clearCanvas
};
