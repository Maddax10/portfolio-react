import { NavBar } from "./components/NavBar";
import { Intro } from "./components/Intro";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import "./App.css";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { useReveal } from "./hooks/useReveal";

const App = () => {
  useReveal();

  return (
    <>
      <NavBar />
      <main>
        <Intro />
        <Skills />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  );
};

export default App;
