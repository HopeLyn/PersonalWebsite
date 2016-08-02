/**
 * Created by elemelyn on 16/7/11.
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class SideBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: true
    };
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <aside className="side">
        <Menu theme={'light'}
              onClick={e => this.handleClick(e)}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
        >
          <SubMenu key="enter" title={<span><Icon type="appstore" /><span>企业管理</span></span>}>
            <Menu.Item key="enter-1">
              <Link to="/enterprise" activeClassName="on">企业信息</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="order">
            <Link to="/order" activeClassName="on"><Icon type="file-text" /><span>订单管理</span></Link>
          </Menu.Item>
        </Menu>
      </aside>
    );
  }
}

export default SideBar;