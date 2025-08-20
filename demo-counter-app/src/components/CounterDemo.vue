<template>
  <div class="counter-demo">
    <div class="status-section">
      <h2>Connection Status</h2>
      <div class="status-indicator" :class="{ connected: isConnected, disconnected: !isConnected }">
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
        <div class="basic-controls">
          <button @click="increment" class="btn btn-primary">+1</button>
          <button @click="decrement" class="btn btn-secondary">-1</button>
          <button @click="reset" class="btn btn-warning">Reset</button>
        </div>

        <div class="advanced-controls">
          <div class="input-group">
            <input 
              v-model.number="customAmount" 
              type="number" 
              placeholder="Amount"
              class="input-field"
            >
            <button @click="incrementByAmount" class="btn btn-success">+</button>
            <button @click="decrementByAmount" class="btn btn-danger">-</button>
          </div>

          <div class="input-group">
            <input 
              v-model.number="setValue" 
              type="number" 
              placeholder="Set value"
              class="input-field"
            >
            <button @click="setCounterValue" class="btn btn-info">Set</button>
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
      <p>Make sure the Shell App is running and accessible.</p>
      <button @click="tryReconnect" class="btn btn-primary">Try Reconnect</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CounterDemo',
  setup() {
    const isConnected = ref(false)
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
        // Import the counter interface from shell app
        const { counterInterface: shellCounter } = await import('shellApp/interfaces')
        counterInterface = shellCounter
        
        // Subscribe to changes
        unsubscribe = counterInterface.subscribe((newValue) => {
          currentValue.value = newValue
          updateComputedValues()
          addToLog(`Value changed to ${newValue}`)
        })

        // Initial value update
        updateCurrentValue()
        isConnected.value = true
        addToLog('Connected to Shell App')
      } catch (error) {
        console.error('Failed to connect to Shell App:', error)
        isConnected.value = false
        addToLog('Failed to connect to Shell App')
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.status-section {
  margin-bottom: 30px;
}

.status-indicator {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
}

.status-indicator.connected {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-indicator.disconnected {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.counter-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.counter-display {
  text-align: center;
  margin-bottom: 30px;
}

.counter-value {
  font-size: 4rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 20px;
}

.counter-info {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
}

.counter-info p {
  margin: 5px;
  padding: 5px 10px;
  background: white;
  border-radius: 4px;
  font-size: 14px;
}

.status {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
}

.status.zero { background: #e9ecef; color: #495057; }
.status.positive { background: #d4edda; color: #155724; }
.status.negative { background: #f8d7da; color: #721c24; }

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.basic-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.advanced-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary { background: #007bff; color: white; }
.btn-secondary { background: #6c757d; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-warning { background: #ffc107; color: #212529; }
.btn-info { background: #17a2b8; color: white; }

.input-field {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100px;
  text-align: center;
}

.activity-log {
  margin-top: 30px;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.log-entry {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.log-entry:last-child {
  border-bottom: none;
}

.timestamp {
  color: #666;
  font-size: 12px;
}

.action {
  font-weight: 500;
}

.error-section {
  text-align: center;
  padding: 40px;
  background: #f8d7da;
  border-radius: 8px;
  color: #721c24;
}
</style>
