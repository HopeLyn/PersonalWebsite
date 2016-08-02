/**
 * Created by elemelyn on 16/7/11.
 *
 * 企业信息列表页面
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getEntList } from '../../actions/enterprise';
import { DATE_FORMAT, ENT_SOURCE } from '../../../constants';
import { formatDateTime, getZeroDate } from '../../utils';
import { trim } from 'lodash';

import { Form, Input, Button, DatePicker, Table } from 'antd';
const FormItem = Form.Item;

class EnterpriseList extends React.Component {
  constructor(props) {
    super(props);

    const currentTime = new Date().getTime();
    this.state = {
      // 当前页面
      current: 1,

      // 列表的页面大小
      limit: 10,

      // 表格是否在加载状态(是否已获取数据)
      loading: false,

      // 查询条件
      query: {
        // 企业名称
        name: '',

        // 开通时间
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
    if (nextProps.entList) {
      this.setState({
        loading: false,
      });
    }
  }

  // 格式化时间
  formatTime(time) {
    return formatDateTime(new Date(time), DATE_FORMAT);
  }

  // 获取数据
  getData(resetPage) {
    const { current, limit } = this.state;
    const { name, startDate, endDate } = this.state.query;

    // 获取 startDate 的 0 点和 endDate 的 24 点
    const formatStartDate = getZeroDate(startDate).getTime();
    const formatEndDate = getZeroDate(endDate).getTime() + 24 * 60 * 60 * 1000 - 1;

    // 根据是否重置页数来决定搜索参数
    const query = {
      start: resetPage ? 0 : ( current - 1 ) * limit,
      limit,
      name: trim(name),
      turnFromTime: formatStartDate,
      turnToTime: formatEndDate
    };

    this.setState({
      loading: true
    }, this.props.getEntList(query));
  }

  // 校验搜索参数
  validateFilter() {
    const { query, validate } = this.state;
    let validation = true;

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

  // 快捷键功能绑定
  handleKeyDown(e) {
    // 监听回车键
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }

  buildTable(data) {
    const entList = data.dataList || [];

    // console.log(entList);

    const self = this;
    const columns = [{
        title: '企业ID',
        dataIndex: 'id',
        render: (text, item) => <span>{ item.sourceId }</span>
      }, {
        title: '企业名称',
        dataIndex: 'name',
        render: text => <span className="name">{ text }</span>
      }, {
        title: '企业来源',
        dataIndex: 'source',
        render: (text, item) => <span>{ ENT_SOURCE[item.source].text }</span>
      }, {
        title: '管理员手机',
        dataIndex: 'tel',
        render: (text, item) => <span>{ item.mobile }</span>
      }, {
        title: '开通时间',
        dataIndex: 'date',
        render: (text, item) => <span>{ self.formatTime(item.turnOnTime) }</span>
      }
    ];

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
      showTotal: () => `共 ${data.totalCount} 条`
    };

    // 添加 react 需要的 key
    entList.map(
      ent => Object.assign(ent, {
        key: ent.id
      })
    );

    return <Table className="eoa-table"
                  bordered={ true }
                  loading={ loading }
                  columns={ columns }
                  dataSource={ entList }
                  pagination={ pagination }
                  locale={ noData } />;
  }

  // 开始时间限制
  disabledStartDate(value) {
    // TODO
  }

  // 结束时间限制
  disabledEndDate(value) {
    const { startDate } = this.state.query;
    if (!value || !startDate) {
      return false;
    }

    return value.getTime() < startDate;
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

  render() {
    const { entList } = this.props;

    const { name, startDate, endDate } = this.state.query;

    const filter = (
      <Form className="filter" autoComplete="off" inline>
        <div ref="fixedWrap"></div>

        {/*<Button className="mr10" type="primary" onClick={ e => this.handleExport() }>导出</Button>*/}
        <Button className="mr10" type="primary" onClick={ e => this.handleSearch() }>查询</Button>

        <label className="mr10">开通时间</label>
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

        <label className="ml10 mr10">企业名称</label>
        <FormItem
          { ...this.state.validate.name }
        >
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
          <h2>企业信息</h2>
        </div>
        <hr/>

        <div className="content-body">
          { filter }
          { this.buildTable(entList) }
        </div>
      </div>
    );
  }
}

EnterpriseList.propTypes = {
  getEntList: PropTypes.func,
  entList: PropTypes.object
};

export default connect(
  state => ({
    entList: state.enterprise.entList
  }), { getEntList }
)(EnterpriseList);
