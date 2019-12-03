import React from 'react';
import { Upload, Icon } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { validateFile, getBase64, imageTypes, imageMaxSize } from '../config';


class UploadAvatar extends React.Component {
  state = {
    imageUrl: undefined
  };

  beforeUpload = () => false;

  handleChange = (info) => {
    if (validateFile(info.file, imageTypes, imageMaxSize)) {
      getBase64(info.file, (imageUrl) => {
        this.setState({
          imageUrl
        });
        this.props.onChange(info.file, imageUrl);
      });
    }
  };

  removeFile = (e) => {
    e.preventDefault();
    this.setState({
      imageUrl: null
    });
    this.props.onChange(null);
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.props.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload Avatar</div>
      </div>
    );
    const { imageUrl } = this.state;
    const previewImage = (imageUrl !== undefined ? imageUrl !== null : !!this.props.image);
    return (
      <div className="avatar-uploader-container">
        {previewImage ? (
          <a href="#" className="delete-picture" onClick={this.removeFile}>
            <Icon type="close-circle" theme="outlined" />
          </a>
        ) : null }
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {previewImage ? <img src={imageUrl || this.props.image} alt="avatar" /> : uploadButton}
        </Upload>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  image: state.get('app').get('updateProfile').get('image')
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(UploadAvatar);
