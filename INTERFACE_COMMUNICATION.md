# Micro Frontend Interface Communication

This document explains how micro frontends in this project communicate through shared interfaces, specifically demonstrating the counter state sharing between the Shell App and Demo Counter App.

## 🏗️ Architecture Overview

The interface system allows micro frontends to share state and functionality in a clean, decoupled manner:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Shell App     │    │   Interfaces     │    │ Demo Counter    │
│                 │    │                  │    │     App         │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │ Pinia Store │◄┼────┼─│ counter.js   │◄┼────┼─│ CounterDemo │ │
│ │ (common)    │ │    │ │              │ │    │ │ Component   │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📁 File Structure

```
shell-app/
├── src/
│   ├── interfaces/           # 🆕 Interface definitions
│   │   ├── index.js         # Main interface exports
│   │   └── counter.js       # Counter interface implementation
│   ├── stores/
│   │   └── common.store.js  # Pinia store with counter state
│   └── vite.config.js       # Exposes interfaces via Module Federation
│
demo-counter-app/
├── src/
│   ├── components/
│   │   └── CounterDemo.vue  # Component that uses shell interfaces
│   └── vite.config.js       # Imports shell interfaces
```

## 🔧 Implementation Details

### 1. Interface Definition (Shell App)

**`shell-app/src/interfaces/counter.js`**
```javascript
import { useCommonStore } from '../stores/common.store.js'

export const counterInterface = {
  // Get current value
  getValue() {
    const store = useCommonStore()
    return store.num
  },

  // Modify state
  increment() {
    const store = useCommonStore()
    store.increment()
  },

  decrement() {
    const store = useCommonStore()
    store.decrement()
  },

  // Subscribe to changes
  subscribe(callback) {
    const store = useCommonStore()
    return store.$subscribe((mutation, state) => {
      callback(state.num, mutation)
    })
  }
}
```

**`shell-app/src/interfaces/index.js`**
```javascript
export { counterInterface } from './counter.js'

export const interfaceRegistry = {
  counter: 'counterInterface'
}

export const interfaceVersion = '1.0.0'
```

### 2. Module Federation Configuration

**Shell App (`shell-app/vite.config.js`)**
```javascript
exposes: {
  "./interfaces": "./src/interfaces/index.js",
  "./counterInterface": "./src/interfaces/counter.js",
}
```

**Demo Counter App (`demo-counter-app/vite.config.js`)**
```javascript
remotes: {
  shellApp: {
    type: "module",
    name: "shellApp",
    entry: "http://localhost:3000/remoteEntry.js",
    entryGlobalName: "shellApp",
    shareScope: "default",
  },
}
```

### 3. Interface Usage (Remote App)

**`demo-counter-app/src/components/CounterDemo.vue`**
```javascript
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    const currentValue = ref(0)
    let counterInterface = null
    let unsubscribe = null

    const connectToShell = async () => {
      try {
        // Import the interface from shell app
        const { counterInterface: shellCounter } = await import('shellApp/interfaces')
        counterInterface = shellCounter
        
        // Subscribe to changes
        unsubscribe = counterInterface.subscribe((newValue) => {
          currentValue.value = newValue
        })

        // Get initial value
        currentValue.value = counterInterface.getValue()
      } catch (error) {
        console.error('Failed to connect to Shell App:', error)
      }
    }

    const increment = () => {
      if (counterInterface) {
        counterInterface.increment()
      }
    }

    onMounted(() => {
      connectToShell()
    })

    onUnmounted(() => {
      if (unsubscribe) {
        unsubscribe()
      }
    })

    return { currentValue, increment }
  }
}
```

## 🚀 Running the Demo

1. **Start all applications:**
   ```bash
   npm run dev
   ```

2. **Access the demo:**
   - Shell App: http://localhost:3000
   - Demo Counter App: http://localhost:3004
   - Interface Demo: http://localhost:3000/interface-demo

3. **Test the communication:**
   - Navigate to `/interface-demo` in the Shell App
   - Interact with either counter (Shell or Remote)
   - Observe real-time synchronization between both interfaces

## ✨ Key Benefits

### 🔗 **Loose Coupling**
- Remote apps only depend on interface contracts, not implementation details
- Shell app can change internal structure without breaking remote apps

### 🔄 **Real-time Synchronization**
- Changes in one app are immediately reflected in all connected apps
- Leverages Pinia's reactive system for automatic updates

### 🛡️ **Type Safety**
- Interfaces provide clear contracts for what's available
- Can be enhanced with TypeScript for compile-time checking

### 🚀 **Independent Deployment**
- Each micro frontend can be deployed independently
- Interface versioning allows for backward compatibility

### 📦 **Shared State Management**
- Centralized state in Shell App
- Multiple apps can read and modify shared state safely

## 🔄 Adding New Interfaces

To add a new interface:

1. **Create interface file:**
   ```javascript
   // shell-app/src/interfaces/newFeature.js
   export const newFeatureInterface = {
     // Interface methods here
   }
   ```

2. **Export from index:**
   ```javascript
   // shell-app/src/interfaces/index.js
   export { newFeatureInterface } from './newFeature.js'
   ```

3. **Update Module Federation:**
   ```javascript
   // shell-app/vite.config.js
   exposes: {
     "./newFeatureInterface": "./src/interfaces/newFeature.js",
   }
   ```

4. **Use in remote apps:**
   ```javascript
   const { newFeatureInterface } = await import('shellApp/interfaces')
   ```

## 🎯 Use Cases

This pattern is ideal for:

- **Shared Authentication State**
- **User Preferences/Settings**
- **Shopping Cart State**
- **Notification Systems**
- **Theme/UI State**
- **Real-time Data Feeds**

## 🔍 Debugging Tips

1. **Check Module Federation:**
   - Verify remote entry points are accessible
   - Check browser network tab for failed imports

2. **Interface Connectivity:**
   - Use browser dev tools to inspect interface imports
   - Add console logs in interface methods

3. **State Synchronization:**
   - Verify Pinia store subscriptions are working
   - Check for memory leaks in subscriptions

## 📚 Further Reading

- [Module Federation Documentation](https://module-federation.github.io/)
- [Pinia State Management](https://pinia.vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
