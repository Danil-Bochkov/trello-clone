import { useEffect, useRef } from "react";
import styles from "./Textarea.module.scss";

const TextArea = ({ placeholder, handleChange, value }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `60px`;
      textareaRef.current.style.height = `${Math.max(
        60,
        textareaRef.current.scrollHeight
      )}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className={styles.Textarea}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextArea;
