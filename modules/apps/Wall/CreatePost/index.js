import React, {useState} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useDispatch, useSelector} from 'react-redux';
import {useDropzone} from 'react-dropzone';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import AppList from '../../../../@crema/core/AppList';
import Button from '@material-ui/core/Button';
import PhotoIcon from '@material-ui/icons/Photo';
import VideocamIcon from '@material-ui/icons/Videocam';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PersonIcon from '@material-ui/icons/Person';
import {onCreateNewPost} from '../../../../redux/actions/Wall';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  textFieldRoot: {
    '& .MuiInput-underline': {
      '&:before, &:after': {
        display: 'none',
      },
    },
  },
  iconSm: {
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 24,
    },
  },
  imagesRoot: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 4,
  },
}));

const CreatePost = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {wallData} = useSelector(({wall}) => wall);
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*, .pdf',
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        return {
          id: Math.floor(Math.random() * 10000),
          path: file.path,
          metaData: {type: file.type, size: file.size},
          preview: URL.createObjectURL(file),
        };
      });
      onAddAttachments(files);
    },
  });

  const onAddAttachments = (files) => {
    setAttachments([...attachments, ...files]);
  };

  const handlePostSubmit = () => {
    const post = {
      message,
      attachments,
      owner: {
        name: wallData.name,
        profilePic: wallData.profilePic,
        id: wallData.id,
      },
    };
    dispatch(onCreateNewPost(post));
    setAttachments([]);
    setMessage('');
  };

  const {messages} = useIntl();

  return (
    <AppCard mb={8} title={messages['wall.createPost']}>
      <Box display='flex' pt={2.5}>
        <Avatar src={wallData.profilePic} alt={wallData.name} />
        <Box ml={4} flex={1}>
          <TextField
            placeholder="What's in your mind?"
            multiline
            rows={2}
            fullWidth
            value={message}
            className={classes.textFieldRoot}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
      </Box>
      <Box mb={2}>
        <AppList
          data={attachments}
          containerStyle={{display: 'flex', flexWrap: 'wrap'}}
          renderRow={(item, index) => (
            <Box p={1} key={index}>
              <img
                className={classes.imagesRoot}
                src={item.preview}
                alt='upload'
              />
            </Box>
          )}
        />
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        pt={{xs: 3, xl: 4}}
        mt={{xs: 3, xl: 4}}
        mb={2}
        style={{borderTop: '1px solid #E5E4EA'}}>
        <Box mb={1} display='flex' alignItems='center' flexWrap='wrap'>
          <Box
            {...getRootProps()}
            display='flex'
            alignItems='center'
            color='primary.main'
            fontSize={{xs: 12, sm: 14}}
            mr={{xs: 2, sm: 3, xl: 4}}
            className='pointer'>
            <input {...getInputProps()} />
            <PhotoIcon className={classes.iconSm} />
            <Box component='span' ml={1.5}>
              Add photo video
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            fontSize={{xs: 12, sm: 14}}
            color='primary.main'
            mr={{xs: 2, sm: 3, xl: 4}}
            className='pointer'>
            <VideocamIcon className={classes.iconSm} />
            <Box component='span' ml={1.5}>
              Live Video
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            fontSize={{xs: 12, sm: 14}}
            color='primary.main'
            mr={{xs: 2, sm: 3, xl: 4}}
            className='pointer'>
            <EmojiEmotionsIcon className={classes.iconSm} />
            <Box component='span' ml={1.5}>
              Feeling/Activity
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            fontSize={{xs: 12, sm: 14}}
            color='primary.main'
            className='pointer'>
            <PersonIcon className={classes.iconSm} />
            <Box component='span' ml={1.5}>
              Tag Friends
            </Box>
          </Box>
        </Box>

        <Box mb={1}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            disabled={!message.trim() && attachments.length === 0}
            onClick={handlePostSubmit}>
            Post
          </Button>
        </Box>
      </Box>
    </AppCard>
  );
};

export default CreatePost;
