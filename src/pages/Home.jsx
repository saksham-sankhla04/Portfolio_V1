import { lazy, Suspense } from "react";
import Banner from "../components/Banner";
import About from "../components/About";

const Projects = lazy(() => import("../components/Projects"));
const Skills = lazy(() => import("../components/Skills"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

function Home() {
  return (
    <>
      <Banner />
      <About />
      <Suspense fallback={<div style={{ minHeight: "50vh" }} />}>
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
