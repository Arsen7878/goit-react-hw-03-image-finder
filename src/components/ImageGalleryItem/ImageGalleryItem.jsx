import React from 'react';
import PropTypes from 'prop-types';
import c from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <>
      <img src={webformatURL} alt={tags} className={c.ImageGalleryItemImage} />
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
