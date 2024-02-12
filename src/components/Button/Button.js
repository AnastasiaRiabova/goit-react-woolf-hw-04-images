import styles from './Button.module.css';

export const Button =({ onClick, children }) =>
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>



