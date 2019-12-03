import { compose } from 'redux';
import List from './components/List';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import notesReducer from '../Notes/reducer';
import injectSaga from '../../utils/injectSaga';
import { saga } from './saga';
import { DAEMON } from '../../utils/constants';
import injectLoader, { WITHOUT_LOADER } from '../../utils/injectLoader';

const withReducer = injectReducer({ key: 'window', reducer });
const withNotesReducer = injectReducer({ key: 'notes', reducer: notesReducer });
const withSaga = injectSaga({ key: 'window', saga, mode: DAEMON });
const withLoader = injectLoader({ mode: WITHOUT_LOADER });

export default compose(withNotesReducer, withReducer, withSaga, withLoader)(List);
