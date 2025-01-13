import React from 'react';
import { Box, Container, Typography, TextField, IconButton, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
      padding: theme.spacing(1),
    },
  },
  actionButtons: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: theme.spacing(1),
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
          <Typography variant="h4" className={classes.title}>
            What can I help you ship?
          </Typography>

          <Box className={classes.searchWrapper}>
            <TextField
              className={classes.searchInput}
              placeholder="Ask v0 a question..."
              variant="outlined"
              multiline
              rows={2}
            />
            <Box className={classes.actionButtons}>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <Send />
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" className={classes.sectionTitle}>
              Starter Templates
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  title: 'Next.js + shadcn/ui',
                  description: 'Next.js + Tailwind CSS + shadcn/ui',
                  image: '/images/templates/nextjs-shadcn.png'
                },
                {
                  title: 'Next.js + Forms',
                  description: 'Server actions and Zod validation',
                  image: '/images/templates/nextjs-forms.png'
                },
                {
                  title: 'Next.js + Charts',
                  description: 'Build charts using shadcn/ui charts',
                  image: '/images/templates/nextjs-charts.png'
                }
              ].map((template, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={template.image}
                      title={template.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {template.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
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
