import React, { Component } from 'react';
import Preloader from '../../components/Preloader';

export default class CustomTableLoader extends Component {
  render() {
    return this.props.loading ? (
      <div className="-loading-inner">
        <Preloader />
      </div>
    ) : null;
  }
}
