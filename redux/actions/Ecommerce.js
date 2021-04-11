import {
  ADD_CART_ITEM,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_CUSTOMERS,
  GET_ECOMMERCE_LIST,
  GET_RECENT_ORDER,
  REMOVE_CART_ITEM,
  SET_FILTER_DATA,
  SET_PRODUCT_DATA,
  SET_PRODUCT_VIEW_TYPE,
  UPDATE_CART_ITEM,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';

export const onGetEcommerceData = (filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/ecommerce/list', {
      params: {filterData},
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ECOMMERCE_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getProductDetail = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/ecommerce/get', {
      params: {id: id},
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SET_PRODUCT_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getRecentOrders = (search, page) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/ecommerce/orders', {
      params: {search, page},
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_RECENT_ORDER, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const getCustomers = (search, page) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/ecommerce/customers', {
      params: {search, page},
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CUSTOMERS, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong, Please try again!',
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getCartItems = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    //   Api.get('/api/cart/get')
    //     .then((data) => {
    //       if (data.status === 200) {
    dispatch({type: FETCH_SUCCESS});
    //         dispatch({type: SET_CART_ITEMS, payload: data.data});
    //       } else {
    //         dispatch({
    //           type: FETCH_ERROR,
    //           payload: 'Something went wrong, Please try again!',
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       dispatch({type: FETCH_ERROR, payload: error.message});
    //     });
  };
};

export const setViewType = (viewType) => {
  return (dispatch) => {
    dispatch({type: SET_PRODUCT_VIEW_TYPE, payload: viewType});
  };
};

export const removeCartItem = (data) => {
  return (dispatch) => {
    dispatch({type: REMOVE_CART_ITEM, payload: data});
  };
};

export const updateCartItem = (data) => {
  return (dispatch) => {
    dispatch({type: UPDATE_CART_ITEM, payload: data});
  };
};

export const addItemToCart = (data) => {
  return (dispatch) => {
    dispatch({type: ADD_CART_ITEM, payload: data});
  };
};

export const setCurrentProduct = (product) => {
  return (dispatch) => {
    dispatch({type: SET_PRODUCT_DATA, payload: product});
  };
};

export const setFilters = (filters) => {
  return (dispatch) => {
    dispatch({type: SET_FILTER_DATA, payload: filters});
  };
};
