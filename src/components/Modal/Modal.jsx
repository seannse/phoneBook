import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { ModalCloseBtn } from '../../components';
import { useWindowSize } from '../../hooks/useWindowSize';

import { ModalBackdrop } from '../../components';
import { selectTheme } from '../../redux/selectors';

import css from './Modal.module.css';

function Modal({ title, setModalOpen, isModalOpen, children }) {
  const { isMobile } = useWindowSize();
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  useEffect(() => {
    function handleEscapeClick(event) {
      if (event.key === 'Escape') {
        dispatch(setModalOpen());
      }
    }

    if (isModalOpen) window.addEventListener('keydown', handleEscapeClick);

    return () => {
      window.removeEventListener('keydown', handleEscapeClick);
    };
  }, [dispatch, isMobile, isModalOpen, setModalOpen]);

  return (
    <>
      {isModalOpen && (
        <ModalBackdrop modalClose={setModalOpen}>
          <div
            className={css.modal}
            style={
              theme === 'dark'
                ? {
                    backgroundColor: 'var(--primary-background-color-dark)',
                  }
                : { backgroundColor: 'var(--primary-background-color-light)' }
            }
          >
            <ModalCloseBtn modalClose={setModalOpen} />
            <h2 className={css.modal__title}>{title}</h2>
            {children}
          </div>
        </ModalBackdrop>
      )}
    </>
  );
}

export default Modal;
