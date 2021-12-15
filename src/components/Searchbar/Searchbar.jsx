import React, { Component } from 'react';
import { toast } from 'react-toastify';
import c from './Searchbar.module.css';

class Searchbar extends Component {
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
    console.log('object');
    console.log(state.keyword.trim());
    console.log(toast());

    props.onSubmit(state);
    if (state.keyword.trim() === '') {
      return toast.error('Введите запрос');
    }
  };

  render() {
    const { handleSubmit, inputHandler } = this;
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
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
