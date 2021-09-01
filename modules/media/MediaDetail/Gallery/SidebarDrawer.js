import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import { Fonts } from '../../../../shared/constants/AppEnums';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) => ({
    list: {
        width: "auto",
        "& .MuiAccordion-rounded:last-child": {
            maxWidth: 450,
            width: "100%"
        }
    },
    drawerContent: {
        padding: 20
    },
    imgSize: {
        width: 350,
        height: 350,
        padding: 20
    }
}))
export const SidebarDrawer = ({ toggleDrawer, details }) => {
    const classes = useStyles();
    const [openAccordion, setOpenAccordion] = useState(false)

    function handleChange() {
        setOpenAccordion(!openAccordion)
    }

    return (
        <div
            className={classes.list}
            role="presentation"

        >
            <AppsHeader>
                <Box fontWeight={Fonts.EXTRA_BOLD} >
                    {details?.name}
                </Box>
                <IconButton onClick={() => toggleDrawer(false)} >
                    <ClearIcon />
                </IconButton>
            </AppsHeader>
            <Grid container alignItems="center" direction="column" className={classes.drawerContent}  >
                <Grid item xs={12} >
                    <img src={details?.imageUrl} className={classes.imgSize} />
                </Grid>
                <Grid item xs={12} >
                    <Accordion expanded={openAccordion} onChange={handleChange}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Box fontWeight={Fonts.BOLD} >Settings</Box>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    )
}