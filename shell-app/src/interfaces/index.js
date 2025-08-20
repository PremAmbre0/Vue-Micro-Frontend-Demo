/**
 * Shell App Interfaces
 * 
 * This module exports all available interfaces that can be consumed
 * by other micro frontends in the federation.
 * 
 * These interfaces provide a clean API for accessing shell app's
 * shared state and functionality.
 */

export { counterInterface } from './counter.js'

// Export a registry of all available interfaces for discovery
export const interfaceRegistry = {
  counter: 'counterInterface'
}

// Export version information for compatibility checking
export const interfaceVersion = '1.0.0'
