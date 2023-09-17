import { useMemo } from "react";
import ConnectButton from "./ConnectButton";
import { Config } from "src/types";

const formatDateString = (dateStr: string) => {
  if (!dateStr) return;

  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

const ConfigRow = ({
  config: { path, name, imported, lastUsed, used, owner },
}: {
  config: Config;
}) => {
  const prettifiedPath = useMemo(() => {
    return path.length > 20
      ? path.substring(0, 10) +
          "..." +
          path.substring(path.length - 10, path.length)
      : path;
  }, [path]);

  const formattedImported = useMemo(
    () => formatDateString(imported),
    [imported]
  );

  const formattedLastUsed = useMemo(
    () => formatDateString(lastUsed),
    [lastUsed]
  );

  const fallbackChar = "-";

  return (
    <tr>
      <td>{prettifiedPath}</td>
      <td>{name || fallbackChar}</td>
      <td>{formattedImported || fallbackChar}</td>{" "}
      <td>{formattedLastUsed || fallbackChar}</td>
      <td>{used || fallbackChar}</td>
      <td>{owner || fallbackChar}</td>{" "}
      <td>
        <ConnectButton configPath={path} />
      </td>
    </tr>
  );
};

export default ConfigRow;
