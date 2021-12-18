import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
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
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { keyword, page } = this.state;

    fetchImagesAPI(keyword, page)
      .then(({ hits, total }) => {
        if (total === 0) {
          this.setState({
            error: `Картинки по запросу ${keyword} не найдены`,
            status: 'rejected',
          });
        } else {
          const result = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            },
          );

          this.setState(({ images, keyword }) => ({
            images: [...images, ...result],
            status: 'resolved',
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
    const { status, images, error, largeImageURL } = this.state;
    const {
      formSubmitHandler,
      handlerOpenModal,
      handlerLoadMoreBtn,
      handlerCloseModal,
    } = this;

    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />;
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onOpenModal={handlerOpenModal} />
            {images.length > 0 && <Button onClick={handlerLoadMoreBtn} />}
          </>
        )}
        {status === 'pending' && <Loader />}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            onCloseModal={handlerCloseModal}
          />
        )}
        {status === 'rejected' && <p>{error}</p>}
        <ToastContainer autoClose={3000} position="top-center" />
      </>
    );
  }
}

export default App;
