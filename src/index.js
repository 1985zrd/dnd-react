import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/style/common.scss'

import { StoreContext } from 'redux-react-hook';
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from 'store'

import App from './App';
import * as serviceWorker from './serviceWorker';

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <ConfigProvider locale={zhCN}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </ConfigProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
