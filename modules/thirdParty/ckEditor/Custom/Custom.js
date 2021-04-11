import React, {useEffect} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import Custom from '@ckeditor/ckeditor5-build-balloon-block';
import InfoView from '../../../../@crema/core/InfoView';
import {useDispatch, useSelector} from 'react-redux';
import {
  onGetCustomData,
  onUpdateCustomData,
} from '../../../../redux/actions';

const CustomEditor = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetCustomData());
  }, [dispatch]);
  const data = useSelector(({editors}) => editors.Custom);

  return (
    <div>
      <CKEditor
        editor={Custom}
        data={data}
        onInit={(editor) => {}}
        onChange={(event, editor) => {}}
        onBlur={(event, editor) => {
          dispatch(onUpdateCustomData(editor.getData()));
        }}
        onFocus={(event, editor) => {}}
      />
      <InfoView />
    </div>
  );
};

export default CustomEditor;
