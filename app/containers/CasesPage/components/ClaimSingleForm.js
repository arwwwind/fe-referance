import React from 'react';
import moment from 'moment';
import { Input, DatePicker } from 'antd';
import Form from '../../../components/Core/Form';

class ClaimSingleForm extends React.Component {
  state = {
    claimNumber: this.props.initialValues.claimNumber ? this.props.initialValues.claimNumber : undefined,
    ADJNumber: this.props.initialValues.ADJNumber ? this.props.initialValues.ADJNumber : undefined,
    dateOfInjuryStart: this.props.initialValues.dateOfInjuryStart ? this.props.initialValues.dateOfInjuryStart : undefined,
    dateOfInjuryEnd: this.props.initialValues.dateOfInjuryEnd ? this.props.initialValues.dateOfInjuryEnd : undefined
  };

  onFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    setTimeout(() => this.props.onChange(this.props.number, this.state));
  };

  onDatepickerChange = (name) => (value) => {
    this.setState({ [name]: value });
    setTimeout(() => this.props.onChange(this.props.number, this.state));
  };

  onDeleteClick = (e) => {
    e.preventDefault();

    const { removeHandler, initialValues } = this.props;
    removeHandler(initialValues);
  };

  getServerValidationStatus = (number, field) => {
    const { errors } = this.props;

    if (errors) {
      const help = errors.get(`claims.${number}.${field}`);
      if (help) {
        return {
          validateStatus: 'error',
          help: help.toJS()[0]
        };
      }
    }

    return {};
  };

  validateDate = (date) => {
    if (date) {
      const valid = moment(date).isValid();
      return valid ? date : undefined;
    }
    return undefined;
  };

  render() {
    const { number, hasPrimaryClaim } = this.props;

    return (
      <div className="claim-container">
        {number === 0 && hasPrimaryClaim ? (
          <div className="claim-header m-b-xl">
            <div className="text-title">Primary Claim</div>
          </div>
        ) : (
          <div className="claim-header m-b-xl">
            <div className="text-title">{`Claim ${number + 1}`}</div>
            <a href="" onClick={this.onDeleteClick}>Delete</a>
          </div>
        )}
        <Form.Item label="Claim Number" {...this.getServerValidationStatus(number, 'claimNumber')}>
          <Input
            size="large"
            placeholder="Claim Number"
            name="claimNumber"
            value={this.state.claimNumber}
            onChange={this.onFieldChange}
          />
        </Form.Item>
        <Form.Item label="ADJ Number" {...this.getServerValidationStatus(number, 'ADJNumber')}>
          <Input
            size="large"
            placeholder="ADJ Number"
            name="ADJNumber"
            value={this.state.ADJNumber}
            onChange={this.onFieldChange}
          />
        </Form.Item>
        <Form.Item label="Injury Start Date" {...this.getServerValidationStatus(number, 'dateOfInjuryStart')}>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Injury Start Date"
            value={this.validateDate(this.state.dateOfInjuryStart)}
            format="MM/DD/YYYY"
            onChange={this.onDatepickerChange('dateOfInjuryStart')}
          />
        </Form.Item>
        <Form.Item label="Injury End Date" {...this.getServerValidationStatus(number, 'dateOfInjuryEnd')}>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Injury End Date"
            value={this.validateDate(this.state.dateOfInjuryEnd)}
            format="MM/DD/YYYY"
            onChange={this.onDatepickerChange('dateOfInjuryEnd')}
          />
        </Form.Item>
      </div>
    );
  }
}

export default ClaimSingleForm;
