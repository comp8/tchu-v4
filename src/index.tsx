import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeWrapper from "./components/ThemeWrapper";
import App from "./pages/App";
import Auth from "./pages/Auth";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import store from "./store";

import style from './index.css';

import './i18n';

const root = createRoot(
  document.getElementById('app')
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeWrapper className={style.wrapper}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="error" element={<ErrorPage />}>
                <Route path=":name/*" element={<ErrorPage />} />
              </Route>
              <Route path="auth/*" element={<Auth />} />
              <Route path="app" element={<App />} />
              <Route path="app/:channel/*" element={<App />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeWrapper>
    </Provider>
  </React.StrictMode>
);