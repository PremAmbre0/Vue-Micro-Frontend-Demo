<template>
  <div class="counter-demo">
    <div class="status-section">
      <h2>Connection Status</h2>
      <div class="status-indicator" :class="{ connected: isConnected, disconnected: !isConnected }">
        <span class="material-icons">{{ isConnected ? 'link' : 'link_off' }}</span>
        {{ isConnected ? 'Connected to Shell App' : 'Disconnected from Shell App' }}
      </div>
    </div>

    <div class="counter-section" v-if="isConnected">
      <h2>Shared Counter</h2>
      <div class="counter-display">
        <div class="counter-value">{{ currentValue }}</div>
        <div class="counter-info">
          <p><strong>Double:</strong> {{ computedValues.doubleNum }}</p>
          <p><strong>Absolute:</strong> {{ computedValues.absoluteNum }}</p>
          <p><strong>Status:</strong> 
            <span v-if="computedValues.isZero" class="status zero">Zero</span>
            <span v-else-if="computedValues.isPositive" class="status positive">Positive</span>
            <span v-else class="status negative">Negative</span>
          </p>
        </div>
      </div>

      <div class="controls">
        <!-- Basic Operations -->
        <div class="control-section">
          <h4 class="control-title">Basic Operations</h4>
          <div class="basic-controls">
            <button @click="increment" class="btn btn-primary">
              <!-- <span class="material-icons">add</span> -->
              +1
            </button>
            <button @click="decrement" class="btn btn-secondary">
              <!-- <span class="material-icons">remove</span> -->
              -1
            </button>
            <button @click="reset" class="btn btn-warning">
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
              v-model.number="customAmount" 
              type="number" 
              placeholder="Enter amount"
              class="input-field"
            >
            <div class="button-pair">
              <button @click="incrementByAmount" class="btn btn-success">
                <span class="material-icons">add</span>
                Add
              </button>
              <button @click="decrementByAmount" class="btn btn-danger">
                <span class="material-icons">remove</span>
                Subtract
              </button>
            </div>
          </div>
        </div>

        <!-- Set Value Operation -->
        <div class="control-section">
          <h4 class="control-title">Set Value</h4>
          <div class="input-group set-value-group">
            <input 
              v-model.number="setValue" 
              type="number" 
              placeholder="Enter new value"
              class="input-field"
            >
            <button @click="setCounterValue" class="btn btn-info">
              <span class="material-icons">edit</span>
              Set Value
            </button>
          </div>
        </div>
      </div>

      <div class="activity-log">
        <h3>Activity Log</h3>
        <div class="log-container">
          <div v-for="(log, index) in activityLog" :key="index" class="log-entry">
            <span class="timestamp">{{ log.timestamp }}</span>
            <span class="action">{{ log.action }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="error-section" v-else>
      <h2>Unable to Connect</h2>
      <div v-if="isStandaloneMode">
        <p><strong>Standalone Mode Detected</strong></p>
        <p>This micro frontend is designed to work as part of the Shell App.</p>
        <p>Please access it through:</p>
        <a :href="`${shellAppUrl}/demo-counter`" class="shell-link">
          🔗 {{ shellAppUrl }}/demo-counter
        </a>
      </div>
      <div v-else>
        <p>Make sure the Shell App is running and accessible.</p>
        <button @click="tryReconnect" class="btn btn-primary">Try Reconnect</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CounterDemo',
  setup() {
    const isConnected = ref(false)
    const isStandaloneMode = ref(false)
    const currentValue = ref(0)
    const customAmount = ref(1)
    const setValue = ref(0)
    const computedValues = reactive({
      doubleNum: 0,
      isPositive: false,
      isNegative: false,
      isZero: true,
      absoluteNum: 0
    })
    const activityLog = ref([])

    // Get shell app URL from environment
    const shellAppUrl = `http://localhost:${import.meta.env.VITE_SHELL_PORT || '3000'}`

    let counterInterface = null
    let unsubscribe = null

    const addToLog = (action) => {
      const timestamp = new Date().toLocaleTimeString()
      activityLog.value.unshift({ timestamp, action })
      if (activityLog.value.length > 10) {
        activityLog.value.pop()
      }
    }

    const updateComputedValues = () => {
      if (counterInterface) {
        const computed = counterInterface.getComputedValues()
        Object.assign(computedValues, computed)
      }
    }

    const updateCurrentValue = () => {
      if (counterInterface) {
        currentValue.value = counterInterface.getValue()
        updateComputedValues()
      }
    }

    const connectToShell = async () => {
      try {
        console.log('[Demo Counter]: Starting connection to Shell App...')
        addToLog('Starting connection to Shell App...')

        // Check if we're running in standalone mode
        const isStandalone = window.location.port === import.meta.env.VITE_DEMO_COUNTER_PORT
        if (isStandalone) {
          console.log('[Demo Counter]: Running in standalone mode')
          isStandaloneMode.value = true
          addToLog('Running in standalone mode')
          addToLog('This micro frontend is designed to work within the Shell App')
          addToLog(`Please access it through: ${shellAppUrl}/demo-counter`)
          isConnected.value = false
          return
        }

        // Import the counter interface from shell app
        console.log('[Demo Counter]: Importing shell app interfaces...')
        const { counterInterface: shellCounter } = await import('shellApp/interfaces')
        console.log('[Demo Counter]: Shell app interfaces imported successfully')

        // Check if the interface is ready
        console.log('[Demo Counter]: Checking if interface is ready...')
        if (!shellCounter.isReady()) {
          console.log('[Demo Counter]: Interface not ready, waiting...')
          // Wait for shell app to be ready with exponential backoff
          let attempts = 0
          const maxAttempts = 15 // Increased attempts for remote connection

          while (attempts < maxAttempts && !shellCounter.isReady()) {
            const delay = Math.min(1000 * Math.pow(1.5, attempts), 3000) // Gentler backoff
            console.log(`[Demo Counter]: Attempt ${attempts + 1}/${maxAttempts}, waiting ${delay}ms`)
            addToLog(`Waiting for Shell App... (attempt ${attempts + 1}/${maxAttempts})`)
            await new Promise(resolve => setTimeout(resolve, delay))
            attempts++
          }

          if (!shellCounter.isReady()) {
            throw new Error('Shell App failed to initialize after multiple attempts')
          }
        }

        console.log('[Demo Counter]: Interface is ready, setting up connection...')
        counterInterface = shellCounter

        // Subscribe to changes
        console.log('[Demo Counter]: Subscribing to store changes...')
        unsubscribe = counterInterface.subscribe((newValue) => {
          console.log(`[Demo Counter]: Store value changed to ${newValue}`)
          currentValue.value = newValue
          updateComputedValues()
          addToLog(`Value changed to ${newValue}`)
        })

        // Initial value update
        console.log('[Demo Counter]: Getting initial value...')
        updateCurrentValue()
        isConnected.value = true
        console.log('[Demo Counter]: Successfully connected to Shell App')
        addToLog('Connected to Shell App')
      } catch (error) {
        console.error('[Demo Counter]: Failed to connect to Shell App:', error)
        isConnected.value = false

        // Check if it's a federation loading error
        if (error.message.includes('Loading script failed') || error.message.includes('Loading CSS chunk')) {
          addToLog(`Failed to load Shell App - make sure it's running on ${shellAppUrl}`)
          isStandaloneMode.value = true
        } else {
          addToLog(`Failed to connect: ${error.message}`)
        }
      }
    }

    const tryReconnect = () => {
      connectToShell()
    }

    const increment = () => {
      if (counterInterface) {
        counterInterface.increment()
        addToLog('Incremented by 1')
      }
    }

    const decrement = () => {
      if (counterInterface) {
        counterInterface.decrement()
        addToLog('Decremented by 1')
      }
    }

    const reset = () => {
      if (counterInterface) {
        counterInterface.reset()
        addToLog('Reset to 0')
      }
    }

    const incrementByAmount = () => {
      if (counterInterface && customAmount.value) {
        counterInterface.incrementBy(customAmount.value)
        addToLog(`Incremented by ${customAmount.value}`)
      }
    }

    const decrementByAmount = () => {
      if (counterInterface && customAmount.value) {
        counterInterface.decrementBy(customAmount.value)
        addToLog(`Decremented by ${customAmount.value}`)
      }
    }

    const setCounterValue = () => {
      if (counterInterface && setValue.value !== null) {
        counterInterface.setValue(setValue.value)
        addToLog(`Set value to ${setValue.value}`)
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

    return {
      isConnected,
      isStandaloneMode,
      shellAppUrl,
      currentValue,
      customAmount,
      setValue,
      computedValues,
      activityLog,
      increment,
      decrement,
      reset,
      incrementByAmount,
      decrementByAmount,
      setCounterValue,
      tryReconnect
    }
  }
}
</script>

<style scoped>
.counter-demo {
  /* max-width: 700px; */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.status-section {
  margin-bottom: 2rem;
}

.status-indicator {
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.status-indicator .material-icons{
  font-size: 1.5rem;
  vertical-align: middle;
  position: relative;
  bottom: 1.5px;
}

.status-indicator.connected {
  background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
  color: #065F46;
  border: 1px solid #A7F3D0;
}

.status-indicator.disconnected {
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
  color: #991B1B;
  border: 1px solid #FECACA;
}

.counter-section {
  background: var(--background-primary);
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  margin-bottom: 2rem;
  box-shadow: var(--shadow-lg);
  /* border: 1px solid var(--border-light); */
  position: relative;
  overflow: hidden;
  border-left: 4px solid var(--primary-color);
}

/* .counter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
} */

.counter-display {
  text-align: center;
  margin-bottom: 1.5rem;
}

.counter-value {
  font-size: 5rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 84, 201, 0.1);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.counter-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  justify-content: center;
}

.counter-info p {
  margin: 0;
  padding: 1rem 1.5rem;
  background: var(--background-tertiary);
  border-radius: var(--radius-lg);
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.counter-info p:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
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
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
}

.control-section {
  background: var(--background-tertiary);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  flex: 1;
  min-width: 280px;
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
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  text-align: center;
  position: relative;
  padding-bottom: 0.75rem;
}

.control-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--dark-color) 100%);
  border-radius: 1px;
}

