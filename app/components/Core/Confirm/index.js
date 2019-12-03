import { Button, Popconfirm } from 'antd';
import React from 'react';

const Confirm = ({
  disabled, icon, type, ...props
}) => (
  <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" {...props}>
    <Button type={type || 'danger'} shape="circle" icon={icon || 'delete'} size="small" disabled={disabled} />
  </Popconfirm>
);

export default Confirm;
