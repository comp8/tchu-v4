import { useEffect, useState } from 'react';
import { ChatClient } from '../tmi';

interface Options {
  channels: [string] | [];
  username?: string;
  password?: string;
  clientId: string;
  connectionDelay?: number;
  onInit?(client: ChatClient): void;
  debug?: true;
}

const defaultConnectionDelay = 600;

export function useChatClient(opts: Options, deps: React.DependencyList = []): string | null {

  const { channels, username, password, clientId, onInit } = opts;
  const connectionDelay = opts.connectionDelay || defaultConnectionDelay;

  const [client, setClient] = useState<ChatClient>(null);

  useEffect(() => {
    const cc = new ChatClient(Object.assign({
      clientId,
      channels: [...channels],
      debug: opts.debug,
    },
      username && password ? { username, password } : null
    ));

    onInit?.(cc);

    const delayedConnect = (delay: number) => setTimeout(() => cc.connect(), delay);
    const timerId = delayedConnect(connectionDelay);

    setClient(cc);

    return () => {
      clearTimeout(timerId);
      cc.destroy();
      setClient(null);
    };
  }, [channels[0], username, password, ...deps]);

  return client?.uuid || null;
}
