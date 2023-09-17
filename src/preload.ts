import { contextBridge, ipcRenderer } from "electron";

export type Action =
  | { type: "configList"; payload?: never }
  | { type: "startSession"; payload: { configPath: string } }
  | { type: "sessionList"; payload?: never }
  | { type: "disconnectSession"; payload: { sessionPath: string } }
  | { type: string; payload: Record<string, any> };

declare global {
  /**
   * We define all IPC APIs here to give devs auto-complete
   * use window.electron anywhere in app
   * Also note the capital "Window" here
   */
  interface Window {
    openvpn3CLI: {
      dispatch: (action: Action) => Promise<any>;

      // Add any additional "APIs" here
    };
  }
}

contextBridge.exposeInMainWorld("openvpn3CLI", {
  dispatch: (action: Action) => ipcRenderer.invoke("openvpn3CLI", action),
});
