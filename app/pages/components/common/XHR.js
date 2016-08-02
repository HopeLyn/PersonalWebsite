/**
 * Created by elemelyn on 16/7/12.
 *
 * 统一处理请求
 */

import request from 'superagent';
import { serverError } from '../../../constants';
import { notification } from 'antd';

const XHR = function(conf = {}) {
  const method = conf.method || 'get';
  const api = conf.url;
  const data = conf.data;
  const succ = conf.success;
  const error = conf.error;

  const handleEnd = function(err, res) {
    if (!res.body) {
      notification.error({
        message: 'API 调用出错：' + api,
        description: '请稍后重试',
        duration: 3,
      });
      return;
    }

    if (res.ok && res.body.code === '200') {
      succ && succ(res.body.data, res.body);
    } else {
      if (res.body.code === '401') {
        // Need login
        window.location.href = LOGIN_URL;
      } else if (res.body.code === '402') {
        // Need Logout
        window.location.href = LOGOUT_URL;
      } else if (res.body.code === '403') {
        notification.error({
          message: res.body.msg,
          // description: '请联系ops管理员',
          duration: 3,
        });

        // 没有权限，需要登陆
        window.location.href = REDIRECT_URL;
      } else {
        if (error) {
          error(res.body.msg);
        } else if (res.body.code === 'venus000003') {
          notification.error({
            message: res.body.msg,
            duration: 3,
          });
        } else {
          notification.error(serverError);
        }
      }
      // notification['error'](serverError);
    }
  };

  // 根据 method 来决定参数的传递
  if (method === 'get') {
    request[method](api)
      .query(data)
      .end(handleEnd);
  } else {
    request[method](api)
      .set('Content-Type', 'application/json')
      .send(data)
      .end(handleEnd);
  }
};

export default XHR;
