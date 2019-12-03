import React from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import PageContainer from '../../Page';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as Tasks from '../../Tasks';
import Calendar from './Calendar';
import CalendarEventsWidget from './CalendarEventsWidget/index';
import injectLoader from '../../../utils/injectLoader';

const Page = () => (
  <PageContainer>
    <Helmet>
      <title>Calendar Events</title>
    </Helmet>
    <Sidebar cssClass="left">
      <div className="events-tasks-widget m-t-extra-sm">
        <div className="widget-subtitle m-b-md">Today</div>
        <Tasks.ListMyOwn filter="today" />
        <Tasks.Drawer />
      </div>
    </Sidebar>
    <div className="juvo-main-container with-sidebar">
      <div className="juvo-main-content">
        <Calendar />
      </div>
    </div>
    <Sidebar cssClass="right">
      <CalendarEventsWidget withSearch={false} title={''} addButton={true} smallButton={false} />
    </Sidebar>
  </PageContainer>
);

const withLoader = injectLoader();

export default compose(withLoader)(Page);
