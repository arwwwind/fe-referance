import React from 'react';
import { Upload, Icon, Button } from 'antd';
import Image from '../../../components/Core/Image';
import { validateFile, getBase64, imageTypes, imageMaxSize } from '../config';


class UploadContactAvatar extends React.Component {
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
        this.props.onChange(info.file);
      });
    }
  };

  removeFile = (hasImage) => (e) => {
    e.preventDefault();
    this.setState({
      imageUrl: hasImage ? null : undefined
    });
    this.props.onChange(hasImage ? null : undefined);
  };

  checkInitialImage = (imageUrl) => {
    this.setState({
      imageUrl
    });
  };

  render() {
    const imageUrl = this.state.imageUrl || this.state.imageUrl === null ? this.state.imageUrl : this.props.userImage;
    const { contact } = this.props;
    const hasImage = contact ? contact.hasImage : false;
    const contactId = contact ? contact.id : null;

    return (
      <div className="juvo-image-upload">
        {contactId ? (
          <Image className="display-none" route={`files/avatar/${contactId}`} alt="profile-icon" onReady={this.checkInitialImage} noRequest={!hasImage} />
        ) : null }
        <Upload
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          <Button type="primary">
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        {imageUrl ? (
          <div>
            <div className="preview-image">
              <a href="#" className="delete-picture" onClick={this.removeFile(hasImage)}>
                <Icon type="close-circle" theme="outlined" />
              </a>
              <img src={imageUrl} alt="avatar" />
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}

export default UploadContactAvatar;
