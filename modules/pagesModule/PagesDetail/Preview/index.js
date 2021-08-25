import React, {useEffect, useState} from 'react';
import AppHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {
  Grid,
  TextField,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import PreviewModal from './Modal';
import orange from '@material-ui/core/colors/orange';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(5),
  },
  listRoot: {
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    border: 'none',
  },
  urlContainer: {
    border: 'none',
    boxShadow: 'none',
    maxHeight: '35em',
    overflow: 'auto',
    height: '100%',
    '& .MuiListItem-root': {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
  },
  button: {
    height: '50px',
    backgroundColor: orange[500],
    color: theme.palette.primary.contrastText,
    fontWeight: Fonts.BOLD,
    paddingRight: 20,
    paddingLeft: 20,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Preview = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [filterData, setFilterData] = useState(allUrls);
  const [urlToPreview, setUrlToPreview] = useState('');
  const [previewMapperDialog, setPreviewMapperDialog] = useState(false);

  useEffect(() => {
    let result = [];
    result = allUrls.filter((data) => {
      return data.search(query) != -1;
    });
    setFilterData(result);
  }, [query]);

  const handleClick = (item) => {
    setQuery(item);
    setUrlToPreview(item);
  };

  return (
    <>
      <AppHeader>Preview Page</AppHeader>
      <Grid container direction='column' className={classes.mainContainer}>
        <Grid item xs={12} sm={12} md={12}>
          <Box fontWeight={Fonts.MEDIUM} component='h5' mb={5}>
            The list shows Page Urls matching this Page Template. Select and
            click Preview to preview a page.
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={12}>
          <Grid container direction='row' alignItems='center' spacing={3}>
            <Grid item xs={8}>
              <TextField
                id='search'
                label='Search url'
                variant='outlined'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={() => setPreviewMapperDialog(true)}>
                Preview
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} sm={8}>
          <Paper className={classes.urlContainer}>
            <List className={classes.listRoot}>
              {filterData?.map((item, index) => (
                <ListItem
                  value={item}
                  key={index}
                  dense
                  button
                  onClick={() => handleClick(item)}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <PreviewModal
        open={previewMapperDialog}
        setOpen={setPreviewMapperDialog}
        urlToPreview={urlToPreview}
      />
    </>
  );
};

export default Preview;

const allUrls = [
  'https://www.freecodecamp.org/',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https:///sling.biz/frontend',
  'https://www.pexels.com/',
  'https://dev.to/',
  'https://www.stackbit.com/',
  'https://airbnb-clone-typescript.vercel.app/',
  'https://hulu-clone-nextjs-lilac.vercel.app/',
];
