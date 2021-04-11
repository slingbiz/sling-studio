import React, {useEffect} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonBlock from '@ckeditor/ckeditor5-build-balloon-block';
import {useDispatch, useSelector} from 'react-redux';

import InfoView from '../../../../@crema/core/InfoView';
import {
  onGetBalloonBlockData,
  onUpdateBalloonBlockData,
} from '../../../../redux/actions';

const BalloonBlockEditor = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetBalloonBlockData());
  }, [dispatch]);
  const data = useSelector(({editors}) => editors.balloonBlock);

  return (
    <div>
      <CKEditor
        editor={BalloonBlock}
        data={data}
        onInit={(editor) => {}}
        onChange={(event, editor) => {}}
        onBlur={(event, editor) => {
          dispatch(onUpdateBalloonBlockData(editor.getData()));
        }}
        onFocus={(event, editor) => {}}
      />
      <InfoView />
    </div>
  );
};

export default BalloonBlockEditor;
