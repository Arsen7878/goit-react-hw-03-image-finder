import React from 'react';
import PropTypes from 'prop-types';
import c from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={c.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li
          key={id}
          className={c.ImageGalleryItem}
          onClick={() => {
            onOpenModal(largeImageURL);
          }}
        >
          <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
        </li>
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
