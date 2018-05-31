const MessageSocket = require('message-socket').default;
const debug = require('./debug');

class TiVoRemote {
  constructor(id, name, host, port) {
    this.id = id;
    this.name = name;
    this.host = host;
    this.port = port;
    this.reachable = true;
    this.socket = new MessageSocket(this.host, this.port, /.*\r/);
    this.socket.asObservable().subscribe((...args) => this.handleIncoming(...args));;
  }

  send(data) {
    switch (data.type) {
      case 'IRCODE':
        return this.sendIrcode(data.command);
      case 'KEYBOARD':
        return this.sendKeyboardCode(data.command);
      case 'TELEPORT':
        return this.teleport(data.command);
      case 'CHANNEL':
        return this.setChannel(data.command);
    }
  }

  sendIrcode(code) {
    debug('Sending IR command %s', code);
    this.sendCommand('IRCODE', code);
  }

  sendKeyboardCode(code) {
    debug('Sending Keyboard command %s', code);
    this.sendCommand('KEYBOARD', code);
  }

  teleport(destination) {
    debug('Sending Teleport command %s', destination);
    this.sendCommand('TELEPORT', destination);
  }

  setChannel(channel, forced = false) {
    debug('Sending Channel command %s', channel);
    this.sendCommand(forced ? 'FORCECH' : 'SETCH', channel);
  }

  sendCommand(command, args) {
    this.socket.send(`${command} ${args}\r`);
  }

  handleIncoming(incomingResponse) {
    console.log(incomingResponse)
    if (typeof incomingResponse === 'undefined') {
      return;
    }

    const response = incomingResponse.replace(/\r$/, '');

    let match;

    if ((match = response.match(/^CH_STATUS (\d{1,4}) (?:(\d{1,4}) )?([a-zA-Z_-]+)$/))) {
      const [, channel, subchannel, reason] = match;
    }
  }

  destroy() {
    this.socket.close();
  }
}

module.exports = TiVoRemote;
