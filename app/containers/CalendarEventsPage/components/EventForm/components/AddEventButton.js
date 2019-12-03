import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import { singlePersonEventsStart } from '../../../../CaseServicePage/components/tabs/ServicePersonEvents/actions';

const AddEventButton = (props) => {
  const { smallButton, ...rest } = props;
  return (
    smallButton ? (
      <Button className={classNames(props.className)} type="primary" shape="circle" icon="plus" size="large" {...rest} />
    ) : (
      <Button className={classNames(props.className)} type="primary" icon="plus" size="large" {...rest}>Add Event</Button>
    )
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(singlePersonEventsStart(props.eventId))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AddEventButton);
