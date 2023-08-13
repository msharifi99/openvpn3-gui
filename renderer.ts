interface Config {
  path: string;
  imported: string;
  lastUsed?: string;
  used?: string;
  name?: string;
  owner?: string;
}
window.onload = () => {
  const cp = require("child_process");
  const os = require("os");

  function parseData(data: string) {
    const configStrs = data
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
      const lastUsedAndUsedMatches =
        lastUsedAndUsed.match(lastUsedAndUsedRegex);

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

  function createConnectButton(configPath: string) {
    const button = document.createElement("button");
    button.innerText = "Connect";
    button.onclick = () => {
      console.log("hello");
      cp.exec(
        `openvpn3 session-start --config-path "${configPath}"`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(`Error starting session: ${err}`);
            return;
          }
          console.log(`Session started for config: ${configPath}`);
        }
      );
    };
    return button; // Return the HTML represen
  }

  function renderData(data: Config[]) {
    const outputDiv = document.getElementById("output")!;

    // Create table
    let table = document.createElement("table");

    // Create table headers
    let headers = document.createElement("tr");
    headers.innerHTML =
      "<th>Path</th><th>Name</th><th>Imported</th><th>Last Used</th><th>Used</th><th>Owner</th><th>Connect</th>";
    table.appendChild(headers);

    // Fill table with data
    data.forEach((config) => {
      let row = document.createElement("tr");

      row.innerHTML = `<td>${
        config.path.length > 20
          ? config.path.substring(0, 10) +
            "..." +
            config.path.substring(config.path.length - 10, config.path.length)
          : config.path
      }</td><td>${config.name || ""}</td><td>${config.imported}</td><td>${
        config.lastUsed || ""
      }</td><td>${config.used || ""}</td><td>${config.owner || ""}</td>`;

      const connectButton = createConnectButton(config.path);
      const connectButtonCell = document.createElement("td");
      connectButtonCell.appendChild(connectButton);

      row.appendChild(connectButtonCell);

      table.appendChild(row);
    });

    // Add table to output
    outputDiv.appendChild(table);
  }

  cp.exec("openvpn3 configs-list", (err, stdout, stderr) => {
    if (err) {
      console.error(`Execution Error: ${err}`);
      return;
    }

    let parsedData = parseData(stdout);

    renderData(parsedData);
  });
};
