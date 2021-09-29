import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginLeft: 20,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function KeysArray({urlKeys}) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(
    urlKeys.map((v) => {
      return {key: v, label: v};
    }),
  );
  const handleDelete = (chipToDelete) => () => {
    // if (chipToDelete.label === 'React') {
    //   alert('Why would you want to delete React?! :)');
    //   return;
    // }

    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key),
    );
  };

  return (
    <Paper className={classes.root}>
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <Chip
            key={data.key}
            icon={icon}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}
