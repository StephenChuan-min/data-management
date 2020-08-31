import React from 'react';
import {Route} from "react-router-dom";
import OtherIndicator from '../main/judicialAuction/otherIndicator';
import GrabSituation from '../main/judicialAuction/gra-situation';
import DevelopmentAbnormal from '../main/abnormal-monitoring/development-abnormal';
import AddedMapping from '../main/abnormal-monitoring/added-mapping';
import './style.scss';
import Side from '../components/side/index';
import GetRouter from './router-with-role-fun';
import Header from "../components/header";

const sideList = [
    {
        subMenu: '异常监控',
        role: true,
        icon: 'iconyichangjiankong',
        children: [
            {
                path: '/main/abnormal-monitoring/developmentAbnormal',
                name: '开发异常',
                role: true,
                component: (props: any) => <DevelopmentAbnormal {...props} />,
            },
            {
                path: '/main/abnormal-monitoring/addedMapping',
                name: '新增映射值',
                role: true,
                component: (props: any) => <AddedMapping {...props} />,
            },
        ]
    },
    {
        subMenu: '司法拍卖数据监控',
        role: true,
        icon: 'iconsifapaimaishujujiankong',
        children: [
            {
                path: '/main/judicialAuction/gra-situation',
                name: '抓取情况监控',
                role: true,
                component: (props: any) => <GrabSituation {...props} />,
            },
            {
                path: '/main/judicialAuction/otherIndicator',
                name: '其他指标监控',
                role: true,
                component:  (props: any) => <OtherIndicator {...props} />,
            },
        ]
    },
];

function Main() {
    return <>
        <Route path="/main" component={(props: any) => <Header {...props} sideList={sideList} header="/main" />}  />
        <Route path="/main" component={(props: any) => <Side {...props} sideList={sideList} header="/main" />}  />
        {GetRouter(sideList)}
        </>
}

export default Main;