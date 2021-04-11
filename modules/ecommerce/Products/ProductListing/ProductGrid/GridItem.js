import React from "react";
import Card from "@material-ui/core/Card";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { Checkbox, makeStyles } from "@material-ui/core";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../../../../../redux/actions/Ecommerce";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  textUppercase: {
    textTransform: "uppercase"
  },
  lineThrough: {
    textDecoration: "line-through"
  },
  textBase: {
    fontSize: 16
  },
  textSm: {
    fontSize: 14
  },
  textXs: {
    fontSize: 12
  },
  textRes: {
    fontSize: 12,
    [theme.breakpoints.up("xl")]: {
      fontSize: 14
    }
  },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    padding: "4px 12px",
    fontSize: 12
  }
}));

const GridItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const classes = useStyles(props);
  return (
    <Box
      p={5}
      m={2}
      className='pointer item-hover'
      onClick={() => {
        dispatch(setCurrentProduct(item));
        router.push("/ecommerce/product_detail/" + item.id);
      }}
      clone>
      <Card>
        <Box mt={2} mb={5} display='flex' justifyContent='space-between'>
          <Box
            component='span'
            maxHeight={28}
            width={48}
            color='primary.contrastText'
            bgcolor={green[500]}
            py={1}
            px={2}
            display='flex'
            justifyContent='center'
            alignItems='center'
            fontWeight={Fonts.MEDIUM}
            borderRadius={8}
            className={classes.textSm}>
            {item.rating}
            <Box component='span' ml={1}>
              <StarBorderIcon className={classes.textBase} />
            </Box>
          </Box>
          <img src={item.image[0].src} alt='watch' />
          <Box mt={-3}>
            <Checkbox
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteOutlinedIcon />}
            />
          </Box>
        </Box>

        <Box
          mb={1}
          color='text.primary'
          fontWeight={Fonts.BOLD}
          fontSize={16}
          component='h3'
          className={classes.truncate}>
          {item.title}
        </Box>

        <Box
          mb={3}
          mr={6}
          color='text.secondary'
          className={clsx(classes.truncate, classes.textSm)}>
          {item.description}
        </Box>

        <Box
          mx={-1}
          display='flex'
          // flexWrap='wrap'
          alignItems='center'
          fontWeight={Fonts.MEDIUM}
          justifyContent='space-between'
          className={classes.textRes}>
          <Box px={1} mb={2} component='span' color='text.primary'>
            $ {+item.mrp - Math.round((+item.mrp * +item.discount) / 100)}
          </Box>
          <Box
            px={1}
            mb={2}
            component='span'
            color='text.disabled'
            className={classes.lineThrough}>
            ${item.mrp}
          </Box>
          <Box px={1} mb={2} component='span' color={green[500]}>
            {item.discount}% <IntlMessages id='ecommerce.off' />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default GridItem;

GridItem.propTypes = {
  item: PropTypes.object.isRequired
};
