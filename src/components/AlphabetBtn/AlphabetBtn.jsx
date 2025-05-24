import style from './AlphabetBtn.module.css';

//* Redux
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter/slice';

const AlphabetBtn = ({ children }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setFilter(children));
  };

  return (
    <button className={style.letterBtn} onClick={handleClick}>
      {children}
    </button>
  );
};

export default AlphabetBtn;
