/** @format */
import { Navbar, Welcome, Dock } from "#components";
import { Resume, Safari, Terminal } from "#windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
    </main>
  );
};

export default App;
