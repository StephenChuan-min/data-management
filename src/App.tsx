import React from 'react';
import './App.css';
import Router from './router/index';
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';

function App() {

  return (
      <ConfigProvider locale={zhCN}>
        <div className="App">
            <Router />
        </div>
      </ConfigProvider>
  );
}

export default App;
