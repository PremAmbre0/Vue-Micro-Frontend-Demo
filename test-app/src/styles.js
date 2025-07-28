// This file exposes the CSS for the test-app micro frontend
// Import all the styles that should be available to the shell app

// Import component styles (these are already included in the components)
// But we can also import global styles here if needed

// For now, we'll just export a function that loads the CSS
export function loadStyles() {
  // In production, load the CSS file
  if (import.meta.env.PROD) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = import.meta.env.VITE_TEST_APP_URL ? `${import.meta.env.VITE_TEST_APP_URL}/assets/style.css` : 'http://localhost:3001/assets/style.css'
    link.onload = () => console.log('✅ Test-app styles loaded via module')
    link.onerror = () => console.error('❌ Failed to load test-app styles via module')
    document.head.appendChild(link)
  }
}

// Auto-load styles when this module is imported
loadStyles()

export default {
  loadStyles
}
