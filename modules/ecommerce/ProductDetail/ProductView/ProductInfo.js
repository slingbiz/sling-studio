import React from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const productInfo = [
  {
    id: 1,
    title: 'Sweat Proof',
    desc: 'Yes',
  },
  {
    id: 2,
    title: 'Deep Bass',
    desc: 'Yes',
  },
  {
    id: 3,
    title: 'Water Resistant',
    desc: 'Yes',
  },
  {
    id: 4,
    title: 'Designed For',
    desc: 'MOBILE, iPHONE, LAPTOP, ALL ANDRIOD PHONE',
  },
  {
    id: 5,
    title: 'Series',
    desc: 'SH12',
  },
  {
    id: 6,
    title: 'System Requirements',
    desc: 'BLUETOOTH',
  },
  {
    id: 7,
    title: 'Circumaural/ Supraaural',
    desc: 'Circumaural',
  },
  {
    id: 8,
    title: 'Open/Closed Back',
    desc: 'OPEN',
  },
  {
    id: 9,
    title: 'indicators',
    desc: 'Connection Indicator, Power Indicator',
  },
  {
    id: 10,
    title: 'Controls',
    desc: 'PLAY/PAUSE',
  },
  {
    id: 11,
    title: 'Theme',
    desc: 'NA',
  },
  {
    id: 12,
    title: 'Total Harmonic Distortion',
    desc: '0.%',
  },
  {
    id: 13,
    title: 'Number of Pins',
    desc: '1',
  },
  {
    id: 14,
    title: 'With Microphone',
    desc: 'Yes',
  },
];
const ProductInfo = () => {
  return (
    <>
      <Box component='h3' color='text.primary' fontSize={16} mt={4} mb={3}>
        Product Details
      </Box>
      <Grid container spacing={3}>
        {productInfo.map((data) => (
          <React.Fragment key={data.id}>
            <Grid item xs={4}>
              <Box color='text.secondary' pr={2}>
                {data.title}
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box> {data.desc}</Box>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
};

export default ProductInfo;
