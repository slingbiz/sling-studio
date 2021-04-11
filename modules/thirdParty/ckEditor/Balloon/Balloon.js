import React, {useEffect} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import Balloon from '@ckeditor/ckeditor5-build-balloon/build/ckeditor';
import {useDispatch, useSelector} from 'react-redux';

import InfoView from '../../../../@crema/core/InfoView';
import {
  onGetBalloonData,
  onUpdateBalloonData,
} from '../../../../redux/actions';

const BalloonEditor = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetBalloonData());
  }, [dispatch]);
  const data = useSelector(({editors}) => editors.balloon);

  return (
    <div>
      <CKEditor
        editor={Balloon}
        data={data}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {}}
        onBlur={(event, editor) => {
          dispatch(onUpdateBalloonData(editor.getData()));
        }}
        onFocus={(event, editor) => {}}
      />
      <InfoView />
    </div>
  );
};

export default BalloonEditor;
