import {
  ADD_CART_ITEM,
  GET_CUSTOMERS,
  GET_ECOMMERCE_LIST,
  GET_RECENT_ORDER,
  REMOVE_CART_ITEM,
  SET_CART_ITEMS,
  SET_FILTER_DATA,
  SET_PRODUCT_DATA,
  SET_PRODUCT_VIEW_TYPE,
  UPDATE_CART_ITEM,
} from '../../shared/constants/ActionTypes';
import {cartItems} from '../../@crema/services/db/ecommerce/ecommerceData';

export const VIEW_TYPE = Object.freeze({LIST: 1, GRID: 2});
const initialState = {
  ecommerceList: [],
  viewType: VIEW_TYPE.LIST,
  currentProduct: null,
  orderCount: 0,
  filterData: {
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: [],
  },
  cartItems: cartItems,
  recentOrders: [],
  customers: [],
  customerCount: 0,
};

const ecommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ECOMMERCE_LIST:
      return {
        ...state,
        ecommerceList: action.payload,
      };
    case SET_PRODUCT_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };

    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };

    case SET_PRODUCT_DATA:
      return {
        ...state,
        currentProduct: action.payload,
      };

    case GET_RECENT_ORDER:
      return {
        ...state,
        recentOrders: action.payload.orders,
        orderCount: action.payload.orderCount,
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };

    case ADD_CART_ITEM: {
      let cartItems = [];
      if (state.cartItems.some((item) => +item.id === +action.payload.id)) {
        console.log('updating');
        cartItems = state.cartItems.map((item) => {
          if (+item.id === +action.payload.id) {
            item.count = +item.count + 1;
          }
          return item;
        });
        return {
          ...state,
          cartItems: cartItems,
        };
      } else {
        console.log('adding');
        cartItems = state.cartItems.concat({
          id: action.payload.id,
          title: action.payload.title,
          mrp: action.payload.mrp,
          discount: action.payload.discount,
          brand: action.payload.brand,
          image: action.payload.image[0],
          count: 1,
        });
        return {
          ...state,
          cartItems: cartItems,
        };
      }
    }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id,
        ),
      };

    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload.customers,
        customerCount: action.payload.customerCount,
      };

    default:
      return state;
  }
};
export default ecommerceReducer;
