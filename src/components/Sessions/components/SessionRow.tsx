import { useMemo } from "react";
import DisconnectButton from "./DisconnectButton";
import { Config, Session } from "src/types";

const formatDateString = (dateStr: string) => {
  if (!dateStr) return;

  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

const SessionRow = ({
  session: { created, path, configName, owner, sessionName, status },
  onDisconnect,
}: {
  session: Session;
  onDisconnect: () => void;
}) => {
  const prettifiedPath = useMemo(() => {
    return path.length > 10
      ? path.substring(0, 5) +
          "..." +
          path.substring(path.length - 5, path.length)
      : path;
  }, [path]);

  const formattedCreated = useMemo(() => formatDateString(created), [created]);

  const fallbackChar = "-";

  return (
    <tr>
      <td>{prettifiedPath}</td>
      <td>{status || fallbackChar}</td>
      <td>{formattedCreated || fallbackChar}</td>{" "}
      <td>{owner || fallbackChar}</td>
      <td>{configName || fallbackChar}</td>
      <td>{sessionName || fallbackChar}</td>
      <td>
        <DisconnectButton sessionPath={path} onDisconnect={onDisconnect} />
      </td>
    </tr>
  );
};

export default SessionRow;
