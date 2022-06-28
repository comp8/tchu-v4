import React from 'react';
import shallowRenderer from 'react-test-renderer/shallow';
import ChatMessage from '.';

describe('ChatMessage', () => {

  test('', () => {
    const shallow = shallowRenderer.createRenderer();

    shallow.render(<ChatMessage emotes={{ invalidRangeTest: ['0-3'] }} message='' />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  test('', () => {
    const shallow = shallowRenderer.createRenderer();

    shallow.render(<ChatMessage emotes={{ testID: ['0-3', '5-8'] }} message='test test' />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.props.children.length).toBe(3);
  });

  test('', () => {
    const shallow = shallowRenderer.createRenderer();

    shallow.render(<ChatMessage emotes={{ testID: ['5-8', '24-27'], otherID: ['10-14', '29-33'] }} message='msg1 test other message test other msg' />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.props.children.length).toBe(9);
  });

  test('unsorted emotes', () => {
    const shallow = shallowRenderer.createRenderer();

    shallow.render(<ChatMessage emotes={{ testID: ['24-27', '5-8'], otherID: ['10-14', '29-33'] }} message='msg1 test other message test other msg' />);
    let result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.props.children.length).toBe(9);
  });

});