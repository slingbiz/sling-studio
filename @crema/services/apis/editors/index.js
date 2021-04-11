import mock from '../../MockConfig';
import balloonBlock from '../../db/editors/balloonBlock';
import balloon from '../../db/editors/balloon';
import classic from '../../db/editors/classic';
import inline from '../../db/editors/inline';
import custom from '../../db/editors/custom';
import document from '../../db/editors/document';

mock.onGet('/editor/balloon-block').reply(200, balloonBlock);

mock.onPut('/editor/balloon-block').reply((request) => {
  return [200, request.data];
});
mock.onGet('/editor/balloon').reply(200, balloon);

mock.onPut('/editor/balloon').reply((request) => {
  return [200, request.data];
});

mock.onGet('/editor/classic').reply(200, classic);

mock.onPut('/editor/classic').reply((request) => {
  return [200, request.data];
});

mock.onGet('/editor/inline').reply(200, inline);

mock.onPut('/editor/inline').reply((request) => {
  return [200, request.data];
});

mock.onGet('/editor/document').reply(200, document);

mock.onPut('/editor/document').reply((request) => {
  return [200, request.data];
});

mock.onGet('/editor/custom').reply(200, custom);

mock.onPut('/editor/custom').reply((request) => {
  return [200, request.data];
});
