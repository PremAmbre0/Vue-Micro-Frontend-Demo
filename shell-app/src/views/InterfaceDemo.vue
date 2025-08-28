<template>
  <div class="interface-demo">
    <!-- Header with fade-in animation -->
    <Transition name="fade-in" appear>
      <header class="demo-header">
        <h1><span class="material-icons">dynamic_feed</span> Micro Frontend Interface Communication Demo</h1>
        <p>This page demonstrates how micro frontends can share state through exposed interfaces</p>
      </header>
    </Transition>

    <!-- Demo Grid with delayed fade-in -->
    <Transition name="fade-in-delayed" appear>
      <div class="demo-grid">
        <!-- Shell App Counter -->
        <div class="demo-section shell-section">
          <h2> Shell App Counter</h2>
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
            <!-- Basic Operations -->
            <div class="control-section">
              <h4 class="control-title">Basic Operations</h4>
              <div class="basic-controls">
                <button @click="commonStore.increment()" class="btn btn-primary">
                  <!-- <span class="material-icons">add</span> -->
                  +1
                </button>
                <button @click="commonStore.decrement()" class="btn btn-secondary">
                  <!-- <span class="material-icons">remove</span> -->
                  -1
                </button>
                <button @click="commonStore.reset()" class="btn btn-warning">
                  <span class="material-icons">refresh</span>
                  Reset
                </button>
              </div>
            </div>

            <!-- Custom Amount Operations -->
            <div class="control-section">
              <h4 class="control-title">Custom Amount</h4>
              <div class="input-group custom-amount-group">
                <input 
                  v-model.number="shellAmount" 
                  type="number" 
                  placeholder="Enter amount"
                  class="input-field"
                >
                <button @click="commonStore.incrementBy(shellAmount)" class="btn btn-success">
                  <span class="material-icons">add</span>
                  Add
                </button>
                <button @click="commonStore.decrementBy(shellAmount)" class="btn btn-danger">
                  <span class="material-icons">remove</span>
                  Subtract
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Explanation Section with slide-up animation -->
    <Transition name="slide-up" appear>
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
    </Transition>

    <!-- Code Section with extra delayed fade-in -->
    <Transition name="fade-in-extra-delayed" appear>
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
    </Transition>
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
  width: 100%;
  margin: 0 auto;
  padding: 0;
  font-family: var(--font-family);
  /* background: linear-gradient(135deg, var(--light-color) 0%, #FFFFFF 100%); */
  min-height: calc(100vh - 120px);
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
}

.demo-header h1 {
  color: #0054c9;
  margin-bottom: 10px;
  font-size: 2.5em;
  font-weight: 700;
}

.demo-header h1 .material-icons{
  font-size: 3rem;
  vertical-align: middle;
  padding-bottom: 8px;
}

.demo-header p {
  color: #495057;
  font-size: 1.2em;
}

/* .demo-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  color: white;
  border-radius: 0;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
} */

/* .demo-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
} */

/* .demo-header h1 {
  margin: 0 0 1rem 0;
  font-size: 3rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.demo-header p {
  margin: 0;
  font-size: 1.25rem;
  opacity: 0.95;
  font-weight: 400;
  position: relative;
  z-index: 1;
} */

.demo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 4rem;
  padding: 0 2rem;
}

.demo-section {
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  /* border: 1px solid var(--border-light); */
  position: relative;
  overflow: hidden;
  border-left: 4px solid var(--primary-color);
}

.shell-section {
  background: var(--background-primary);
  color: var(--text-primary);
}
/* 
.shell-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
} */

.remote-section {
  background: var(--background-primary);
  color: var(--text-primary);
}

.remote-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10B981 0%, #059669 100%);
}

.demo-section h2 {
  margin: 0 0 1rem 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
}

.demo-section p {
  margin: 0 0 2rem 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.counter-display {
  text-align: center;
  margin-bottom: 2rem;
}

.counter-value {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.counter-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  justify-content: center;
}

.info-item {
  background: var(--background-tertiary);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.status.zero {
  background: linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%);
  color: var(--text-secondary);
}
.status.positive {
  background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
  color: #065F46;
}
.status.negative {
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
  color: #991B1B;
}

.controls {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
}

.control-section {
  background: var(--background-tertiary);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  flex: 1;
  width: calc(50% - 0.75rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.control-section:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.control-title {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: center;
  position: relative;
  padding-bottom: 0.5rem;
}

.control-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
  border-radius: 1px;
}

.basic-controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  width: 100%;
}

.input-group {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.custom-amount-group {
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}



.btn {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.btn .material-icons {
  font-size: 1rem;
  vertical-align: middle;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  color: white;
}
.btn-secondary {
  background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
  color: white;
}
.btn-success {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
}
.btn-danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
}
.btn-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: white;
}

.input-field {
  padding: 0.875rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  width: 100px;
  text-align: center;
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 84, 201, 0.1);
  transform: translateY(-1px);
}

