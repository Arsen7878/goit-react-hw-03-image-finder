import React from 'react';
import Spiner from 'react-loader-spinner';
import c from './Loader.module.css';

const Loader = () => {
  return (
    <div className={c.spiner}>
      <Spiner type="BallTriangle" color="#00BFFF" height={50} width={50} />
    </div>
  );
};

export default Loader;
