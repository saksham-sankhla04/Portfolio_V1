import { lazy, Suspense } from "react";
import Banner from "../components/Banner";
import About from "../components/About";
import HelmetSeo from "../utils/HelmetSeo";

const Projects = lazy(() => import("../components/Projects"));
const Skills = lazy(() => import("../components/Skills"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

function Home() {
  return (
    <>
      <HelmetSeo
        title="Saksham Sankhla | Full Stack Developer & Designer"
        description="Welcome to my portfolio. I'm Saksham Sankhla, a full stack developer specializing in building exceptional digital experiences with modern web technologies."
        canonical="/"
        keywords="Saksham Sankhla, web developer, full stack developer, portfolio, React, JavaScript"
      />
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
