/**
 * Created by elemelyn on 16/7/12.
 *
 * 企业管理模块相关的动作
 */

import { GET_ENT_LIST } from '../../constants';
import { XHR } from '../components/common';
import { assignIn } from 'lodash';

function receiveEntList(json) {
  return {
    type: GET_ENT_LIST,
    json,
    receivedAt: Date.now()
  };
}

export function getEntList(condi) {
  return dispatch => {
    XHR({
      url: '/adminapi/enterprise/info/getEnterpriseList/',
      data: condi,
      success: data => {
        dispatch(receiveEntList(data));
      }
    });
  };
}


