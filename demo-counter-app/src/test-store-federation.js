/**
 * Test script to verify direct Zustand store federation
 * This demonstrates how the demo-counter app can directly access
 * the Zustand store from the shell app without any interface layer
 */

export async function testStoreFederation() {
  try {
    console.log('🧪 Testing direct Zustand store federation...')
    
    // Import the Zustand store directly from shell app
    const { useCommonStore } = await import('shellApp/store')
    
    console.log('✅ Successfully imported store from shell app')
    console.log('Store instance:', useCommonStore)
    
    // Get current state
    const initialState = useCommonStore.getState()
    console.log('📊 Initial state:', {
      num: initialState.num,
      doubleNum: initialState.doubleNum,
      isZero: initialState.isZero,
      isPositive: initialState.isPositive
    })
    
    // Test store actions
    console.log('🔄 Testing store actions...')
    
    // Increment
    useCommonStore.getState().increment()
    console.log('After increment:', useCommonStore.getState().num)
    
    // Increment by amount
    useCommonStore.getState().incrementBy(5)
    console.log('After incrementBy(5):', useCommonStore.getState().num)
    
    // Test computed values
    const state = useCommonStore.getState()
    console.log('📈 Computed values:', {
      doubleNum: state.doubleNum,
      isPositive: state.isPositive,
      absoluteNum: state.absoluteNum
    })
    
    // Test subscription
    console.log('🔔 Testing subscription...')
    const unsubscribe = useCommonStore.subscribe((state) => {
      console.log('📢 Store changed! New value:', state.num)
    })
    
    // Trigger a change to test subscription
    useCommonStore.getState().decrement()
    
    // Clean up
    unsubscribe()
    
    // Reset for clean state
    useCommonStore.getState().reset()
    console.log('🔄 Reset to:', useCommonStore.getState().num)
    
    console.log('✅ All tests passed! Direct store federation is working correctly.')
    
    return {
      success: true,
      store: useCommonStore,
      message: 'Direct Zustand store federation is working!'
    }
    
  } catch (error) {
    console.error('❌ Store federation test failed:', error)
    return {
      success: false,
      error: error.message,
      message: 'Store federation failed!'
    }
  }
}

// Auto-run test when module is imported
if (typeof window !== 'undefined') {
  console.log('🚀 Auto-running store federation test...')
  testStoreFederation()
}
