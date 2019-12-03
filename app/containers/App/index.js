import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import App from './App';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';

const withSaga = injectSaga({ key: 'app', saga });
const withReducer = injectReducer({ key: 'app', reducer });

export default compose(withReducer, withSaga)(App);

