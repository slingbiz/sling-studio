import {compose} from 'redux';
import withData from './withData';
import withLayout from './withLayout';

export default compose(withLayout, withData);
