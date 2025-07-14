<template>
  <div
    v-if="notifications.length > 0"
    :class="['toast-container', `position-${config.position}`]"
    :style="containerStyle"
  >
    <div class="toast-stack">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['toast-notification', ...notification.notificationClass]"
      >
        <div class="toast-content">
          <div class="toast-icon" v-if="notification.iconRef" v-html="notification.iconRef"></div>
          <div class="toast-messages">
            <div class="toast-primary-message">{{ notification.primaryMessage }}</div>
            <div v-if="notification.secondaryMessage" class="toast-secondary-message">
              {{ notification.secondaryMessage }}
            </div>
          </div>
          <button
            v-if="notification.showCloseButton"
            @click="closeNotification(notification)"
            class="toast-close-button"
            aria-label="Close notification"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, watch } from 'vue';
import { useToast } from '../../composables/useToastComposable';

const convertRemToPixels = inject('convertRemToPixels', null);

const { notifications, config, hasNotifications, removeNotification } = useToast();

// Handle close notification with any additional logic if needed
const closeNotification = (notification) => {
  // You can add any additional logic here before removing
  // For example: analytics, logging, etc.
  removeNotification(notification);
};

const containerStyle = computed(() => {
  let { x, y } = config.value.offset;

  // Convert rem to pixels
  x = convertRemToPixels ? convertRemToPixels(x) : x * parseInt(getComputedStyle(document.documentElement).fontSize);
  y = convertRemToPixels ? convertRemToPixels(y) : y * parseInt(getComputedStyle(document.documentElement).fontSize);

  const position = config.value.position;
  const styles = {};

  // Apply positioning based on notification position
  switch (position) {
    case 'top-right':
      styles.top = `${y}px`;
      styles.right = `${x}px`;
      break;
    case 'top-left':
      styles.top = `${y}px`;
      styles.left = `${x}px`;
      break;
    case 'top':
      styles.top = `${y}px`;
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
      break;
    case 'bottom-right':
      styles.bottom = `${y}px`;
      styles.right = `${x}px`;
      break;
    case 'bottom-left':
      styles.bottom = `${y}px`;
      styles.left = `${x}px`;
      break;
    case 'bottom':
      styles.bottom = `${y}px`;
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
      break;
  }

  return styles;
});
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  z-index: 9999;
  max-height: 80%;
  overflow-y: auto;
  background: transparent;
}

.toast-stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast-notification {
  min-width: 18.75rem;
  max-width: 25rem;
  background: white;
  border-radius: 8px;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  .toast-content {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }

  .toast-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.125rem;
  }

  .toast-messages {
    flex: 1;
    min-width: 0;
  }

  .toast-primary-message {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
    margin: 0;
    line-height: 1.4;
  }

  .toast-secondary-message {
    font-size: 0.8125rem;
    color: #6b7280;
    margin: 0.25rem 0 0 0;
    line-height: 1.4;
  }

  .toast-close-button {
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    color: #9ca3af;
    transition: all 0.2s ease;

    &:hover {
      color: #6b7280;
      background-color: #f3f4f6;
    }
  }
  &.success {
    border-left: 4px solid #10b981;
    .toast-content {
      .toast-primary-message {
        color: #10b981;
      }
    }
  }

  &.error {
    border-left: 4px solid #ef4444;
    .toast-content {
      .toast-primary-message {
        color: #ef4444;
      }
    }
  }

  &.warning {
    border-left: 4px solid #f59e0b;
    .toast-content {
      .toast-primary-message {
        color: #f59e0b;
      }
    }
  }

  &.info {
    border-left: 4px solid #3b82f6;
    .toast-content {
      .toast-primary-message {
        color: #3b82f6;
      }
    }
  }
}

.position-bottom-right {
  .toast-stack {
    flex-direction: column-reverse;
  }
}

.position-bottom-left {
  .toast-stack {
    flex-direction: column-reverse;
  }
}

.position-bottom {
  .toast-stack {
    flex-direction: column-reverse;
  }
}
</style>
