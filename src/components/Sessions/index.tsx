import { useCallback, useEffect, useState } from "react";
import { Config, Session } from "src/types";
import SessionList from "./components/SessionList";

import "./configs.css";

function parseSessionListString(sessionString: string): Session[] {
  debugger;
  const sessionStrs = sessionString
    .trim()
    .split("\n")
    .slice(1, -1)
    .join("\n")
    .split("\n\n"); // Skip headers and separators

  return sessionStrs
    .filter((str) => Boolean(str))
    .map((sessionStr) => {
      const lines = sessionStr.split("\n");
      const session = {} as Session;

      const sessionValues = lines.map((line) => line.split(":")[1].trim());
      session.path = sessionValues[0];
      session.created = sessionValues[1];
      session.owner = sessionValues[2];
      session.configName = sessionValues[3];
      session.sessionName = sessionValues[4];
      session.status = sessionValues[5];

      return session;
    });
}

const Sessions = () => {
  const [sessionList, setSessionList] = useState<Session[]>([]);

  const fetchSessionList = useCallback(() => {
    window.openvpn3CLI.dispatch({ type: "sessionList" }).then((str: string) => {
      setSessionList(parseSessionListString(str));
    });
  }, []);
  useEffect(() => {
    fetchSessionList();
  }, []);

  return (
    <SessionList
      sessionList={sessionList}
      fetchSessionList={fetchSessionList}
    />
  );
};

export default Sessions;
