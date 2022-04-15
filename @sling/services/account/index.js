import ApiAuth from '../ApiAuthConfig';
import {SERVICE_URL} from '../../../shared/constants/Services';

const CompanyRegistrationForm = async (formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/company/registration`, formData);
};

const CompanyMembershipForm = async (id, formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/company/membership`, {
    id: id,
    ...formData,
  });
};
const CompanyKeyCodeSetupForm = async (id, formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/company/keycodesetup`, {
    id: id,
    data: formData,
  });
};
const UpdateCompanyInfo = async (id, formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/company/updatecompanyinfo`, {
    formData,
  });
};
const UpdateStoreInfo = async (id, formData) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/company/updatestoreinfo`, {formData});
};
const GetCompanyInfo = async (email) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/company/getcompanyinfo`, {email});
};

export {
  CompanyRegistrationForm,
  CompanyMembershipForm,
  CompanyKeyCodeSetupForm,
  GetCompanyInfo,
  UpdateCompanyInfo,
  UpdateStoreInfo,
};