.input-field::placeholder {
  color: var(--text-light);
}

.remote-container {
  background: var(--background-tertiary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  min-height: 300px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: var(--text-light);
}

.explanation-section {
  margin-bottom: 4rem;
  padding: 0 2rem;
}

.explanation-section h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  font-size: 2.25rem;
  font-weight: 600;
}

.explanation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.explanation-card {
  background: var(--background-primary);
  padding: 2rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  /* border: 1px solid var(--border-light); */
  border: 2px solid var(--primary-color);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* .explanation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
} */

.explanation-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.explanation-card h3 {
  margin: 0 0 1rem 0;
  color: var(--primary-color);
  font-size: 1.25rem;
  font-weight: 600;
}

.explanation-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.explanation-card ul {
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
}

.explanation-card li {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.explanation-card code {
  background: var(--background-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--primary-color);
  font-weight: 500;
}

.code-section {
  background: var(--background-primary);
  padding: 3rem 2rem;
  border-radius: var(--radius-xl);
  margin: 0 2rem 2rem;
  box-shadow: var(--shadow-lg);
  /* border: 1px solid var(--border-light); */
  border-left: 4px solid var(--primary-color);
}

.code-section h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 600;
}

.code-example {
  margin-bottom: 2.5rem;
}

.code-example h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.code-example pre {
  background: var(--dark-color);
  color: #E2E8F0;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.6;
  box-shadow: var(--shadow-md);
}

.code-example code {
  font-family: 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', monospace;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .demo-grid {
    gap: 2rem;
    padding: 0 1.5rem;
  }

  .explanation-section {
    padding: 0 1.5rem;
  }

  .code-section {
    margin: 0 1.5rem 2rem;
    padding: 2.5rem 1.5rem;
  }

  .control-section {
    min-width: 260px;
  }
}

