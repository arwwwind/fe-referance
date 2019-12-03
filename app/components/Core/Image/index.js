import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from '../../Preloader/Preloader';
import axios from '../../../axios';

class Image extends React.Component {
  state = {
    loading: true,
    data: null
  };

  componentDidMount() {
    this.getImage();
  }

  getImage = () => {
    if (this.props.noRequest) {
      this.setState({ loading: false, data: this.props.src || null });
    } else {
      axios.get(this.props.route, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        this.setState({ loading: false, data: url });
        if (this.props.onReady) {
          this.props.onReady(url);
        }
      }, () => {
        this.setState({ loading: false, data: this.props.src || null });
      });
    }
  };

  render() {
    return this.state.loading ? <Preloader /> : <img className={classNames(this.props.className)} src={this.state.data} alt={this.props.alt || 'image'} />;
  }
}

const mapStateToProps = (state) => ({
  token: state.get('app').get('token')
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(Image);
