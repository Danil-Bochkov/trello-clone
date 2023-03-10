import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addList } from "../../redux/board/lists/operations";
import styles from "./AddCategoryList.module.scss";

const AddCategoryList = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === "") {
      return toast.info("Please fill in the title of the category");
    } else if (title.length <= 1) {
      return toast.error(
        "The title of the category must be at least 2 characters"
      );
    }
    dispatch(addList({ title }));
    setTitle("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.form__input}
        type="text"
        maxLength={20}
        placeholder="Enter list title"
        value={title}
        onChange={handleTitleChange}
      />
      <button className={styles.form__btn} type="submit">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default AddCategoryList;
