import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridContainer from '../../../@crema/core/GridContainer';
import Introduction from './Introduction';
import Team from './Team';
import {aboutUsData} from '../../../@crema/services/db/extraPages/aboutUs';
import Sections from './Sections';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../../@crema/core/AppAnimate';

const AboutUs = () => {
  const brandingData = aboutUsData.find((about) => about.alias === 'branding');
  const photoGraphyData = aboutUsData.find(
    (about) => about.alias === 'photography',
  );
  const seoData = aboutUsData.find((about) => about.alias === 'seo');

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box flex={1}>
        <GridContainer>
          <Grid item xs={12} md={12}>
            <Introduction />
          </Grid>

          <Grid item xs={12} md={4}>
            <Sections data={brandingData} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Sections data={photoGraphyData} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Sections data={seoData} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Team />
          </Grid>
        </GridContainer>
      </Box>
    </AppAnimate>
  );
};

export default AboutUs;
