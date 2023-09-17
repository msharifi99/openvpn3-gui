import { useState } from "react";

const DisconnectButton = ({
  sessionPath,
  onDisconnect,
}: {
  sessionPath: string;
  onDisconnect: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const disconnectSession = () => {
    setIsLoading(true);
    window.openvpn3CLI
      .dispatch({
        type: "disconnectSession",
        payload: { sessionPath: sessionPath },
      })
      .then(() => {
        onDisconnect();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button disabled={isLoading} onClick={disconnectSession}>
      {isLoading ? "Loading..." : "Disconnect"}
    </button>
  );
};

export default DisconnectButton;
