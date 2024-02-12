import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';
import styles from './Modal.module.css';

const portalRoot = document.getElementById('modal-root');

export const Modal = ({ children, toggleModal }) => {
  const closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const handlePressKey = useCallback(
    event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handlePressKey);
    return () => {
      document.removeEventListener('keydown', handlePressKey);
    };
  }, [handlePressKey]);

  return createPortal(
    <div
      className={styles.overlay}
      onClick={e => {
        closeModalBackdrop(e);
      }}
    >
      <div className={styles.modal}>{children}</div>
    </div>,
    portalRoot
  );
};
