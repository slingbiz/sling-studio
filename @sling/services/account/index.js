import ApiAuth from '../ApiAuthConfig';

const CompanyRegistrationForm = async (formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/registration`,
    formData,
  );
};

const CompanyMembershipForm = async (id, formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/membership`,
    {id: id, ...formData},
  );
};
const CompanyKeyCodeSetupForm = async (id, formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/keycodesetup`,
    {id: id, data: formData},
  );
};
const UpdateCompanyInfo = async (formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/updatecompanyinfo`,
    {data: formData},
  );
};
const GetCompanyInfo = async (email) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/company/getcompanyinfo`,
    {email},
  );
};

export {
  CompanyRegistrationForm,
  CompanyMembershipForm,
  CompanyKeyCodeSetupForm,
  GetCompanyInfo,
  UpdateCompanyInfo,
};
