const bonjour = require('bonjour');
const debug = require('./debug');
const TiVoRemote = require('./remote');
const State = require('./state');

const QUERY_DEVICES_INTERVAL = 10000;
const DISCOVER_TIME_MILLIS = 2000;
const DISCOVERY_INSTRUCTIONS = {
    headerText: 'Discover TiVo V6 Boxes',
    description: 'Make sure your boxes are powered on and connected to your local network.'
};

let mdnsBrowser;
let mdnsQueryIntervalHandle;
let subscriptionFunction;

function getBrowser() {
  if (!mdnsBrowser) {
    mdnsBrowser = bonjour()
      .find({
          type: 'tivo-remote'
      })
      .on('up', function (service) {
        const device = new TiVoRemote(
          service.txt.tsn,
          service.name, service.host, service.port);

        const existingDevice = getDiscoveredDevice(device.id);

        if (!existingDevice) {
            // device.registerBrainUpdateFunction(subscriptionFunction);
            State.addDevice(device.id, device);
        }
      });
  }

  return mdnsBrowser;
}

function queryDevices() {
    getBrowser().update();
}

function setTimeoutPromise(millis) {
    return new Promise(function (resolve) {
        setTimeout(resolve, millis);
    });
}

function discoverDevices() {
  queryDevices();

  return setTimeoutPromise(DISCOVER_TIME_MILLIS).then(getDiscoveredDevices);
}

function getDiscoveredDevices() {
    return State.getAllDevices().map(device => device.clientObject);
}

function getDiscoveredDevice(deviceId) {
    return getDiscoveredDevices().find(device => device.id === deviceId);
}

function stopDiscoveringDevices() {
    if (!mdnsQueryIntervalHandle) {
        return;
    }

    debug('Stopping device discovery');
    getBrowser().stop();
    clearInterval(mdnsQueryIntervalHandle);
}

function startDiscoveringDevices() {
    if (mdnsQueryIntervalHandle) {
        return;
    }

    debug('Starting device discovery');
    getBrowser().start();
    setInterval(queryDevices, QUERY_DEVICES_INTERVAL);
}

function setSubscriptionFunction(_subscriptionFunction_) {
    subscriptionFunction = _subscriptionFunction_;
}

module.exports = {
    DISCOVERY_INSTRUCTIONS,
    startDiscoveringDevices,
    stopDiscoveringDevices,
    discoverDevices,
    getDiscoveredDevices,
    getDiscoveredDevice,
    setSubscriptionFunction
};
