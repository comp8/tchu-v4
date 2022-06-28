import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Badges } from "."
import { BadgeSets } from '../../TwitchApi';


describe('Badges', () => {

  let mockUseContext: ReturnType<typeof jest.fn>;
  let realUseContext: typeof React.useContext;

  beforeEach(() => {
    realUseContext = React.useContext;
    mockUseContext = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  })

  test('', () => {
    const comp = renderer.create(<Badges badges={{}} />);
    expect(comp.toJSON()).toMatchSnapshot();
  });

  test('', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Badges badges={{ subscriber: '6', testBadge: '1', otherBadge: '2' }} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
    expect(result.props.children.length).toBe(3);
  });
})