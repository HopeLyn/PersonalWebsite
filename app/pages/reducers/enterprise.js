/**
 * Created by elemelyn on 16/7/12.
 *
 * 企业管理模块相关的 reducer
 */

import { GET_ENT_LIST } from '../../constants';

const initialState = {
  entList: {}
};

export default function update(state = initialState, action) {
  switch (action.type) {

    case GET_ENT_LIST:
      return Object.assign({}, state, {
        entList: action.json
      });

    default:
      return state;
  }
}
