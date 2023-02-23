import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteList } from "../../redux/board/lists/operations";
import { CategoryItem } from "../CategoryItem/CategoryItem";
import styles from "./CategoryList.module.scss";
import AddCategoryItem from "../AddCategoryItem/AddCategoryItem";
import { useState } from "react";

export const CategoryList = ({ list }) => {
  const dispatch = useDispatch();

  const [showAddCard, setShowAddCard] = useState(false);

  const handleOpenClick = () => {
    setShowAddCard(true);
  };

  const handleCloseClick = () => {
    setShowAddCard(false);
  };

  return (
    <div className={styles.categoryList}>
      <div className={styles.categoryTitle}>
        <h5>{list.title}</h5>
        <button type="button" onClick={() => dispatch(deleteList(list._id))}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className={styles.categoryList__content}>
        <CategoryItem cards={list.cards} />
      </div>
      {showAddCard ? (
        <AddCategoryItem handleClick={handleCloseClick} listId={list._id} />
      ) : (
        <button
          type="button"
          className={styles.categoryList__btn}
          onClick={handleOpenClick}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add card
        </button>
      )}
    </div>
  );
};
