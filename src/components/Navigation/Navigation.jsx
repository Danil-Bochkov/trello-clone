import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div>
      <div className="logo">
        <span className="logo__text">T</span>
      </div>
      <nav>
        <ul className="navList">
          <li className="navList__item">
            <Link></Link>
          </li>
          <li className="navList__item">
            <Link></Link>
          </li>
          <li className="navList__item">
            <Link></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
