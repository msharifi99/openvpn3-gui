import { useEffect, useState } from "react";
import { Config } from "src/types";
import ConfigList from "./components/ConfigList";

import "./configs.css";

function parseConfigListString(configString: string): Config[] {
  const configStrs = configString
    .trim()
    .split("\n")
    .slice(4, -1)
    .join("\n")
    .split("\n\n"); // Skip headers and separators

  return configStrs.map((configStr) => {
    const lines = configStr.split("\n");
    const config = {} as Config;

    config.path = lines[0].trim();
    config.imported = lines[1].substring(0, 24);

    const lastUsedAndUsed = lines[1].substring(24);
    const lastUsedAndUsedRegex = /\s*([\s\w:]+\w)?\s{2,}(\w+)/;
    const lastUsedAndUsedMatches = lastUsedAndUsed.match(lastUsedAndUsedRegex);

    if (lastUsedAndUsedMatches) {
      config.lastUsed = lastUsedAndUsedMatches[1];
      config.used = lastUsedAndUsedMatches[2];
    }

    const regex = /(\w+)\s+(\w+)/;

    const matches = lines[2].match(regex);
    if (matches) {
      config.name = matches[1];
      config.owner = matches[2];
    }

    return config;
  });
}

const Configs = () => {
  const [configList, setConfigList] = useState<Config[]>([]);

  useEffect(() => {
    window.openvpn3CLI.dispatch({ type: "configList" }).then((str: string) => {
      setConfigList(parseConfigListString(str));
    });
  }, []);

  return <ConfigList configList={configList} />;
};

export default Configs;
