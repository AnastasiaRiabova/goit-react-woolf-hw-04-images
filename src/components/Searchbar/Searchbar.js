import * as React from 'react';
import icon from '../../image/icons-search.svg';
import styles from './Searchbar.module.css';
import { useState } from 'react';
export const Searchbar = ({ handleSubmit }) => {
  const [value, setValue] = useState('');
  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(value);
    setValue('');
  };
  return (
    <header className={styles.header}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
          <img src={icon} alt="search" />
        </button>
        <input
          className={styles.searchFormInput}
          name="search"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};
