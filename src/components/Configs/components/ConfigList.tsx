import { Config } from "src/types";
import ConfigRow from "./ConfigRow";

const ConfigList = ({ configList }: { configList: Config[] }) => {
  return (
    <table className="config-table">
      <thead>
        <tr>
          <th>Path</th>
          <th>Name</th>
          <th>Imported</th>
          <th>Last Used</th>
          <th>Used</th>
          <th>Owner</th>
          <th>Connect</th>
        </tr>
      </thead>
      <tbody>
        {configList.map((config, index) => (
          <ConfigRow key={index} config={config} />
        ))}
      </tbody>
    </table>
  );
};

export default ConfigList;
