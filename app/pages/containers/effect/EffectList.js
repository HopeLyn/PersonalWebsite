/**
 * Created by elemelyn on 16/8/3.
 *
 * 特效列表页面
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class EffectList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="effect-list">
        <li>
          <Link to="/effect/1">多重背景图实现动画特效</Link>
        </li>
      </ul>
    );
  }
}

EffectList.propTypes = {};

export default connect(
  state => ({}), { }
)(EffectList);
