import { TfiClose } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import css from './ModalCloseBtn.module.css';

function ModalCloseBtn({ modalClose }) {
  const dispatch = useDispatch();

  function handleModalClose() {
    dispatch(modalClose());
  }

  return (
    <button className={css.button} type="button" onClick={handleModalClose}>
      <TfiClose width="30" height="30" />
    </button>
  );
}

export default ModalCloseBtn;
