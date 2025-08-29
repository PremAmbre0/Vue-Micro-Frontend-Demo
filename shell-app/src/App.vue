<template>
  <div id="app" class="shell-app">
    <!-- Hamburger Menu Button for Mobile -->
    <button class="hamburger-menu" @click="toggleMobileNav" :class="{ 'active': isMobileNavOpen, 'hidden': isMobileNavOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Mobile Overlay -->
    <div class="mobile-overlay" :class="{ 'active': isMobileNavOpen }" @click="closeMobileNav"></div>

    <!-- Navigation with conditional rendering and animation -->
    <nav v-if="!isMobile" class="shell-nav" @mouseenter="expandNav" @mouseleave="collapseNav">
      <!-- Navigation header with fade-in animation -->
      <Transition name="nav-header-fade" appear>
        <div class="nav-header">
          <span class="nav-logo" :class="{ 'nav-logo-collapsed': !isNavExpanded, 'nav-logo-expanded': isNavExpanded }">
            <span v-if="!isNavExpanded" class="nav-logo-short">
              <img src="./assets/images/altersquare-icon.png" style="height: 30px;" />
              <span>MFD</span>
            </span>
            <span v-else class="nav-logo-full">
              <div class="nav-content-container">
                <img src="./assets/images/altersquare-logo.png" alt="AlterSquare Logo"
                        style="height: 28px; object-fit: contain;">
                <span>Micro Frontend Demo</span>
              </div>
            </span>
          </span>
        </div>
      </Transition>
      
      <!-- Navigation links with staggered fade-in animation -->
      <Transition name="nav-links-fade" appear>
        <div class="nav-links">
          <router-link to="/" class="nav-link nav-link-1" :title="isNavExpanded ? '' : 'Home'" @click="handleNavClick">
            <span class="material-icons">home</span>
            <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Home</span>
          </router-link>
          
          <router-link to="/all-demos" class="nav-link nav-link-2" :title="isNavExpanded ? '' : 'All Demos'" @click="handleNavClick">
            <span class="material-icons">bolt</span>
            <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">All Demos</span>
          </router-link>
          
          <router-link to="/demo-one" class="nav-link nav-link-3" :title="isNavExpanded ? '' : 'Demo One'" @click="handleNavClick">
            <span class="material-icons">category</span>
            <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo One</span>
          </router-link>
          
          <router-link to="/demo-two" class="nav-link nav-link-4" :title="isNavExpanded ? '' : 'Demo Two'" @click="handleNavClick">
            <span class="material-icons">edit_note</span>
            <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo Two</span>
          </router-link>
          
          <router-link to="/demo-three" class="nav-link nav-link-5" :title="isNavExpanded ? '' : 'Demo Three'" @click="handleNavClick">
            <span class="material-icons">draw</span>
            <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo Three</span>
          </router-link>
          
          <router-link to="/demo-counter" class="nav-link nav-link-6" :title="isNavExpanded ? '' : 'Demo Counter'" @click="handleNavClick">
            <span class="material-icons">calculate</span>
            <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo Counter</span>
          </router-link>
          
          <router-link to="/interface-demo" class="nav-link nav-link-7" :title="isNavExpanded ? '' : 'Interface Demo'" @click="handleNavClick">
            <span class="material-icons">dynamic_feed</span>
            <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Interface Demo</span>
          </router-link>
        </div>
      </Transition>
    </nav>

    <!-- Mobile Navigation - Only rendered on mobile -->
    <nav v-else class="shell-nav" :class="{ 'mobile-nav-open': isMobileNavOpen }" @mouseenter="expandNav" @mouseleave="collapseNav">
      <div class="nav-header">
        <span class="nav-logo" :class="{ 'nav-logo-collapsed': !isNavExpanded, 'nav-logo-expanded': isNavExpanded }">
          <span v-if="!isNavExpanded" class="nav-logo-short"><img src="./assets/images/altersquare-icon.png" style="height: 30px;" /></span>
          <span v-else class="nav-logo-full">
            <div class="nav-content-container">
              <img src="./assets/images/altersquare-logo.png" alt="AlterSquare Logo"
                      style="height: 28px; object-fit: contain;">
              <span>Micro Frontend Demo</span>
            </div>
            <!-- Close button for mobile - positioned to the side -->
            <button v-if="isMobileNavOpen" class="nav-close-btn-inline" @click="closeMobileNav">
              <span class="material-icons">chevron_left</span>
            </button>
          </span>
        </span>
      </div>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link" :title="isNavExpanded ? '' : 'Home'" @click="handleNavClick">
          <span class="material-icons">home</span>
          <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Home</span>
        </router-link>
        
        <router-link to="/all-demos" class="nav-link" :title="isNavExpanded ? '' : 'All Demos'" @click="handleNavClick">
          <span class="material-icons">bolt</span>
          <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">All Demos</span>
        </router-link>
        
        <router-link to="/demo-one" class="nav-link" :title="isNavExpanded ? '' : 'Demo One'" @click="handleNavClick">
          <span class="material-icons">category</span>
          <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo One</span>
        </router-link>
        
        <router-link to="/demo-two" class="nav-link" :title="isNavExpanded ? '' : 'Demo Two'" @click="handleNavClick">
          <span class="material-icons">edit_note</span>
          <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo Two</span>
        </router-link>
        
        <router-link to="/demo-three" class="nav-link" :title="isNavExpanded ? '' : 'Demo Three'" @click="handleNavClick">
          <span class="material-icons">draw</span>
          <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo Three</span>
        </router-link>
        
        <router-link to="/demo-counter" class="nav-link" :title="isNavExpanded ? '' : 'Demo Counter'" @click="handleNavClick">
          <span class="material-icons">calculate</span>
          <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Demo Counter</span>
        </router-link>
        
        <router-link to="/interface-demo" class="nav-link" :title="isNavExpanded ? '' : 'Interface Demo'" @click="handleNavClick">
          <span class="material-icons">dynamic_feed</span>
          <span class="nav-text" :class="{ 'nav-text-visible': isNavExpanded }">Interface Demo</span>
        </router-link>
      </div>
    </nav>

    <main class="shell-main" :class="{ 'shell-main-expanded': isNavExpanded }">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const isNavExpanded = ref(false);