@media (max-width: 900px) {
  .controls {
    flex-direction: column;
    gap: 1.25rem;
  }

  .control-section {
    width: 100%;
    min-width: unset;
    max-width: none;
  }
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .explanation-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .explanation-section {
    padding: 0 1rem;
  }

  .code-section {
    margin: 0 1rem 2rem;
    padding: 2rem 1rem;
  }

  .demo-header {
    padding: 2rem 1rem;
  }

  .demo-header h1 {
    font-size: 2.25rem;
  }

  .demo-header p {
    font-size: 1.1rem;
  }

  .counter-value {
    font-size: 3rem;
  }

  .demo-section {
    padding: 2rem 1.5rem;
  }

  .control-section {
    padding: 1.25rem;
    width: 100%;
  }

  .controls {
    gap: 1rem;
    flex-direction: column;
  }

  .basic-controls {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .input-group {
    justify-content: center;
    flex-direction: column;
    gap: 0.75rem;
  }

  .custom-amount-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    max-width: 200px;
    min-width: unset;
  }

  .input-field {
    width: 100%;
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .demo-header h1 {
    font-size: 1.875rem;
  }

  .counter-value {
    font-size: 2.5rem;
  }

  .demo-section {
    padding: 1.5rem 1rem;
  }

  .explanation-card {
    padding: 1.5rem;
  }

  .code-section {
    padding: 1.5rem 1rem;
  }

  .control-section {
    padding: 1rem;
    width: 100%;
  }

  .control-title {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  .controls {
    gap: 1.25rem;
  }

  .btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    max-width: none;
  }

  .btn .material-icons {
    font-size: 0.9rem;
  }

  .input-field {
    max-width: none;
    padding: 0.75rem 1rem;
  }
}

/* Animation Transitions */

/* Basic fade-in animation */
.fade-in-enter-active {
  transition: all 0.8s ease-out;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Delayed fade-in animation */
.fade-in-delayed-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.4s;
}

.fade-in-delayed-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-delayed-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Extra delayed fade-in animation */
.fade-in-extra-delayed-enter-active {
  transition: all 0.8s ease-out;
  transition-delay: 0.8s;
}

.fade-in-extra-delayed-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-extra-delayed-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Slide-up animation */
.slide-up-enter-active {
  transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.6s;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Enhanced header animations */
.demo-header h1 {
  animation: titleFadeIn 1s ease-out;
}

.demo-header p {
  animation: subtitleFadeIn 1s ease-out 0.3s both;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subtitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Counter display animations */
.counter-value {
  animation: counterValueFadeIn 1.2s ease-out 0.6s both;
}

.counter-info {
  animation: counterInfoFadeIn 0.8s ease-out 0.8s both;
}

@keyframes counterValueFadeIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes counterInfoFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Info item staggered animations */
.info-item {
  animation: infoItemFadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.info-item:nth-child(1) { animation-delay: 0.1s; }
.info-item:nth-child(2) { animation-delay: 0.2s; }
.info-item:nth-child(3) { animation-delay: 0.3s; }

@keyframes infoItemFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Control section animations */
.control-section {
  animation: controlSectionFadeIn 0.8s ease-out;
  animation-fill-mode: both;
}

.control-section:nth-child(1) { animation-delay: 1.0s; }
.control-section:nth-child(2) { animation-delay: 1.2s; }

@keyframes controlSectionFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Button staggered animations */
.btn {
  animation: buttonFadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

.basic-controls .btn:nth-child(1) { animation-delay: 0.1s; }
.basic-controls .btn:nth-child(2) { animation-delay: 0.15s; }
.basic-controls .btn:nth-child(3) { animation-delay: 0.2s; }

.custom-amount-group .btn:nth-child(2) { animation-delay: 0.25s; }
.custom-amount-group .btn:nth-child(3) { animation-delay: 0.3s; }

@keyframes buttonFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Input field animation */
.input-field {
  animation: inputFadeIn 0.5s ease-out 0.2s both;
}

@keyframes inputFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Explanation cards staggered animations */
.explanation-card {
  animation: cardSlideIn 0.8s ease-out;
  animation-fill-mode: both;
}

.explanation-card:nth-child(1) { animation-delay: 0.1s; }
.explanation-card:nth-child(2) { animation-delay: 0.2s; }
.explanation-card:nth-child(3) { animation-delay: 0.3s; }
.explanation-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Code example animations */
.code-example {
  animation: codeExampleFadeIn 0.8s ease-out;
  animation-fill-mode: both;
}

.code-example:nth-child(2) { animation-delay: 0.2s; }
.code-example:nth-child(3) { animation-delay: 0.4s; }

@keyframes codeExampleFadeIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Section header animations */
.explanation-section h2 {
  animation: sectionHeaderFadeIn 0.8s ease-out 0.2s both;
}

.code-section h2 {
  animation: sectionHeaderFadeIn 0.8s ease-out 0.2s both;
}

@keyframes sectionHeaderFadeIn {
  from {
    opacity: 0;
    transform: translateY(-25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* List item staggered animations */
.explanation-card ul li {
  animation: listItemSlideIn 0.5s ease-out;
  animation-fill-mode: both;
}

.explanation-card ul li:nth-child(1) { animation-delay: 0.1s; }
.explanation-card ul li:nth-child(2) { animation-delay: 0.2s; }
.explanation-card ul li:nth-child(3) { animation-delay: 0.3s; }
.explanation-card ul li:nth-child(4) { animation-delay: 0.4s; }

@keyframes listItemSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Enhanced hover effects */
.btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: var(--shadow-xl);
}

.explanation-card:hover {
  transform: translateY(-6px) scale(1.02);
}

.info-item:hover {
  transform: translateY(-3px) scale(1.05);
}

/* Control title animation */
.control-title {
  animation: controlTitleFadeIn 0.6s ease-out 0.3s both;
}

@keyframes controlTitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Demo section header animations */
.demo-section h2 {
  animation: demoSectionHeaderFadeIn 0.8s ease-out 0.4s both;
}

.demo-section p {
  animation: demoSectionSubtitleFadeIn 0.8s ease-out 0.6s both;
}

@keyframes demoSectionHeaderFadeIn {
  from {
    opacity: 0;
    transform: translateX(-25px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes demoSectionSubtitleFadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
