import { connect } from 'react-redux';
import { compose } from 'redux';
import ShowClaims from './components/ShowClaims';
import { showClaimsStart } from './actions';
import reducer from './reducer';
import { saga } from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

const mapDispatchToProps = (dispatch) => ({
  onFetchData: (id) => dispatch(showClaimsStart(id))
});

const mapStateToProps = (state) => ({
  currentId: state.get('showClaims').get('id'),
  data: state.get('showClaims').get('data'),
  loading: state.get('showClaims').get('loading'),
  error: state.get('showClaims').get('error')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'showClaims', reducer });
const withSaga = injectSaga({ key: 'showClaims', saga });

export default compose(withReducer, withSaga, withConnect)(ShowClaims);
