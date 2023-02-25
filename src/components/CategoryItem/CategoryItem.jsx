import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/board/cards/operations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faClock,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./CategoryItem.module.scss";
import handleTimeAgo from "../../utils/handleTimeAgo";
import EditCategoryItem from "../EditCategoryItem/EditCategoryItem";

export const CategoryItem = ({ card }) => {
  const dispatch = useDispatch();
  const [editStates, setEditStates] = useState({});

  const handleOpenEditClick = (cardId) => {
    setEditStates((prevState) => ({ ...prevState, [cardId]: true }));
  };

  const handleCloseEditClick = (cardId) => {
    setEditStates((prevState) => ({ ...prevState, [cardId]: false }));
  };
  const isEditing = editStates[card?._id];

  return isEditing ? (
    <EditCategoryItem
      handleClick={() => handleCloseEditClick(card?._id)}
      title={card?.title}
      description={card?.description}
      cardId={card?._id}
    />
  ) : (
    <div className={styles.categoryItem}>
      <h5 className={styles.categoryItem__title}>{card?.title}</h5>
      <p className={styles.categoryItem__description}>{card?.description}</p>
      <span className={styles.categoryItem__timeUpdate}>
        <FontAwesomeIcon icon={faClock} />
        {handleTimeAgo(card?.updatedAt)}
      </span>
      <button
        type="button"
        className={styles.categoryItem__btn}
        onClick={() => dispatch(deleteCard(card?._id))}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className={styles.editBtn}
        type="button"
        onClick={() => handleOpenEditClick(card?._id)}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </div>
  );
};
