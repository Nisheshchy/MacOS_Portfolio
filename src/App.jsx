/** @format */
import { Navbar, Welcome, Dock } from "#components";
import { Safari, Terminal } from "#windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
    </main>
  );
};

export default App;
