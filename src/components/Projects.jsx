import { Link } from "react-router-dom";
import styles from "./Projects.module.css";

function Projects() {
  return (
    <>
      <div className={styles.section} id="projects">
        <h1>My Projects</h1>
        <div className={styles.container}>
          <div className={styles.image}>
            <img
              src="https://ashik-html.vercel.app/img/project-3.png"
              alt="SEO Optimization Project"
              loading="lazy"
            />
          </div>
          <div className={styles.content}>
            <h3>SEO Optimization</h3>
            <p>
              A personal portfolio is a collection of your work, achievements,
              and skills that highlights your abilities and
            </p>
            <ul>
              <li>Mistakes to Avoid</li>
              <li>Mistakes to Avoid</li>
              <li>Mistakes to Avoid</li>
            </ul>
          </div>
        </div>
        <div className={styles.viewAll}>
          <Link to="/projects" className={styles.viewAllBtn}>
            View All Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Projects;
