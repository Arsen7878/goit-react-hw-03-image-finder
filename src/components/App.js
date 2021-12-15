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

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { keyword, page } = this.state;

    fetchImagesAPI(keyword, page)
      .then(answer => {
        if (answer.total === 0) {
          this.setState({
            error: `Картинки по запросу ${keyword} не найдены`,
            status: 'rejected',
          });
        } else {
          this.setState(({ images, page, keyword }) => ({
            images: [...images, ...answer.hits],
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
    this.setState({
      status: 'pending',
    });
    this.fetchImages();
  }

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
            <ImageGallery
              images={images}
              onOpenModal={handlerOpenModal.bind(this)}
            />
            {images.length > 0 && (
              <Button onClick={handlerLoadMoreBtn.bind(this)} />
            )}
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
