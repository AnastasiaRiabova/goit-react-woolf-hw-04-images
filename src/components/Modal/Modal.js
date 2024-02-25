import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './Modal.module.css';

const portalRoot = document.getElementById('modal-root');

export const Modal = ({ children, toggleModal }) => {
  const closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handlePressKey = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };
    document.addEventListener('keydown', handlePressKey);
    return () => {
      document.removeEventListener('keydown', handlePressKey);
    };
  }, [toggleModal]);

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
