import React, { useCallback } from "react";
import StyledButton2 from "../components/StyledButton_new";

export default function TestPage() {
  return (
    <div style={{ margin: '5em' }}>
      <StyledButton2 Link={{ to: '/', replace: false }}>btn</StyledButton2>
      <StyledButton2 onClick={useCallback(() => { console.log('hello') }, [])}>
        <i className="icon-search" />
        <span>Search</span>
      </StyledButton2>
      <StyledButton2 theme={{backColor: 'yellow', borderColor: 'transparent', borderWidth: '1px'}} onClick={useCallback(() => { console.log('hello') }, [])}>
        <div style={{ width: '100px', height: '100px' }}>
          <i className="icon-search" />
        </div>
      </StyledButton2>
    </div>
  );
}