import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useSelector} from 'react-redux';
import {InfoView} from '../../@sling';
import CompanyRegistrationform from './CompanyRegistrationform';
import CompanySelectForm from './CompanySelectForm';
import KeyCodeSetupForm from './KeyCodeSetupForm';
import {useRouter} from 'next/router';

const useStyles = makeStyles((theme) => ({}));

const steps = ['Company Details', 'Select Plan', 'Keys & Code Setup'];

const CompanyRegistration = (props) => {
  const [stepperIndex, setStepperIndex] = useState(0);
  //   const account = useSelector((account) => account);
  const {user, loading} = useSelector(({auth}) => auth);
  const router = useRouter();
  useEffect(() => {
    console.log(user);
    if (!user) {
      router.replace('/signin');
    }
  }, [user, loading]);

  const classes = useStyles(props);

  return (
    <Box
      sx={{
        width: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}>
      <Box sx={{width: '100%'}}>
        <Stepper activeStep={stepperIndex} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {user &&
          (() => {
            switch (stepperIndex) {
              case 0:
                return (
                  <CompanyRegistrationform
                    changeStepper={() => setStepperIndex(1)}
                  />
                );
              case 1:
                return (
                  <CompanySelectForm changeStepper={() => setStepperIndex(2)} />
                );
              case 2:
                return <KeyCodeSetupForm />;
              default:
                return <CompanyRegistrationform />;
            }
          })()}
      </Box>
      <InfoView />
    </Box>
  );
};

export default CompanyRegistration;
