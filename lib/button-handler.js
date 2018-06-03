const {getDiscoveredDevice} = require('./discovery');
const debug = require('./debug');

const MAPPINGS = {
  // POWER
  'POWER ON': { type: 'IRCODE', command: 'STANDBY' },
  'POWER OFF': { type: 'IRCODE', command: 'STANDBY' },
  'POWER TOGGLE': { type: 'IRCODE', command: 'STANDBY' },

  // CURSOR KEYS
  'CURSOR ENTER': { type: 'IRCODE', command: 'SELECT' },
  'CURSOR LEFT': { type: 'IRCODE', command: 'LEFT' },
  'CURSOR RIGHT': { type: 'IRCODE', command: 'RIGHT' },
  'CURSOR UP': { type: 'IRCODE', command: 'UP' },
  'CURSOR DOWN': { type: 'IRCODE', command: 'DOWN' },
  'BACK': { type: 'KEYBOARD', command: 'EXIT' },
  'MENU': { type: 'KEYBOARD', command: 'TIVO' },
  'CHANNEL UP': { type: 'KEYBOARD', command: 'CHANNELUP' },
  'CHANNEL DOWN': { type: 'KEYBOARD', command: 'CHANNELDOWN' },

  // TRANSPORT
  'PLAY': { type: 'IRCODE', command: 'PLAY' },
  'PAUSE': { type: 'IRCODE', command: 'PAUSE' },
  'STOP': { type: 'IRCODE', command: 'STOP' },
  'REVERSE': { type: 'IRCODE', command: 'REVERSE' },
  'FORWARD': { type: 'IRCODE', command: 'FORWARD' },
  'SKIP SECONDS BACKWARD': { type: 'IRCODE', command: 'REPLAY' },
  'SKIP SECONDS FORWARD': { type: 'IRCODE', command: 'ADVANCE' },

  // MENU
  'MY RECORDINGS': { type: 'IRCODE', command: 'VIDEO_ON_DEMAND' },
  'RECORD': { type: 'IRCODE', command: 'RECORD' },
  'LIVE': { type: 'IRCODE', command: 'LIVETV' },

  // FUNCTION KEYS
  'FUNCTION RED': { type: 'KEYBOARD', command: 'ACTION_A' },
  'FUNCTION GREEN': { type: 'KEYBOARD', command: 'ACTION_B' },
  'FUNCTION YELLOW': { type: 'KEYBOARD', command: 'ACTION_C' },
  'FUNCTION BLUE': { type: 'KEYBOARD', command: 'ACTION_D' },

  // DIGITS
  'DIGIT 0': { type: 'KEYBOARD', command: 'NUM0' },
  'DIGIT 1': { type: 'KEYBOARD', command: 'NUM1' },
  'DIGIT 2': { type: 'KEYBOARD', command: 'NUM2' },
  'DIGIT 3': { type: 'KEYBOARD', command: 'NUM3' },
  'DIGIT 4': { type: 'KEYBOARD', command: 'NUM4' },
  'DIGIT 5': { type: 'KEYBOARD', command: 'NUM5' },
  'DIGIT 6': { type: 'KEYBOARD', command: 'NUM6' },
  'DIGIT 7': { type: 'KEYBOARD', command: 'NUM7' },
  'DIGIT 8': { type: 'KEYBOARD', command: 'NUM8' },
  'DIGIT 9': { type: 'KEYBOARD', command: 'NUM9' },
};

module.exports =  {
  sendIrcode(deviceId, CODE) {
    debug('Recieved command %s', CODE);
    const device = getDiscoveredDevice(deviceId);

    if (device) {
      debug('Sending command to %s - %o', device.name, MAPPINGS[CODE]);
      device.send(MAPPINGS[CODE]);
    }
  }
};
