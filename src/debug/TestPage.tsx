import React, { useCallback, useState } from "react";
import { lerp } from "../common/utils";
import StyledButton from "../components/StyledButton";
import { useAnimTime01 } from "../hooks/useAnimTime01";

export function TestPage1() {
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

export default function TestPage() {

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