const isMobileNavOpen = ref(false);
const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 1200 : false);

const expandNav = () => {
  // Only expand on hover for desktop (screens >= 1200px)
  if (window.innerWidth >= 1200) {
    isNavExpanded.value = true;
  }
};

const collapseNav = () => {
  // Only collapse on mouse leave for desktop (screens >= 1200px)
  if (window.innerWidth >= 1200) {
    isNavExpanded.value = false;
  }
};

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
  // When mobile nav opens, also expand the nav text
  if (isMobileNavOpen.value) {
    isNavExpanded.value = true;
  } else {
    isNavExpanded.value = false;
  }
};

const closeMobileNav = () => {
  isMobileNavOpen.value = false;
  // Only collapse nav text on mobile screens
  if (window.innerWidth < 1200) {
    isNavExpanded.value = false;
  }
};

const handleNavClick = () => {
  // Only close mobile nav when we're actually in mobile mode
  if (window.innerWidth < 1200) {
    closeMobileNav();
  }
  // On desktop, do nothing - let the normal hover behavior handle text visibility
};

// Check if device is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1200;
};

// Handle window resize
const handleResize = () => {
  checkMobile();
  if (window.innerWidth >= 1200) {
    // Desktop mode - close mobile nav if open
    isMobileNavOpen.value = false;
    isNavExpanded.value = false;
  }
};

