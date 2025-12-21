import styles from "./Banner.module.css";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <>
      <div className={styles.container} id="home">
        <div className={styles.navbar}>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className={styles.banner}>
          <div className={styles.content}>
            <h3>Hello I'm</h3>
            <h1>Saksham Sankhla</h1>
            <h2>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "I'm a Web Developer",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "I'm a UI/UX Designer",
                  1000,
                  "I'm a Content Writer",
                  1000,
                ]}
                wrapper="span"
                speed={20}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </h2>
            <p>
              A passionate web developer based in Jodhpur,Rajasthan. With a keen
              eye for detail and a passion for web design, I specialize in
              creating visually captivating and highly functional websites
            </p>
            <button className={styles.btn}>Download Resume</button>
          </div>
          <img
            src="https://ashik-html.vercel.app/img/author-banner.png"
            alt="Saksham Sankhla"
            className={styles.mainPhoto}
            fetchPriority="high"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
