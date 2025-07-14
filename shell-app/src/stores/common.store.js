import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    num: 0
  }),
  
  actions: {
    increment() {
      this.num++
      console.log('Incremented to:', this.num)
    },
    
    decrement() {
      this.num--
      console.log('Decremented to:', this.num)
    },
    
    reset() {
      this.num = 0
      console.log('Reset to:', this.num)
    },
    
    setNum(value) {
      this.num = value
      console.log('Set to:', this.num)
    },
    
    incrementBy(amount) {
      this.num += amount
      console.log('Incremented by', amount, 'to:', this.num)
    },
    
    decrementBy(amount) {
      this.num -= amount
      console.log('Decremented by', amount, 'to:', this.num)
    }
  },
  
  getters: {
    doubleNum: (state) => state.num * 2,
    isPositive: (state) => state.num > 0,
    isNegative: (state) => state.num < 0,
    isZero: (state) => state.num === 0,
    numString: (state) => state.num.toString(),
    absoluteNum: (state) => Math.abs(state.num)
  }
})