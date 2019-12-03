import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from '../../../components/Preloader';
import axios from '../../../axios';
import { sendProfileImageToState } from '../../App/actions';
import NoImageAvailable from '../../../images/no-image.jpg';

class Image extends React.Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.getImage();
  }

  getImage = () => {
    if (this.props.hasImage && !this.props.image) {
      this.setState({ loading: true });
      axios.get('files/avatar', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        this.setState({ loading: false });
        this.props.sendImageToState(url);
      }, () => {
        this.props.sendImageToState(NoImageAvailable);
        this.setState({ loading: false });
      });
    }
  };

  render() {
    return this.state.loading ? <Preloader /> : <img className={classNames(this.props.className)} src={this.props.image || NoImageAvailable} alt={'profile-avatar'} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendImageToState: (image) => dispatch(sendProfileImageToState(image))
});

const mapStateToProps = (state) => {
  const app = state.get('app');
  const updateProfile = app.get('updateProfile');
  return {
    token: app.get('token'),
    hasImage: app.get('user').get('profile').get('hasImage'),
    image: updateProfile.get('image')
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Image);
