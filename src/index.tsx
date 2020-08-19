import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./store/store";
import './assets/css/public.scss';
// import 'default-passive-events'; // chrome 优化时间监听，使滑动更平滑
import 'moment';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route path={'/'} component={App} />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
