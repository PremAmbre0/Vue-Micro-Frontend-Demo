<template>
  <div class="test-app-federated">
    <h1>🎉 Test App (Federated)</h1>
    <p>This is the test-app loaded via Module Federation</p>

    <div class="content">
      <h2>Your App Content</h2>
      <p>Add your 3D components, UI features, business logic here</p>

      <!-- Test buttons for toast -->
      <div class="toast-test-buttons">
        <button @click="showSuccessToast">Success Toast</button>
        <button @click="showErrorToast">Error Toast</button>
        <button @click="showWarningToast">Warning Toast</button>
        <button @click="showInfoToast">Info Toast</button>
      </div>

      <div class="feature-section">
        <h3>3D Viewer</h3>
        <p>Your Three.js components go here</p>
      </div>

      <div class="feature-section">
        <h3>UI Controls</h3>
        <p>Floating buttons, panels, etc.</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FederatedComponent',
  data() {
    return {
      toast: null,
    };
  },

  async mounted() {
    console.log('Test app federated component mounted!');

    // Dynamically import the toast composable from shell-app
    try {
      const { useToast } = await import('shellApp/useToast');
      this.toast = useToast();
      console.log('Toast composable loaded successfully!');
    } catch (error) {
      console.error('Failed to load toast composable:', error);
    }
  },

  methods: {
    showSuccessToast() {
      if (this.toast) {
        this.toast.success('Success from federated app!', {
          secondaryMessage: 'This toast was triggered from the test-app',
        });
      }
    },

    showErrorToast() {
      if (this.toast) {
        this.toast.error('Error from federated app!', {
          secondaryMessage: 'This error was triggered from the test-app',
        });
      }
    },

    showWarningToast() {
      if (this.toast) {
        this.toast.warning('Warning from federated app!', {
          secondaryMessage: 'This warning was triggered from the test-app',
        });
      }
    },

    showInfoToast() {
      if (this.toast) {
        this.toast.info('Info from federated app!', {
          secondaryMessage: 'This info was triggered from the test-app',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.test-app-federated {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  margin: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  h1 {
    color: #42b883;
    margin-bottom: 10px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .content {
    margin-top: 20px;
  }

  .toast-test-buttons {
    margin: 20px 0;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;

      &:nth-child(1) {
        background: #10b981;
        color: white;
        &:hover {
          background: #059669;
        }
      }

      &:nth-child(2) {
        background: #ef4444;
        color: white;
        &:hover {
          background: #dc2626;
        }
      }

      &:nth-child(3) {
        background: #f59e0b;
        color: white;
        &:hover {
          background: #d97706;
        }
      }

      &:nth-child(4) {
        background: #3b82f6;
        color: white;
        &:hover {
          background: #2563eb;
        }
      }
    }
  }

  .feature-section {
    background: rgba(255, 255, 255, 0.9);
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    border-left: 4px solid #42b883;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    h3 {
      margin-top: 0;
      color: #2c3e50;
    }
  }
}
</style>
