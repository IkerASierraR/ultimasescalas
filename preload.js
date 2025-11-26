import { contextBridge, shell } from 'electron'

contextBridge.exposeInMainWorld('uptDesktop', {
  openExternal: (url) => {
    if (typeof url === 'string' && url.startsWith('http')) {
      shell.openExternal(url)
    }
  },
})
