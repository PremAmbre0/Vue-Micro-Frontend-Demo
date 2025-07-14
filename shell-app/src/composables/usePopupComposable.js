import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

// Global state for popup
const popup = ref(null)
const config = ref({
  closeOnOverlayClick: true,
  showCloseIcon: true,
  enableAnimation: true
})

export function usePopup() {
  // Generate unique ID for each popup
  const generateId = () => uuidv4()

  // Show popup
  const showPopup = (options) => {
    const {
      title = '',
      content = '',
      component = null,
      componentProps = {},
      buttonConfig = [],
      showCloseIcon = config.value.showCloseIcon,
      closeOnOverlayClick = config.value.closeOnOverlayClick,
      showMandatoryFieldsError = false,
      showMandatoryFieldsErrorMsg = 'Please fill mandatory fields',
      customClass = '',
      onClose = null,
      onFooterClick = null
    } = options

    // Create popup object
    const newPopup = {
      id: generateId(),
      title,
      content,
      component,
      componentProps,
      buttonConfig,
      showCloseIcon,
      closeOnOverlayClick,
      showMandatoryFieldsError,
      showMandatoryFieldsErrorMsg,
      customClass,
      onClose,
      onFooterClick,
      createdAt: Date.now()
    }

    // Set the popup (replaces any existing popup)
    popup.value = newPopup

    return newPopup
  }

  // Close popup
  const closePopup = (reason = 'manual') => {
    if (popup.value?.onClose) {
      popup.value.onClose(reason)
    }
    popup.value = null
  }

  // Convenience methods for common popup types
  const confirm = (title, content, options = {}) => {
    const defaultButtons = [
      {
        buttonText: 'Cancel',
        classNames: ['secondary-button-v2'],
        action: () => {
          closePopup('cancel')
          options.onCancel?.()
        }
      },
      {
        buttonText: 'Confirm',
        classNames: ['primary-button'],
        action: () => {
          closePopup('confirm')
          options.onConfirm?.()
        }
      }
    ]

    return showPopup({
      title,
      content,
      buttonConfig: options.buttonConfig || defaultButtons,
      showCloseIcon: options.showCloseIcon ?? true,
      ...options
    })
  }

  const alert = (title, content, options = {}) => {
    const defaultButtons = [
      {
        buttonText: 'OK',
        classNames: ['primary-button'],
        action: () => {
          closePopup('ok')
          options.onOk?.()
        }
      }
    ]

    return showPopup({
      title,
      content,
      buttonConfig: options.buttonConfig || defaultButtons,
      showCloseIcon: options.showCloseIcon ?? true,
      ...options
    })
  }

  const prompt = (title, content, options = {}) => {
    return showPopup({
      title,
      content,
      component: 'PromptInput', // You can create this component
      componentProps: options.componentProps || {},
      buttonConfig: options.buttonConfig || [],
      showCloseIcon: options.showCloseIcon ?? true,
      ...options
    })
  }

  const custom = (component, props = {}, options = {}) => {
    return showPopup({
      title: options.title || '',
      component,
      componentProps: props,
      buttonConfig: options.buttonConfig || [],
      showCloseIcon: options.showCloseIcon ?? false,
      ...options
    })
  }

  // Configuration methods
  const setCloseOnOverlayClick = (value) => {
    config.value.closeOnOverlayClick = value
  }

  const setShowCloseIcon = (value) => {
    config.value.showCloseIcon = value
  }

  const setEnableAnimation = (value) => {
    config.value.enableAnimation = value
  }

  // Handle overlay click
  const handleOverlayClick = (event, reason = 'overlayClick') => {
    if (popup.value?.closeOnOverlayClick) {
      closePopup(reason)
    }
  }

  // Handle footer click
  const handleFooterClick = (event) => {
    if (popup.value?.onFooterClick) {
      popup.value.onFooterClick(event)
    }
  }

  // Computed properties
  const isPopupOpen = computed(() => popup.value !== null)
  const currentPopup = computed(() => popup.value)

  return {
    // State
    popup: currentPopup,
    config: computed(() => config.value),

    // Computed
    isPopupOpen,

    // Methods
    showPopup,
    closePopup,
    handleOverlayClick,
    handleFooterClick,

    // Convenience methods
    confirm,
    alert,
    prompt,
    custom,

    // Configuration
    setCloseOnOverlayClick,
    setShowCloseIcon,
    setEnableAnimation
  }
}