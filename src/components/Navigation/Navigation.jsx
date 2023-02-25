import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import styled from "styled-components";
import styles from "./Navigation.module.scss";

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 17px;
  line-height: 120%;
  letter-spacing: 0.03em;
  border-radius: 20px;
  padding: 5px 10px;
  &.active {
    outline: 1px solid black;
  }

  &:hover {
    background-color: lightgray;
  }
`;

export const Navigation = () => {
  return (
    <div className={styles.navigationWrapper}>
      <nav className={styles.nav}>
        <Logo />
        <ul className={styles.navList}>
          <li className="navList__item">
            <Link to="/">Home</Link>
          </li>
          <li className="navList__item">
            <Link to="/board">Board</Link>
          </li>
          <li className="navList__item">
            <Link
              to="https://github.com/Danil-Bochkov/trello-clone"
              target="_blank"
              rel="noreferrer"
            >
              Code of frontend
            </Link>
          </li>
          <li className="navList__item">
            <Link
              to="https://github.com/Danil-Bochkov/trello-clone-backend"
              target="_blank"
              rel="noreferrer"
            >
              Code of backend
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
