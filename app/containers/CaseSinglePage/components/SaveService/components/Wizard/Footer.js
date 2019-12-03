import React from 'react';
import { Button, Col, Progress, Row } from 'antd';

const Footer = (
  {
    goBack,
    step,
    percent,
    lastStep,
    lastWalkThroughStep,
    nextDisabled,
    onSubmitClick
  }
) => (
  <div className="drawer-footer footer-steps">
    <Progress className="progress-primary" percent={percent} showInfo={false} />
    <Row gutter={24}>
      <Col span={12}>
        <Button className="btn-previous" type="primary" size="large" onClick={goBack} disabled={step === 1}>Previous</Button>
      </Col>
      <Col span={12}>
        {lastWalkThroughStep ? (
          <div className="flex flex-1" style={{ flexWrap: 'wrap' }}>
            <Button className="btn-next m-l-a m-b-sm" type="primary" size="large" htmlType="submit" disabled={nextDisabled} onClick={onSubmitClick} value="save">Save & Don&#39;t Hold</Button>
            <br />
            <Button className="btn-next m-l-a" type="danger" size="large" htmlType="submit" disabled={nextDisabled} onClick={onSubmitClick} value="hold" ghost>Save & Hold</Button>
          </div>
        ) : (
          <div className="flex flex-1">
            <Button className="btn-next m-l-a" type="primary" size="large" htmlType="submit" disabled={nextDisabled} onClick={onSubmitClick} value="save">{ lastStep ? 'Finish' : 'Next'}</Button>
          </div>
        )}
      </Col>
    </Row>
  </div>
);

export default Footer;
