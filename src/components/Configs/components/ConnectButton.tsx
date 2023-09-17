const ConnectButton = ({ configPath }: { configPath: string }) => {
  const startSession = () => {
    window.openvpn3CLI.dispatch({
      type: "startSession",
      payload: { configPath: configPath },
    });
  };

  return <button onClick={startSession}>Connect</button>;
};

export default ConnectButton;
