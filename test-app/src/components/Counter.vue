<template>
  <div class="counter-component">
    <h3>Counter Component (from test-app)</h3>
    {{ loaded }}
    <div v-if="!loaded" class="loading">
      <div class="spinner"></div>
      <div>{{ debugMessage }}</div>
      <div v-if="error" class="error">Error: {{ error }}</div>
    </div>

    <div v-else class="loaded-content">
      <div class="counter-display">
        <span class="counter-value">{{ store.num }}</span>
        <div class="counter-info">
          <span class="info-item">Double: {{ store.doubleNum }}</span>
          <span class="info-item">Absolute: {{ store.absoluteNum }}</span>
          <span class="info-item" :class="statusClass">{{ status }}</span>
        </div>
      </div>

      <div class="counter-controls">
        <button @click="store.decrement" class="counter-btn decrement">-</button>
        <button @click="() => store.decrementBy(5)" class="counter-btn decrement-5">-5</button>
        <button @click="store.reset" class="counter-btn reset">Reset</button>
        <button @click="() => store.incrementBy(5)" class="counter-btn increment-5">+5</button>
        <button @click="store.increment" class="counter-btn increment">+</button>
      </div>

      <div class="custom-input">
        <input
          :value="customValue"
          @input="customValue = Number($event.target.value) || 0"
          type="number"
          placeholder="Enter value"
          class="custom-input-field"
        />
        <button @click="setCustomValue" class="custom-input-btn">Set</button>
      </div>
    </div>

    <p class="counter-description">This counter is using the shell app's Pinia store!</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const loaded = ref(false);
const debugMessage = ref('Starting...');
const error = ref(null);
const customValue = ref(0);
const store = ref(null);

// Computed properties for status
const status = computed(() => {
  if (!store.value) return 'Loading...';
  if (store.value.isZero) return 'Zero';
  if (store.value.isPositive) return 'Positive';
  if (store.value.isNegative) return 'Negative';
  return 'Unknown';
});

const statusClass = computed(() => {
  if (!store.value) return {};
  return {
    'status-positive': store.value.isPositive,
    'status-negative': store.value.isNegative,
    'status-zero': store.value.isZero,
  };
});

const setCustomValue = () => {
  console.log('Current customValue:', customValue.value, 'Type:', typeof customValue.value);
  if (store.value?.setNum && customValue.value !== null && customValue.value !== undefined) {
    const numValue = Number(customValue.value);
    console.log('🎯 Setting custom value:', numValue);
    store.value.setNum(numValue);
    customValue.value = 0;
  }
};

// Initialize store immediately
try {
  console.log('🚀 Starting Counter Mount');
  debugMessage.value = 'Importing store...';

  // Import the store module from shell app
  const storeModule = await import('shellApp/commonStore');
  console.log('✅ Store module imported:', storeModule);

  const { useCommonStore } = storeModule;

  if (typeof useCommonStore !== 'function') {
    throw new Error(`useCommonStore is not a function: ${typeof useCommonStore}`);
  }

  debugMessage.value = 'Creating store instance...';

  // Create store instance and assign to reactive ref
  store.value = useCommonStore();
  console.log('🏪 Store instance created:', store.value);

  console.log('✅ Store setup complete!');
  console.log('📊 Initial state:', {
    num: store.value.num,
    doubleNum: store.value.doubleNum,
    isPositive: store.value.isPositive,
    isNegative: store.value.isNegative,
    isZero: store.value.isZero,
  });

  loaded.value = true;
  console.log('loaded', loaded.value);

  debugMessage.value = 'Ready!';
} catch (err) {
  console.error('❌ Counter Mount Failed:', err);
  error.value = err.message;
  debugMessage.value = `Failed: ${err.message}`;
}
</script>

<style>
.counter-component {
  border: 2px solid #42b883;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading {
  padding: 40px;
  color: #6b7280;
  font-style: italic;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error {
  color: #ef4444;
  margin-top: 10px;
  padding: 10px;
  background: #fef2f2;
  border-radius: 4px;
  border: 1px solid #fecaca;
}

.loaded-content {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.counter-display {
  margin: 20px 0;
}

.counter-value {
  font-size: 3em;
  font-weight: bold;
  color: #2c3e50;
  display: block;
  margin-bottom: 10px;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 2px solid #dee2e6;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.counter-value:hover {
  transform: scale(1.02);
}

.counter-info {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.info-item {
  background: #e3f2fd;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9em;
  color: #1976d2;
  font-weight: 500;
  transition: all 0.2s ease;
}

.info-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-positive {
  background: #e8f5e8 !important;
  color: #2e7d32 !important;
}

.status-negative {
  background: #ffebee !important;
  color: #c62828 !important;
}

.status-zero {
  background: #fff3e0 !important;
  color: #ef6c00 !important;
}

.counter-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 25px 0;
  flex-wrap: wrap;
}

.counter-btn {
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.counter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.counter-btn:active {
  transform: translateY(0);
}

.counter-btn.increment {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.counter-btn.decrement {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.counter-btn.increment-5 {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.counter-btn.decrement-5 {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.counter-btn.reset {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
}

.custom-input {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 25px 0;
  align-items: center;
}

.custom-input-field {
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1em;
  width: 140px;
  transition: border-color 0.2s ease;
}

.custom-input-field:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.custom-input-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #42b883, #369970);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-input-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.counter-description {
  color: #6b7280;
  font-size: 0.9em;
  margin-top: 20px;
  font-style: italic;
  padding: 10px;
  background: rgba(107, 114, 128, 0.1);
  border-radius: 6px;
}
</style>
