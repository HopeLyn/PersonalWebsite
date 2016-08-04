/**
 * Created by elemelyn on 16/8/4.
 *
 * 源链接组件
 */

import React, { PropTypes } from 'react';

const propTypes = {
  linkUrl: PropTypes.string.isRequired
};

class SourceLink extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      wrap: {
        margin: '10px 0',
        color: '#666'
      },

      link: {
        marginLeft: 5,
        color: '#60c9ff'
      }
    };
  }

  render() {
    const { linkUrl } = this.props;
    const { styles } = this;

    return (
      <div style={ styles.wrap }>
        原文链接:
        <a href={ linkUrl } style={ styles.link }>{ linkUrl }</a>
      </div>
    );
  }
}

SourceLink.propTypes = propTypes;

export default SourceLink;
