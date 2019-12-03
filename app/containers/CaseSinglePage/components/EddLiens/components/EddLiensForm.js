import React from 'react';
import moment from 'moment';
import { Form, Input, Button, Select, Drawer, Col, Row, DatePicker, Icon, InputNumber } from 'antd';
import Preloader from '../../../../../components/Preloader';
import ResourceSelect from '../../../../../components/Core/ResourceSelect';
import AddContactButton from '../../../../ContactsPage/components/AddContactButton';


const pristineState = {
  noteType: undefined,
  subject: '',
  activityType: '',
  bodyContent: '',
  agreeOrDisagree: undefined
};

let uuid = 0;
class EddLiensForm extends React.Component {
  state = { ...pristineState, visible: false, ...this.props.editData };

  onClose = () => {
    this.setState({ visible: false });
  };

  openDrawer = () => {
    this.setState({ visible: true });
  };

  remove = (type, k) => (e) => {
    e.preventDefault();

    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(type);
    // can use data-binding to set
    form.setFieldsValue({
      [type]: keys.filter((key) => key !== k),
    });
    uuid = Math.max(...keys, uuid) + 1;
  };

  add = (type) => (e) => {
    e.preventDefault();

    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(type);
    uuid = Math.max(...keys, uuid) + 1;
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [type]: nextKeys
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, editLiensStart } = this.props;
    form.validateFields((err, data) => {
      if (!err) {
        const {
          clientKeys,
          clientIds,
          clientPeriodEndDate,
          clientPeriodStartDate,
          clientPeriodWeeklyRate,
          eddIds,
          eddPeriodEndDate,
          eddPeriodStartDate,
          eddPeriodWeeklyRate,
          keys,
          paymentType,
          ...values
        } = data;

        values.eddSidePeriods = keys.map((key) => ({
          id: eddIds ? eddIds[key] : undefined,
          startDate: eddPeriodStartDate[key],
          endDate: eddPeriodEndDate[key],
          weeklyRate: eddPeriodWeeklyRate[key]
        }));

        values.clientSidePeriods = clientKeys.map((key) => ({
          id: clientIds ? clientIds[key] : undefined,
          paymentType: paymentType[key],
          startDate: clientPeriodStartDate[key],
          endDate: clientPeriodEndDate[key],
          weeklyRate: clientPeriodWeeklyRate[key]
        }));

        editLiensStart(values, form, this.onClose);
      }
    });
  };

  onAgreeChange = (agreeOrDisagree) => {
    this.setState({ agreeOrDisagree });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { editData, loading } = this.props;
    const contactSelectTextAccessor = (option) => (`${option.firstName} ${option.lastName}`);
    let eddData;
    let clientData;

    if (!this.props.editData) {
      return <Preloader />;
    } else {
      eddData = this.props.editData.periods ? this.props.editData.periods.filter((p) => p.party === 'edd') : [];
      clientData = this.props.editData.periods ? this.props.editData.periods.filter((p) => p.party === 'client') : [];
      getFieldDecorator('keys', { initialValue: [...eddData.keys()] });
      getFieldDecorator('clientKeys', { initialValue: [...clientData.keys()] });
      if (this.props.editData.periods) {
        let eddIndex = 0;
        let clientIndex = 0;
        this.props.editData.periods.filter((period) => {
          if (period.party === 'edd') {
            getFieldDecorator(`eddIds[${eddIndex}]`, {
              initialValue: period.id
            });
            eddIndex += 1;
          } else if (period.party === 'client') {
            getFieldDecorator(`clientIds[${clientIndex}]`, {
              initialValue: period.id
            });
            clientIndex += 1;
          }
        });
      }
    }

    const keys = getFieldValue('keys');
    const eddPeriodFields = keys.map((k) => (
      <div className="removable-group m-b-md" key={k}>
        <div className="flex space-between m-b-sm">
          <div className="text-title">Edd period group</div>
          <a href="" onClick={this.remove('keys', k)}>Delete</a>
        </div>
        <Form.Item label="Start Date">
          {getFieldDecorator(`eddPeriodStartDate[${k}]`, {
            initialValue: eddData[k] ? moment(eddData[k].startDate) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="Start Date" />)}
        </Form.Item>
        <Form.Item label="End Date">
          {getFieldDecorator(`eddPeriodEndDate[${k}]`, {
            initialValue: eddData[k] ? moment(eddData[k].endDate) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="End Date" />)}
        </Form.Item>
        <Form.Item label="Weekly Rate">
          {getFieldDecorator(`eddPeriodWeeklyRate[${k}]`, {
            initialValue: eddData[k] ? eddData[k].weeklyRate : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
              optionFilterProp="children"
              placeholder="Weekly Rate"
            />
          )}
        </Form.Item>
      </div>
    ));


    const clientKeys = getFieldValue('clientKeys');
    const clientPeriodFields = clientKeys.map((k) => (
      <div className="removable-group m-b-md" key={k}>
        <div className="flex space-between m-b-sm">
          <div className="text-title">Period group</div>
          <a href="" onClick={this.remove('clientKeys', k)}>Delete</a>
        </div>
        <Form.Item label="Payment Type">
          {getFieldDecorator(`paymentType[${k}]`, {
            initialValue: clientData[k] ? clientData[k].paymentType : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <Select
              size="large"
              style={{ width: '100%' }}
              placeholder="Select payment type"
              optionFilterProp="children"
            >
              <Select.Option value="PD">PD</Select.Option>
              <Select.Option value="TD">TD</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Start Date">
          {getFieldDecorator(`clientPeriodStartDate[${k}]`, {
            initialValue: clientData[k] ? moment(clientData[k].startDate) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="Start Date" />)}
        </Form.Item>
        <Form.Item label="End Date">
          {getFieldDecorator(`clientPeriodEndDate[${k}]`, {
            initialValue: clientData[k] ? moment(clientData[k].endDate) : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(<DatePicker style={{ width: '100%' }} placeholder="End Date" />)}
        </Form.Item>
        <Form.Item label="Weekly Rate">
          {getFieldDecorator(`clientPeriodWeeklyRate[${k}]`, {
            initialValue: clientData[k] ? clientData[k].weeklyRate : undefined,
            rules: [{ required: true, message: 'This field is required' }]
          })(
            <InputNumber
              size="large"
              style={{ width: '100%' }}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
              optionFilterProp="children"
              placeholder="Weekly Rate"
            />
          )}
        </Form.Item>
      </div>
    ));

    return editData.service ? (
      <div>
        <Button type="primary" size="large" onClick={() => this.openDrawer()}>Edit</Button>
        <Drawer
          onClose={this.onClose}
          visible={this.state.visible}
          title="EDD Lien"
          width={834}
          placement="right"
          maskClosable={false}
          style={{
            height: 'calc(100% - 105px)',
            overflow: 'auto',
            paddingBottom: 116,
          }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={20}>
              <Col span={24}>
                <div className="form-items-group group-3">
                  <Form.Item label="Demand">
                    {getFieldDecorator('demand', {
                      initialValue: editData.service.demand,
                      rules: [{ required: true, message: 'This field is required' }]
                    })(
                      <InputNumber
                        size="large"
                        style={{ width: '100%' }}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                        optionFilterProp="children"
                        placeholder="Demand"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="PNS Date">
                    {getFieldDecorator('permantAndStationeryDate', {
                      initialValue: editData.service.permantAndStationeryDate,
                      rules: [{ required: true, message: 'This field is required' }]
                    })(<DatePicker style={{ width: '100%' }} placeholder="PNS Date" />)}
                  </Form.Item>
                  <Form.Item label="Representative">
                    <div className="select-with-btn">
                      {getFieldDecorator('eddRepId', {
                        initialValue: editData.eddRep ? `${editData.eddRep.id}` : undefined,
                        rules: [{ required: true, message: 'This field is required' }]
                      })(
                        <ResourceSelect name="contact-profiles" placeholder="Representative" size="large" optionFilterProp="children" linked={editData.eddRep} textAccesor={contactSelectTextAccessor} />
                      )}
                      <AddContactButton />
                    </div>
                  </Form.Item>
                </div>
                <div className="form-items-group group-3">
                  <Form.Item label="Settlement Date">
                    {getFieldDecorator('caseSettlementDate', {
                      initialValue: editData.service.caseSettlementDate,
                      rules: [{ required: true, message: 'This field is required' }]
                    })(<DatePicker style={{ width: '100%' }} placeholder="Settlement Date" />)}
                  </Form.Item>
                  <Form.Item label="Date of Notice">
                    {getFieldDecorator('dateOfNoticeToCarrier', {
                      initialValue: editData.dateOfNoticeToCarrier,
                      rules: [{ required: true, message: 'This field is required' }]
                    })(<DatePicker style={{ width: '100%' }} placeholder="Date of Notice" />)}
                  </Form.Item>
                  <Form.Item label="Agree / Disagree">
                    {getFieldDecorator('agreeOrDisagree', {
                      initialValue: editData.agreeOrDisagree ? 1 : 0,
                      rules: [{ required: true, message: 'This field is required' }]
                    })(
                      <Select
                        size="large"
                        style={{ width: '100%' }}
                        placeholder="Select agree or disagree"
                        optionFilterProp="children"
                        onChange={this.onAgreeChange}
                      >
                        <Select.Option value={1}>Agree</Select.Option>
                        <Select.Option value={0}>Disagree</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                {!this.state.agreeOrDisagree ? (
                  <Form.Item label="Disagree Reason">
                    {getFieldDecorator('disagreeReason', {
                      initialValue: editData.disagreeReason,
                    })(<Input.TextArea size="large" placeholder="Disagree Reason" rows={4} />)}
                  </Form.Item>) : null }
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Settlement Authority">
                  {getFieldDecorator('settlementAuthority', {
                    initialValue: editData.service.settlementAuthority,
                    rules: [{ required: true, message: 'This field is required' }]
                  })(
                    <InputNumber
                      size="large"
                      style={{ width: '100%' }}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '').toString()}
                      optionFilterProp="children"
                      placeholder="Settlement Authority"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} className="m-t-xxl">
              <Col span={12}>
                <div className="form-step-title-bigger m-b-xl">Edd Side</div>
                <Form.Item label="Certified Doctor">
                  {getFieldDecorator('certifiedDoctor', {
                    initialValue: editData.certifiedDoctor,
                    rules: [{ required: true, message: 'This field is required' }]
                  })(<Input size="large" placeholder="Certified Doctor" />)}
                </Form.Item>
                <Form.Item label="Certified Body Parts">
                  {getFieldDecorator('certifiedBodyParts', {
                    initialValue: editData.certifiedBodyParts,
                    rules: [{ required: true, message: 'This field is required' }]
                  })(<Input size="large" placeholder="Certified Body Parts" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="form-step-title-bigger m-b-xxl">Client Side</div>
                <Form.Item label="Doctor">
                  {getFieldDecorator('doctor', {
                    initialValue: editData.doctor,
                    rules: [{ required: true, message: 'This field is required' }]
                  })(<Input size="large" placeholder="Doctor" />)}
                </Form.Item>
                <Form.Item label="Body Parts">
                  {getFieldDecorator('bodyParts', {
                    initialValue: editData.bodyParts,
                    rules: [{ required: true, message: 'This field is required' }]
                  })(<Input size="large" placeholder="Body Parts" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} className="m-t-xxl">
              <Col span={12}>
                <div className="form-step-title-bigger m-b-xxl">Edd Period ({eddPeriodFields.length})</div>
                {eddPeriodFields}
                <Form.Item>
                  <a href="#" onClick={this.add('keys')}>
                    <Icon type="plus" />
                    <span>Add EDD Period</span>
                  </a>
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="form-step-title-bigger m-b-xxl">Period ({clientPeriodFields.length})</div>
                {clientPeriodFields}
                <Form.Item>
                  <a href="#" onClick={this.add('clientKeys')}>
                    <Icon type="plus" />
                    <span>TD Period Claim</span>
                  </a>
                </Form.Item>
              </Col>
            </Row>
            <div className="drawer-footer">
              <Button className="m-l-a btn-text-center" style={{ width: 141 }} type="primary" size="large" htmlType="submit">Save</Button>
            </div>
          </Form>
        </Drawer>
      </div>
    ) : null;
  }
}

export default Form.create()(EddLiensForm);
