import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Card from '@material-ui/core/Card';
import StorageIcon from '@material-ui/icons/Storage';

const ApiCheckList = ({classes}) => {
  const [state, setState] = React.useState({
    apiProductList: true,
    apiProductDetail: false,
    apiCategoryList: true,
    apiUserDetails: true,
  });

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked});
  };

  return (
    <FormGroup column>
      <FormControlLabel
        classes={{
          label: classes.dataSourceLabel,
          formControl: classes.formControl,
        }}
        control={
          <Checkbox
            checked={state.apiProductList}
            onChange={handleChange('apiProductList')}
            value='apiProductList'
            color='primary'
          />
        }
        label={
          <Card className={classes.apiCard}>
            <Box fontWeight={Fonts.BOLD} component='h3' mb={2}>
              Product List Api
            </Box>
            <Box fontWeight={Fonts.MEDIUM} component='h5' mb={2}>
              Product list search Api with aggregated filters
            </Box>
          </Card>
        }
      />
      <FormControlLabel
        classes={{
          label: classes.dataSourceLabel,
          formControl: classes.formControl,
        }}
        control={
          <Checkbox
            checked={state.apiCategoryList}
            onChange={handleChange('apiCategoryList')}
            value='apiCategoryList'
            color='primary'
          />
        }
        label={
          <Card className={classes.apiCard}>
            <Box>
              <Box fontWeight={Fonts.BOLD} component='h3' mb={2}>
                Category List Api
              </Box>
              <Box fontWeight={Fonts.MEDIUM} component='h5' mb={2}>
                List of all available categories
              </Box>
            </Box>
          </Card>
        }
      />

      <FormControlLabel
        classes={{
          label: classes.dataSourceLabel,
          formControl: classes.formControl,
        }}
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange('apiUserDetails')}
            value='apiUserDetails'
            color='primary'
          />
        }
        label={
          <Card className={classes.apiCard}>
            <Box fontWeight={Fonts.BOLD} component='h3' mb={2}>
              User Details Api
            </Box>
            <Box fontWeight={Fonts.MEDIUM} component='h5' mb={2}>
              Logged in User Details
            </Box>
          </Card>
        }
      />
      <FormControlLabel
        classes={{
          label: classes.dataSourceLabel,
          formControl: classes.formControl,
        }}
        control={
          <Checkbox
            checked={state.apiProductDetail}
            onChange={handleChange('apiProductDetail')}
            value='apiProductDetail'
            color='primary'
          />
        }
        label={
          <Card className={classes.apiCard}>
            <Box fontWeight={Fonts.BOLD} component='h3' mb={2}>
              Product Details Api
            </Box>
            <Box fontWeight={Fonts.MEDIUM} component='h5' mb={2}>
              Details of a single product
            </Box>
          </Card>
        }
      />
    </FormGroup>
  );
};

export default ApiCheckList;
