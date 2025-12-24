import { useState } from "react";
import styles from "./Contact.module.css";
import axios from "axios";
import { useFormik } from "formik";

function Contact() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const url = `${import.meta.env.VITE_API_URL}/sendMail`;
    const payload = {
      name: values.name,
      from: values.email,
      phone: values.number,
      subject: values.subject,
      body: values.body,
    };

    try {
      await axios.post(url, payload);
      setStatus({ type: "success", message: "Message sent successfully!" });
      resetForm();
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      subject: "",
      body: "",
    },
    onSubmit,
  });

  return (
    <>
      <div className={styles.contact} id="contact">
        <h1>Contact Us</h1>
        <div className={styles.content}>
          <ul className={styles.info}>
            <li>
              29,Park Residency Colony, Shikargarh, Jodhpur, Rajasthan, India
            </li>
            <li>sakshamsankhla767@gmail.com</li>
            <li>7014461339</li>
          </ul>

          <ul className={styles.social}>
            <li>
              <a
                href="https://www.instagram.com/sankhlakhush"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="#58b918"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/saksham-sankhla/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="#58b918"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/saksham-sankhla04"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="#58b918"
                  viewBox="0 0 256 256"
                >
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.55a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.55a8,8,0,0,0,1.1,7.69A41.74,41.74,0,0,1,200,104Z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <form action="" className={styles.form}>
          {status.message && (
            <div
              className={`${styles.status} ${status.type === "success" ? styles.success : styles.error}`}
            >
              {status.message}
            </div>
          )}
          <input
            onChange={handleChange}
            value={values.name}
            id="name"
            type="text"
            placeholder="Name"
          />
          <input
            onChange={handleChange}
            value={values.number}
            id="number"
            type="text"
            placeholder="Phone Number"
          />
          <input
            onChange={handleChange}
            value={values.email}
            id="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={handleChange}
            value={values.subject}
            id="subject"
            type="text"
            placeholder="Subject"
            required
          />
          <textarea
            onChange={handleChange}
            value={values.body}
            id="body"
            placeholder="Your Message"
            required
          />
          <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
