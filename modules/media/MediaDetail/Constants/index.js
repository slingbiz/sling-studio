import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { Fonts } from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    }
}));

const imagesData = [
    {
        images_variable_name: 'Image 1',
        images: [
            'https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        ],
    },
    {
        images_variable_name: 'Image 2',
        images: [
            'https://images.pexels.com/photos/8801900/pexels-photo-8801900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://images.pexels.com/photos/8801900/pexels-photo-8801900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://images.pexels.com/photos/8801900/pexels-photo-8801900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://images.pexels.com/photos/8801900/pexels-photo-8801900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ],
    },
];

const Constants = (props) => {
    const classes = useStyles(props);
    return (
        <>
            <AppsHeader>
                <Box fontWeight={Fonts.BOLD} component='h3'>
                    Media Constants
                </Box>
            </AppsHeader>
            {imagesData.map((item, id) => (
                <Grid container key={id} spacing={1} className={classes.mainContainer} >
                    <Grid item xs={2}>
                        <Typography variant='h6' component='h6'>
                            {item.images_variable_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            {item.images.map((imgUrl, index) => (
                                <Grid item xs={4} key={index}>
                                    <img src={imgUrl} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Button variant="contained" color="primary" >+Add</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="secondary">Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default Constants;
