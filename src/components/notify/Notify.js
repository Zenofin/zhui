import React from 'react';
import ReactDOM from 'react-dom';
import NotifyInner from './NotifyInner';

import './index.css';

let notifyIndex = 0;
const notifyList = {};

const getNotifyContainer = () => {
  let notifyContainer = document.querySelector('.zhui-notify-container');
  if (!notifyContainer) {
    let container = document.createElement('div');
    container.className = 'zhui-notify-container';
    notifyContainer = document.body.appendChild(container);
  }

  return notifyContainer;
};

const closeNotify = (id) => {
  const notify = notifyList[id];
  if (!notify) return;

  const {
    timerId,
    callback,
    tempContainer
  } = notify;

  clearTimeout(timerId);
  ReactDOM.unmountComponentAtNode(tempContainer);
  delete notifyList[id];
  callback(notify);
};

export default function open(status, message, duration = 8000, callback = () => null) {
  getNotifyContainer();
  const tempContainer = document.createElement('div');
  const notifyId = notifyIndex++;
  const props = {
    status,
    message,
    notifyId,
    selector: '.zhui-notify-container',
    isIn: true
  };

  ReactDOM.render(React.createElement(NotifyInner, props), tempContainer);

  const timerId = setTimeout(() => {
    ReactDOM.render(
      <NotifyInner
        {...props}
        isIn={false}
        close={() => closeNotify(notifyId)}
      />,
      tempContainer
    );
  }, duration);

  notifyList[notifyId] = { timerId, callback, tempContainer };
  return notifyId;
}