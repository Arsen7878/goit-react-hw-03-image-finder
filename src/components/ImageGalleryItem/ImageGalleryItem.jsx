import React from 'react';
import PropTypes from 'prop-types';
import c from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <>
      <img src={webformatURL} alt={tags} className={c.ImageGalleryItemImage} />
    </>
  );
};

export default ImageGalleryItem;
