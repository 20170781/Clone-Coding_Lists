/*
 * Copyright (c) 2020-2022 LG Electronics Inc.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// helloworld_webos_service.js
// is simple service, based on low-level luna-bus API

// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');

const service = new Service(pkgInfo.name); // Create service by service name on package.json
const logHeader = '[' + pkgInfo.name + ']';
let greeting = 'Hello, World!';

// a method that always returns the same value
service.register('hello', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/hello');
  console.log('In hello callback');
  const name = message.payload.name ? message.payload.name : 'World';

  message.respond({
    returnValue: true,
    Response: 'Hello, ' + name + '!',
  });
});

// call another service
service.register('toast', (msg) => {
  console.log('hi');
  console.log(msg);

  service.call(
    'luna://com.webos.notification/createToast',
    { message: 'hello' },
    function (m2) {
      console.log(
        logHeader,
        'SERVICE_METHOD_CALLED:com.webos.notification/createToast'
      );
      msg.respond({
        returnValue: true,
        Response: JSON.stringify(m2.payload),
      });
    }
  );
});

// heartbeat subscribe
service.register('serviceOn', (message) => {
  console.log(logHeader, message);

  const max = 5;
  let i = 0;
  let interval = setInterval(() => {
    let url = 'luna://com.webos.notification/createToast';
    let params = {
      message: `Hello! +${i}`,
    };

    service.call(url, params, (m2) => {
      console.log(
        logHeader,
        'SERVICE_METHOD_CALLED:com.webos.notification/createToast'
      );
    });

    if (++i > max) {
      clearInterval(interval);
    }
  }, 3000);

  //heartbeat 구독
  const sub = service.subscribe('luna://com.test.app.service/heartbeat', {
    subscribe: true,
  });
  const heartbeatMax = 120;
  let heartbeatCnt = 0;
  sub.addListener('response', function (msg) {
    console.log(JSON.stringify(msg.payload));
    if (++heartbeatCnt > heartbeatMax) {
      sub.cancel();
      setTimeout(function () {
        console.log(heartbeatMax + ' responses received, exiting...');
        process.exit(0);
      }, 1000);
    }
  });

  message.respond({
    returnValue: true,
    Response: 'My service has been started.',
  });
});

// set some state in the service
service.register('/config/setGreeting', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/config/setGreeting');
  console.log('In setGreeting callback');
  if (message.payload.greeting) {
    greeting = message.payload.greeting;
  } else {
    message.respond({
      returnValue: false,
      errorText: "argument 'greeting' is required",
      errorCode: 1,
    });
  }
  message.respond({
    returnValue: true,
    greeting: greeting,
  });
});

// call another service
service.register('time', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/time');
  console.log('time callback');
  service.call(
    'luna://com.webos.service.systemservice/clock/getTime',
    {},
    function (m2) {
      console.log(
        logHeader,
        'SERVICE_METHOD_CALLED:com.webos.service.systemservice/clock/getTime'
      );
      const response = 'You appear to have your UTC set to: ' + m2.payload.utc;
      console.log(response);
      message.respond({ message: response });
    }
  );
});

const subscriptions = {};
let heartbeatinterval;
let x = 1;
function createHeartBeatInterval() {
  if (heartbeatinterval) {
    return;
  }
  console.log(logHeader, 'create_heartbeatinterval');
  heartbeatinterval = setInterval(function () {
    sendResponses();
  }, 1000);
}

// send responses to each subscribed client
function sendResponses() {
  console.log(logHeader, 'send_response');
  console.log(
    'Sending responses, subscription count=' + Object.keys(subscriptions).length
  );
  for (const i in subscriptions) {
    if (Object.prototype.hasOwnProperty.call(subscriptions, i)) {
      const s = subscriptions[i];
      s.respond({
        returnValue: true,
        event: 'beat ' + x,
      });
    }
  }
  x++;
}

const heartbeat = service.register('heartbeat');
heartbeat.on('request', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/heartbeat');
  message.respond({ event: 'beat' }); // initial response
  if (message.isSubscription) {
    subscriptions[message.uniqueToken] = message; //add message to "subscriptions"
    if (!heartbeatinterval) {
      createHeartBeatInterval();
    }
  }
});

heartbeat.on('cancel', function (message) {
  delete subscriptions[message.uniqueToken]; // remove message from "subscriptions"
  const keys = Object.keys(subscriptions);
  if (keys.length === 0) {
    // count the remaining subscriptions
    console.log('no more subscriptions, canceling interval');
    clearInterval(heartbeatinterval);
    heartbeatinterval = undefined;
  }
});

// handle subscription requests
// const subscriptions = {};
// let interval;
// let x = 1;
// function createInterval() {
//   if (interval) {
//     return;
//   }
//   console.log(logHeader, 'create_interval');
//   console.log('create new interval');
//   interval = setInterval(function () {
//     sendResponses();
//   }, 1000);
// }

// // send responses to each subscribed client
// function sendResponses() {
//   console.log(logHeader, 'send_response');
//   console.log(
//     'Sending responses, subscription count=' + Object.keys(subscriptions).length
//   );
//   for (const i in subscriptions) {
//     if (Object.prototype.hasOwnProperty.call(subscriptions, i)) {
//       const s = subscriptions[i];
//       s.respond({
//         returnValue: true,
//         event: 'beat ' + x,
//       });
//     }
//   }
//   x++;
// }

// // listen for requests, and handle subscriptions via implicit event handlers in call
// // to register
// service.register(
//   'heartbeat',
//   function (message) {
//     const uniqueToken = message.uniqueToken;
//     console.log(logHeader, 'SERVICE_METHOD_CALLED:/heartbeat');
//     console.log(
//       'heartbeat callback, uniqueToken: ' +
//         uniqueToken +
//         ', token: ' +
//         message.token
//     );
//     message.respond({ event: 'beat' });
//     if (message.isSubscription) {
//       subscriptions[uniqueToken] = message;
//       if (!interval) {
//         createInterval();
//       }
//     }
//   },
//   function (message) {
//     const uniqueToken = message.uniqueToken;
//     console.log('Canceled ' + uniqueToken);
//     delete subscriptions[uniqueToken];
//     const keys = Object.keys(subscriptions);
//     if (keys.length === 0) {
//       console.log('no more subscriptions, canceling interval');
//       clearInterval(interval);
//       interval = undefined;
//     }
//   }
// );

// EventEmitter-based API for subscriptions
// note that the previous examples are actually using this API as well, they're
// just setting a "request" handler implicitly
const heartbeat2 = service.register('heartbeat2');
heartbeat2.on('request', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/heartbeat2/request');
  console.log('heartbeat callback');
  message.respond({ event: 'beat' });
  if (message.isSubscription) {
    subscriptions[message.uniqueToken] = message;
    if (!interval) {
      createInterval();
    }
  }
});
heartbeat2.on('cancel', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/heartbeat2/cancel');
  console.log('Canceled ' + message.uniqueToken);
  delete subscriptions[message.uniqueToken];
  const keys = Object.keys(subscriptions);
  if (keys.length === 0) {
    console.log('no more subscriptions, canceling interval');
    clearInterval(interval);
    interval = undefined;
  }
});

service.register('ping', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/ping');
  console.log('Ping! setting up activity');
  const methodName = 'luna://' + pkgInfo.name + '/pong';
  const activitySpec = {
    activity: {
      name: 'My Activity', // this needs to be unique, per service
      description: 'do something', // required
      background: true, // can use foreground or background, or set individual properties (see Activity Specification below, for details)
      persist: true, // this activity will be persistent across reboots
      explicit: true, // this activity *must* be completed or cancelled explicitly, or it will be re-launched until it does
      callback: {
        // what service to call when this activity starts
        method: methodName, // URI to service
        params: {
          // parameters/arguments to pass to service
        },
      },
    },
    start: true, // start the activity immediately when its requirements (if any) are met
    replace: true, // if an activity with the same name already exists, replace it
    subscribe: false, // if "subscribe" is false, the activity needs to be adopted immediately, or it gets canceled
  };
  service.call(
    'luna://com.webos.service.activitymanager/create',
    activitySpec,
    function (reply) {
      console.log(
        logHeader,
        'SERVICE_METHOD_CALLED:com.webos.service.activitymanager/create'
      );
      const activityId = reply.payload.activityId;
      console.log('ActivityId = ' + activityId);
      message.respond({ msg: 'Created activity ' + activityId });
    }
  );
});

service.register('pong', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/pong');
  console.log('Pong!');
  console.log(message.payload);
  message.respond({ message: 'Pong' });
});

service.register('/do/re/me', function (message) {
  console.log(logHeader, 'SERVICE_METHOD_CALLED://do/re/me');
  message.respond({
    verses: [
      { doe: 'a deer, a female deer' },
      { ray: 'a drop of golden sun' },
      { me: 'a name I call myself' },
    ],
  });
});
