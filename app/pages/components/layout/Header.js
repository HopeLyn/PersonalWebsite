/**
 * Created by elemelyn on 16/7/11.
 */

import React, { PropTypes } from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.config();
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    const { data } = this.props;

    return (
      <header>
        <h1>
          <a href="#">企业订餐管理平台</a>
        </h1>

        <div className="login-info">
          <span>{ data.name || '--'}</span>
          <a className="logout" href="javascript:;" onClick={() => this.handleLogout()}>
            退出
            <svg width="15" height="12" viewBox="0 0 15 12"
                 version="1">
              <g style={{ fillRule: 'evenodd', fill: 'none', strokeWidth: 1, stroke: 'none'}}><g fill="#FFF"><path d="M8 9L5 9 5 12 2 12C0.9 12 0 11.1 0 10L0 2C0 0.9 0.9 0 2 0L5 0 5 3 4 3C3.4 3 3 3.4 3 4L3 8C3 8.5 3.4 9 4 9L5 9 5 11 3 11C1.9 11 1 10.1 1 9L1 3C1 1.9 1.9 1 3 1L5 1 5 3 8 3 8 1C8 0.4 8.3 0.3 8.8 0.7L15 6 8.8 11.3C8.3 11.7 8 11.5 8 11L8 9Z"/></g></g>
            </svg>
          </a>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  data: PropTypes.object,
  config: PropTypes.func,
  logout: PropTypes.func
};

export default Header;
