import { Logo } from "../Logo/Logo";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Logo />

      <ul className={styles.listInfo}>
        <li className={styles.listInfo__item}>
          Create checklists: You can create a checklist of tasks that need to be
          completed within a card. This is useful for breaking down larger tasks
          into smaller, more manageable steps.
        </li>
        <li className={styles.listInfo__item}>
          Drag and Drop: You can use drag and drop functionality to easily move
          cards and lists around the board, improving organization and workflow.
        </li>
        <li className={styles.listInfo__item}>
          Delete and Edit: You can edit the details of existing cards, such as
          changing the card name, description, and delete it from the board.
          This can help you keep your tasks up by updating the relevant info.
        </li>
      </ul>
    </div>
  );
};
