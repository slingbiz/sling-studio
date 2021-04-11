import {compose} from 'redux';
import withLayout from './withLayout';
import withData from './withData';

export default compose(withData, withLayout);
