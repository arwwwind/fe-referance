import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    walkthrough: {},
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  render() {
    const { form, visible, stepIsActive, step } = this.props;
    const { getFieldDecorator } = form;
    const style = visible ? {} : { display: 'none' };

    if (!stepIsActive(step)) {
      return null;
    }

    return (
      <Form form={form} layout="vertical" hideRequiredMark onSubmit={this.onSubmit} style={style} shouldValidate={false}>
        {!this.props.initialValues ? (
          <Button className="btn-in-header" type="primary" size="large" htmlType="submit" onClick={this.props.onRequestedStatusChange} value="draft">Save Draft</Button>
        ) : null}
        <Row gutter={20} style={{ paddingBottom: 70 }}>
          <Col span={12}>
            <div className="form-step-title m-b-xxl">Broken Rules</div>
            <ul className="broken-rules">
              <li className="f-s-16 m-b-xs">The C&R or STIP confirmation is not signed</li>
              <li className="f-s-16 m-b-xs">There is not QME Waiver</li>
              <li className="f-s-16 m-b-xs">There is no QME Waiver and the Medical Report is not Type QME</li>
              <li className="f-s-16 m-b-xs">There is no PQME notice on the Benefit notice and there is not QME Waiver or</li>
              <li className="f-s-16 m-b-xs">The Medical Report is not type QME</li>
              <li className="f-s-16 m-b-xs">There is not benefit printout</li>
              <li className="f-s-16">There is not Wage Statement and or it does not make sense</li>
            </ul>
            <Form.Item label="Override Reason">
              {getFieldDecorator('walkthrough.overrideReason', {
                initialValue: this.state.walkthrough.overrideReason
              })(<Input.TextArea size="large" placeholder="Override Reason" rows={4} />)}
            </Form.Item>
            <Form.Item label="Notes To Hearing Rep">
              {getFieldDecorator('walkthrough.notesToHearingRep', {
                initialValue: this.state.walkthrough.notesToHearingRep
              })(<Input.TextArea size="large" placeholder="Notes To Hearing Rep" rows={4} />)}
            </Form.Item>
          </Col>
        </Row>
        <Footer percent={100} goBack={this.props.goBack} step={step} lastStep lastWalkThroughStep onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
