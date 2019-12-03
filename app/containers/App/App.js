import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch } from 'react-router-dom';

import DashboardPage from '../DashboardPage/';
import UsersPage from '../UsersPage';
import VenuesPage from '../VenuesPage';
import NotFoundPage from '../NotFoundPage';
import LoginPage from '../LoginPage';
import ForgotPasswordPage from '../ForgotPasswordPage';
import ResetPasswordPage from '../ResetPasswordPage';
import AccountSettingsPage from '../AccountSettingsPage';
import ProtectedRoute from './Route/ProtectedRoute';
import AdminRoute from './Route/AdminRoute';
import UnauthenticatedRoute from './Route/UnauthenticatedRoute';
import ContactsPage from '../ContactsPage';
import OrganizationsPage from '../OrganizationsPage';
import CasesPage from '../CasesPage';
import SingleCasePage from '../CaseSinglePage';
import CalendarEventsPage from '../CalendarEventsPage';
import CaseServicePage from '../CaseServicePage';
import ContactSinglePage from '../ContactSinglePage';
import ContactSinglePageMetrics from '../ContactSinglePageMetrics';
import VenueSinglePage from '../VenueSinglePage';
import OrganizationSinglePage from '../OrganizationSinglePage';
import JudgeSinglePage from '../JudgeSinglePage';
import WindowSystem from '../WindowSystem';
import TracksPage from '../TracksPage';
import NotificationsPage from '../NotificationsPage';

const App = () => (
  <div className="app-wrapper">
    <Helmet titleTemplate="Juvo - %s" defaultTitle="Juvo">
      <meta name="description" content="Application content management" />
    </Helmet>
    <Switch>
      <ProtectedRoute exact path="/" component={DashboardPage} />
      <AdminRoute path="/users" component={UsersPage} />
      <ProtectedRoute path="/venues" component={VenuesPage} />
      <ProtectedRoute path="/account-settings" component={AccountSettingsPage} />
      <ProtectedRoute path="/contacts" component={ContactsPage} />
      <ProtectedRoute path="/contact/:id/metrics" component={ContactSinglePageMetrics} />
      <ProtectedRoute path="/contact/:id" component={ContactSinglePage} />
      <ProtectedRoute path="/venue/:id" component={VenueSinglePage} />
      <ProtectedRoute path="/judge/:id" component={JudgeSinglePage} />
      <ProtectedRoute path="/organizations" component={OrganizationsPage} />
      <ProtectedRoute path="/organization/:id" component={OrganizationSinglePage} />
      <ProtectedRoute path="/cases" component={CasesPage} />
      <ProtectedRoute path="/case/:id/service/:id" component={CaseServicePage} />
      <AdminRoute path="/delete/:id/service/:id" component={CaseServicePage} />
      <AdminRoute path="/delete/:id" component={SingleCasePage} />
      <ProtectedRoute path="/case/:id" component={SingleCasePage} />
      <AdminRoute path="/tracks" component={TracksPage} />
      <ProtectedRoute path="/calendar-events" component={CalendarEventsPage} />
      <ProtectedRoute path="/notifications" component={NotificationsPage} />
      <UnauthenticatedRoute path="/login" component={LoginPage} />
      <UnauthenticatedRoute path="/forgot-password" component={ForgotPasswordPage} />
      <UnauthenticatedRoute path="/reset-password/:token" component={ResetPasswordPage} />
      <ProtectedRoute path="" component={NotFoundPage} />
    </Switch>
    <WindowSystem />
  </div>
);

export default App;
