import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
      <div className={styles.content}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.links}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
          >
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnOutline}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
