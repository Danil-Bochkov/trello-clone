import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCardInfo } from "../../redux/board/cards/operations";
import TextArea from "../Textarea/Textarea";
import styles from "../AddCategoryItem/AddCategoryItem.module.scss";
import { toast } from "react-toastify";

const EditCategoryItem = ({ cardId, title, description, handleClick }) => {
  const [idOfCard, setIdOfCard] = useState(cardId);
  const [titleToEdit, setTitle] = useState(title);
  const [descriptionToEdit, setDescription] = useState(description);
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdateInfoCard = () => {
    if (!titleToEdit || !descriptionToEdit) {
      return toast.error("Fields can`t be empty");
    } else if (titleToEdit.length <= 3) {
      return toast.info("The title of the card must be at least 4 characters");
    } else if (descriptionToEdit.length <= 7) {
      return toast.info(
        "The description of the card must be at least 8 characters"
      );
    } else {
      dispatch(
        updateCardInfo({
          cardId: idOfCard,
          title: titleToEdit,
          description: descriptionToEdit,
        })
      );
      setTitle("");
      setDescription("");
      handleClick();
    }
  };

  return (
    <div className={styles.addItemWrapper}>
      <input
        type="text"
        maxLength={20}
        value={titleToEdit}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <TextArea
        placeholder="Enter description here"
        handleChange={handleDescriptionChange}
        value={descriptionToEdit}
      />
      <div className={styles.btnWrapper}>
        <button type="button" onClick={handleClick}>
          Cancel
        </button>
        <button type="button" onClick={handleUpdateInfoCard}>
          Add Card
        </button>
      </div>
    </div>
  );
};

export default EditCategoryItem;
