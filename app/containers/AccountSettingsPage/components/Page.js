import React from 'react';
import { Helmet } from 'react-helmet';
import PageContainer from '../../Page';
import AccountSettingsForm from './Form';
import { UploadAvatar } from '../../../components/Upload';

class Page extends React.Component {
  state ={
    imageFile: undefined,
    imageUrl: undefined
  };

  onChangeAvatar = (imageFile, imageUrl) => {
    this.setState({ imageFile, imageUrl });
  };

  onSubmitForm = (props, values, form) => {
    props.onSubmit({ ...values, file: this.state.imageFile, imageUrl: this.state.imageUrl }, form);
  };

  render() {
    return (
      <PageContainer>
        <Helmet>
          <title>Account Settings</title>
        </Helmet>
        <div className="juvo-main-container account-settings-container">
          <div className="juvo-main-content">
            <div className="account-settings">
              <UploadAvatar onChange={this.onChangeAvatar} user={this.props.profile.user} />
              <AccountSettingsForm profile={this.props.profile} onSubmit={(values, form) => this.onSubmitForm(this.props, values, form)} />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default Page;
