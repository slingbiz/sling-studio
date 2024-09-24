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
    fontWeight: 400,
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
    marginTop: 20,
  },
  subHeaderText: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginBottom: 30,
  },
  stack: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  cardChild: {
    width: '350px',
    height: '500px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '10px',
    border: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
  },
  highlightCard: {
    border: `3px solid ${theme.palette.warning.main}`,
  },
  planTitle: {
    fontWeight: 900,
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
  },
  planDescription: {
    color: theme.palette.text.secondary,
    marginBottom: 20,
  },
  priceText: {
    fontWeight: 800,
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
    marginBottom: 20,
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 8,
  },
  planButton: {
    marginTop: 20,
    width: '100%',
    color: 'white',
  },
}));

const PackageComponent = ({
  label,
  description,
  price,
  features,
  buttonText,
  buttonColor,
  highlight,
  classes,
  onSelect,
  isDisabled = false, // default to false
}) => {
  return (
    <Card
      className={`${classes.cardChild} ${highlight ? classes.highlightCard : ''}`}
      style={isDisabled ? {opacity: 0.5} : {opacity: 1}} // Grey out when disabled
    >
      <Box sx={{p: 3, width: '100%', textAlign: 'center'}}>
        {/* Plan Title */}
        <Typography variant='h6' className={classes.planTitle}>
          {label}
        </Typography>

        {/* Plan Description */}
        <Typography variant='subtitle2' className={classes.planDescription}>
          {description}
        </Typography>

        {/* Price */}
        <Typography variant='h4' className={classes.priceText}>
          {price}
        </Typography>

        {/* Feature List */}
        <Box sx={{textAlign: 'left', mt: 2, padding: '0 20px'}}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{display: 'flex', alignItems: 'center', mb: 1}}>
              <span
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                  marginRight: '8px',
                }}>
                &#10004; {/* Unicode for checkmark */}
              </span>{' '}
              <Typography variant='body2' className={classes.feature}>
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{mt: 2, padding: '0 20px'}}>
          {/* Button */}
          <Button
            variant='contained'
            style={{backgroundColor: isDisabled ? '#d3d3d3' : buttonColor}} // Grey out the button if disabled
            className={classes.planButton}
            disabled={isDisabled} // Disable the button
            onClick={onSelect}>
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

const CompanySelectForm = (props) => {
  const classes = useStyles(props);
  const {user} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: '100%',
        padding: 10,
        minHeight: '100vh',
        textAlign: 'center',
      }}>
      <Typography variant='h4' className={classes.headerText}>
        Pricing Plans
      </Typography>
      <Typography variant='h6' className={classes.subHeaderText}>
        Find the tier tailored for you.
      </Typography>

      <Stack direction='row' spacing={5} className={classes.stack}>
        {/* <PackageComponent
          label='COMMUNITY'
          description='SELF HOSTED - Host and manage Studio locally.'
          price='Free Forever'
          features={[
            'Open-source',
            'Community Support',
            'Unlimited Page Templates',
            'Unlimited Self and Free Widgets',
          ]}
          buttonText='GET STARTED'
          buttonColor='#e0e0e0' // grey color for community plan
          classes={classes}
          onSelect={() => {
            dispatch(
              onCompanyMembershipForm(user.id, {packageType: 'free'}),
            ).then((res) => {
              if (res.status == 201) {
                props.changeStepper();
              }
            });
          }}
        /> */}

        <PackageComponent
          label='DEVELOPER'
          description='Self or Cloudd Hosted Studio.'
          price='Free Forever'
          features={[
            'Open-source',
            'Community Support',
            'Unlimited Page Templates',
            'Unlimited Self and Free Widgets',
            'Self Host or Cloud Managed Admin Studio',
          ]}
          buttonText='Next'
          buttonColor='#FFA500' // orange color for developer plan
          highlight={true}
          classes={classes}
          onSelect={() => {
            dispatch(
              onCompanyMembershipForm(user.id, {packageType: 'free'}),
            ).then((res) => {
              if (res.status == 201) {
                props.changeStepper();
              }
            });
          }}
        />

        <PackageComponent
          label='PRO'
          description='CLOUD HOSTED - Everything in Developer.'
          price='99 USD pm'
          features={[
            'Cloud Managed Admin Studio',
            'Access to Paid Widgets and Templates',
            'Multi User and Role management',
          ]}
          buttonText='SIGN UP NOW !'
          buttonColor='#28a745' // green color for pro plan
          classes={classes}
          isDisabled={true}
          onSelect={() => console.log('Pro Plan selected')}
        />

        <PackageComponent
          label='ENTERPRISE'
          description='CLOUD HOSTED - Everything in Pro.'
          price='Custom'
          features={[
            'Single Sign-On for CMS (SSO)',
            'Audit Logs (90+ days)',
            'Support SLAs',
            'Technical Audit',
            'Premium Support',
            'Review Workflows',
          ]}
          buttonText='SIGN UP NOW !'
          isDisabled={true}
          Í
          buttonColor='#007bff' // blue color for enterprise plan
          classes={classes}
          onSelect={() => console.log('Enterprise Plan selected')}
        />
      </Stack>
    </Box>
  );
};

export default CompanySelectForm;
