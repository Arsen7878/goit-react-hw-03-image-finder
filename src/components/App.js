import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

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
    const prevName = prevState.keyword;
    const nextName = this.state.keyword;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ images: [], status: 'pending' });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.fetchImages(nextName, nextPage);
    }
  }

  fetchImages = (keyword, page) => {
    fetchImagesAPI(keyword, page)
      .then(({ hits }) => {
        const result = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });
        if (result.length === 0) {
          this.setState({
            error: `Картинки по запросу ${keyword} не найдены`,
            status: 'rejected',
          });
        } else {
          this.setState(({ images }) => {
            return {
              images: [...images, ...result],
              status: 'resolved',
            };
          });
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

  handlerLoadMoreBtn = () => {
    this.setState(({ page }) => ({
      status: 'pending',
      page: page + 1,
    }));
  };

  handlerOpenModal = URLImageLarge => {
    this.setState({
      largeImageURL: URLImageLarge,
    });
  };

  handlerCloseModal = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  render() {
    const { images, status, error, largeImageURL } = this.state;

    const {
      formSubmitHandler,
      handlerOpenModal,
      handlerLoadMoreBtn,
      handlerCloseModal,
    } = this;

    if (status === 'idle') {
      return <Searchbar onSubmit={formSubmitHandler} />;
    }

    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={formSubmitHandler} />
          {images.length > 0 && (
            <ImageGallery images={images} onOpenModal={handlerOpenModal} />
          )}
          <Loader />
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <p>{error}</p>
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          <ImageGallery onOpenModal={handlerOpenModal} images={images} />
          <Button onClick={handlerLoadMoreBtn} />

          {largeImageURL && (
            <Modal
              largeImageURL={largeImageURL}
              alt=""
              onCloseModal={handlerCloseModal}
            />
          )}
        </>
      );
    }
  }
}

export default App;
