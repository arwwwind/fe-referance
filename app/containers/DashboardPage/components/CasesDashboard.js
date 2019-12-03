import React from 'react';
import Drawer from '../../CasesPage/components/Drawer';
import { CasesTable } from '../../CasesPage';
import { casesColumnsForEntities as casesColumns } from '../../CasesPage/columns';

const CasesDashboard = () => (
  <div>
    <Drawer />
    <CasesTable
      columns={casesColumns}
      name="Recent"
      className="m-t-extra-xxl dashboard-cases"
      exportTo={false}
    />
  </div>
);

export default CasesDashboard;
