/**
 * Created by elemelyn on 16/7/12.
 *
 * 订单列表页面
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getOrderList, getOrderDetail } from '../../actions/order';
import { ORDER_STATUS, DATE_FORMAT, DISTRIBUTE_TYPE, PAY_METHOD, PAY_STATUS, PAY_TYPE } from '../../../constants';
import { formatDateTime, getZeroDate } from '../../utils';
import { trim } from 'lodash';

import { Form, Input, Button, DatePicker, Select, Table, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class OrderList extends React.Component {
  constructor(props) {
    super(props);

    const currentTime = new Date().getTime();

    this.state = {
      // 搜索时间范围(单位: 天)
      maxInterval: 90,

      // 当前页面
      current: 1,

      // 列表的页面大小
      limit: 10,

      // 表格是否在加载状态(是否已获取数据)
      loading: false,

      // 是否展示详情弹层
      showDetailModal: false,

      // 展示的详情Id
      showDetailId: null,

      // 查询条件
      query: {
        // 企业名称
        name: '',

        // 用户手机
        tel: '',

        // 订单状态
        status: 999,

        // 创建时间
        startDate: currentTime - 30 * 24 * 60 * 60 * 1000,
        endDate: currentTime
      },

      // 校验相关
      validate: {}
    };
  }

  componentDidMount() {
    // 获取数据
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    // 获取到数据, 更新状态
    if (nextProps.orderList) {
      this.setState({
        loading: false
      });
    }
  }

  // 格式化时间
  formatTime(time) {
    return formatDateTime(new Date(time), 'yyyy-MM-dd hh:mm:ss');
  }

  // 获取日期对应的 0 点(当前时区)的时间戳
  getZeroTimestamp(time) {
    return new Date(formatDateTime(new Date(time), 'yyyy-MM-dd')).getTime();
  }

  // 获取数据
  getData(resetPage) {
    const { current, limit } = this.state;
    const { name, startDate, endDate, status, tel } = this.state.query;

    // 获取 startDate 的 0 点和 endDate 的 24 点
    const formatStartDate = getZeroDate(startDate).getTime();
    const formatEndDate = getZeroDate(endDate).getTime() + 24 * 60 * 60 * 1000 - 1;

    // 根据是否重置页数来决定搜索参数
    const query = {
      start: resetPage ? 0 : ( current - 1 ) * limit,
      limit,
      enterpriseName: trim(name),
      startTime: formatStartDate,
      endTime: formatEndDate,
      mobile: trim(tel)
    };

    // 假如是默认状态,则去掉该参数
    if (status !== 999)
      Object.assign(query, { status });

    this.setState({
      loading: true
    }, this.props.getOrderList(query));
  }

  // 校验搜索参数
  validateFilter() {
    const { query, validate } = this.state;
    let validation = true;

    // 校验手机
    // 去除 tel 中的所有空格
    const tel = query.tel.replace(/\s/g,'');
    if ( tel.length > 0 && !(tel.length === 11 && /^1\d{10}$/.test(tel)) ){
      validate.tel = {
        validateStatus: 'error',
        help: "请输入正确的手机号"
      };
      validation = false;
    } else {
      validate.tel = null;
    }

    // 校验企业名称
    const enterpriseName = query.name;
    if ( enterpriseName.length > 30 ){
      validate.name = {
        validateStatus: 'error',
        help: "企业名称不能超过30字"
      };
      validation = false;
    } else {
      validate.name = null;
    }

    this.setState({ validate });

    return validation;
  }

  // 查询
  handleSearch() {
    // 校验搜索参数
    if ( !this.validateFilter() ) return false;

    // 查询需要重置表格页数(从1开始)
    const resetPage = true;

    // TODO 为什么这个回调没有成功呢
    this.setState({
      current: 1
    }, this.getData(resetPage));
  }

  // 导出
  handleExport() {
    // TODO
    console.log('导出列表');
  }

  // 点击详情
  handleClickDetail(e, id) {
    // 获取详情
    this.props.getOrderDetail(id);

    // 跳出弹层
    this.handleDetailShow(id);
  }

  // 展示详情弹层
  handleDetailShow(id) {
    this.setState({
      showDetailId: id,
      showDetailModal: true
    });
  }

  // 取消详情弹层展示
  handleDetailCancel() {
    this.setState({
      showDetailModal: false
    });
  }

  buildTable(data) {
    const orderList =  data.dataList || [];

    // console.log(orderList);

    const self = this;
    const columns = [{
      title: '订单号',
      dataIndex: 'id',
      render: (text, item) => <span className="id">{ item.orderSerialNumber }</span>
    }, {
      title: '餐厅名称',
      dataIndex: 'restaurant',
      render: (text, item) => <span className="restaurant">{ item.restaurantName }</span>
    }, {
      title: '企业名称',
      dataIndex: 'enterprise',
      render: (text, item) => <span className="enterprise">{ item.enterpriseName }</span>
    }, {
      title: '用户名',
      dataIndex: 'user',
      render: (text, item) => <span className="user">{ item.employeeName }</span>
    }, {
      title: '用户手机',
      dataIndex: 'tel',
      render: (text, item) => <span className="tel">{ item.employeeMobile }</span>
    }, {
      title: '支付金额',
      dataIndex: 'amount',
      render: (text, item) => <span className="amount">{ item.money }</span>
    }, {
      title: '订单状态',
      dataIndex: 'status',
      render: (text, item) => <span className="status">{ ORDER_STATUS[item.status] ? ORDER_STATUS[item.status].text : '-' }</span>
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (text, item) => <span className="createTime">{ this.formatTime(item.createdAt) }</span>
    }, {
      title: '操作',
      dataIndex: 'operation',
      render(text, item) {
        return (
          <a onClick={ e => self.handleClickDetail(e, item.id) }>详情</a>
        );
      },
    }];

    const noData = {
      emptyText: '未搜索到相关订单'
    };

    const { current, loading, limit } = this.state;

    const pagination = {
      pageSize: limit,
      current: current,
      total: data.totalCount,
      onChange: v => {
        this.setState({
          current: v,
        }, () => this.getData() );
      },
      showTotal: () => `共 ${data.totalCount} 条`,
    };

    // 添加 react 需要的 key
    orderList.map(
      ent => Object.assign(ent, {
        key: ent.id
      })
    );

    return <Table className="eoa-table"
                  bordered={ true }
                  loading={ loading }
                  columns={ columns }
                  dataSource={ orderList }
                  pagination={ pagination }
                  locale={ noData } />;
  }

  // 开始时间限制
  disabledStartDate(value) {
    const { endDate } = this.state.query;
    if (!value || !endDate) {
      return false;
    }

    const { maxInterval } = this.state;
    const minStartDate = endDate - maxInterval * 24 * 60 * 60 * 1000;

    return value.getTime() < minStartDate;
  }

  // 结束时间限制
  disabledEndDate(value) {
    const { startDate } = this.state.query;
    if (!value || !startDate) {
      return false;
    }

    const { maxInterval } = this.state;
    const maxEndDate = startDate + maxInterval * 24 * 60 * 60 * 1000;

    return value.getTime() < startDate || value.getTime() > maxEndDate;
  }

  // 选择开始时间
  // 当时间大于结束时间时，自动将结束时间置为同一天
  handleStartChange(value) {
    const { query } = this.state;

    query.startDate = value.getTime();
    if (value > query.endDate)
      query.endDate = query.startDate;

    this.setState({ query });
  }

  // 选择结束时间
  handleEndChange(value) {
    const { query } = this.state;

    query.endDate = value.getTime();
    this.setState({ query });
  }

  // 修改企业名称
  handleNameChange(e) {
    const { query } = this.state;

    query.name = e.target.value;
    this.setState({ query });
  }

  // 修改用户手机
  handleTelChange(e) {
    const { query } = this.state;

    query.tel = e.target.value;
    this.setState({ query });
  }

  // 修改订单状态
  handleStatusChange(value) {
    const { query } = this.state;

    query.status = parseInt(value, 10);
    this.setState({
      // current: 1,
      query: query
    });
  }

  // 快捷键功能绑定
  handleKeyDown(e) {
    // 监听回车键
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }

  // 构建状态列表
  buildStatusOption() {
    const arr = [];
    let k = null;
    for (k in ORDER_STATUS) {
      if (ORDER_STATUS.hasOwnProperty(k)) {
        arr.push(<Option key={k} value={k}>{ORDER_STATUS[k].text}</Option>);
      }
    }
    return arr;
  }

  // 生成详情弹层
  buildDetailModal() {
    if (! this.state.showDetailModal)
      return null;

    // modal 对齐方式
    const modalAlign = {
      points: ['cc', 'cc'],
      offset: [0, 0],
    };

    // 判断是否在 loading 状态
    const isLoading = ! this.props.orderDetail.id || this.props.orderDetail.id !== this.state.showDetailId;

    const {
      id, orderNumber, orderSerialNumber, enterpriseId, enterpriseName, orderUserId, employeeName, employeeMobile,
      address, status, money, originalPrice, invoiceId, isInvoice, payType, isReserve, comment, paySerialNumber,
      payStatus, payMethod, distributeType, distributeTel, orderFoodList, createdAt, restaurantId, restaurantName,
      // foodBoxesPrice, distributeMoney, preferential, deliverStartTime, deliverFinishTime,
      enterpriseOrderExtraDtoList, activityDtoList, deliverTime
    } = this.props.orderDetail;

    return (
      <Modal
        visible={ this.state.showDetailModal }
        onCancel={ e => this.handleDetailCancel() }
        footer={ null }
        width={ 640 }
        align={ modalAlign }
      >
        {!isLoading ?
          <div className="detail-modal-wrap">
            <div className="header">
              <h3>订单详情</h3>
            </div>

            <div className="panel">
              <h4>订单信息</h4>
              <div>
                <div className="ent-info part">
                  <p>企业订单ID: { orderNumber }</p>
                  <p>企业ID: { enterpriseId }</p>
                  <p>企业名称: { enterpriseName }</p>
                </div>

                <div className="user-info part">
                  <p>用户ID: { orderUserId }</p>
                  <p>用户名: { employeeName }</p>
                  <p>顾客联系电话: { employeeMobile }</p>
                </div>

                <div className="order-info part">
                  <p>饿了么订单ID: { orderSerialNumber }</p>
                  <p>餐厅ID: { restaurantId }</p>
                  <p>饿了么订单状态: { ORDER_STATUS[status] ? ORDER_STATUS[status].text : '-' }</p>
                  <p>订单备注: { comment }</p>
                  <p>是否预订单: { isReserve ? '是' : '否' }</p>
                </div>

                <div className="category part">
                  <h5>订单详细类目列表</h5>
                  <ul>
                    { (orderFoodList || []).map((food, key) =>
                        <li className="food" key={ `food-${key}` }>
                          <span className="food-name">{ food.name }</span>
                          <span className="food-number"> x { food.count }</span>
                          <span className="food-price">￥{ food.price }</span>
                        </li>
                      )
                    }

                    <ul className="extra-price">
                      {
                        (enterpriseOrderExtraDtoList || []).map((extra, key) =>
                          <li key={ `extra-${key}` }>{ extra.name } ￥{ extra.quantity * extra.price }</li>
                        )
                      }
                    </ul>

                    <ul className="activity-price">
                      {
                        (activityDtoList || []).map((activity, key) =>
                          <li key={ `activity-${key}` }>{ activity.name } -￥{ activity.quantity * activity.price }</li>
                        )
                      }
                    </ul>

                    <li className="amount">订单总价: ￥{ money }</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr/>

            <div className="panel">
              <h4>支付信息</h4>
              <div className="part">
                <p>支付方式: { PAY_METHOD[payMethod] ? PAY_METHOD[payMethod].text : '-' }</p>
                <p>支付状态: { PAY_STATUS[payStatus] ? PAY_STATUS[payStatus].text : '-' }</p>
                <p>支付流水号: { paySerialNumber }</p>
                <p>支付账户: { PAY_TYPE[payType] ? PAY_TYPE[payType].text : '-' }</p>
              </div>
            </div>

            <hr/>

            <div className="panel">
              <h4>配送信息</h4>
              <div className="part">
                <p>配送地址: { address }</p>
                <p>送餐时间: { formatDateTime(new Date(deliverTime), 'hh:mm') }</p>
                <p>配送方式: { DISTRIBUTE_TYPE[distributeType] ? DISTRIBUTE_TYPE[distributeType].text : '-' }</p>
                <p>配送联系电话: { distributeTel }</p>
              </div>
            </div>

            <div className="footer">
              下单时间: { this.formatTime(createdAt) }
            </div>
          </div> : <div>loading</div>
        }
      </Modal>
    );
  }

  render() {
    const { orderList } = this.props;

    const { name, startDate, endDate, tel, status } = this.state.query;

    const filter = (
      <Form className="filter" autoComplete="off" inline>
        <div ref="fixedWrap"></div>

        {/*<Button className="mr10" type="primary" onClick={ e => this.handleExport() }>导出</Button>*/}
        <Button className="mr10" type="primary" onClick={ e => this.handleSearch() }>查询</Button>

        <label className="mr10">创建时间</label>
        <DatePicker
          disabledDate={ e => this.disabledStartDate(e) }
          format={ DATE_FORMAT }
          value={ new Date(startDate) }
          placeholder="开始日期"
          onChange={ e => this.handleStartChange(e) }
          getCalendarContainer={ () => this.refs.fixedWrap }
        />
        <span className="divider">至</span>
        <DatePicker
          disabledDate={ e => this.disabledEndDate(e) }
          format={ DATE_FORMAT }
          value={ new Date(endDate) }
          placeholder="结束日期"
          onChange={ e => this.handleEndChange(e) }
          getCalendarContainer={ () => this.refs.fixedWrap }
        />

        <FormItem>
          <Select
            className="order-status-select"
            name="status"
            value={`${status}`}
            onChange={ e => this.handleStatusChange(e) }
            getPopupContainer={ () => this.refs.fixedWrap }
          >
            <Option value="999">全部状态</Option>
            { this.buildStatusOption() }
          </Select>
        </FormItem>

        <div className="inline">
          <label className="ml10 mr10">用户手机</label>
          <FormItem
            { ...this.state.validate.tel }
          >
            <Input
              name="tel"
              value={tel}
              onChange={ e => this.handleTelChange(e) }
              onKeyDown={ e => this.handleKeyDown(e) }
            />
          </FormItem>
        </div>

        <FormItem
          { ...this.state.validate.name }
        >
          <label className="ml10 mr10">企业名称</label>
          <Input
            name="name"
            value={name}
            onChange={ e => this.handleNameChange(e) }
            onKeyDown={ e => this.handleKeyDown(e) }
          />
        </FormItem>
      </Form>
    );

    return (
      <div className="content">
        <div className="content-head">
          <h2>订单管理</h2>
        </div>
        <hr/>

        <div className="content-body">
          { filter }
          { this.buildTable(orderList) }
          { this.buildDetailModal(this.state.showDetailId) }
        </div>
      </div>
    );
  }
}

OrderList.propTypes = {
  getOrderList: PropTypes.func,
  orderList: PropTypes.object,
  getOrderDetail: PropTypes.func,
  orderDetail: PropTypes.object
};

export default connect(
  state => ({
    orderList: state.order.orderList,
    orderDetail: state.order.orderDetail
  }), { getOrderList, getOrderDetail }
)(OrderList);
