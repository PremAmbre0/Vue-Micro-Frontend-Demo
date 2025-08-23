# 🏗️ Vue Micro Frontend Architecture - Sandbox Setup

Welcome to the Vue Micro Frontend Architecture sandbox! This guide will help you set up and test the micro frontend architecture with your own deployment URLs.

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd Vue-Micro-Frontend-Demo
npm install
```

### 2. Configure Your URLs
Run the interactive setup script to configure your deployment URLs:
```bash
npm run setup:sandbox
```

The script will ask for your deployment URLs for each micro frontend:
- Shell App URL (main application)
- Demo One App URL (shapes demo)
- Demo Two App URL (text & images demo)  
- Demo Three App URL (drawing demo)
- Demo Counter App URL (state management demo)

### 3. Build for Sandbox
```bash
npm run build:sandbox
```

### 4. Preview Sandbox
```bash
npm run preview:sandbox
```

## 📁 Environment Files Structure

After running the setup script, you'll have:

```
├── .env.sandbox (root - centralized sandbox config)
├── shell-app/.env.sandbox
├── demo-one-app/.env.sandbox
├── demo-two-app/.env.sandbox
├── demo-three-app/.env.sandbox
└── demo-counter-app/.env.sandbox
```

## 🌐 Deployment Options

You can deploy to any hosting platform:

### Vercel (Recommended)
1. Fork this repository
2. Connect each app folder to a separate Vercel project
3. Deploy each app individually
4. Use the generated URLs in the sandbox setup

### Netlify
1. Create separate sites for each app
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy each app
5. Use the generated URLs in the sandbox setup

### GitHub Pages
1. Build each app locally
2. Push `dist` folders to separate repositories
3. Enable GitHub Pages for each repository
4. Use the GitHub Pages URLs in the sandbox setup

## 🔧 Manual Configuration

If you prefer to configure manually, edit the `.env.sandbox` files:

### Root `.env.sandbox`
```env
VITE_SHELL_APP_URL=https://your-shell-app.vercel.app
VITE_DEMO_ONE_APP_URL=https://your-demo-one.vercel.app
VITE_DEMO_TWO_APP_URL=https://your-demo-two.vercel.app
VITE_DEMO_THREE_APP_URL=https://your-demo-three.vercel.app
VITE_DEMO_COUNTER_APP_URL=https://your-demo-counter.vercel.app

VITE_SHELL_REMOTE_ENTRY=https://your-shell-app.vercel.app/remoteEntry.js
VITE_DEMO_ONE_REMOTE_ENTRY=https://your-demo-one.vercel.app/remoteEntry.js
VITE_DEMO_TWO_REMOTE_ENTRY=https://your-demo-two.vercel.app/remoteEntry.js
VITE_DEMO_THREE_REMOTE_ENTRY=https://your-demo-three.vercel.app/remoteEntry.js
VITE_DEMO_COUNTER_REMOTE_ENTRY=https://your-demo-counter.vercel.app/remoteEntry.js

VITE_DEMO_ONE_CSS_URL=https://your-demo-one.vercel.app/assets/style.css
VITE_DEMO_TWO_CSS_URL=https://your-demo-two.vercel.app/assets/style.css
VITE_DEMO_THREE_CSS_URL=https://your-demo-three.vercel.app/assets/style.css
VITE_DEMO_COUNTER_CSS_URL=https://your-demo-counter.vercel.app/assets/style.css
```

## 🎯 Available Commands

```bash
# Setup sandbox with your URLs
npm run setup:sandbox

# Build all apps for sandbox
npm run build:sandbox

# Preview sandbox build
npm run preview:sandbox

# Development (local)
npm run dev
```

## 🏗️ Architecture Overview

This micro frontend architecture demonstrates:

- **Module Federation**: Seamless sharing of components between apps
- **Independent Deployment**: Each app can be deployed separately
- **Centralized Shell**: Main app that orchestrates other micro frontends
- **Dynamic Loading**: Components are loaded on-demand
- **Shared State**: State management across micro frontends
- **CSS Isolation**: Scoped styles for each micro frontend

## 🔍 Testing the Architecture

1. **Deploy each app** to your preferred hosting platform
2. **Configure URLs** using the sandbox setup script
3. **Build and preview** the sandbox environment
4. **Test micro frontend loading** by navigating between different demos
5. **Verify state sharing** in the interface demo section

## 💡 Tips

- Use the same hosting platform for all apps for consistency
- Ensure CORS is properly configured on your hosting platform
- Test with different URL patterns to understand the flexibility
- Try deploying to different platforms to test cross-platform compatibility

## 🐛 Troubleshooting

### Build Errors
- Ensure all URLs are properly formatted (include https://)
- Check that environment variables are correctly set
- Verify that all dependencies are installed

### Loading Issues
- Check browser console for CORS errors
- Ensure all deployed apps are accessible
- Verify that remoteEntry.js files are available at the specified URLs

### State Management Issues
- Ensure the shell app is loaded first
- Check that shared dependencies are properly configured
- Verify that the interface demo is working correctly

## 📚 Learn More

- [Module Federation Documentation](https://module-federation.github.io/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue.js Documentation](https://vuejs.org/)

Happy testing! 🚀
