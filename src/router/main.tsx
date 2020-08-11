import React, {Component} from 'react';
import {Route} from "react-router-dom";
import DevelopmentAbnormal from '../main/abnormalMonitoring/developmentAbnormal';
import AddedMapping from '../main/abnormalMonitoring/addedMapping';
import GrabSituation from '../main/judicialAuction/grabSituation';
import OtherIndicator from '../main/judicialAuction/otherIndicator';
import './style.scss';
import Side from '../components/side/index';
import { getRouter } from './router-with-role-fun';
import Header from "../components/header";

const sideList = [
    {
        subMenu: '异常监控',
        role: true,
        icon: 'iconyichangjiankong',
        children: [
            {
                path: '/main/abnormalMonitoring/developmentAbnormal',
                name: '开发异常',
                role: true,
                component: DevelopmentAbnormal,
            },
            {
                path: '/main/abnormalMonitoring/addedMapping',
                name: '新增映射值',
                role: true,
                component: AddedMapping,
            },
        ]
    },
    {
        subMenu: '司法拍卖数据监控',
        role: true,
        icon: 'iconsifapaimaishujujiankong',
        children: [
            {
                path: '/main/judicialAuction/grabSituation',
                name: '抓取情况监控',
                role: true,
                component: GrabSituation,
            },
            {
                path: '/main/judicialAuction/otherIndicator',
                name: '其他指标监控',
                role: true,
                component: OtherIndicator,
            },
        ]
    },
];

class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/main" component={(props: any) => <Header {...props} sideList={sideList} header="/main" />}  />
                <Route path="/main" component={(props: any) => <Side {...props} sideList={sideList} header="/main" />}  />
                {
                    getRouter(sideList)
                }
            </React.Fragment>
        );
    }
}

export default Main;