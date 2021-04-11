import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import LabelIcon from "@material-ui/icons/Label";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import clsx from "clsx";
import ItemMenu from "./ItemMenu";
import AppsStarredIcon from "../../../../../@crema/core/AppsStarredIcon";
import { makeStyles } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";
import { Fonts } from "../../../../../shared/constants/AppEnums";

const ContactListItem = ({
                           contact,
                           labelList,
                           onChangeCheckedContacts,
                           checkedContacts,
                           onChangeStarred,
                           onSelectContactsForDelete,
                           onViewContactDetail,
                           onOpenEditContact
                         }) => {
  const onGetLabelColor = (labelId) => {
    if (labelId) {
      return (
        labelList.length > 0 &&
        labelList.find((label) => label.id === labelId).color
      );
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottom: `1px solid ${grey[300]}`,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: "pointer",
      "&.rootCheck": {
        fontWeight: Fonts.LIGHT,
        backgroundColor: grey[200]
      }
    },
    truncate: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    avatar: {
      backgroundColor: blue[500]
    },
    labelIconRoot: {
      marginLeft: 12,
      marginRight: 8,
      display: "none",
      color: `${onGetLabelColor(contact.label)}`,
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  }));

  const classes = useStyles();

  return (
    <>
      <ListItem
        dense
        button
        key={contact.id}
        className={clsx(classes.root, "item-hover", {
          rootCheck: checkedContacts.includes(contact.id)
        })}
        onClick={() => onViewContactDetail(contact)}>
        <Box
          mr={{ xs: 2, sm: 4 }}
          component='span'
          onClick={(event) => event.stopPropagation()}>
          <Checkbox
            checked={checkedContacts.includes(contact.id)}
            onChange={(event) => onChangeCheckedContacts(event, contact.id)}
            color='primary'
          />
        </Box>
        <Box mr={3} component='span'>
          {contact.image ? (
            <Avatar src={contact.image} />
          ) : (
            <Avatar className={classes.avatar}>
              {contact.name[0].toUpperCase()}
            </Avatar>
          )}
        </Box>
        <Box
          mr={4}
          fontWeight={Fonts.MEDIUM}
          component='span'
          flex={1}
          className={classes.truncate}>
          {contact.name}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{ xs: "none", sm: "block" }}
          className={classes.truncate}>
          <Box component='span' className={classes.truncate}>
            {contact.email ? contact.email : null}
          </Box>
        </Box>
        <Box
          component='span'
          mr={4}
          flex={1}
          display={{ xs: "none", md: "block" }}>
          <Box component='span' className={classes.truncate}>
            {contact.contact}
          </Box>
        </Box>
        <Box
          component='span'
          mr={4}
          flex={1}
          display={{ xs: "none", md: "block" }}
          className={classes.truncate}>
          <Box component='span' className={classes.truncate}>
            {contact.company ? contact.company : null}
          </Box>
        </Box>

        <Box
          component='span'
          ml='auto'
          mr={{ xl: 4 }}
          display='flex'
          alignItems='center'>
          <Box component='span' onClick={(event) => event.stopPropagation()}>
            <AppsStarredIcon item={contact} onChange={onChangeStarred} />
          </Box>

          <LabelIcon className={classes.labelIconRoot} />

          <Box
            component='span'
            ml={2}
            onClick={(event) => event.stopPropagation()}>
            <ItemMenu
              onSelectContactsForDelete={onSelectContactsForDelete}
              contact={contact}
              onChangeStarred={onChangeStarred}
              onOpenEditContact={onOpenEditContact}
            />
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export default ContactListItem;

ContactListItem.defaultProps = {
  labelList: [],
  checkedContacts: []
};

ContactListItem.prototype = {
  contact: PropTypes.object.isRequired,
  labelList: PropTypes.array,
  onChangeCheckedContacts: PropTypes.func,
  checkedContacts: PropTypes.array,
  onChangeStarred: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  onViewContactDetail: PropTypes.func,
  onOpenEditContact: PropTypes.func
};
