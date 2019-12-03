import React from 'react';
import { stringToText } from '../../../../../utils/common';
import NoImageAvailable from '../../../../../images/no-image.jpg';
import Image from '../../../../../components/Core/Image';

const DetailsHeaderLayout = (props) => (
  <div className="flex align-items-center m-b-xl">
    <div className="m-r-md contact-image">
      <Image route={`files/avatar/${props.data.id}`} alt="profile-icon" src={NoImageAvailable} noRequest={!props.data.hasImage} />
    </div>
    <div className="flex wrap">
      <div className="text-title m-r-sm">{stringToText(`${props.data.firstName} ${props.data.lastName}`)}</div>
      {props.data.user ? props.data.user.active ? (
        <span className="text-success f-s-15">(Active)</span>
      ) : (
        <span className="text-danger f-s-15">(Inactive)</span>
      ) : null}
      {props.data.user ? (
        <div style={{ width: '100%' }}>
          <a href="#">Linked User Access</a>
        </div>
      ) : null}
    </div>
  </div>
);

export default DetailsHeaderLayout;
