import ApiAuth from '../ApiAuthConfig';

const CreateWidget = async (widgetData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/widgets`,
    widgetData,
  );
};

const UpdateWidget = async (id, widgetData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.put(`${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/widgets`, {
    id: id,
    widget: widgetData,
  });
};

export {CreateWidget, UpdateWidget};
