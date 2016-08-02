/**
 * Created by elemelyn on 16/7/11.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { Nav } from '../components/index';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <h1>欢迎来到企业订餐管理平台</h1>
      </div>
    );
  }
}

export default connect()(Home);
