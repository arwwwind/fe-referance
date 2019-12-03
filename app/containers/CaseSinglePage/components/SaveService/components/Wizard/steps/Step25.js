import React from 'react';
import extend from 'lodash/extend';
import { Button, Col, Row, Select } from 'antd';
import Form from '../../../../../../../components/Core/Form';
import Footer from '../Footer';
import { valueOrUndefined } from '../../../../../../../utils/common';

class Step extends React.Component {
  state = this.props.initialValues ? this.props.initialValues.toJS() : {
    walkthrough: {},
  };

  onSubmit = (values) => this.props.onSubmit(values, this.props.form);

  onBeforeOrAfterChange = (offerOfWorkBeforeOrAfter) => this.setState({ walkthrough: extend(this.state.walkthrough, { offerOfWorkBeforeOrAfter }) });

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
        <Row gutter={20}>
          <Col span={12}>
            <div className="form-step-title m-b-xxl">Confirm Offer to Work</div>
            <Form.Item label="Do you have an offer to work">
              {getFieldDecorator('walkthrough.offerOfWorkConfirm', {
                initialValue: valueOrUndefined(this.state.walkthrough.offerOfWorkConfirm)
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select yes or no"
                  optionFilterProp="children"
                >
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Is it before or after 2012 DOI">
              {getFieldDecorator('walkthrough.offerOfWorkBeforeOrAfter', {
                initialValue: valueOrUndefined(this.state.walkthrough.offerOfWorkBeforeOrAfter)
              })(
                <Select
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select before or after"
                  optionFilterProp="children"
                  onChange={this.onBeforeOrAfterChange}
                >
                  <Select.Option value="before">Before</Select.Option>
                  <Select.Option value="after">After</Select.Option>
                </Select>
              )}
            </Form.Item>
            {(this.state.walkthrough.offerOfWorkBeforeOrAfter === 'before') ? (
              <Form.Item label="Does it make sense?">
                {getFieldDecorator('walkthrough.offerOfWorkMakeSense', {
                  initialValue: valueOrUndefined(this.state.walkthrough.offerOfWorkMakeSense)
                })(
                  <Select
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select yes or no"
                    optionFilterProp="children"
                  >
                    <Select.Option value={1}>Yes</Select.Option>
                    <Select.Option value={0}>No</Select.Option>
                  </Select>
                )}
              </Form.Item>
            ) : null}
          </Col>
        </Row>

        <Footer percent={75} goBack={this.props.goBack} step={step} lastStep={false} onSubmitClick={this.props.onRequestedStatusChange} />
      </Form>
    );
  }
}

export default Form.create()(Step);
