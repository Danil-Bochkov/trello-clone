import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClock } from "@fortawesome/free-solid-svg-icons";
import { deleteCard } from "../../redux/board/cards/operations";

import styles from "./CategoryItem.module.scss";
import handleTimeAgo from "../../utils/handleTimeAgo";

export const CategoryItem = ({ cards }) => {
  const dispatch = useDispatch();

  return cards.map((card) => (
    <div className={styles.categoryItem} key={card._id}>
      <h5 className={styles.categoryItem__title}>{card.title}</h5>
      <p className={styles.categoryItem__description}>{card.description}</p>
      <span className={styles.categoryItem__timeUpdate}>
        <FontAwesomeIcon icon={faClock} />
        {handleTimeAgo(card.updatedAt)}
      </span>
      <button
        type="button"
        className={styles.categoryItem__btn}
        onClick={() => dispatch(deleteCard(card._id))}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  ));
};
