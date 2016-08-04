/**
 * Created by elemelyn on 16/8/4.
 *
 * 文章中的代码块
 */

import React, { PropTypes } from 'react';

const propTypes = {
  sourceCode: PropTypes.string.isRequired
};

class CodePanel extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      wrap: {
        margin: '5px 0'
      },

      code: {
        color: '#666',
        background: '#f5f2f0'
      }
    };
  }

  render() {
    const { sourceCode } = this.props;
    const { styles } = this;

    return (
      <div style={ styles.wrap }>
        <pre style={ styles.code }>
          { sourceCode }
        </pre>
      </div>
    );
  }
}

CodePanel.propTypes = propTypes;

export default CodePanel;
