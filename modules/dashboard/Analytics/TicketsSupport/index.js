import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Box, makeStyles} from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import AppCard from '../../../../@crema/core/AppCard';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AppLinearProgress from '../../../../@crema/core/AppLinearProgress';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const useStyles = makeStyles((theme) => ({
  exPanRoot: {
    position: 'relative',
    '&:last-child': {
      borderRadius: 0,
    },
  },
  exPanSummary: {
    padding: '0 24px',
    '& .MuiSvgIcon-root': {
      color: theme.palette.grey[500],
    },
  },
  exPanDetails: {
    padding: '5px 24px',
  },
}));

const TicketsSupport = ({tickets}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(1);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <AppCard
      contentStyle={{padding: 0}}
      mb={{xs: 5, md: 8}}
      footer={
        <Box color='text.secondary' display='flex' alignItems='center'>
          <WatchLaterIcon style={{fontSize: 16}} />
          <Box component='span' ml={2}>
            Last update 30 min ago
          </Box>
        </Box>
      }>
      {tickets.map((data) => (
        <Accordion
          key={data.id}
          className={classes.exPanRoot}
          expanded={expanded === data.id}
          onChange={handleChange(data.id)}>
          <AccordionSummary
            className={classes.exPanSummary}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'>
            <Box display='flex' alignItems='center' flex={1}>
              <Box
                component='h3'
                color='text.primary'
                fontWeight={Fonts.BOLD}
                fontSize={16}>
                {data.name}
              </Box>
              <Box ml='auto' color='text.secondary' fontWeight={Fonts.MEDIUM}>
                {data.opened} Open
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails className={classes.exPanDetails}>
            <Box flex={1}>
              <Box mb={4}>
                <Box mb={1}>Open</Box>
                <Box display='flex' alignItems='center'>
                  <Box flex={1}>
                    <AppLinearProgress
                      value={data.overAllPercentage.open}
                      activeColor='#5ABE20'
                    />
                  </Box>
                  <Box ml={4} color='text.secondary' component='span'>
                    {data.overAllPercentage.open}%
                  </Box>
                </Box>
              </Box>
              <Box mb={4}>
                <Box mb={1}>Closed</Box>
                <Box display='flex' alignItems='center'>
                  <Box flex={1}>
                    <AppLinearProgress
                      value={data.overAllPercentage.close}
                      activeColor='#F44D54'
                    />
                  </Box>
                  <Box ml={4} color='text.secondary' component='span'>
                    {data.overAllPercentage.close}%
                  </Box>
                </Box>
              </Box>
              <Box mb={4}>
                <Box mb={1}>On Hold</Box>
                <Box display='flex' alignItems='center'>
                  <Box flex={1}>
                    <AppLinearProgress
                      value={data.overAllPercentage.hold}
                      activeColor='#F59821'
                    />
                  </Box>
                  <Box ml={4} color='text.secondary' component='span'>
                    {data.overAllPercentage.hold}%
                  </Box>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </AppCard>
  );
};

export default TicketsSupport;
