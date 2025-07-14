import { ref } from 'vue'
import { storeToRefs } from 'pinia'

export function useShellStore() {
  const store = ref(null)
  const loaded = ref(false)
  
  const loadStore = async () => {
    try {
      const { useCommonStore } = await import('shellApp/commonStore')
      store.value = useCommonStore()
      loaded.value = true
      return store.value
    } catch (error) {
      console.error('Failed to load shell store:', error)
      throw error
    }
  }
  
  return {
    store,
    loaded,
    loadStore
  }
}