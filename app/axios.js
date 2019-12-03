import axios from '../node_modules/axios';
import config from './config';

export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

export default axios.create({
  baseURL: `${config.apiUrl}`
});
