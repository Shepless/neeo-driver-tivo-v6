const {discoverOneBrain, startServer} = require('neeo-sdk');
const device = require('./lib');
const debug = require('./lib/debug');

async function start() {
  debug('Looking for brains...')
  const brain = await discoverOneBrain();

  if (brain.name !== 'NEEO Kitchen') {
    debug('Could not find Kitchen Brain, retrying...');
    return start();
  }

  debug('Found Kitchen Brain...');

  startServer({
    brain,
    port: 6600,
    name: 'tivo-v6-remote',
    devices: [device]
  }).then(() => debug('Your devices are now discoverable through the NEEO Brain'));
}

start();
