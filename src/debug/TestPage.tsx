import React, { useCallback } from "react";
import StyledButton from "../components/StyledButton";

export default function TestPage() {
  return (
    <div style={{ margin: '5em' }}>
      <StyledButton Link={{ to: '/', replace: false }}>btn</StyledButton>
      <StyledButton onClick={useCallback(() => { console.log('hello') }, [])}>
        <i className="icon-search" />
        <span>Search</span>
      </StyledButton>
      <StyledButton theme={{backColor: 'yellow', borderColor: 'transparent', borderWidth: '1px'}} onClick={useCallback(() => { console.log('hello') }, [])}>
        <div style={{ width: '100px', height: '100px' }}>
          <i className="icon-search" />
        </div>
      </StyledButton>
    </div>
  );
}