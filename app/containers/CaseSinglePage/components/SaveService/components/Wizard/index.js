import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import extend from 'lodash/extend';
import { goToStep } from '../../actions';
import { stepIsActive, getType, getInsured, getBodyParts } from '../../saga';
import { Drawer as ContactDrawer } from '../../../../../ContactsPage';
import { Drawer as OrganizationDrawer } from '../../../../../OrganizationsPage';
import { Drawer as VenueDrawer } from '../../../../../VenuesPage/Venues';
import { Drawer as JudgeDrawer } from '../../../../../VenuesPage/Judges';

class Wizard extends React.Component {
  state = {
    data: {},
    forms: {},
    claims: this.props.initialValues ? this.props.initialValues.claims : []
  };

  requestedStatus = 'save';

  onRequestedStatusChange = (e) => {
    this.requestedStatus = e.target.value;
  };

  shouldSubmit = (step, direction) => direction === 1 && step > this.props.wizardSteps.length;

  onNext = (values, form) => {
    const handle = () => {
      const current = this.props.step;
      const data = extend({}, this.state.data, { [current]: values });
      const forms = extend({}, this.state.forms, { [current]: form });

      this.setState({
        data,
        forms,
        claims: data[this.props.step].claims
      });

      this.goToStep(this.props.step + 1, 1, data, forms);
    };

    if (this.requestedStatus === 'draft') {
      handle();
    } else {
      form.validateFieldsAndScroll((err) => {
        if (!err) {
          handle();
        }
      });
    }
  };

  onPrevious = () => {
    if (this.props.step > 1) {
      this.goToStep(this.props.step - 1, -1, this.state.data, this.state.forms);
    }
  };

  goToStep = (step, direction, data, forms) => {
    if (!this.stepIsActive(step, data) && this.requestedStatus === 'save') {
      this.goToStep(step + direction, direction, data, forms);
    } else if (this.shouldSubmit(step, direction) || this.requestedStatus !== 'save') {
      data[1] = extend({
        requestedStatus: this.requestedStatus,
        step: this.props.step
      }, data[1]);

      this.props.onFinish(data, forms);
    } else {
      this.props.goToStep(step);
    }
  };

  stepIsActive = (step, collectedData) => {
    return stepIsActive(step, collectedData || this.state.data);
  };

  stepParams = (key, data) => {
    const params = {};

    if (key > 1) {
      params.serviceType = getType(data);
    }

    switch (key) {
      case 9:
      case 10: params.insured = getInsured(data); break;
      case 23: params.bodyParts = getBodyParts(data); break;
      default:
    }

    return params;
  };

  render() {
    return (
      <div>
        {this.props.wizardSteps.map((Item, key) => (
          <Item
            key={key}
            onSubmit={this.onNext}
            visible={this.props.step === key + 1}
            initialValues={this.props.initialValues}
            claims={this.state.claims}
            goBack={this.onPrevious}
            stepIsActive={this.stepIsActive}
            step={key + 1}
            onRequestedStatusChange={this.onRequestedStatusChange}
            {...this.stepParams(key + 1, this.state.data)}
          />
        ))}
        <ContactDrawer />
        <OrganizationDrawer />
        <VenueDrawer />
        <JudgeDrawer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToStep: (number) => dispatch(goToStep(number))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Wizard);
