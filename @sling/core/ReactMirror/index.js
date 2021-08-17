import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

export default ({data, setData, readOnly}) => (
  <CodeMirror
    value={data}
    options={{
      mode: {name: 'javascript', json: true},
      lineNumbers: true,
      readOnly: readOnly,
    }}
    onBeforeChange={(editor, data, value) => {
      setData(value);
    }}
    onChange={(editor, data, value) => {}}
  />
);
