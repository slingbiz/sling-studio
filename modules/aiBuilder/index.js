import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    maxWidth: 800,
    margin: '0 auto',
    paddingTop: theme.spacing(8),
  },
  searchWrapper: {
    position: 'relative',
    marginBottom: theme.spacing(6),
  },
  searchInput: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius * 2,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 2),
      '& textarea': {
        padding: 0,
        // lineHeight: '24px',
        // minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
      },
      '& .MuiOutlinedInput-inputMultiline': {
        padding: '12px 14px', // Standard Material-UI input padding
        marginTop: 15,
      },
    },
  },
  actionButtons: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: theme.spacing(1),
    padding: theme.spacing(0.5),
    '& .MuiIconButton-root': {
      padding: theme.spacing(1),
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'scale(1.1)',
      },
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  cardMedia: {
    height: 160,
    backgroundColor: theme.palette.grey[800],
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
  },
}));

const AIBuilder = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Container className={classes.container}>
          <Typography variant='h4' className={classes.title}>
            Ready to create something new?{' '}
          </Typography>

          <Box className={classes.searchWrapper}>
            <TextField
              className={classes.searchInput}
              placeholder='Create a Page Template for an Ecommerce Product Listing Page...'
              variant='outlined'
              multiline
              rows={2}
              InputProps={{
                endAdornment: (
                  <Box className={classes.actionButtons}>
                    <IconButton size='small'>
                      <AttachFile />
                    </IconButton>
                    <IconButton size='small'>
                      <Send />
                    </IconButton>
                  </Box>
                ),
              }}
            />
          </Box>

          <Box>
            <Typography variant='h6' className={classes.sectionTitle}>
              Starter Templates
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  title: 'Landing Page like Booking.com',
                  description: 'Next.js + Tailwind CSS + shadcn/ui',
                  image: '/images/booking-landing.png',
                },
                {
                  title: 'Landing Page like Mailchimp',
                  description: 'Server actions and Zod validation',
                  image: '/images/mailchimp-landing.png',
                },
                {
                  title: 'Checkout Page like Stripe',
                  description: 'Build charts using shadcn/ui charts',
                  image: '/images/templates/nextjs-charts.png',
                },
              ].map((template, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={template.image}
                      title={template.title}
                    />
                    <CardContent>
                      <Typography variant='h6' gutterBottom>
                        {template.title}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {template.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default AIBuilder;
