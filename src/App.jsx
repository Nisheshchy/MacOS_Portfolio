/** @format */
import { Navbar, Welcome, Dock } from "#components";
import { Terminal } from "#windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
    </main>
  );
};

export default App;
