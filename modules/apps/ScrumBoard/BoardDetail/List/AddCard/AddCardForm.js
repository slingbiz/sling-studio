import React from 'react';
import Box from '@material-ui/core/Box';
import {KeyboardDatePicker} from '@material-ui/pickers';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import {Form, useField} from 'formik';
import GridContainer from '../../../../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import CardAttachments from './CardAttachments';
import CardCheckedList from './CardCheckedList';
import CardComments from './CardComments';
import Button from '@material-ui/core/Button';
import {useIntl} from 'react-intl';
import {useSelector} from 'react-redux';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../../shared/constants/AppEnums';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const AddCardForm = (props) => {
  const {
    board,
    list,
    values,
    setFieldValue,
    checkedList,
    setCheckedList,
    comments,
    setComments,
    authUser,
    attachments,
    setAttachments,
    selectedLabels,
    setSelectedLabels,
    selectedMembers,
    setMembersList,
    selectedCard,
    onCloseAddCard,
    isSubmitting,
  } = props;

  const {messages} = useIntl();

  const labelList = useSelector(({scrumboardApp}) => scrumboardApp.labelList);

  const memberList = useSelector(({scrumboardApp}) => scrumboardApp.memberList);

  const onDeleteCheckedItem = (id) => {
    const updatedList = checkedList.filter((item) => item.id !== id);
    setCheckedList(updatedList);
  };

  const onAddNewCheckedItem = () => {
    const item = {
      id: Math.floor(Math.random() * 1000),
      title: '',
    };
    const updatedList = checkedList.concat(item);
    setCheckedList(updatedList);
  };

  const onSetCheckedItemText = (title, id) => {
    const updatedList = checkedList.map((item) => {
      if (item.id === id) {
        item.title = title;
        return item;
      } else {
        return item;
      }
    });
    setCheckedList(updatedList);
  };

  const onAddNewComment = (comment) => {
    setComments(
      comments.concat({
        comment: comment,
        name: authUser.displayName ? authUser.displayName : 'User',
        image: authUser.photoURL,
        date: moment().format('ll'),
      }),
    );
  };

  const onDeleteAttachment = (id) => {
    const updatedAttachments = attachments.filter(
      (attachment) => attachment.id !== id,
    );
    setAttachments(updatedAttachments);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    myTextFieldRoot: {
      width: '100%',
      marginBottom: 20,
    },
    fieldRoot: {
      width: '100%',
      marginBottom: 20,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    btnRoot: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    dividerRoot: {
      marginBottom: 32,
      marginLeft: -32,
      marginRight: -32,
    },
    marginBottom12: {
      marginBottom: 12,
    },
  }));

  const classes = useStyles(props);

  return (
    <Form className={classes.root} noValidate autoComplete='off'>
      <Divider />
      <Box
        pt={4}
        px={{xs: 5, lg: 8, xl: 10}}
        pb={5}
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        alignItems={{sm: 'center'}}>
        <Box
          mr={{sm: 2}}
          mb={{xs: 3, sm: 0}}
          fontWeight={Fonts.MEDIUM}
          fontSize={16}>
          {board.name} > {list.name}
        </Box>

        <Box ml={{sm: 'auto'}}>
          <KeyboardDatePicker
            autoOk
            format='YYYY/MM/DD'
            variant='outlined'
            inputVariant='outlined'
            label={<IntlMessages id='common.date' />}
            name='date'
            value={values.date}
            onChange={(value) => setFieldValue('date', value)}
          />
        </Box>
      </Box>

      <Box pb={5} px={{xs: 5, lg: 8, xl: 10}}>
        <MyTextField
          className={classes.myTextFieldRoot}
          variant='outlined'
          label={<IntlMessages id='common.title' />}
          name='title'
        />

        <MyTextField
          name='desc'
          multiline
          className={classes.fieldRoot}
          rows='6'
          variant='outlined'
          placeholder={messages['common.description']}
        />

        <GridContainer className={classes.marginBottom12}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              id='tags-outlined'
              options={labelList}
              getOptionLabel={(option) => option.name}
              value={selectedLabels}
              onChange={(event, value) => setSelectedLabels(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label={<IntlMessages id='common.label' />}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              id='tags-outlined'
              options={memberList}
              getOptionLabel={(option) => option.name}
              value={selectedMembers}
              onChange={(event, value) => setMembersList(value)}
              renderOption={(option) => (
                <React.Fragment>
                  {option.image ? (
                    <Avatar src={option.image} />
                  ) : (
                    <Avatar>{option.name.toUpperCase()}</Avatar>
                  )}
                  <Box ml={4}>{option.name}</Box>
                </React.Fragment>
              )}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label={<IntlMessages id='common.members' />}
                  fullWidth
                />
              )}
            />
          </Grid>
        </GridContainer>

        <CardAttachments
          attachments={attachments}
          onDeleteAttachment={onDeleteAttachment}
        />

        {selectedCard ? (
          <CardCheckedList
            onAddNewCheckedItem={onAddNewCheckedItem}
            checkedList={checkedList}
            onDeleteCheckedItem={onDeleteCheckedItem}
            onSetCheckedItemText={onSetCheckedItemText}
          />
        ) : null}

        <Divider className={classes.dividerRoot} />

        <CardComments comments={comments} onAddNewComment={onAddNewComment} />
      </Box>
      <Box px={8} py={4} bgcolor='grey.300'>
        <Button
          className={classes.btnRoot}
          color='secondary'
          variant='contained'
          disabled={isSubmitting}
          type='submit'>
          <IntlMessages id='common.done' />
        </Button>
        <Button
          className={classes.btnRoot}
          color='secondary'
          onClick={onCloseAddCard}>
          <IntlMessages id='common.cancel' />
        </Button>
      </Box>
    </Form>
  );
};

export default AddCardForm;

AddCardForm.defaultProps = {
  comments: [],
  attachments: [],
  selectedLabels: [],
  selectedMembers: [],
  isSubmitting: false,
};

AddCardForm.prototype = {
  board: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  checkedList: PropTypes.array.isRequired,
  setCheckedList: PropTypes.func,
  comments: PropTypes.array,
  setComments: PropTypes.func,
  authUser: PropTypes.object.isRequired,
  attachments: PropTypes.array,
  setAttachments: PropTypes.func,
  selectedLabels: PropTypes.array,
  setSelectedLabels: PropTypes.func,
  selectedMembers: PropTypes.array,
  setMembersList: PropTypes.func,
  selectedCard: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool,
};
