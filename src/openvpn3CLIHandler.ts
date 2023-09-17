import cp from "child_process";
import { Action } from "./preload";

const getConfigsList = () =>
  new Promise((resolve, reject) => {
    cp.exec("openvpn3 configs-list", (err: Error, stdout: string) => {
      if (err) {
        console.error(`Execution Error: ${err}`);
        reject(err);
        return;
      }

      resolve(stdout);
    });
  });

const startSession = (configPath: string) =>
  new Promise((resolve, reject) => {
    cp.exec(
      `openvpn3 session-start --config-path "${configPath}"`,
      (err: Error, stdout: string, stderr: string) => {
        if (err) {
          console.error(`Error starting session: ${err}`);
          reject();
          return;
        }
        resolve("session started");
        console.log(`Session started for config: ${configPath}`);
      }
    );
  });

const getSessionList = () =>
  new Promise((resolve, reject) => {
    cp.exec(
      "openvpn3 sessions-list",
      (err: Error, stdout: string, stderr: string) => {
        if (err) {
          reject();
          return;
        }
        console.log(stdout);
        resolve(stdout);
      }
    );
  });

const disconnectSession = (sessionPath: string) =>
  new Promise((resolve, reject) => {
    cp.exec(
      `openvpn3 session-manage --path "${sessionPath}" --disconnect`,
      (err: Error, stdout: string, stderr: string) => {
        if (err) {
          console.error(`Error starting session: ${err}`);
          reject();
          return;
        }
        resolve("session disconnected");
        console.log(`Session disconnected for path: ${sessionPath}`);
      }
    );
  });

const handler = (_: any, { type, payload }: Action) => {
  switch (type) {
    case "configList":
      return getConfigsList();
    case "startSession":
      return startSession(payload.configPath);
    case "sessionList":
      return getSessionList();
    case "disconnectSession":
      return disconnectSession(payload.sessionPath);
  }
};

export default handler;
