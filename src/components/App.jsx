import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import getImages from '../api/imageAPI';
import { ImageGallery } from './ImageGallery/';
import { Searchbar } from './Searchbar/';
import { Modal } from './Modal/';
import { Button } from './Button/';

const statusList = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle',
};

const App = () => {
  const [images, setImages] = useState([]);
  const [resultLength, setResultLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState({});
  const [status, setStatus] = useState(statusList.idle);

  useEffect(() => {
    const handleGetImages = () => {
      setStatus(statusList.loading);
      getImages(searchQuery, currentPage)
        .then(res => {
          setImages(prevImages => [...prevImages, ...res.data.hits]);
          setStatus(statusList.success);
          setResultLength(res.data.totalHits);
        })
        .catch(error => {
          setStatus(statusList.error);
          console.error(error);
        });
    };
    if (searchQuery !== '' || currentPage !== 1) {
      handleGetImages();
    }
  }, [searchQuery, currentPage]);

  const handleSubmit = value => {
    if (searchQuery.toLowerCase() === value.toLowerCase()) {
      alert('Try to search with new value, this already on your page');
      return;
    }
    if (searchQuery !== value) {
      setSearchQuery(value);
      setCurrentPage(1);
      setImages([]);
      window.scrollTo(0, 0);
    }
  };

  const setModalImg = ({ tags, largeImageURL }) => {
    setImageModal({ largeImageURL, tags });
    setIsOpen(true);
  };

  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      {isOpen && (
        <Modal toggleModal={toggleModal}>
          <img src={imageModal.largeImageURL} alt={imageModal.tag} />
        </Modal>
      )}
      {status === 'loading' && (
        <Modal>
          <TailSpin />
        </Modal>
      )}
      <Searchbar handleSubmit={handleSubmit} />
      {images.length > 0 || status === 'error' || status === 'loading' ? (
        <ImageGallery images={images} setModalImg={setModalImg} />
      ) : (
        <div className="container">
          {searchQuery.length === 0 ? (
            <h1>Search to find some images</h1>
          ) : (
            <>
              <h1>There are no images for your request</h1>
              <p>
                Sorry, we couldn't find any images that match your search.
                Please try again with different keywords.
              </p>
            </>
          )}
        </div>
      )}
      {resultLength > images.length && status !== 'loading' && (
        <Button onClick={loadMore}>Load more</Button>
      )}
    </div>
  );
};

export default App;
