/**
 * Created by elemelyn on 16/8/6.
 */

// 组件引入
import React, { PropTypes } from 'react';
import { ElemeDomAnimator } from 'eleme-dom-animator';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

// css 引入
import 'antd/dist/antd.css';
import '../../style/main';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    };
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  onSubMenuClick() {
    if (this.state.collapse) {
      this.onCollapseChange();
    }
  }

  render() {
    const { collapse } = this.state;
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <ElemeDomAnimator />

        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>

          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
            <Menu.Item key="user">
              <Icon type="user" /><span className="nav-text">自我介绍</span>
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" /><span className="nav-text">博文目录</span>
            </Menu.Item>
            <Menu.Item key="laptop">
              <Icon type="laptop" /><span className="nav-text">博文分类</span>
            </Menu.Item>
            <Menu.Item key="notification">
              <Icon type="notification" /><span className="nav-text">特效收集</span>
            </Menu.Item>
            <Menu.Item key="folder">
              <Icon type="folder" /><span className="nav-text">画廊</span>
            </Menu.Item>
          </Menu>
          <div className="ant-aside-action" onClick={ e => this.onCollapseChange() }>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>

        <main>
          { this.props.children }
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default connect(
  state => ({}), { }
)(App);