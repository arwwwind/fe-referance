import React from 'react';
import * as Tasks from '../../Tasks';

const SidebarRight = () => (
  <div className="case-right">
    <div className="events-tasks-widget m-t-xxl">
      <Tasks.Header title="Tasks" />
      <Tasks.ServiceFilter />
      <Tasks.ListPerCase />
    </div>
  </div>
);

export default SidebarRight;
