import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import store, { RootState, reducers as reducer } from '../../../src/store';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

function renderWithProvider(ui: React.ReactElement, { preloadedState = {}, store = configureStore({ reducer }), ...renderOptions }: ExtendedRenderOptions = {}) {

  function Wrapper({ children }): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';

const ReduxTestRenderer = { render: renderWithProvider };

export default ReduxTestRenderer;