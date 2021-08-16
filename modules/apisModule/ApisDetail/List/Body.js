// import React, {useState} from 'react';
// import {Grid} from '@material-ui/core';
// import {makeStyles} from '@material-ui/core/styles';
// import {Controlled as CodeMirror} from 'react-codemirror2';
// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/dracula.css');

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiInput-underline:before': {
//       border: 'none',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottom: 'none',
//     },
//     '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
//       borderBottom: 'none',
//     },
//   },
//   padding: {
//     marginBottom: '20px',
//   },
// }));
// const Body = ({auth, setAuth}) => {
//   const classes = useStyles();
//   const [data, setData] = useState(null);
//   console.log(data);
//   if (typeof navigator !== 'undefined') {
//     require('codemirror/mode/xml/xml');
//     require('codemirror/mode/javascript/javascript');
//     // [...]
//   }
//   return (
//     <Grid container className={classes.root} direction='column'>
//       <Grid item xs={12} justify='space-between' className={classes.padding}>
//         <CodeMirror
//           className={classes.editor}
//           value={data}
//           options={{
//             mode: {name: 'javascript', json: true}, // string|object
//             lineNumbers: true,
//           }}
//           onBeforeChange={(editor, data, value) => {
//             setData(value);
//           }}
//           onChange={(editor, data, value) => {}}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default Body;
