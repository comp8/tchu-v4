import React from 'react';
import shallowRenderer from 'react-test-renderer/shallow';

import ChatRow from '.';

describe('', () => {
  test('', () => {
    const shallow = shallowRenderer.createRenderer();
    shallow.render(<ChatRow data={{ channel: 'test_channel_123', message: 'hello world', userstate: {} }} />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.type).toBe('li');
  });
  test('', () => {
    const shallow = shallowRenderer.createRenderer();
    shallow.render(<ChatRow data={{ channel: 'test_channel_456', message: 'hello, world!', userstate: { color: '#112233' } }} />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.props.children[0].props.color).toEqual('#112233');
  });
  test('', () => {
    const shallow = shallowRenderer.createRenderer();
    shallow.render(<ChatRow data={{ channel: 'test_channel_777', message: 'qwerty', userstate: { "user-id": '1234' } }} />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.props.children[0].props.color).not.toEqual('#112233');
  });
  test('', () => {
    const shallow = shallowRenderer.createRenderer();
    shallow.render(<ChatRow data={{ channel: 'test_channel_456', message: 'hello, world!', userstate: { color: '#112233', "user-id": '1234' } }} />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.props.children[0].props.color).toEqual('#112233');
  });
})