import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label}>
        <input
          type='text'
          placeholder='Search...'
          value={filter}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default SearchBox;