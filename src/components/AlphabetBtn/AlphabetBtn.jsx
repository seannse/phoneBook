import style from './AlphabetBtn.module.css';

//* Redux
import { useDispatch } from 'react-redux';
import { setAlphabetFilter } from '../../redux/filter/slice';

const AlphabetBtn = ({ children }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setAlphabetFilter(children));
  };

  return (
    <button className={style.letterBtn} onClick={handleClick}>
      {children}
    </button>
  );
};

export default AlphabetBtn;
