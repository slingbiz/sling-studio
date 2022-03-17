import {makeStyles} from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {InfoView} from '../@sling';
import {
  sendVerificationEmail,
  verifyEmailAddress,
  verifyEmailAddressServer,
  sendVerificationEmailByToken,
} from '../@sling/services/auth/backend';
import {FETCH_ERROR, SHOW_MESSAGE} from '../shared/constants/ActionTypes';

export async function getServerSideProps({query}) {
  // Fetch data from external API
  const token = query.token;
  console.log(token);
  if (token) {
    try {
      const res = await verifyEmailAddressServer(token);
      console.log(res);
      if (res.status == 204) {
        return {props: {isVerified: true}};
      } else {
        return {props: {isVerified: false}};
      }
    } catch (error) {
      console.log(error);
      return {props: {isVerified: false}};
    }
  } else {
    return {props: {isVerified: false}};
  }

  // Pass data to the page via props
}

function EmailVerification(props) {
  console.log(props);
  const route = useRouter();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const token = route.query.token;
  //   console.log(token);
  //   if (token) {
  //     verifyEmailAddress(token)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [route]);

  const sendVerificationEmail = () => {
    const token = route.query.token;
    sendVerificationEmailByToken(token)
      .then((res) => {
        if (res.data.code == 204) {
          dispatch({type: SHOW_MESSAGE, payload: 'Email sent successfully'});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong please try again later',
          });
          route.replace('/');
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_ERROR,
          payload: 'Something went wrong please try again later',
        });
        route.replace('/');
      });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        maxHeight: '100vh',
        margin: 'auto',
        overflow: 'hidden',
      }}>
      <Card
        sx={{
          width: ['80%', '80%', '50%'],
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}>
        <CardHeader
          sx={{
            '& .MuiCardHeader-avatar	': {
              width: '100%',
              maxWidth: '100%',
              m: 'auto',
            },
          }}
          avatar={
            <Box textAlign='center' sx={{p: 2}}>
              <img
                src={'/images/logo-white-with-name.png'}
                alt='sling-logo'
                style={{width: '50%'}}
              />
            </Box>
          }
        />
        <CardActionArea sx={{}}>
          <CardContent sx={{textAlign: 'center'}}>
            <Typography gutterBottom variant='h4' component='div'>
              {props.isVerified
                ? 'Congratulation email is verified'
                : 'Sorry email is not verified'}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Please click on the button below &nbsp; to go to Dashboard
              {/* {props.isVerified ? 'to go to Dashboard' : 'send email again'} */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{margin: 'auto', mb: 5}}>
          <Button
            onClick={() => {
              {
                // props.isVerified ? route.replace('/') : sendVerificationEmail();
                route.replace('/');
              }
            }}
            sx={{margin: 'auto', px: 2, py: 1, fontSize: 18, marginTop: 5}}
            size='small'
            color='primary'
            variant='contained'>
            {/* {props.isVerified ? 'Home' : 'Send'} */}
            Home
          </Button>
        </CardActions>
        <Box></Box>
      </Card>
      <InfoView />
    </Box>
  );
}

export default EmailVerification;
