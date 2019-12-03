import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import Page from '../../Page';
import Sidebar from '../../../components/Sidebar';
import Statistics from '../../../components/Statistics';

import * as Tasks from '../../Tasks';
import Cases from './CasesDashboard';
import CalendarEventsWidget from '../../CalendarEventsPage/components/CalendarEventsWidget';
import injectLoader from '../../../utils/injectLoader';

const DashboardPage = () => (
  <Page>
    <Helmet>
      <title>Dashboard</title>
      <meta name="description" content="Dashboard" />
    </Helmet>
    <Sidebar cssClass="left">
      <div className="events-tasks-widget m-t-extra-sm">
        <Tasks.HeaderOwn />

        <div className="widget-subtitle m-b-md">Overdue</div>
        <Tasks.ListMyOwn filter="overdue" className="m-b-extra-sm" />

        <div className="widget-subtitle m-b-md">Today</div>
        <Tasks.ListMyOwn filter="today" className="m-b-extra-sm" />

        <div className="widget-subtitle m-b-md">Next 7 days</div>
        <Tasks.ListMyOwn filter="next-7-days" className="m-b-extra-sm" />
      </div>
    </Sidebar>
    <div className="juvo-main-container with-sidebar">
      <div className="juvo-main-content">
        <Statistics className="m-t-xl" />
        <Cases />
      </div>
    </div>
    <Sidebar cssClass="right">
      <div className="events-tasks-widget">
        <CalendarEventsWidget withSearch title={'My Calendar Events'} addButton smallButton={true} />
      </div>
    </Sidebar>
  </Page>
);

const withLoader = injectLoader();

export default compose(withLoader)(DashboardPage);
