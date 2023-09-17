import Configs from "./Configs";
import Sessions from "./Sessions";

const App = () => {
  return (
    <main>
      <section>
        <h1>Configurations: </h1>
        <Configs />
      </section>
      <section>
        <h1>Sessions: </h1>
        <Sessions />
      </section>
    </main>
  );
};

export default App;
