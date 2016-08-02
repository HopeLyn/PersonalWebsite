/**
 * Created by elemelyn on 16/7/13.
 *
 * 企业管理模块相关的动作
 */

import { GET_ORDER_LIST,  GET_ORDER_DETAIL } from '../../constants';
import { XHR } from '../components/common';
import { assignIn } from 'lodash';

function receiveOrderList(json) {
  return {
    type: GET_ORDER_LIST,
    json,
    receivedAt: Date.now()
  };
}

function receiveOrderDetail(json) {
  return {
    type: GET_ORDER_DETAIL,
    json,
    receivedAt: Date.now()
  };
}

export function getOrderList(condi) {
  return dispatch => {
    XHR({
      url: '/adminapi/enterprise/order/getOrderList/',
      data: condi,
      success: data => {
        dispatch(receiveOrderList(data));
      }
    });
  };
}

export function getOrderDetail(id) {
  return dispatch => {
    XHR({
      url: `/adminapi/enterprise/order/getOrderInfo/${id}`,
      success: data => {
        dispatch(receiveOrderDetail(data));
      }
    });
  };
}
