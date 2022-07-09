import React, { useState } from "react";
import { useChatClient } from "../Twitch";

import Config from '../config';

import { Sequence } from "../components/Sequence";
import { Transition } from '../components/Transition';
import { useWindowEventListener } from "../hooks/useEventListener";

import { parseEmotes } from "../datamgmts/chat-store";
import ChatStoreTypes from "../datamgmts/chat-store/types";
import { getEmoteUrl } from "../Twitch/api/get-emote-url";
import { useLocalStorageState, useSessionStorageState } from "../hooks/usePersistentState";

export default function AppDemo() {
  console.log('----- App Demo -----');
  console.log('modify /src/index.ts');
  console.log('--------------------');

  document.title = 'Debug mode';

  return (
    <>
      <h1>Test</h1>
      <Counter1 />
      <Counter2 />
      <Counter1 />
      <Counter2 />
      {/* <Test /> */}
    </>
  );
};

function Chat({ chat }: { chat: ChatStoreTypes.ChatMessage }) {
  return (
    <li>
      {
        chat.map((e, i) => typeof e === 'string' ? (
          <span key={'item' + i}>{e}</span>
        ) : (
          <span key={'item' + i}><img src={getEmoteUrl(e.id)} /></span>
        ))
      }
    </li>
  )
}

function Counter1() {
  const [count, setCount] = useLocalStorageState<number>('count', 0);
  const increment = () => setCount(n => n + 1);
  const decrement = () => setCount(n => n - 1);
  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  )
}
function Counter2() {
  const [count, setCount] = useSessionStorageState<number>('count', 0);
  const increment = () => setCount(n => n + 1);
  const decrement = () => setCount(n => n - 1);
  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  )
}

function Test() {
  const [chats, setChats] = useLocalStorageState<ChatStoreTypes.ChatMessage[]>('cm', []);
  // localStorage.clear();
  useChatClient({
    channels: ['doublelift'],
    clientId: Config.Twitch.clientId,
    onInit: (cc) => {
      cc.on('chat', (channel, userstate, message) => {
        const result = parseEmotes(message, userstate.emotes);
        setChats(old => {
          return [...old, result]
        });
      });
    }
  });
  return (
    <ul>
      {
        chats.map((e, i) => <Chat key={'item' + i} chat={e} />)
      }
    </ul>
  )
}
// function Child() {
//   const [sample1, setSample1] = usePersistedState<number>('sample1', 7);
//   const [sample2, setSample2] = usePersistedState<string>('sample2', 'hello');

//   return (
//     <div>
//       <button onClick={() => {
//         setSample1(old => old + 1);
//       }}>go</button>
//       <div>{sample1}</div>
//       <div>{sample2}</div>
//       <div>{Math.random()}</div>
//     </div>
//   )

// }
// function Test() {

//   const [sample1, setSample1] = usePersistedState<number>('sample1', 5);
//   const [sample2, setSample2] = usePersistedState<string>('sample2', 'world');

//   return (
//     <div>
//       <button onClick={() => {
//         setSample1(old => old + 1);
//       }}>go</button>
//       <div>{sample1}</div>
//       <div>{sample2}</div>
//       <Child  />
//     </div>
//   )
// }

// function Test1() {

//   const [str, setStr] = useState<string>();

//   useChatClient({
//     channels: ['lck_korea'],
//     clientId: Config.Twitch.clientId,
//     debug: true,
//     onceInit(client) {
//       client.on('chat', (channel, userstate, message, self) => {
//         console.log(channel, userstate["display-name"], message);
//       })
//     },
//   }, [str]);

//   useWindowEventListener('mousedown', () => console.log('hi'));

//   const handleClick = () => {
//     setStr(Math.random().toString(36));
//   }

//   return (
//     <div>
//       <button onClick={handleClick}>btn</button>
//       {str}
//       <div>
//         <Transition key={str} duration={1000}>
//           {t => <Greeting data={t} />}
//         </Transition>
//         <Transition duration={5000}>{a => a < 1 ? null :
//           <Transition duration={3000}>{b =>
//             <Transition duration={2000}>{c =>
//               <Transition duration={1000}>{d =>
//                 <div>{`${a.toFixed(1)}:${b.toFixed(1)}:${c.toFixed(1)}:${d.toFixed(1)}`}</div>
//               }</Transition>
//             }</Transition>
//           }</Transition>
//         }</Transition>
//         <Animated easing={'ease-in'} duration={300}>
//           <Animated duration={300}>
//             <Animated duration={300}>
//               <Animated duration={300}>
//                 <div>Hello world</div>
//               </Animated>
//             </Animated>
//           </Animated>
//         </Animated>
//         <Sequence durations={[1000, 1000, 3000, 2000, 1000]}>
//           {
//             (idx, t) => <div>{`${idx}:${t.toFixed(1)}`}</div>
//           }
//         </Sequence>
//         <Sequence durations={[500, 500, 500, 500, 500, 500, 500, 500]}>
//           {
//             (idx, t) => [
//               <div style={{ backgroundColor: '#000000' }}>{t.toFixed(1)}</div>,
//               <div style={{ backgroundColor: '#0000FF' }}>{t.toFixed(1)}</div>,
//               <div style={{ backgroundColor: '#00FF00' }}>{t.toFixed(1)}</div>,
//               <div style={{ backgroundColor: '#FF0000' }}>{t.toFixed(1)}</div>,
//               <div style={{ backgroundColor: '#FFFF00' }}>{t.toFixed(1)}</div>,
//               <div style={{ backgroundColor: '#00FFFF' }}>{t.toFixed(1)}</div>,
//               <div style={{ backgroundColor: '#FF00FF' }}>{t.toFixed(1)}</div>,
//               <div style={{ backgroundColor: '#FFFFFF' }}>{t.toFixed(1)}</div>,
//             ][idx]
//           }
//         </Sequence>
//         <Sequence durations={[500, 700, 300, 600, 200, 700, 200, 800, 0]}>
//           {
//             (idx, t) => <div style={{
//               backgroundColor: [
//                 '#000000', '#0000FF', '#00FF00', '#FF0000',
//                 '#FFFF00', '#00FFFF', '#FF00FF', '#FFFFFF',][idx]
//             }}>{t.toFixed(1)}</div>
//           }
//         </Sequence>
//       </div>
//     </div>
//   );
// }


// function Greeting({ data }: { data: any }) {
//   console.log('new');
//   return <div style={{
//     width: '100px',
//     height: '100px',
//     background: 'yellow',
//   }}>Hi {data}</div>;
// }

// function Animated(props: any) {
//   return <div>{props.children}</div>;
// }

