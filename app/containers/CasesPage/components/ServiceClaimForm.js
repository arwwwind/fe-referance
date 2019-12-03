import { connect } from 'react-redux';
import { compose } from 'redux';
import ClaimForm from './ClaimForm';

const mapStateToProps = (state) => ({
  errors: state.get('saveService').get('save').get('error')
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ClaimForm);
