import React, { useEffect, useLayoutEffect, useState } from "react";
import { useChatClient } from "../Twitch";

import Config from '../config.json';
import { clamp, clamp01 } from "../util";
import { Sequence } from "../components/Sequence";

export default function AppDemo() {
  console.log('----- App Demo -----');
  console.log('modify /src/index.ts');
  console.log('--------------------');

  document.title = 'Debug mode';

  return (
    <>
      <h1>Test</h1>
      <Test />
    </>
  );
};

function Test() {

  const [str, setStr] = useState<string>();

  useChatClient({
    channels: ['lck_korea'],
    clientId: Config.Twitch.clientId,
    debug: true,
    onceInit(client) {
      client.on('chat', (channel, userstate, message, self) => {
        console.log(channel, userstate["display-name"], message);
      })
    },
  }, [str]);


  const handleClick = () => {
    setStr(Math.random().toString(36));
  }

  return (
    <div>
      <button onClick={handleClick}>btn</button>
      {str}
      <div>
        <Transition key={str} duration={1000}>
          {t => <Greeting data={t} />}
        </Transition>
        <Transition duration={5000}>{a => a < 1 ? null :
          <Transition duration={3000}>{b =>
            <Transition duration={2000}>{c =>
              <Transition duration={1000}>{d =>
                <div>{`${a.toFixed(1)}:${b.toFixed(1)}:${c.toFixed(1)}:${d.toFixed(1)}`}</div>
              }</Transition>
            }</Transition>
          }</Transition>
        }</Transition>
        <Animated easing={'ease-in'} duration={300}>
          <Animated duration={300}>
            <Animated duration={300}>
              <Animated duration={300}>
                <div>Hello world</div>
              </Animated>
            </Animated>
          </Animated>
        </Animated>
        <Sequence durations={[1000, 1000, 3000, 2000, 1000]}>
          {
            (idx, t) => <div>{`${idx}:${t.toFixed(1)}`}</div>
          }
        </Sequence>
        <Sequence durations={[500, 500, 500, 500, 500, 500, 500, 500]}>
          {
            (idx, t) => [
              <div style={{ backgroundColor: '#000000' }}>{t.toFixed(1)}</div>,
              <div style={{ backgroundColor: '#0000FF' }}>{t.toFixed(1)}</div>,
              <div style={{ backgroundColor: '#00FF00' }}>{t.toFixed(1)}</div>,
              <div style={{ backgroundColor: '#FF0000' }}>{t.toFixed(1)}</div>,
              <div style={{ backgroundColor: '#FFFF00' }}>{t.toFixed(1)}</div>,
              <div style={{ backgroundColor: '#00FFFF' }}>{t.toFixed(1)}</div>,
              <div style={{ backgroundColor: '#FF00FF' }}>{t.toFixed(1)}</div>,
              <div style={{ backgroundColor: '#FFFFFF' }}>{t.toFixed(1)}</div>,
            ][idx]
          }
        </Sequence>
        <Sequence durations={[500, 700, 300, 600, 200, 700, 200, 800, 0]}>
          {
            (idx, t) => <div style={{
              backgroundColor: [
                '#000000', '#0000FF', '#00FF00', '#FF0000',
                '#FFFF00', '#00FFFF', '#FF00FF', '#FFFFFF',][idx]
            }}>{t.toFixed(1)}</div>
          }
        </Sequence>
      </div>
    </div>
  );
}

interface Props {
  duration: number;
  children: React.ReactElement | ((t: number) => React.ReactElement);
}

function Transition(props: Props) {
  const [timestamp] = useState<number>(Date.now());
  const [t, setT] = useState<number>(0);
  const { duration } = props;

  useEffect(() => {
    let tid = setInterval(() => {
      const dt = Date.now() - timestamp;
      if (dt < duration) {
        const t = clamp01(dt / duration);
        setT(t);
      }
      else {
        clearInterval(tid);
        tid = null;
        setT(1);
      }
    }, 0);

    return () => {
      clearInterval(tid);
    }
  }, []);

  return typeof props.children === 'function' ? props.children(t) : props.children || null;
}

function Greeting({ data }: { data: any }) {
  console.log('new');
  return <div style={{
    width: '100px',
    height: '100px',
    background: 'yellow',
  }}>Hi {data}</div>;
}

function Animated(props: any) {
  return <div>{props.children}</div>;
}
