import mock from './MockConfig';
import './auth'; //include auth initial config
import './apis';

mock.onAny().passThrough();
