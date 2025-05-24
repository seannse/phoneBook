import { IoCloseCircleSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { setFilter } from '../../redux/filter/slice';
import { AlphabetBtn } from '../../components';

import style from './AlphabetFilter.module.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetFilter = () => {
  const dispatch = useDispatch();
  const handleResetClick = () => {
    dispatch(setFilter(''));
  };

  return (
    <ul className={style.alpabetList}>
      {alphabet.map(letter => (
        <li className={style.alpabetItem} key={letter}>
          <AlphabetBtn>{letter}</AlphabetBtn>
        </li>
      ))}
      <li>
        <button className={style.letterBtn} onClick={handleResetClick}>
          <IoCloseCircleSharp className={style.resetIcon} />
        </button>
      </li>
    </ul>
  );
};

export default AlphabetFilter;
