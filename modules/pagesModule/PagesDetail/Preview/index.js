import React, { useEffect, useState } from 'react';
import AppHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {
  Grid,
  TextField,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Box,
} from '@material-ui/core';
import PreviewModal from './Modal';
import orange from '@material-ui/core/colors/orange';
import { Fonts } from '../../../../shared/constants/AppEnums';
import { getRoutesList, getCompanyInfo } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { generateSlug } from 'random-word-slugs';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      padding: theme.spacing(1),
    },
  },
  searchField: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  },
  descriptionText: {
    marginBottom: theme.spacing(3),
  },
}));

const urlList = [
  'https://demo.sling.biz/dubai/women/clothes/products',
  'https://sling.biz/',
  'https://demo.sling.biz/',
  'https://www.booking.com/',
];

const Preview = () => {
  const dispatch = useDispatch();
  const { routesList } = useSelector(({ routeList }) => routeList);
  const { account } = useSelector(({ account }) => account);
  const { user } = useSelector(({ auth }) => auth);

  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [urlToPreview, setUrlToPreview] = useState('');
  const [previewMapperDialog, setPreviewMapperDialog] = useState(false);

  const getList = () => {
    const { clientUrl } = account || {};
    const list = routesList.map(({ sample_string: sampleString, url_string: urlString }) => {
      let url = sampleString || urlString;
      const slug = generateSlug();
      url = url.replace(/\<.*?\>/g, slug);
      const slash = url.startsWith('/') || clientUrl.endsWith('/') ? '' : '/';
      return `${clientUrl}${slash}${url}`;
    });
    let res = [...list, ...urlList];
    if (query) {
      res = res.filter((data) => data.search(query) !== -1);
    }
    return res;
  };

  useEffect(() => {
    if (!account) {
      dispatch(getCompanyInfo(user.email));
    }
  }, [dispatch, account, user.email]);

  useEffect(() => {
    if (!routesList.length) {
      dispatch(getRoutesList({ size: 100 }));
    }
  }, [dispatch, routesList.length]);

  const handleClick = (item) => {
    setQuery(item);
    setUrlToPreview(item);
  };

  return (
    <>
      <AppHeader>Preview Page</AppHeader>
      <Grid container direction='column' className={classes.mainContainer}>
        <Grid item xs={12}>
          <Box fontWeight={Fonts.MEDIUM} component='h5' className={classes.descriptionText}>
            The list shows Page Urls matching this Page Template. Select and click Preview to preview a page.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction='row' alignItems='center' spacing={3}>
            <Grid item xs={12} sm={8} className={classes.searchField}>
              <TextField
                id='search'
                label='Search url'
                variant='outlined'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
        <Grid item xs={12}>
          <Paper className={classes.urlContainer}>
            <List className={classes.listRoot}>
              {getList().map((item, index) => (
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
