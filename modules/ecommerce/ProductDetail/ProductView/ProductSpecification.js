import React from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const productSpecification = [
  {
    id: 1,
    title: 'Brand',
    desc: 'JBL',
  },
  {
    id: 2,
    title: 'Model Number',
    desc: 'SH12',
  },
  {
    id: 3,
    title: 'Color',
    desc: 'Red',
  },
  {
    id: 4,
    title: 'Headphone Type',
    desc: 'Wireless over the head',
  },
  {
    id: 5,
    title: 'Inline Remote',
    desc: 'No',
  },
  {
    id: 6,
    title: 'Sales Package',
    desc: '1 SH12 HEADPHONE',
  },
  {
    id: 7,
    title: 'Connectivity',
    desc: 'Bluetooth',
  },
];

const ProductSpecification = () => {
  return (
    <>
      <Box component='h3' color='text.primary' fontSize={16} mt={4} mb={3}>
        Specification
      </Box>
      <Grid container spacing={3}>
        {productSpecification.map((data) => (
          <React.Fragment key={data.id}>
            <Grid item xs={4}>
              <Box color='text.secondary'> {data.title}</Box>
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

export default ProductSpecification;
