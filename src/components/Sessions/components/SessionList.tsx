import { Session } from "src/types";
import SessionRow from "./SessionRow";

const SessionList = ({
  sessionList,
  fetchSessionList,
}: {
  sessionList: Session[];
  fetchSessionList: () => void;
}) => {
  return (
    <table className="config-table">
      <thead>
        <tr>
          <th>Path</th>
          <th>Status</th>
          <th>Created</th>
          <th>Owner</th>
          <th>Config Name</th>
          <th>Session Name</th>
          <th>Disconnect</th>
        </tr>
      </thead>
      <tbody>
        {sessionList.map((config, index) => (
          <SessionRow
            key={index}
            session={config}
            onDisconnect={fetchSessionList}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SessionList;
