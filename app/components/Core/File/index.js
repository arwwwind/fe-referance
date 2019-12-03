import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import downloadjs from 'downloadjs';
import Preloader from '../../Preloader/Preloader';
import axios from '../../../axios';
import FavIcon from '../../../images/icons/favorites.png';

class File extends React.Component {
  state = {
    loading: false
  };

  getFile = (id, name) => (e) => {
    e.preventDefault();
    if (this.state.loading) return;
    this.setState({ loading: true });

    axios.get(`files/${id}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      this.setState({ loading: false });
      downloadjs(new Blob([response.data]), name);
      if (this.props.onReady) {
        this.props.onReady(url);
      }
    }, () => {
      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <a href="#" className={classNames(this.props.className, 'circle-badge', 'dynamic-download', this.state.loading ? 'loading' : '')} onClick={this.getFile(this.props.id, this.props.name)}>
        <img src={FavIcon} alt="favorite" className="m-r-xs" />
        <span>{this.props.name}</span>
        {this.state.loading ? <Preloader /> : null}
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.get('app').get('token')
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(File);
