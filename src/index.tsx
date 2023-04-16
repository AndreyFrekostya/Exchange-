import React from 'react';
import ReactDOM from 'react-dom/client';
import './null styles.css';
import './global styles.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, {persistor} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//if we need a loader for loading storage? then set loading in <PersistGate/> to <Loader/>
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

