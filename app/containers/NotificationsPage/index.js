import { compose } from 'redux';
import Page from './components/Page';
import injectLoader from '../../utils/injectLoader';

const withLoader = injectLoader();
export default compose(withLoader)(Page);
