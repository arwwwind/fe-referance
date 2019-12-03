import React, { Component } from 'react';
import Errors from '../../components/Errors';

export class TableNoData extends Component {
  render() {
    const { children, loading, errors } = this.props;

    if (!loading) {
      if (errors) {
        return (<Errors errors={errors} />);
      }
      return (
        <div className="rt-noData">
          {children}
        </div>
      );
    }
    return null;
  }
}

export const getNoDataProps = (props) => ({
  loading: props.loading,
  errors: props.errors
});
