import { Link } from "react-router-dom";
import styles from "./ProjectsPage.module.css";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import HelmetSeo from "../utils/HelmetSeo";

function ProjectsPage() {
  return (
    <div className={styles.page}>
      <HelmetSeo
        title="Projects | Saksham Sankhla - Portfolio"
        description="Explore Saksham Sankhla's portfolio of web development projects showcasing skills in React, JavaScript, and modern web technologies."
        canonical="/projects"
        keywords="Saksham Sankhla projects, portfolio, web development, React projects, case studies"
      />
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.backLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>My Projects</h1>
          <p>
            A collection of projects I've worked on, showcasing my skills in web
            development, design, and problem-solving.
          </p>
        </div>
      </section>

      <section className={styles.projects}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Want to work together?</p>
          <Link to="/#contact" className={styles.contactBtn}>
            Get in Touch
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default ProjectsPage;
