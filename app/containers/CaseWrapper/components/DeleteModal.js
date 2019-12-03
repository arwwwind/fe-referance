import React from 'react';
import { Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { closeDeleteModal, caseDeleteStart, serviceDeleteStart } from '../actions';
import Errors from '../../../components/Errors';
import { getCaseId } from '../../../utils/router';

class DeleteModal extends React.Component {
  deleteActionButton = () => {
    switch (this.props.delete.entity) {
      case 'case': return this.props.deleteCase(this.props.delete.id);
      case 'service': return this.props.deleteService(this.props.delete.id, this.props.caseId);
      default: return null;
    }
  };

  closeModalActionButton = () => {
    switch (this.props.delete.entity) {
      case 'case': return this.props.closeModal({ caseId: this.props.delete.id });
      case 'service': return this.props.closeModal({ caseId: this.props.caseId, serviceId: this.props.delete.id });
      default: return null;
    }
  };

  render() {
    return (
      <Modal
        wrapClassName="juvo-modal-confirm"
        visible={this.props.delete.visible}
        footer={null}
        closable={false}
      >
        <div className="content">
          <Icon type="question-circle" />
          <div className="content-text">
            <div className="title">Please confirm your action</div>
            <div className="sub-title">Are you sure you want to delete this item?</div>
          </div>
        </div>
        <Errors errors={this.props.delete.error} />
        <div className="flex align-items-right buttons">
          <Button className="btn-center" type="danger" size="large" ghost onClick={this.closeModalActionButton}>Cancel</Button>
          <Button className="btn-center" type="primary" size="large" onClick={this.deleteActionButton} disabled={this.props.delete.loading}>Confirm</Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  delete: state.get('caseDetails').get('delete').toJS(),
  caseId: parseInt(getCaseId(state.get('route').get('location').get('pathname')), 10)
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: (ids) => dispatch(closeDeleteModal(ids)),
  deleteCase: (id) => dispatch(caseDeleteStart(id)),
  deleteService: (id, caseId) => dispatch(serviceDeleteStart(id, caseId))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DeleteModal);
