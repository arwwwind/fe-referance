import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, Row } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import ClaimForm from '../../../../../../CasesPage/components/ServiceClaimForm';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {};

  onClaimsChange = (values) => {
    this.setState({
      claims: values
    });
  };

  onSubmit = (values) => this.props.onSubmit(extend({ claims: this.state.claims }, values), this.props.form);

  render() {
    const { form, visible, stepIsActive, step } = this.props;
    const style = visible ? {} : { display: 'none' };

    if (!stepIsActive(step)) {
      return null;
    }

    return (
      <Form form={form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit} style={style} shouldValidate={false}>
        {!this.props.initialValues ? (
          <Button className="btn-in-header" type="primary" size="large" htmlType="submit" onClick={this.props.onRequestedStatusChange} value="draft">Save Draft</Button>
        ) : null}
        <Row gutter={20}>
          <Col span={12}>
            <div className="form-step-title-bigger m-b-xxl">Claim Information</div>
            {visible ? <ClaimForm form={this.props.form} values={this.state.claims} onChange={this.onClaimsChange} /> : null}
          </Col>
        </Row>
        <Footer percent={100} goBack={this.props.goBack} step={step} lastStep onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
