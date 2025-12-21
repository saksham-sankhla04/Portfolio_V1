import styles from "./About.module.css";

function About() {
  return (
    <>
      <div className={styles.section} id="about">
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>About Me</h1>
            <p>
              Hi there, I'm a passionate <span>full-stack developer</span> and a
              3rd-year student at JIET Group of Institutions. With a love for
              coding and technology, I specialize in building scalable,
              user-friendly web applications that deliver seamless experiences.
            </p>
            <ul>
              <li>Time Management</li>
              <li>Team Player</li>
              <li>Good Communication</li>
              <li>Attention to detail</li>
            </ul>
            {/* <button className={styles.btn}>Read More</button> */}
          </div>
          <div className={styles.img}>
            <img
              src="https://ashik-html.vercel.app/img/about-1.png"
              alt="About Saksham"
              className={styles.imgBig}
              loading="lazy"
            />
            <img
              src="https://ashik-html.vercel.app/img/about-2.png"
              alt="Working"
              className={styles.imgSmall}
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles.services} id="services">
          <h1>My Services</h1>
          <div className={styles.serviceContainer}>
            <div className={styles.card}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
              <h2>Content Writing</h2>
              <p>
                content writing is SEO-friendly, engaging, clear, and
                action-driven, enhancing readability and user engagement.
              </p>
              <span>&rarr;</span>
            </div>
            <div className={styles.card}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                  />
                </svg>
              </div>
              <h2>Web Designing</h2>
              <p>
                It focuses on aesthetics, usability, responsiveness, and
                functionality to create engaging and user-friendly websites.
              </p>
              <span>&rarr;</span>
            </div>
            <div className={styles.card}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </div>
              <h2>Web Development</h2>
              <p>
                It builds and maintains websites using coding, databases, and
                frameworks for functionality and performance.
              </p>
              <span>&rarr;</span>
            </div>
            <div className={styles.card}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
              </div>
              <h2>Rest API</h2>
              <p>
                It enables system communication using HTTP methods like GET,
                POST, PUT, and DELETE for data exchange.
              </p>
              <span>&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
