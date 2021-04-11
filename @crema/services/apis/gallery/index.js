import mock from '../../MockConfig';
import photos from '../../db/gallery/photos';

mock.onGet('/gallery/photos').reply(200, photos);
