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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="#58b918"
                viewBox="0 0 256 256"
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="#58b918"
                viewBox="0 0 256 256"
              >
                <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="#58b918"
                viewBox="0 0 256 256"
              >
                <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
              </svg>
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
