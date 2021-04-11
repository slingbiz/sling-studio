import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import GridContainer from '../../../@crema/core/GridContainer';
import InfoView from '../../../@crema/core/InfoView';
import FaqSideBar from './FaqSideBar/index';
import FaqList from './FaqList';
import {generalFaq} from '../../../@crema/services/db/extraPages/faqList/general';
import {installationFaq} from '../../../@crema/services/db/extraPages/faqList/installation';
import {pricingFaq} from '../../../@crema/services/db/extraPages/faqList/pricing';
import {licenseFaq} from '../../../@crema/services/db/extraPages/faqList/licenseTypes';
import {supportFaq} from '../../../@crema/services/db/extraPages/faqList/support';
import {makeStyles} from '@material-ui/core';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {blue} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => ({
  faqHeader: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    backgroundColor: blue[500],
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const FAQ = (props) => {
  const [dataValue, setDataValue] = useState(generalFaq);
  const [selectionId, setSelectionId] = useState(101);

  const onGetFaqData = (value) => {
    setSelectionId(value);
    switch (value) {
      case 101:
        setDataValue(generalFaq);
        break;

      case 102:
        setDataValue(installationFaq);
        break;

      case 103:
        setDataValue(pricingFaq);
        break;

      case 104:
        setDataValue(licenseFaq);
        break;

      case 105:
        setDataValue(supportFaq);
        break;
      default: {
        break;
      }
    }
  };

  const classes = useStyles(props);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box flex={1}>
        <Box
          minHeight={224}
          width='100%'
          p={5}
          mb={8}
          className={classes.faqHeader}>
          <Box component='h2' mb={5} fontSize={20} fontWeight={Fonts.BOLD}>
            <IntlMessages id='faq.heading' />
          </Box>
          <Box component='p' fontWeight={Fonts.MEDIUM} fontSize={16}>
            <IntlMessages id='faq.content' />
          </Box>
        </Box>

        <GridContainer>
          <Grid item xs={12} sm={4} lg={3}>
            <FaqSideBar onGetFaqData={onGetFaqData} selectionId={selectionId} />
          </Grid>

          <Grid item xs={12} sm={8} lg={9}>
            <FaqList faqList={dataValue} />
            <InfoView />
          </Grid>
        </GridContainer>
      </Box>
    </AppAnimate>
  );
};

export default FAQ;
