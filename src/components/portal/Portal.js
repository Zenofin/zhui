import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './index.scss';

export default class Portal extends PureComponent {
  static propTypes = {
    selector: PropTypes.string
  }

  static defaultProps = {
    selector: 'body'
  }

  constructor(props) {
    super(props);

    this.selector = document.querySelector(props.selector);
  }

  render() {
    const {
      children
    } = this.props;

    return createPortal(
      <div className="zhui-portal">
        {children}
      </div>,
      this.selector
    );
  }
}
