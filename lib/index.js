const {buildDevice} = require('neeo-sdk');
const {DISCOVERY_INSTRUCTIONS, discoverDevices, startDiscoveringDevices} = require('./discovery');
const {sendIrcode} = require('./button-handler');
const debug = require('./debug');

module.exports = buildDevice('Virgin Media V6 Box (LAN Control)')
    .setManufacturer('TiVo')
    .setType('DVB')
    .enableDiscovery(DISCOVERY_INSTRUCTIONS, discoverDevices)
    .registerInitialiseFunction(startDiscoveringDevices)
    // .registerSubscriptionFunction(registerSubscriptionFunction)
    .addButtonGroup('Power')
    .addButtonGroup('Transport')
    .addButtonGroup('Transport Search')
    .addButtonGroup('Transport Scan')
    .addButtonGroup('Transport Skip')
    .addButtonGroup('Volume')
    .addButtonGroup('Numpad')
    .addButtonGroup('Controlpad')
    .addButtonGroup('Color Buttons')
    .addButtonGroup('Menu and Back')
    .addButtonGroup('Channel Zapper')
    .addButtonGroup('Record')
    .addButton({ name: 'POWER TOGGLE', label: 'Power Toggle' })
    .addButtonHandler((CODE, deviceId) => sendIrcode(deviceId, CODE))
    .addPowerStateSensor({ getter: () => console.log('power state getter') });
