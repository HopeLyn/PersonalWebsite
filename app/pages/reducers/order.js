/**
 * Created by elemelyn on 16/7/13.
 *
 * 企业管理模块相关的 reducer
 */

import { GET_ORDER_LIST, GET_ORDER_DETAIL } from '../../constants';

const initialState = {
  orderList: {},
  orderDetail: {}
};

export default function update(state = initialState, action) {
  switch (action.type) {

    case GET_ORDER_LIST:
      return Object.assign({}, state, {
        orderList: action.json
      });

    case GET_ORDER_DETAIL:
      return Object.assign({}, state, {
        orderDetail: action.json
      });

    default:
      return state;
  }
}
