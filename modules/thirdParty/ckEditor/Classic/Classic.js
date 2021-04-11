import React, {useEffect} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import Classic from '@ckeditor/ckeditor5-build-classic';
import {useDispatch, useSelector} from 'react-redux';

import InfoView from '../../../../@crema/core/InfoView';
import {
  onGetClassicData,
  onUpdateClassicData,
} from '../../../../redux/actions';

let editorRef;
const ClassicEditor = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetClassicData());
    return () => {
      if (editorRef) {
        editorRef = null;
      }
    };
  }, [dispatch]);
  const data = useSelector(({editors}) => editors.classic);

  return (
    <div>
      <CKEditor
        editor={Classic}
        data={data}
        onInit={(editor) => {
          editorRef = editor;
        }}
        onChange={(event, editor) => {}}
        onBlur={(event, editor) => {
          dispatch(onUpdateClassicData(editor.getData()));
        }}
        onFocus={(event, editor) => {}}
      />
      <InfoView />
    </div>
  );
};

export default ClassicEditor;
