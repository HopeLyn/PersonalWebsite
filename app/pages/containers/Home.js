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
      </div>
    );
  }
}

export default connect()(Home);
