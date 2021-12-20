import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

import c from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    keyword: '',
  };

  inputHandler = event => {
    this.setState({
      keyword: event.target.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    const { props, state } = this;

    e.preventDefault();

    if (state.keyword.trim() === '') {
      return toast('Введите запрос');
    }

    props.onSubmit(state);

    this.setState({ keyword: '' });
  };

  render() {
    const { handleSubmit, inputHandler } = this;
    const { keyword } = this.state;
    return (
      <>
        <header className={c.Searchbar}>
          <form className={c.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={c.SearchFormButton}>
              <span className={c.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              className={c.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={inputHandler}
              value={keyword}
            />
          </form>
        </header>
        <ToastContainer />
      </>
    );
  }
}

export default Searchbar;
