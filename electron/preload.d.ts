import { ElectronHandler } from './preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electronAPI: ElectronHandler;
  }
}

export {};
