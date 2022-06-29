import React from 'react';
import { create, act } from 'react-test-renderer';

import * as router from 'react-router';

import StyledButton from '.';

describe('', () => {

  const handleClick = jest.fn();
  const navigate = jest.fn();
  const mockEvent = { stopPropagation: jest.fn(), preventDefault: jest.fn(), nativeEvent: { button: 0 } };

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => {
    navigate.mockClear();
    handleClick.mockClear();
  })

  test('render', () => {
    create(<StyledButton />);
  })

  test('string button', () => {
    const elem = create(<StyledButton>btn</StyledButton>);
    expect(elem).toMatchSnapshot();
  })

  test('element button', () => {
    const elem = create(<StyledButton><div><span><i /><span>text</span></span></div></StyledButton>);
    expect(elem).toMatchSnapshot();
  })

  test('link button', () => {
    const elem = create(<StyledButton Link={{ to: '/', replace: false }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();
  })


  test('change theme', () => {
    const elem = create(<StyledButton theme={{ backColor: 'red', borderColor: 'yellow', borderWidth: '9px', shadowColor: 'green' }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();

    elem.update(<StyledButton theme={{ backColor: 'red', borderColor: 'yellow', borderWidth: '9px', }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();

    elem.update(<StyledButton theme={{ backColor: 'blue', borderColor: 'white', borderWidth: '3em', }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();

    elem.update(<StyledButton theme={{ backColor: 'green', borderColor: 'black' }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();

    elem.update(<StyledButton theme={{ backColor: 'green', borderColor: 'black', borderRadius: '50%' }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();

    elem.update(<StyledButton theme={{ backColor: 'green', borderColor: 'black', borderRadius: '5px' }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();
  })

  test('link button', () => {
    const elem = create(<StyledButton Link={{ to: '/', replace: false }}>link to</StyledButton>);
    expect(elem).toMatchSnapshot();

    elem.root.findByType('button').props.onClick(mockEvent);
    expect(navigate).toBeCalledTimes(1);

    elem.update(<StyledButton disabled Link={{ to: '/', replace: false }}>link to</StyledButton>);
    elem.root.findByType('button').props.onClick(mockEvent);
    expect(navigate).toBeCalledTimes(1);

    elem.update(<StyledButton Link={{ to: '/', replace: false }}>link to</StyledButton>);
    elem.root.findByType('button').props.onClick(mockEvent);
    expect(navigate).toBeCalledTimes(2);
  })

  test('ignore link when onclick is set', () => {
    const elem = create(<StyledButton Link={{ to: '/', replace: false }} onClick={handleClick}>click</StyledButton>);

    elem.root.findByType('button').props.onClick(mockEvent);
    expect(handleClick).toBeCalled();
    expect(navigate).not.toBeCalled();
    
    elem.update(<StyledButton disabled Link={{ to: '/', replace: false }} onClick={handleClick}>disabled</StyledButton>);
    elem.root.findByType('button').props.onClick(mockEvent);
    expect(handleClick).toBeCalledTimes(1);
    expect(navigate).not.toBeCalled();
  })
})