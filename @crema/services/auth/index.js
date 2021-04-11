//initialize firebase-config
import './firebase-config';
import './jwt-auth/jwt-api';

import Amplify from 'aws-amplify';
import {awsConfig} from './aws-cognito/aws-exports';
//initialize aws
Amplify.configure(awsConfig);
