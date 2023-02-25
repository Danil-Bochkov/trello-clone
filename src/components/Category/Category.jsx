import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../redux/board/lists/operations";
import { selectLists } from "../../redux/board/lists/selectors";
import AddCategoryList from "../AddCategoryList/AddCategoryList";
import { CategoryList } from "../CategoryList/CategoryList";
import styles from "./Category.module.scss";

export const Category = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);

  const [title, setTitle] = useState("Change title to your");
  const [editableTitle, setEditableTitle] = useState(title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  useEffect(() => {
    if (isEditingTitle) {
      titleInputRef.current.focus();
    } else {
      setTitle(editableTitle);
    }
  }, [isEditingTitle, editableTitle]);

  function handleTitleChange(event) {
    setEditableTitle(event.target.value);
  }

  function handleTitleBlur() {
    setIsEditingTitle(false);
  }

  return (
    <div className={styles.category}>
      <div className={styles.category__header}>
        <input
          type="text"
          value={editableTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          ref={titleInputRef}
          maxLength={40}
        />
      </div>
      <div className={styles.contentWrapper}>
        {lists.map((item, i) => (
          <CategoryList list={item} key={i} />
        ))}
        <AddCategoryList />
      </div>
    </div>
  );
};
