import { TOKEN } from '../constants';
import { Storage } from '../util';

export const getRefreshToken = () => Storage.getItem(TOKEN.REFRESH);
