import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { lerp } from "../common/utils";
import Dialog from "../components/Dialog";
import StyledButton from "../components/StyledButton";
import { useAnimTime01 } from "../hooks/useAnimTime01";
import { useFSM } from "../hooks/useFSM";

function TestPage1() {
  return (
    <div style={{ margin: '5em' }}>
      <StyledButton Link={{ to: '/', replace: false }}>btn</StyledButton>
      <StyledButton onClick={useCallback(() => { console.log('hello') }, [])}>
        <i className="icon-search" />
        <span>Search</span>
      </StyledButton>
      <StyledButton theme={{ backColor: 'yellow', borderColor: 'transparent', borderWidth: '1px' }} onClick={useCallback(() => { console.log('hello') }, [])}>
        <div style={{ width: '100px', height: '100px' }}>
          <i className="icon-search" />
        </div>
      </StyledButton>
    </div>
  );
}

function TestPage2() {

  const [id, setID] = useState<string>(Math.random().toString(36));
  const { t, ctrl } = useAnimTime01({ duration: 2000 }, [id]);

  return (
    <div style={{ margin: '100px' }}>
      <div style={{
        padding: '100px',
        border: '1px solid black',
      }}
        onMouseEnter={ctrl.pause}
        onMouseLeave={() => ctrl.resume()}
      >
        <div style={{
          width: '100px',
          height: '3px',
          backgroundColor: '#ffde23',
        }}>
          <div style={{
            width: lerp(0, 100, t) + '%',
            height: '100%',
            backgroundColor: '#14b866',
          }}></div>
        </div>
      </div>
      <p>{t}</p>
      <button onClick={() => ctrl.abort()}>stop</button>
      <button onClick={() => ctrl.pause()}>pause</button>
      <button onClick={() => ctrl.resume()}>resume</button>
      <button onClick={() => ctrl.resume(true)}>reset</button>
      <button onClick={() => ctrl.toggle()}>toggle</button>
      <p>
        <button onClick={useCallback(() => { setID(Math.random().toString(36)); }, [])}>refresh</button>
      </p>
    </div>
  )
}

function TestPage3() {
  const [num, setNum] = useState<number>(0);
  const [isVisible, setVisibility] = useState<boolean>(true);
  const { current, requestNext } = useFSM('idle', {
    idle: [
      {
        to: 'play',
        test: () => num > 0,
      }
    ],
    play: [
      {
        to: 'idle',
        test: () => num == 0,
      }
    ]
  });

  useEffect(() => {
    const tid = setInterval(() => {
      // requestNext();
    }, 0);

    return () => {
      clearInterval(tid);
    }
  });

  useLayoutEffect(() => {
    console.log('next');
    requestNext();
  }, [num]);

  const handleClick = () => {
    setNum(n => (n + 1) % 10);
    console.log(num);
  };

  return (
    <div className="test-page">
      <p>some contents</p>
      <p>some contents</p>
      <p>some contents</p>
      <p>some contents</p>
      <button onClick={() => setVisibility(true)}>show</button>
      {
        isVisible ? (
          <Dialog cancellable onClose={() => setVisibility(false)}>
            <div className="top">
              <p>{num}</p>
              <p>{current}</p>
            </div>
            <div className="bottom">
              <button onClick={handleClick}>Next</button>
              <button onClick={() => setVisibility(false)}>X</button>
            </div>
          </Dialog>
        ) : null
      }
    </div>
  )
}

export default TestPage3;