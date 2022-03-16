import ApiConfig from '../ApiConfig';

const registerAccountForm1 = (formData, token) => {
  return ApiConfig.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/account/form1`,
    formData,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};

const registerAccountForm2 = (id, formData, token) => {
  return ApiConfig.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/account/form2`,
    {id: id, ...formData},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};
const registerAccountForm3 = (id, formData, token) => {
  return ApiConfig.post(
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
