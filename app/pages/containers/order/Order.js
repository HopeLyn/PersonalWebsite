/**
 * Created by elemelyn on 16/7/12.
 *
 * 订单管理模块入口
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrap">
        {this.props.children}
      </div>
    );
  }
}

Order.propTypes = {
  children: PropTypes.node,
};

export default connect()(Order);