onMounted(() => {
  checkMobile(); // Check initial screen size
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
/* CSS Custom Properties for Theme */
:root {
  --primary-color: #0054c9;
  --light-color: #f0f8ff;
  --dark-color: #031f3c;
  --text-primary: #031f3c;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --background-primary: #ffffff;
  --background-secondary: #f0f8ff;
  --background-tertiary: #f7fafc;
  --border-color: #e2e8f0;
  --border-light: #edf2f7;
  --shadow-sm: 0 1px 3px rgba(3, 31, 60, 0.1);
  --shadow-md: 0 4px 6px rgba(3, 31, 60, 0.1);
  --shadow-lg: 0 10px 15px rgba(3, 31, 60, 0.1);
  --shadow-xl: 0 20px 25px rgba(3, 31, 60, 0.1);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", sans-serif;
  --nav-width-collapsed: 70px;
  --nav-width-expanded: 250px;
  --nav-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: var(--background-primary);
  font-family: var(--font-family);
  color: var(--text-primary);
  line-height: 1.6;
}

.shell-app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  min-height: 100vh;
  background: linear-gradient(135deg, var(--light-color) 0%, #ffffff 100%);
  display: flex;
}

/* Left Sidebar Navigation */
.shell-nav {
  background: linear-gradient(180deg,
      var(--primary-color) 0%,
      var(--dark-color) 100%);
  width: var(--nav-width-collapsed);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
  transition: var(--nav-transition);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.shell-nav:hover {
  width: var(--nav-width-expanded);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
}

.nav-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 80px;
}

.nav-logo {
  color: white;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--nav-transition);
}

.nav-logo-collapsed {
  font-size: 1.5rem;
}

.nav-logo-expanded {
  font-size: 2rem;
}

.nav-logo-short {
  font-weight: 700;
  font-size: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.nav-logo-full {
  font-weight: 700;
  font-size: 1rem;
  color: white;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  width: 100%;
  padding: 0 0.5rem;
}

.nav-content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

/* Inline close button within the header text */
.nav-close-btn-inline {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  min-width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.nav-close-btn-inline:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.nav-close-btn-inline .material-icons {
  font-size: 1.2rem;
}



.nav-links {
  flex: 1;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-md);
  margin: 0 0.5rem;
  transition: var(--nav-transition);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.nav-link .material-icons {
  font-size: 1.5rem;
  min-width: 24px;
  text-align: center;
}

.nav-text {
  opacity: 0;
  transform: translateX(-20px);
  transition: var(--nav-transition);
  font-weight: 500;
}

.nav-text-visible {
  opacity: 1;
  transform: translateX(0);
}

.nav-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: translateX(5px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Main Content Area - Uses overlay navigation approach */
/* Content maintains fixed width and position, navigation slides over it */
.shell-main {
  margin-left: var(--nav-width-collapsed);
  padding: 2rem;
  width: calc(100vw - var(--nav-width-collapsed));
  min-height: 100vh;
  transition: var(--nav-transition);
  flex: 1;
  position: relative;
  z-index: 1;
}

.shell-main-expanded {
  margin-left: var(--nav-width-collapsed);
  width: calc(100vw - var(--nav-width-collapsed));
}

/* Global Component Styles */
.loading,
.loading-component {
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
  font-style: italic;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: var(--background-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.error-component {
  text-align: center;
  padding: 2.5rem;
  color: #dc2626;
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  border: 2px solid #fecaca;
  border-radius: var(--radius-lg);
  margin: 1.5rem 0;
  box-shadow: var(--shadow-md);
}

.error-component h3 {
  margin-bottom: 1rem;
  color: #b91c1c;
  font-weight: 600;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-light);
  border-top: 4px solid var(--primary-color);
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

/* Shell App Professional Button Styles */
.shell-app.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  font-size: 0.75rem;
  line-height: 1;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.shell-app.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.shell-app.btn:active {
  transform: translateY(0);
}

.shell-app.btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, #0041a3 100%);
  color: white;
}

.shell-app.btn-secondary {
  background: linear-gradient(135deg, var(--text-secondary) 0%, #2d3748 100%);
  color: white;
}

.shell-app.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.shell-app.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.shell-app.btn-warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.shell-app.btn-info {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

/* Shell App Card Styles */
.shell-app .card {
  background: var(--background-primary);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.shell-app .card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Hamburger Menu Button */
.hamburger-menu {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1001;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--primary-color);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  padding: 0.5rem;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
}

.hamburger-menu span {
  display: block;
  height: 3px;
  width: 100%;
  background: white;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.3s ease-in-out;
}

.hamburger-menu.active span:nth-child(1) {
  top: 9px;
  transform: rotate(135deg);
}

.hamburger-menu.active span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.hamburger-menu.active span:nth-child(3) {
  top: 9px;
  transform: rotate(-135deg);
}

.hamburger-menu:hover {
  background: var(--dark-color);
  transform: scale(1.05);
}

.hamburger-menu.hidden {
  opacity: 0 !important;
  visibility: hidden;
  pointer-events: none;
  transition: none;
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Shell App Responsive Design */
@media (max-width: 1199px) {
  /* Show hamburger menu for screens smaller than 1200px */
  .hamburger-menu {
    display: flex;
  }

  /* Hide navigation by default on mobile */
  .shell-nav {
    transform: translateX(-100%);
    width: 280px;
    transition: transform 0.3s ease;
  }

  /* Show navigation when mobile nav is open */
  .shell-nav.mobile-nav-open {
    transform: translateX(0);
  }

  /* Always show expanded nav text on mobile when open */
  .shell-nav.mobile-nav-open .nav-text {
    opacity: 1;
    transform: translateX(0);
  }

  /* Remove hover effects on mobile */
  .shell-nav:hover {
    width: 280px;
    transform: translateX(-100%);
  }

  .shell-nav.mobile-nav-open:hover {
    transform: translateX(0);
  }

  /* Adjust main content for mobile */
  .shell-main {
    margin-left: 0;
    width: 100vw;
    padding: 5rem 1.5rem 1.5rem;
  }

  .shell-main-expanded {
    margin-left: 0;
    width: 100vw;
  }
}
@media (max-width: 1024px) {
  .shell-main {
    padding: 5rem 1.5rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .shell-main {
    padding: 5rem 1rem 1rem;
  }
  
  .hamburger-menu {
    top: 1rem;
    left: 1rem;
  }
}

@media (max-width: 480px) {
  .shell-main {
    padding: 5rem 0.75rem 0.75rem;
  }
  
  .hamburger-menu {
    top: 0.75rem;
    left: 0.75rem;
    width: 2rem;
    height: 2rem;
    padding: 0.375rem;
  }
}

/* Navigation Animation Styles - Desktop Only (>= 1200px) */
@media (min-width: 1200px) {
  /* Navigation slide-in animation */
  .nav-slide-in-enter-active {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-slide-in-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }

  .nav-slide-in-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  /* Navigation header fade-in animation */
  .nav-header-fade-enter-active {
    transition: all 0.6s ease-out;
    transition-delay: 0.3s;
  }

  .nav-header-fade-enter-from {
    opacity: 0;
    transform: translateY(-20px);
  }

  .nav-header-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  /* Navigation links fade-in animation */
  .nav-links-fade-enter-active {
    transition: all 0.8s ease-out;
    transition-delay: 0.5s;
  }

  .nav-links-fade-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }

  .nav-links-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  /* Staggered animation for individual navigation links */
  .nav-link-1 { animation: navLinkSlideIn 0.6s ease-out 0.7s both; }
  .nav-link-2 { animation: navLinkSlideIn 0.6s ease-out 0.8s both; }
  .nav-link-3 { animation: navLinkSlideIn 0.6s ease-out 0.9s both; }
  .nav-link-4 { animation: navLinkSlideIn 0.6s ease-out 1.0s both; }
  .nav-link-5 { animation: navLinkSlideIn 0.6s ease-out 1.1s both; }
  .nav-link-6 { animation: navLinkSlideIn 0.6s ease-out 1.2s both; }
  .nav-link-7 { animation: navLinkSlideIn 0.6s ease-out 1.3s both; }

  /* Enhanced navigation logo animation */
  .nav-logo {
    animation: navLogoFadeIn 0.8s ease-out 0.4s both;
  }
}

/* Mobile Navigation Animations (< 1200px) - Only for hamburger menu */
@media (max-width: 1199px) {
  /* Disable navigation slide-in animation on mobile */
  .nav-slide-in-enter-active {
    transition: none;
  }

  .nav-slide-in-enter-from,
  .nav-slide-in-enter-to {
    transform: none;
    opacity: 1;
  }

  /* Disable navigation header fade-in animation on mobile */
  .nav-header-fade-enter-active {
    transition: none;
  }

  .nav-header-fade-enter-from,
  .nav-header-fade-enter-to {
    opacity: 1;
    transform: none;
  }

  /* Disable navigation links fade-in animation on mobile */
  .nav-links-fade-enter-active {
    transition: none;
  }

  .nav-links-fade-enter-from,
  .nav-links-fade-enter-to {
    opacity: 1;
    transform: none;
  }

  /* Disable staggered animations for nav links on mobile */
  .nav-link-1,
  .nav-link-2,
  .nav-link-3,
  .nav-link-4,
  .nav-link-5,
  .nav-link-6,
  .nav-link-7 {
    animation: none;
  }

  /* Disable logo animation on mobile */
  .nav-logo {
    animation: none;
  }
}

/* Keyframes - Available for desktop only */
@media (min-width: 1200px) {
  @keyframes navLinkSlideIn {
    0% {
      opacity: 0;
      transform: translateX(-30px) scale(0.9);
    }
    50% {
      opacity: 0.7;
      transform: translateX(-10px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes navLogoFadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8) rotate(-5deg);
    }
    50% {
      opacity: 0.7;
      transform: scale(0.9) rotate(2deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
}

/* Enhanced hamburger menu animation - All screen sizes */
.hamburger-menu {
  animation: hamburgerFadeIn 0.6s ease-out 0.2s both;
}

@keyframes hamburgerFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(45deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.8) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* Main content fade-in animation - All screen sizes */
.shell-main {
  animation: mainContentFadeIn 0.8s ease-out 0.6s both;
}

@keyframes mainContentFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
