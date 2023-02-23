import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../../redux/board/cards/operations";
import TextArea from "../Textarea/Textarea";
import styles from "./AddCategoryItem.module.scss";

const AddCategoryItem = ({ handleClick, listId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddCard = () => {
    const cardData = { title, description };
    dispatch(addCard({ listId, ...cardData }));
    setTitle("");
    setDescription("");
    handleClick();
  };

  return (
    <div className={styles.addItemWrapper}>
      <input
        type="text"
        maxLength={20}
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <TextArea
        placeholder="Enter description here"
        handleChange={handleDescriptionChange}
        value={description}
      />
      <div className={styles.btnWrapper}>
        <button type="button" onClick={handleClick}>
          Cancel
        </button>
        <button type="button" onClick={handleAddCard}>
          Add Card
        </button>
      </div>
    </div>
  );
};

export default AddCategoryItem;
