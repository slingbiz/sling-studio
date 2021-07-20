import React, {useContext} from 'react';
import Layouts from '../../core/AppLayout/Layouts';
import AppContext from '../../utility/AppContext';
import useStyles from '../../../shared/jss/common/common.style';

const withLayout = (ComposedComponent) => (props) => {
  console.log(props, '@@props@@@@sdfsdfdsfdssfdsf');
  useStyles();
  const {navStyle} = useContext(AppContext);
  console.log(navStyle, '@@@@navStylenavStylenavStylenavStyle');
  const AppLayout = Layouts[navStyle];
  return (
    <AppLayout>
      <ComposedComponent {...props} />
    </AppLayout>
  );
};

export default withLayout;
