import React, {useEffect, useState} from 'react';
import AppHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {
  Grid,
  TextField,
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import PreviewModal from './Modal';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(2),
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  urlContainer: {
    maxHeight: '20em',
    height: '100%',
    overflowY: 'scroll',
    '& .MuiListItem-root': {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
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
        <Grid item xs={12} sm={8} md={6}>
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
                onClick={() => setPreviewMapperDialog(true)}>
                Preview
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} sm={8}>
          <Box my={5} mx={5} className={classes.urlContainer}>
            <List className={classes.listRoot}>
              {filterData?.map((item, index) => (
                <ListItem
                  value={item}
                  key={index}
                  role={undefined}
                  dense
                  button
                  onClick={() => handleClick(item)}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
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
  'https://www.pexels.com/',
  'https://dev.to/',
];
