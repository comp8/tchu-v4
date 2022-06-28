import React from 'react';
import { act, create } from 'react-test-renderer';

import InputForm from '.';

describe('', () => {

  let items: string[] = [];
  const onChange = (changes: string[]) => { items = changes };

  beforeEach(() => {
    items = [];
  });

  test('', () => {
    const elem = create(<InputForm items={items} onChange={onChange} />);
    elem.root.props.onChange(['asdf', 'qwer']);
    expect(items.length).toBe(2);
    expect(items[1]).toBe('qwer');
  });

  test('', () => {
    const elem = create(<InputForm items={items} onChange={onChange} />);

    elem.root.props.onChange(['asdf', 'qwer']);
    expect(elem).toMatchSnapshot();

    elem.update(<InputForm items={items} onChange={onChange} />);
    expect(elem).toMatchSnapshot();
  });
})