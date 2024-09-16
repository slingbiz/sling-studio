import React from 'react';
import {Box, Grid, Typography, Container} from '@mui/material';

const defaultImage = `/images/sling-fe.png`;

const SlingEntryPage = () => {
  return (
    // Full-screen box with vertical and horizontal centering
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        backgroundColor: '#f4f5f7',
      }}>
      <Container maxWidth='lg'>
        {/* Header Section */}
        <Box textAlign='center' mb={5}>
          <img
            src={defaultImage}
            alt='Sling Logo'
            style={{width: '150px', marginBottom: '20px'}}
          />
          <Typography
            variant='h3'
            component='h1'
            gutterBottom
            style={{fontFamily: 'Open Sans, sans-serif'}}>
            Modify{' '}
            <Box component='span' sx={{color: '#f89f28'}}>
              Frontend
            </Box>{' '}
            on the Fly.
          </Typography>
        </Box>

        {/* Tiles Section */}
        <Grid container spacing={3}>
          {/* Tile 1 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                minHeight: '550px',
              }}>
              <Typography variant='h2' component='div' color='#f89f28' style={{padding: 20}}> 
                1
              </Typography>
              <img
                src='/images/page-routes-bg.png'
                alt='Create Routes'
                style={{
                  width: '200px',
                  height: '200px',
                  marginBottom: '15px',
                }}
              />
              <Typography
                variant='h5'
                component='h3'
                gutterBottom
                style={{fontFamily: 'Open Sans, sans-serif'}}>
                Create Pages Routes
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                style={{fontFamily: 'Open Sans, sans-serif'}}>
                Page Routes in Sling are simple URLs for your web pages that use
                page templates and widgets to render content.
              </Typography>
            </Box>
          </Grid>

          {/* Tile 2 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                minHeight: '550px',
              }}>
              <Typography variant='h2' component='div' color='#f89f28' style={{padding: 20}}> 
                2
              </Typography>
              <img
                src='/images/page-templates-bg.png'
                alt='Manage Templates'
                style={{
                  width: '200px',
                  height: '200px',
                  marginBottom: '15px',
                }}
              />
              <Typography
                variant='h5'
                component='h3'
                gutterBottom
                style={{fontFamily: 'Open Sans, sans-serif'}}>
                Manage Page Templates
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                style={{fontFamily: 'Open Sans, sans-serif'}}>
                Page Templates are blueprints for your Web Pages. You can create
                multiple page templates and customize them by adding and
                arranging widgets and attaching a template to your WebPage.
              </Typography>
            </Box>
          </Grid>

          {/* Tile 3 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                minHeight: '550px',
              }}>
              <Typography variant='h2' component='div' color='#f89f28' style={{padding: 20}}> 
                3
              </Typography>
              <img
                src='/images/widgets-bg.png'
                alt='Create Widgets'
                style={{
                  width: '200px',
                  height: '200px',
                  marginBottom: '15px',
                }}
              />
              <Typography
                variant='h5'
                component='h3'
                gutterBottom
                style={{fontFamily: 'Open Sans, sans-serif'}}>
                Create Widgets
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                style={{fontFamily: 'Open Sans, sans-serif'}}>
                In Sling, pages are built from small React components called
                widgets. You can create and upload widgets to the Studio or
                manually.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SlingEntryPage;