.basic-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
}

.input-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.custom-amount-group {
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  align-items: center;
}

.set-value-group {
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.button-pair {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn .material-icons {
  font-size: 1.1rem;
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

.btn:active {
  transform: translateY(0);
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
.btn-info {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: white;
}

.input-field {
  padding: 1rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  width: 140px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  background: var(--background-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 84, 201, 0.1);
  transform: translateY(-1px);
}

.activity-log {
  margin-top: 3rem;
}

.activity-log h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.log-container {
  max-height: 280px;
  overflow-y: auto;
  background: var(--background-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--primary-color);
}

.log-container::-webkit-scrollbar {
  width: 8px;
}

.log-container::-webkit-scrollbar-track {
  background: var(--background-tertiary);
  border-radius: var(--radius-sm);
}

.log-container::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: var(--radius-sm);
}

.log-container::-webkit-scrollbar-thumb:hover {
  background: var(--text-light);
}

.log-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.log-entry:hover {
  background: var(--background-tertiary);
  margin: 0 -1.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
}

.log-entry:last-child {
  border-bottom: none;
}

.timestamp {
  color: var(--text-light);
  font-size: 0.875rem;
  font-weight: 500;
}

.action {
  font-weight: 600;
  color: var(--text-primary);
}

.error-section {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
  border-radius: var(--radius-xl);
  color: #991B1B;
  border: 2px solid #FECACA;
  box-shadow: var(--shadow-lg);
}

.error-section h2 {
  color: #B91C1C;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.error-section p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #7F1D1D;
}

.shell-link {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}

.shell-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  text-decoration: none;
  color: white;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .control-section {
    min-width: 250px;
  }
}

@media (max-width: 1024px) {
  .control-section {
    padding: 1.75rem;
    min-width: 220px;
  }

  .btn {
    min-width: 120px;
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 900px) {
  .controls {
    flex-direction: column;
    gap: 2rem;
  }

  .control-section {
    min-width: unset;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .counter-demo {
    padding: 0;
  }

  .counter-section {
    padding: 2rem 1.5rem;
  }

  .counter-value {
    font-size: 4rem;
  }

  .counter-info {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .control-section {
    padding: 1.5rem;
    width: 100%;
  }

  .controls {
    gap: 2rem;
    flex-direction: column;
  }

  .basic-controls {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .button-pair {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .input-group {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .set-value-group {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    min-width: unset;
  }

  .input-field {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .counter-section {
    padding: 1.5rem 1rem;
  }

  .counter-value {
    font-size: 3rem;
  }

  .control-section {
    padding: 1.25rem;
    width: 100%;
  }

  .controls {
    gap: 1.5rem;
  }

  .control-title {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    max-width: none;
  }

  .btn .material-icons {
    font-size: 1rem;
  }

  .input-field {
    max-width: none;
    padding: 0.875rem 1.25rem;
  }

  .error-section {
    padding: 2rem 1rem;
  }
}
</style>
