import React from 'react';
import { create } from 'react-test-renderer';
import { render, screen,  } from '@testing-library/react';

import InputText from '.';

let changedValue: string;
const onChange = (v: string) => { changedValue = v; };

beforeEach(() => {
  changedValue = '';
});

describe('', () => {
  test('', () => {
    const props = {
      isEditable: true,
      value: 'test string',
      label: 'no.1',
      className: 'cls-name',
      onChange: onChange,
    };

    let elem = create(<InputText {...props} />);
    expect(elem).toMatchSnapshot();

    props.isEditable = false;
    elem.update(<InputText {...props} />);
    expect(elem).toMatchSnapshot();
  });

  test('', () => {
    const props = {
      isEditable: true,
      value: 'test string',
      label: 'no.1',
      className: 'cls-name',
      onChange: onChange,
    };

    render(<InputText {...props} />);
    expect(screen.getByDisplayValue('test string').tagName).toBe('INPUT');
  });
  
  test('', () => {
    const props = {
      isEditable: false,
      value: 'test string',
      label: 'no.1',
      className: 'cls-name',
      onChange: onChange,
    };

    render(<InputText {...props} />);
    expect(screen.getByText('test string').tagName).not.toBe('INPUT');
  });
})