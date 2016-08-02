/**
 * Created by elemelyn on 16/7/13.
 */

import { GET_USER_INFO } from '../../constants';
import { XHR } from '../components/common';

function receiveUserInfo(json) {
  return {
    type: GET_USER_INFO,
    json,
    receivedAt: Date.now(),
  };
}

export function fetchUserInfo() {
  return dispatch => {
    XHR({
      url: '/adminapi/enterprise/info/getUserInfo',
      success: data => {
        // window.ROLE = data.permissionCode === 'VENUS.MANAGER.ENTRY' ? 1 : 0;
        dispatch(receiveUserInfo(data));
      },
    });
  };
}

export function logout() {
  window.location.href = LOGOUT_URL;
}

