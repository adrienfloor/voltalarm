const { contextBridge, ipcRenderer } = require('electron')

const electronHandler = {
  sendIPCMessage: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  onIPCMessage: (channel: string, data: any) => {
    ipcRenderer.on(channel, data);
  },
  removeIPCListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronHandler)

export type ElectronHandler = typeof electronHandler;
