/**
 * Created by elemelyn on 16/7/11.
 *
 * 企业管理模块入口
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Enterprise extends React.Component {
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

Enterprise.propTypes = {
  children: PropTypes.node,
};

export default connect()(Enterprise);
