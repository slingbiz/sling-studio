import ApiAuth from '../ApiAuthConfig';
import {SERVICE_URL} from '../../../shared/constants/Services';

const CreateWidget = async (widgetData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/widgets`, widgetData);
};

const UpdateWidget = async (id, widgetData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.put(`${SERVICE_URL}v1/widgets`, {
    id: id,
    widget: widgetData,
  });
};

export {CreateWidget, UpdateWidget};
