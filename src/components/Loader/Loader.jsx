import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        height="50"
        width="50"
        color="grey"
        strokeColor="#ff00aa"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loader;