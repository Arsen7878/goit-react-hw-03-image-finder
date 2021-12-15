import React, { Component } from 'react';

import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Searchbar from './Searchbar';
import fetchImagesAPI from '../js/fetchAPI';
import Button from './Button/';
import Loader from './Loader';

class App extends Component {
  state = {
    keyword: '',
    status: 'idle',
    images: [],
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.keyword;
    const nextName = this.props.keyword;

    if (prevName !== nextName) {
      console.log('изменилось имя');
      this.setState({ status: 'pending' });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { keyword, page } = this.state;
    fetchImagesAPI(keyword, page)
      .then(images => {
        if (images.total === 0) {
          this.setState({
            error: 'Нет картинок по запросу',
            status: 'resolved',
          });
        } else {
          console.log(images);
          this.setState(({ images, page, keyword }) => ({
            images: [...images, ...images.hits],
            status: 'resolved',
            page: page + 1,
            keyword,
          }));
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  formSubmitHandler = ({ keyword }) => {
    this.setState({
      keyword,
      page: 1,
      error: null,
      images: [],
    });
  };

  handlerLoadMoreBtn() {
    this.setState({ status: 'pending' });
    this.fetchImages();
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery images={this.state.images} />
      </>
    );
  }
}

export default App;
