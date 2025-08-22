import { useCommonStore } from '../stores/common.store.js'
import { getActivePinia } from 'pinia'

/**
 * Counter Interface for Shell App
 * Provides access to the common store's counter functionality
 * for other micro frontends to consume
 *
 * Uses singleton pattern for better performance and consistency
 */

let storeInstance = null

/**
 * Get the store instance (singleton pattern)
 * @returns {Object} The Pinia store instance
 */
const getStore = () => {
  if (!storeInstance) {
    // Check if Pinia is active before trying to use the store
    const pinia = getActivePinia()
    if (!pinia) {
      console.warn('[Counter Interface]: Pinia is not active yet. Shell App may still be initializing.')
      throw new Error('[Counter Interface]: Pinia is not active. Make sure the Shell App is fully loaded.')
    }
    console.log('[Counter Interface]: Pinia is active, creating store instance')
    storeInstance = useCommonStore()
    console.log('[Counter Interface]: Store instance created successfully')
  }
  return storeInstance
}

export const counterInterface = {
  /**
   * Check if the interface is ready to use
   * @returns {boolean} True if Pinia is active and store can be used
   */
  isReady: () => {
    try {
      return !!getActivePinia()
    } catch {
      return false
    }
  },

  /**
   * Get the current counter value
   * @returns {number} Current counter value
   */
  getValue: () => getStore().num,

  /**
   * Set the counter to a specific value
   * @param {number} value - The value to set
   */
  setValue: (value) => getStore().setNum(value),

  /**
   * Increment the counter by 1
   */
  increment: () => getStore().increment(),

  /**
   * Decrement the counter by 1
   */
  decrement: () => getStore().decrement(),

  /**
   * Reset the counter to 0
   */
  reset: () => getStore().reset(),

  /**
   * Increment the counter by a specific amount
   * @param {number} amount - Amount to increment by
   */
  incrementBy: (amount) => getStore().incrementBy(amount),

  /**
   * Decrement the counter by a specific amount
   * @param {number} amount - Amount to decrement by
   */
  decrementBy: (amount) => getStore().decrementBy(amount),

  /**
   * Get computed values from the store
   * @returns {Object} Object containing computed values
   */
  getComputedValues: () => {
    const store = getStore()
    return {
      doubleNum: store.doubleNum,
      isPositive: store.isPositive,
      isNegative: store.isNegative,
      isZero: store.isZero,
      numString: store.numString,
      absoluteNum: store.absoluteNum
    }
  },

  /**
   * Subscribe to counter changes
   * @param {Function} callback - Callback function to execute on changes
   * @returns {Function} Unsubscribe function
   */
  subscribe: (callback) => getStore().$subscribe((mutation, state) => {
    callback(state.num, mutation)
  }),

  /**
   * Get the store instance directly (for advanced use cases)
   * @returns {Object} The Pinia store instance
   */
  getStore: () => getStore(),

  /**
   * Force refresh the store instance (useful for testing or debugging)
   * @returns {Object} The refreshed store instance
   */
  _refresh: () => {
    storeInstance = null
    return getStore()
  }
}
