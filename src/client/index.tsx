import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { configureStore } from '../shared/store';
import App from '../shared/App';
import IntlProvider from '../shared/i18n/IntlProvider';
import createHistory from '../shared/store/history';

const history = createHistory();

// Create/use the store
// history MUST be passed here if you want syncing between server on initial route
const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__,
  });

if (!window.store) {
  window.store = store;
}

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <IntlProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </IntlProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
