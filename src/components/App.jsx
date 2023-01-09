import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { pageLimit, getGallery } from 'services/API';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

console.log(pageLimit);

class App extends Component {
  state = {
    hits: [],
    name: '',
    page: 1,
    showModal: false,
    loading: false,
    largeImageURL: '',
    tags: '',
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const { name, page } = this.state;
    try {
      if (prevState.name !== name || prevState.page !== page) {
        this.setState({
          loading: true,
          status: 'pending',
        });
      }
      if (prevState.name !== name) {
        const { hits } = await getGallery(name, page);
        if (hits.totalHits === 0) {
          Notiflix.Notify.failure('No images found!');
        }

        this.setState(() => ({
          hits: [...hits],
          loading: false,
          status: 'resolved',
        }));
        return;
      }

      if (prevState.page !== page && page !== 1) {
        const { hits } = await getGallery(name, page);
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          loading: false,
          status: 'resolved',
        }));
      }
      return;
    } catch (error) {
      this.setState({
        error: true,
        status: 'rejected',
      });
      console.log(error);
    }
  }

  toggleModal = (imageURL, tag, id) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  handleFormSubmit = ({ name, page }) => {
    const newQuery = name.trim().toLowerCase();
    if (newQuery === '') {
      return console.log('no images');
    }
    this.setState({
      name,
      page,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { hits, showModal, loading, largeImageURL, tags, status } =
      this.state;

    return (
      <div>
        <Searchbar onSubmitHandler={this.handleFormSubmit} />

        {hits && (
          <ImageGallery>
            <ImageGalleryItem articles={hits} onImage={this.toggleModal} />
          </ImageGallery>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}

        {status === 'pending' && loading && <Loader />}

        {hits.length > 0 &&
          hits.length >= pageLimit &&
          status === 'resolved' && (
            <Button onButtonClick={() => this.loadMore()} />
          )}
      </div>
    );
  }
}

export default App;
