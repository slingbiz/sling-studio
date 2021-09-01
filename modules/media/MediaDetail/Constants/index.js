import React, { useEffect, useState } from 'react';
import {
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { Fonts } from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';

const useStyles = makeStyles((theme) => ({

}));

const Constants = (props) => {

    const classes = useStyles(props);
    return (
        <>
            <AppsHeader>
                <Box fontWeight={Fonts.BOLD} component='h3'>
                    Media Constants
                </Box>
            </AppsHeader>

        </>
    );
};

export default Constants;
