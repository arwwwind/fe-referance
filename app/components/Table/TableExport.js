import React from 'react';
import { notification } from 'antd';
import classNames from 'classnames';
import CSVIcon from '../../images/icons/csv.png';
import PDFIcon from '../../images/icons/pdf.png';
import XLSIcon from '../../images/icons/xls.png';
import Preloader from '../../components/Preloader';
import { is401 } from '../../utils/errors';

const exportLoading = (loading) => classNames({
  'export-item': true,
  loading
});

class TableExport extends React.Component {
  state = {
    loadingCSV: false,
    loadingPDF: false,
    loadingXLSX: false
  };

  exportTo = (type) => (e) => {
    e.preventDefault();

    const stateKey = `loading${type.toUpperCase()}`;

    this.setState({
      [stateKey]: true
    });
    this.props.exportTo(type).then(() => {
      this.setState({
        [stateKey]: false
      });
    }).catch((error) => {
      this.setState({
        [stateKey]: false
      });
      if (is401(error)) {
        /**
         * this error will be handled by the interceptor
         */
        return;
      }
      notification.error({
        message: 'Error',
        description: 'An internal error has occurred',
        placement: 'topRight'
      });
    });
  };

  render() {
    return (
      <div className="juvo-table-export">
        <div className={exportLoading(this.state.loadingCSV)}>
          <Preloader />
          <a href="" onClick={this.exportTo('csv')}>
            <img src={CSVIcon} alt="csv-icon" />
            <span>Export as .CSV</span>
          </a>
        </div>
        <div className={exportLoading(this.state.loadingPDF)}>
          <Preloader />
          <a href="" onClick={this.exportTo('pdf')}>
            <img src={PDFIcon} alt="pdf-icon" />
            <span>Export as .PDF</span>
          </a>
        </div>
        <div className={exportLoading(this.state.loadingXLSX)}>
          <Preloader />
          <a href="" onClick={this.exportTo('xlsx')}>
            <img src={XLSIcon} alt="xls-icon" />
            <span>Export as Excel</span>
          </a>
        </div>
      </div>
    );
  }
}

export default TableExport;
