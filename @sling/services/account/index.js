import ApiAuth from '../ApiAuthConfig';

const registerAccountForm1 = async (formData, token) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/account/form1`,
    formData,
  );
};

const registerAccountForm2 = async (id, formData, token) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/account/form2`, {
    id: id,
    ...formData,
  });
};
const registerAccountForm3 = async (id, formData, token) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/account/form3`,
    {id: id, data: formData},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};

export {registerAccountForm1, registerAccountForm2, registerAccountForm3};
