import { useDispatch } from 'react-redux';
import { useWindowSize } from '../../hooks/useWindowSize';

import css from './Backdrop.module.css';

function ModalBackdrop({ children, modalClose }) {
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      dispatch(modalClose());
    }
  };

  return (
    <>
      {!isMobile ? (
        <div className={css.backdrop} onClick={handleBackdropClick}>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default ModalBackdrop;
