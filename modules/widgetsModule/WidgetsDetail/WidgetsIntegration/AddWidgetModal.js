import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import IntlMessages from '../../../../@sling/utility/IntlMessages';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {createWidget, updateWidget} from '../../../../redux/actions';
import AppContext from '../../../../@sling/utility/AppContext';
import {resolveWidgetTheme} from '../../../aiBuilder/widgetTheme';
import WidgetEditorTabs, {emptyProp} from '../../WidgetEditor/WidgetEditorTabs';
import {SLING_ORANGE} from '../../../aiBuilder/slingTheme';

const useStyles = makeStyles((theme) => ({
  dialog: {
    overflow: 'scroll',
  },
  appBar: {
    position: 'relative',
    width: '100%',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '10px 20px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginTop: 30,
  },
  ghostBtn: {
    fontWeight: 500,
    textTransform: 'none',
    color: SLING_ORANGE,
    borderColor: SLING_ORANGE,
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
  },
  saveBtn: {
    fontWeight: 600,
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f57c00',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.titleRequired' />),
  description: yup
    .string()
    .required(<IntlMessages id='validation.descriptionRequired' />),
  key: yup.string().required('Please enter a Unique Key for your Widget'),
  icon: yup
    .string()
    .required(<IntlMessages id='validation.widgetIconRequired' />),
});

const AddWidgetModal = ({open, setOpen, updateProp = null}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {user} = useSelector(({auth}) => auth);
  const {theme} = useContext(AppContext);
  const tenantTheme = resolveWidgetTheme(theme);
  const [props, setprops] = useState(
    updateProp?.props?.length ? updateProp.props : [emptyProp],
  );

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    name: updateProp?.name || '',
    description: updateProp?.description || '',
    type: 'widget',
    key: updateProp?.key || '',
    icon: updateProp?.icon || '',
    ownership: updateProp?.ownership || 'private',
    code: updateProp?.code || '',
  };

  return (
    <Dialog
      maxWidth='lg'
      fullWidth
      className={{paper: classes.dialog}}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar} color='transparent'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {updateProp ? ' Widgets / Edit Widget' : ' Widgets / Add a Widget'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Card
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '1.5em',
          padding: '2em',
          alignItems: 'stretch',
          overflowY: 'scroll',
        }}>
        <Formik
          enableReinitialize
          validateOnChange={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            const payload = {
              ...data,
              type: 'widget',
              props: props,
              code: data.code || '',
            };
            if (updateProp) {
              dispatch(updateWidget(updateProp._id, payload));
            } else {
              dispatch(createWidget({...payload, user: user.uid}));
            }
            handleClose();
            setSubmitting(false);
          }}>
          {({isSubmitting, setFieldValue, values}) => (
            <Form className={classes.body} autoComplete='off'>
              <WidgetEditorTabs
                code={values.code}
                onCodeChange={(next) => setFieldValue('code', next)}
                dependencies={updateProp?.dependencies}
                themeOverrides={tenantTheme}
                props={props}
                onPropsChange={setprops}
                showImport
                onImportJson={(json) => {
                  setFieldValue('name', json.name || '');
                  setFieldValue('description', json.description || '');
                  setFieldValue('icon', json.icon || '');
                  setFieldValue('key', json.key || '');
                  setFieldValue('code', json.code || '');
                  setFieldValue('ownership', json.ownership || 'private');
                  setFieldValue('type', 'widget');
                  if (json.props) {
                    setprops(json.props);
                  }
                }}
              />
              <Box className={classes.footer}>
                <Button
                  variant='outlined'
                  className={classes.ghostBtn}
                  onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  variant='contained'
                  className={classes.saveBtn}>
                  {updateProp ? 'Update' : 'Save'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Dialog>
  );
};
export default AddWidgetModal;
