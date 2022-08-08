import Button from '@enact/sandstone/Button';
import DropDown from '@enact/sandstone/Dropdown';
import LS2Request from '@enact/webos/LS2Request';

// import VideoPlayer from '@enact/sandstone/VideoPlayer';
// import MediaPlayer from '@enact/sandstone/MediaPlayer';

import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/sandstone/Panels';

const webOSBridge = new LS2Request(); // for toast

let TOAST_MSG = 'test222!!';

const onToastSuccess = (msg) => {
  console.log(msg);
};

const onToastFailure = (msg) => {
  console.log(msg);
};

const createToast = () => {
  const parms = {
    message: TOAST_MSG,
  };

  const lsRequest = {
    service: 'luna://com.webos.notification',
    method: 'createToast',
    parameters: parms,
    onSuccess: onToastSuccess,
    onFailure: onToastFailure,
  };
  webOSBridge.send(lsRequest);
};

const callMyService = () => {
  console.log('call my service');
  const SERVICE_URL = 'luna://com.test.app.service/hello';

  const params = {};
  let SERVICE_MSG;

  // TODO
  webOSBridge.onservicecallback = (msg) => {
    console.log(msg);
    let res = JSON.parse(msg);
    SERVICE_MSG = res.Response;

    // new toast
    const newCreateToast = () => {
      const parms = {
        message: SERVICE_MSG,
      };

      const lsRequest = {
        service: 'luna://com.webos.notification',
        method: 'createToast',
        parameters: parms,
        onSuccess: onToastSuccess,
        onFailure: onToastFailure,
      };
      webOSBridge.send(lsRequest);
    };

    newCreateToast();
    createToast();
  };

  // TODO
  webOSBridge.call(SERVICE_URL, JSON.stringify(params));
};

const MainPanel = kind({
  name: 'MainPanel',

  render: (props) => (
    <Panel {...props}>
      <Button onClick={createToast}>Click me</Button>
      <Button onClick={callMyService}>Service Test</Button>
      <DropDown inline title="Options">
        {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
      </DropDown>
    </Panel>
  ),
});

export default MainPanel;
