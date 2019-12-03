import React from 'react';

const TracksHeader = (props) => {
  return (
    <div className="juvo-table-actions m-b-xxl">
      <div className="left">
        <div className="juvo-table-title">
          {props.name}
        </div>
      </div>
      <div className="right">
      </div>
    </div>
  );
};

export default TracksHeader;
