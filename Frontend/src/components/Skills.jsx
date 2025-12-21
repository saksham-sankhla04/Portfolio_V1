import styles from "./Skills.module.css";
import js from "../assets/javascript-logo-svgrepo-com.svg";
import css from "../assets/css3-svgrepo-com.svg";
import html from "../assets/html-5-svgrepo-com.svg";
import rc from "../assets/react-1-logo-svgrepo-com.svg";
import vs from "../assets/vs-code-svgrepo-com.svg";
import ps from "../assets/postman-icon-svgrepo-com.svg";
import mg from "../assets/mongodb-svgrepo-com.svg";

function Skills() {
  return (
    <>
      <div
        className={styles.container}
        style={{ "--width": "100px", "--quantity": "7", "--height": "50px" }}
      >
        <ul className={styles.list}>
          <li className={styles.item} style={{ "--position": 1 }}>
            <img src={js} alt="Js Logo" />
          </li>
          <li className={styles.item} style={{ "--position": 2 }}>
            <img src={css} alt="Js Logo" />
          </li>
          <li className={styles.item} style={{ "--position": 3 }}>
            <img src={html} alt="Js Logo" />
          </li>
          <li className={styles.item} style={{ "--position": 4 }}>
            <img src={rc} alt="Js Logo" />
          </li>
          <li className={styles.item} style={{ "--position": 5 }}>
            <img src={vs} alt="Js Logo" />
          </li>
          <li className={styles.item} style={{ "--position": 6 }}>
            <img src={ps} alt="Js Logo" />
          </li>
          <li className={styles.item} style={{ "--position": 7 }}>
            <img src={mg} alt="Js Logo" />
          </li>
        </ul>
      </div>
      ;
    </>
  );
}

export default Skills;
