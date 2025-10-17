import { NavBar } from "./components/NavBar";
import { Intro } from "./components/Intro";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import "./App.css";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
// import { Contact } from "./components/Contact";

const App = () => {
  return (
    <>
      <NavBar />
      <Intro />
      <Skills />
      <Projects />
      <About />
      {/* <Contact /> */}
      <Footer />
    </>
  );
};

export default App;
