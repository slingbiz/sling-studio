import {
  GET_ACADEMY_DATA,
  GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_ECOMMERCE_DATA,
  GET_HC_DATA,
  GET_METRICS_DATA,
  GET_LAYOUT_DATA,
  GET_WIDGETS_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  analyticsData: null,
  ecommerceData: null,
  layoutData: null,
  crmData: null,
  cryptoData: null,
  metricsData: null,
  widgetsData: null,
  healthCare: null,
  academyData: null,
};

const dashboardReducer = (state = initialState, action) => {
  console.log(action.type, '@reducer action.type', action.payload);
  switch (action.type) {
    case GET_ANALYTICS_DATA:
      return {
        ...state,
        analyticsData: action.payload,
      };
    case GET_LAYOUT_DATA:
      console.log('GET_LAYOUT_DATA @reducer');
      return {
        ...state,
        layoutData: action.payload,
      };

    case GET_ECOMMERCE_DATA:
      return {
        ...state,
        ecommerceData: action.payload,
      };

    case GET_ACADEMY_DATA:
      return {
        ...state,
        academyData: action.payload,
      };

    case GET_CRM_DATA:
      return {
        ...state,
        crmData: action.payload,
      };

    case GET_CRYPTO_DATA:
      return {
        ...state,
        cryptoData: action.payload,
      };

    case GET_METRICS_DATA:
      return {
        ...state,
        metricsData: action.payload,
      };

    case GET_WIDGETS_DATA:
      return {
        ...state,
        widgetsData: action.payload,
      };

    case GET_HC_DATA:
      return {
        ...state,
        healthCare: action.payload,
      };

    default:
      return state;
  }
};
export default dashboardReducer;
