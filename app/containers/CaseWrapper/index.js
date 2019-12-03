import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Sidebar from '../../components/Sidebar';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import PageContainer from '../Page';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import { fetchCaseDetailsStart } from './actions';
import DeleteModal from './components/DeleteModal';

class CaseWrapper extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <PageContainer>
        <Sidebar cssClass="left">
          <SidebarLeft sidebarOptions={this.props.sidebarOptions} />
          <DeleteModal />
        </Sidebar>
        <div className={classNames(this.props.className, 'juvo-main-container with-sidebar')}>
          <div className="juvo-main-content profile-case p-t-xl">
            { this.props.children }
          </div>
        </div>
        <Sidebar cssClass="right">
          <SidebarRight />
        </Sidebar>
      </PageContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchCaseDetailsStart())
});

const withConnect = connect(null, mapDispatchToProps);
const withReducer = injectReducer({ key: 'caseDetails', reducer });
const withSaga = injectSaga({ key: 'caseDetails', saga });

export default compose(withReducer, withSaga, withConnect)(CaseWrapper);
