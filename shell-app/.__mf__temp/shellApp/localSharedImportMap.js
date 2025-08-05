
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "fabric": async () => {
          let pkg = await import("__mf__virtual/shellApp__prebuild__fabric__prebuild__.js")
          return pkg
        }
      ,
        "vue": async () => {
          let pkg = await import("__mf__virtual/shellApp__prebuild__vue__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "fabric": {
            name: "fabric",
            version: "5.5.2",
            scope: ["default"],
            loaded: false,
            from: "shellApp",
            async get () {
              usedShared["fabric"].loaded = true
              const {"fabric": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.5.2"
            }
          }
        ,
          "vue": {
            name: "vue",
            version: "3.5.18",
            scope: ["default"],
            loaded: false,
            from: "shellApp",
            async get () {
              usedShared["vue"].loaded = true
              const {"vue": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^3.5.18"
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      