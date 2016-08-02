/**
 * Created by elemelyn on 16/7/11.
 */

import React, { PropTypes } from 'react';
import { Header, SideBar } from '../components/layout';
import { ElemeDomAnimator } from 'eleme-dom-animator';
import { connect } from 'react-redux';
import { fetchUserInfo, logout } from '../actions/config';

import 'antd/dist/antd.css';
import '../../style/main';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <ElemeDomAnimator />
        <Header data={ userInfo } config={ this.props.fetchUserInfo } logout={ this.props.logout } />
        <SideBar />

        <main>
          { this.props.children }
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  userInfo: PropTypes.object,
  fetchUserInfo: PropTypes.func,
  logout: PropTypes.func
};

export default connect(
  state => ({
    userInfo: state.config.userInfo,
  }), { fetchUserInfo, logout }
)(App);