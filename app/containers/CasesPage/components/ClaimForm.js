import React from 'react';
import isString from 'lodash/isString';
import { Icon } from 'antd';
import moment from 'moment';
import Form from '../../../components/Core/Form';
import ClaimSingleForm from './ClaimSingleForm';

const prepare = ({ values, hasPrimaryClaim }) => {
  let index = 0;
  const hasInitialValue = values && values.length;

  const claims = hasInitialValue ? [...values].sort((a, b) => b.id - a.id).map((claim) => {
    claim.dateOfInjuryStart = claim.dateOfInjuryStart ? moment(claim.dateOfInjuryStart) : claim.dateOfInjuryStart;
    claim.dateOfInjuryEnd = claim.dateOfInjuryEnd ? moment(claim.dateOfInjuryEnd) : claim.dateOfInjuryEnd;

    if (!claim.id) {
      index += 1;
      claim.id = `t${index}`;
    }

    return claim;
  }) : [];

  if (hasPrimaryClaim && !hasInitialValue) {
    return { claims: [{ dateOfInjuryStart: undefined, dateOfInjuryEnd: undefined, id: `t${index}` }], index: 1 };
  }

  return { claims, index };
};

class ClaimForm extends React.Component {
  state = prepare(this.props);

  addClaim = (e) => {
    e.preventDefault();

    const { claims, index } = this.state;
    const newClaims = [...claims, {
      id: `t${index + 1}`
    }];

    this.setState({
      index: index + 1
    });
    this.update(newClaims);
  };

  removeClaim = (claim) => this.update(this.state.claims.filter((filterClaim) => filterClaim.id !== claim.id));

  changeClaim = (index, values) => {
    const claims = [...this.state.claims];
    claims[index] = { ...values, id: this.state.claims[index].id };

    this.update(claims);
  };

  update = (claims) => {
    this.setState({ claims });

    if (this.props.onChange) {
      this.props.onChange(claims.map((item) => {
        const { id, ...claim } = item;

        if (isString(id) && id.substr(0, 1) === 't') {
          return claim;
        }

        return { id, ...claim };
      }));
    }
  };

  render() {
    const { form, errors } = this.props;

    return (
      <div>
        {
          this.state.claims.map((claim, index) => (
            <ClaimSingleForm
              hasPrimaryClaim={this.props.hasPrimaryClaim}
              number={index}
              key={claim.id}
              initialValues={claim}
              form={form}
              removeHandler={this.removeClaim}
              onChange={this.changeClaim}
              errors={errors}
            />))
        }
        <Form.Item>
          <a href="" onClick={this.addClaim}>
            <Icon type="plus" />
            <span>Add Claim</span>
          </a>
        </Form.Item>
      </div>
    );
  }
}

export default ClaimForm;
