import { ImageGalleryItem } from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images, setModalImg }) => (
  <ul className={styles.gallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        setModalImg={setModalImg}
      />
    ))}
  </ul>
);
