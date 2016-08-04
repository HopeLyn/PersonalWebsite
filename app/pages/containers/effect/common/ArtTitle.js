/**
 * Created by elemelyn on 16/8/4.
 *
 * 文章标题
 */

import React, { PropTypes } from 'react';

const propTypes = {
  title: PropTypes.string.isRequired
};

class ArtTitle extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      wrap: {
        margin: '5px 0'
      },

      title: {
        color: '#333'
      }
    };
  }

  render() {
    const { title } = this.props;
    const { styles } = this;

    return (
      <div style={ styles.wrap }>
        <h2 style={ styles.title }>{ title }</h2>
      </div>
    );
  }
}

ArtTitle.propTypes = propTypes;

export default ArtTitle;
