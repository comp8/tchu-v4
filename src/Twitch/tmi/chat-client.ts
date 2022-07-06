import tmi from 'tmi.js';
import { v4 as uuidv4 } from 'uuid';

const __debug = process.env.NODE_ENV === 'development';

interface ChatClientOptions {
  channels: string[];
  username?: string;
  password?: string;
  clientId: string;
  debug?: true;
}

export class ChatClient extends tmi.Client {
  private _uuid = uuidv4();
  public get uuid() { return this._uuid; }

  constructor(props: ChatClientOptions) {
    super({
      options: {
        clientId: props.clientId,
        debug: __debug && props.debug === true,
      },
      identity: props.username && props.password ? {
        username: props.username,
        password: 'oauth:' + props.password,
      } : undefined,
      channels: [
        ...props.channels
      ],
    });
  }

  destroy() {
    this.removeAllListeners();
    const readyState = this.readyState();
    if (readyState !== 'CLOSED') {
      try {
        this.disconnect();
        console.log(readyState, this.readyState());
      } catch (ex) { }
    }
  }
}
