/**
 * Created by elemelyn on 16/8/2.
 *
 * 通用常量定义
 */

export const GET_USER_INFO = 'GET_USER_INFO';

// action 定义
export const GET_ENT_LIST = 'GET_ENT_LIST';
export const GET_ORDER_LIST = 'GET_ORDER_LIST';
export const GET_ORDER_DETAIL = 'GET_ORDER_DETAIL';

// 日期格式
export const DATE_FORMAT = 'yyyy-MM-dd';


// 订单相关 start

// 订单状态定义
export const ORDER_STATUS = {
  '-5': {
    code: 'STATUS_CODE_NOT_PAID',
    text: '等待支付'
  },

  '-4': {
    code: 'STATUS_CODE_PAYMENT_FAIL',
    text: '支付失败'
  },

  '-2': {
    code: 'STATUS_CODE_PENDING',
    text: '订单创建中'
  },

  '-1':	{
    code: 'STATUS_CODE_INVALID',
    text: '订单已取消'
  },

  '0': {
    code: 'STATUS_CODE_UNPROCESSED',
    text: '订单未处理'
  },

  '1': {
    code: 'STATUS_CODE_PROCESSING',
    text: '订单等待餐厅确认'
  },

  '2': {
    code: 'STATUS_CODE_PROCESSED_AND_VALID',
    text: '订单已处理'
  },

  '11':	{
    code: 'STATUS_CODE_USER_CONFIRMED',
    text: '用户确认订单'
  }
};

// 支付方式
export const PAY_METHOD = {
  0: {
    text: '在线支付'
  }
};

// 支付状态
export const PAY_STATUS = {
  0: {
    text: '未知'
  },

  10: {
    text: '未支付'
  },

  20: {
    text: '支付中'
  },

  30: {
    text: '支付完成'
  },

  40: {
    text: '退款中'
  },

  50: {
    text: '退款完成'
  }
};

// 支付账户
export const PAY_TYPE = {
  0: {
    text: '企业支付'
  },

  1: {
    text: '个人支付'
  },

  2: {
    text: '混合支付'
  }
};

// 配送方式
export const DISTRIBUTE_TYPE = {
  1: {
    text: '饿了么蜂鸟配送'
  },

  2: {
    text: '商家配送'
  }
};

// 订单相关 end


// 企业来源定义
export const ENT_SOURCE = {
  0: {
    text: '自身'
  },

  1: {
    text: '钉钉'
  }
};

export const serverError = {
  message: '服务器异常',
  description: '请稍后重试',
  duration: 1.5,
};
