/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable prefer-rest-params */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const elem = document.createElement('script');
elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
elem.async = true;
elem.type = 'text/javascript';
const scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);
(function () {
  const gdprAppliesGlobally = false;
  function addFrame() {
    if (!window.frames.__cmpLocator) {
      if (document.body) {
        const { body } = document;
        const iframe = document.createElement('iframe');
        iframe.style = 'display:none';
        iframe.name = '__cmpLocator';
        body.appendChild(iframe);
      } else {
        setTimeout(addFrame, 5);
      }
    }
  }
  addFrame();
  function cmpMsgHandler(event) {
    const msgIsString = typeof event.data === 'string';
    let json;
    if (msgIsString) {
      json = event.data.includes('__cmpCall') ? JSON.parse(event.data) : {};
    } else {
      json = event.data;
    }
    if (json.__cmpCall) {
      const i = json.__cmpCall;
      window.__cmp(i.command, i.parameter, (retValue, success) => {
        const returnMsg = {
          __cmpReturn: {
            returnValue: retValue,
            success,
            callId: i.callId,
          },
        };
        event.source.postMessage(msgIsString
          ? JSON.stringify(returnMsg) : returnMsg, '*');
      });
    }
  }
  window.__cmp = function (c) {
    const b = arguments;
    if (!b.length) {
      return __cmp.a;
    }
    if (b[0] === 'ping') {
      b[2]({
        gdprAppliesGlobally,
        cmpLoaded: false,
      }, true);
    } else if (c == '__cmp') return false;
    else {
      if (typeof __cmp.a === 'undefined') {
        __cmp.a = [];
      }
      __cmp.a.push([].slice.apply(b));
    }
  };
  window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
  window.__cmp.msgHandler = cmpMsgHandler;
  if (window.addEventListener) {
    window.addEventListener('message', cmpMsgHandler, false);
  } else {
    window.attachEvent('onmessage', cmpMsgHandler);
  }
}());
window.__cmp('init', {
  Language: 'es',
  'Initial Screen Body Text Option': 1,
  'Publisher Name': 'Moneytizer',
  'Default Value for Toggles': 'off',
  'UI Layout': 'banner',
  'No Option': false,
});
