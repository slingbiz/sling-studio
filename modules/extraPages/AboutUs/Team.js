import React from 'react';
import {Card, makeStyles} from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {teamData} from '../../../@crema/services/db/extraPages/aboutUs';
import {Fonts} from '../../../shared/constants/AppEnums';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,

  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  teamImage: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    width: '100%',
  },
}));
const Team = (props) => {
  const classes = useStyles(props);

  return (
    <Box p={5} clone>
      <Card>
        <Box component='h2' mb={4} fontWeight={Fonts.BOLD} fontSize={16}>
          <IntlMessages id='extra.team' />
        </Box>

        <Box mx={-5}>
          <Slider {...settings}>
            {teamData.map((member) => {
              return (
                <Box px={5} textAlign='center' key={member.id}>
                  <Box width='100%' mb={3}>
                    <img
                      className={clsx(classes.teamImage)}
                      src={member.image}
                      alt='about us'
                      title='aboutUs'
                    />
                  </Box>
                  <Box component='h5' mb={1} fontWeight={Fonts.MEDIUM}>
                    {member.name}
                  </Box>
                  <Typography>{member.position}</Typography>
                </Box>
              );
            })}
          </Slider>
        </Box>
      </Card>
    </Box>
  );
};

export default Team;
