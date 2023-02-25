import { InfinitySpin } from "react-loader-spinner";
import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={style.Loader}>
      <InfinitySpin width="300" color="#4cc6f5" />
    </div>
  );
};

export default Loader;
