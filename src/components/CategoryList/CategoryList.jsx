import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteList } from "../../redux/board/lists/operations";
import { CategoryItem } from "../CategoryItem/CategoryItem";
import AddCategoryItem from "../AddCategoryItem/AddCategoryItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./CategoryList.module.scss";
import { updateCard } from "../../redux/board/cards/operations";

export const CategoryList = ({ list }) => {
  const dispatch = useDispatch();

  const [showAddCard, setShowAddCard] = useState(false);
  const [draggingCardId, setDraggingCardId] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [draggingCardOut, setDraggingCardOut] = useState(false);
  const [sortDirection, setSortDirection] = useState("desc"); // or 'asc'
  const [sortedCards, setSortedCards] = useState([]);

  const toggleAppCard = () => {
    setShowAddCard(!showAddCard);
  };

  const sortCards = (direction) => {
    const sorted = [...list.cards].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return direction === "desc" ? dateB - dateA : dateA - dateB;
    });
    setSortDirection(direction);
    setSortedCards(sorted);
  };

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("text/plain", card._id);
    setDraggingCardId(card._id);
  };

  const handleDragLeave = () => {
    setDraggingCardOut(false);
    setDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDrop = async (e, listId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    dispatch(updateCard({ cardId, body: { listId } }));
    setDraggingCardOut(false);
    setDraggingCardId(null);
    setDragOver(false);
  };

  return (
    <div
      className={`${styles.categoryList} 
      ${draggingCardOut ? styles.draggingOut : ""} ${
        dragOver ? styles.dragOver : ""
      } ${draggingCardOut ? styles.draggingOut : ""}`}
      onDragEnter={() => setDraggingCardOut(true)}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, list._id)}
    >
      <div className={styles.categoryTitle}>
        <h5>{list.title}</h5>
        {/* <input
          type="text"
          defaultValue={list.title}
          onBlur={(event) => {
            const title = event.target.value.trim();
            dispatch(updateList({ listId: list._id, title: title }));
          }}
        /> */}
        <button type="button" onClick={() => dispatch(deleteList(list._id))}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {sortedCards.length > 0
        ? sortedCards.map((card) => (
            <div
              key={card?._id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card)}
            >
              <CategoryItem card={card} />
            </div>
          ))
        : list.cards.map((card) => (
            <div
              key={card?._id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card)}
            >
              <CategoryItem card={card} />
            </div>
          ))}
      {showAddCard ? (
        <AddCategoryItem handleClick={toggleAppCard} listId={list._id} />
      ) : (
        <button
          type="button"
          className={styles.categoryList__btn}
          onClick={toggleAppCard}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add card
        </button>
      )}
      {list.cards.length <= 1 ? null : (
        <>
          <button onClick={() => sortCards("asc")}>Sort by oldest</button>
          <button onClick={() => sortCards("desc")}>Sort by newest</button>
        </>
      )}
    </div>
  );
};
