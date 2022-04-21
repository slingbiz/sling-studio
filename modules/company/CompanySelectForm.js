import React, {useState} from 'react';
import * as yup from 'yup';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {makeStyles} from '@material-ui/core/styles';

import {useDispatch, useSelector} from 'react-redux';
import {InfoView} from '../../@sling';
import {Button, Typography} from '@material-ui/core';
import {Stack} from '@mui/material';
import {onCompanyMembershipForm} from '../../redux/actions/AccountAction';

const useStyles = makeStyles((theme) => ({
  headerText: {
    cursor: 'pointer',
    fontWeight: 900,
    fontSize: 20,
    color: 'text.primary',
    marginTop: 20,
    marginBottom: 20,
  },
  stack: {
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    overflow: 'hidden',
    position: 'relative',
    paddingTop: 20,
    [theme.breakpoints.up('xl')]: {
      paddingTop: 32,
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 32,
      width: '100%',
    },
  },
  cardChild: {
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      border: '3px solid',
      borderColor: 'rgba(8, 240, 34, .5)',
    },
  },
  mostTitle: {
    backgroundColor: 'success',
  },
  btnSubmit: {
    margin: 'auto',
    marginTop: 10,
    width: 150,
  },
  annual: {
    fontSize: 20,
    fontStyle: 'bold',
    fontWeight: 900,
  },
  billValue: {
    color: 'text.secondary',
    fontSize: 15,
  },

  price: {
    fontSize: 15,
    fontWeight: 800,
  },
  save: {
    backgroundColor: 'rgba(8, 240, 34, 0.27)',
    paddingLeft: 5,
    paddingRight: 5,
    width: 'fit-content',
    fontWeight: 600,
    borderRadius: 5,
    textAlign: 'center',
  },
}));

const PackageComponent = (prop) => {
  const dispatch = useDispatch();

  return (
    <Card className={prop.classes.cardChild}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 3,
          width: '100%',
          justifyContent: 'space-between',
        }}
        style={prop.disable ? {opacity: 0.5} : {opacity: 1}}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 5,
              width: 'fit-content',
              px: 1,
              textTransform: 'uppercase',
              fontWeight: 900,
            }}>
            <Typography>{prop.popularType}</Typography>
          </Box>
          <Typography className={prop.classes.annual}>{prop.annual}</Typography>
          <Typography className={prop.classes.billValue}>
            {`Billed as one payment of ${prop.price}`}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Box
            sx={{
              mr: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography className={prop.classes.price}>
              {`${prop.price} / month`}
            </Typography>
            <Typography
              className={prop.classes.save}>{`Save ${prop.save}%`}</Typography>
          </Box>
          <Button
            disabled={prop.disable}
            size='large'
            variant='contained'
            color='primary'
            onClick={() => {
              dispatch(
                onCompanyMembershipForm(prop.user.id, {packageType: 'free'}),
              ).then((res) => {
                if (res.status == 201) {
                  prop.changeStepper();
                }
              });
            }}>
            Select
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
const CompanySelectForm = (props) => {
  // const []
  const dispatch = useDispatch();

  const classes = useStyles(props);
  const [pkgSelect, setpkgSelect] = useState(0);
  const {user, loading} = useSelector(({auth}) => auth);

  return (
    <Box
      sx={{
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Typography variant='h3' className={classes.headerText}>
        Choose Your Plan
      </Typography>
      <Stack direction='column' spacing={5} className={classes.stack}>
        <PackageComponent
          annual='Free'
          billValue='Free'
          save='$100'
          price='Free'
          disable={false}
          classes={classes}
          changeStepper={props.changeStepper}
          user={user}
        />
        <PackageComponent
          annual='Annual'
          billValue='$50.00'
          save='50'
          price='$100.00'
          disable={true}
          classes={classes}
          changeStepper={props.changeStepper}
          user={user}
        />
      </Stack>
    </Box>
  );
};

export default CompanySelectForm;
