import ApiConfig from '../ApiConfig';

const CompanyRegistrationForm = (formData, token) => {
  return ApiConfig.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/registration`,
    formData,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};

const CompanyMembershipForm = (id, formData, token) => {
  return ApiConfig.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/membership`,
    {id: id, ...formData},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};
const CompanyKeyCodeSetupForm = (id, formData, token) => {
  return ApiConfig.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/keycodesetup`,
    {id: id, data: formData},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};

export {
  CompanyRegistrationForm,
  CompanyMembershipForm,
  CompanyKeyCodeSetupForm,
};
