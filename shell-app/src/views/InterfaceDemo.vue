<template>
  <div class="interface-demo">
    <header class="demo-header">
      <h1>🔗 Micro Frontend Interface Communication Demo</h1>
      <p>This page demonstrates how micro frontends can share state through exposed interfaces</p>
    </header>

    <div class="demo-grid">
      <!-- Shell App Counter -->
      <div class="demo-section shell-section">
        <h2>🏠 Shell App Counter</h2>
        <p>This counter is managed by the Shell App's Pinia store</p>
        
        <div class="counter-display">
          <div class="counter-value">{{ commonStore.num }}</div>
          <div class="counter-info">
            <span class="info-item">Double: {{ commonStore.doubleNum }}</span>
            <span class="info-item">Absolute: {{ commonStore.absoluteNum }}</span>
            <span class="info-item status" :class="statusClass">{{ statusText }}</span>
          </div>
        </div>

        <div class="controls">
          <button @click="commonStore.increment()" class="btn btn-primary">+1</button>
          <button @click="commonStore.decrement()" class="btn btn-secondary">-1</button>
          <button @click="commonStore.reset()" class="btn btn-warning">Reset</button>
        </div>

        <div class="advanced-controls">
          <div class="input-group">
            <input v-model.number="shellAmount" type="number" placeholder="Amount" class="input-field">
            <button @click="commonStore.incrementBy(shellAmount)" class="btn btn-success">+</button>
            <button @click="commonStore.decrementBy(shellAmount)" class="btn btn-danger">-</button>
          </div>
        </div>
      </div>

      <!-- Demo Counter App -->
      <div class="demo-section remote-section">
        <h2>🎯 Demo Counter App (Remote)</h2>
        <p>This is a separate micro frontend that connects to Shell's store via interfaces</p>
        
        <div class="remote-container">
          <Suspense>
            <template #default>
              <CounterDemo />
            </template>
            <template #fallback>
              <div class="loading">Loading Demo Counter App...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>

    <div class="explanation-section">
      <h2>📚 How It Works</h2>
      <div class="explanation-grid">
        <div class="explanation-card">
          <h3>1. Interface Creation</h3>
          <p>Shell App exposes its Pinia store through a clean interface in <code>src/interfaces/</code></p>
          <ul>
            <li><code>counter.js</code> - Wraps the common store</li>
            <li><code>index.js</code> - Exports all interfaces</li>
          </ul>
        </div>

        <div class="explanation-card">
          <h3>2. Module Federation</h3>
          <p>The interfaces are exposed via Vite's Module Federation plugin</p>
          <ul>
            <li>Shell App exposes: <code>"./interfaces"</code></li>
            <li>Remote apps import: <code>shellApp/interfaces</code></li>
          </ul>
        </div>

        <div class="explanation-card">
          <h3>3. Real-time Sync</h3>
          <p>Changes in one app are immediately reflected in the other</p>
          <ul>
            <li>Pinia's reactivity system</li>
            <li>Subscription-based updates</li>
            <li>Shared singleton store</li>
          </ul>
        </div>

        <div class="explanation-card">
          <h3>4. Benefits</h3>
          <p>This architecture provides several advantages</p>
          <ul>
            <li>Loose coupling between apps</li>
            <li>Type-safe interfaces</li>
            <li>Independent deployment</li>
            <li>Shared state management</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="code-section">
      <h2>💻 Key Code Snippets</h2>
      
      <div class="code-example">
        <h3>Interface Definition (Shell App)</h3>
        <pre><code>// shell-app/src/interfaces/counter.js
export const counterInterface = {
  getValue() {
    const store = useCommonStore()
    return store.num
  },
  increment() {
    const store = useCommonStore()
    store.increment()
  },
  subscribe(callback) {
    const store = useCommonStore()
    return store.$subscribe(callback)
  }
}</code></pre>
      </div>

      <div class="code-example">
        <h3>Remote App Usage</h3>
        <pre><code>// demo-counter-app/src/components/CounterDemo.vue
import { counterInterface } from 'shellApp/interfaces'

// Use the interface
counterInterface.increment()
const value = counterInterface.getValue()

// Subscribe to changes
const unsubscribe = counterInterface.subscribe((newValue) => {
  console.log('Counter changed:', newValue)
})</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useCommonStore } from '../stores/common.store.js'

export default {
  name: 'InterfaceDemo',
  components: {
    CounterDemo: () => import('demoCounterApp/CounterDemo')
  },
  setup() {
    const commonStore = useCommonStore()
    const shellAmount = ref(5)

    const statusClass = computed(() => {
      if (commonStore.isZero) return 'zero'
      if (commonStore.isPositive) return 'positive'
      return 'negative'
    })

    const statusText = computed(() => {
      if (commonStore.isZero) return 'Zero'
      if (commonStore.isPositive) return 'Positive'
      return 'Negative'
    })

    return {
      commonStore,
      shellAmount,
      statusClass,
      statusText
    }
  }
}
</script>

<style scoped>
.interface-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.demo-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.demo-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.demo-section {
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shell-section {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.remote-section {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.demo-section h2 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.demo-section p {
  margin: 0 0 20px 0;
  opacity: 0.9;
}

.counter-display {
  text-align: center;
  margin-bottom: 20px;
}

.counter-value {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.counter-info {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.info-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
}

.status.zero { background: rgba(255, 255, 255, 0.3); }
.status.positive { background: rgba(76, 175, 80, 0.3); }
.status.negative { background: rgba(244, 67, 54, 0.3); }

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.advanced-controls {
  display: flex;
  justify-content: center;
}

.input-group {
  display: flex;
  gap: 5px;
  align-items: center;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  color: white;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary { background: #007bff; }
.btn-secondary { background: #6c757d; }
.btn-success { background: #28a745; }
.btn-danger { background: #dc3545; }
.btn-warning { background: #ffc107; color: #212529; }

.input-field {
  padding: 6px 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  width: 80px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.remote-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  min-height: 200px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
}

.explanation-section {
  margin-bottom: 40px;
}

.explanation-section h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.explanation-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
}

.explanation-card h3 {
  margin: 0 0 10px 0;
  color: #667eea;
}

.explanation-card ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

.explanation-card li {
  margin-bottom: 5px;
}

.code-section {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
}

.code-section h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.code-example {
  margin-bottom: 25px;
}

.code-example h3 {
  margin: 0 0 10px 0;
  color: #495057;
}

.code-example pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.4;
}

.code-example code {
  font-family: 'Fira Code', 'Consolas', monospace;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .explanation-grid {
    grid-template-columns: 1fr;
  }
  
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .counter-value {
    font-size: 2.5rem;
  }
}
</style>
