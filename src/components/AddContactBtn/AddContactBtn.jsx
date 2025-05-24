import { useDispatch } from 'react-redux';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { useWindowSize } from '../../hooks/useWindowSize';
import { setIsModalAddContactOpen } from '../../redux/global/slice';

import css from './AddContactBtn.module.css';

function AddContactBtn() {
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const scrollToTop = () => {
    if (isMobile) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  };

  const onBtnClick = () => {
    scrollToTop();
    dispatch(setIsModalAddContactOpen());
  };

  return (
    <button type="button" onClick={onBtnClick} className={css.button}>
      <BsFillPlusCircleFill className={css.icon} size={44} />
    </button>
  );
}

export default AddContactBtn;
