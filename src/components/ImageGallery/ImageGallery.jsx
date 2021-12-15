import React from 'react';
import PropTypes from 'prop-types';
import c from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className={c.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li className={c.ImageGalleryItem} key={id}>
          <ImageGalleryItem
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
