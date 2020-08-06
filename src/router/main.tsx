import React, {Component} from 'react';
import {Route} from "react-router-dom";
import DevelopmentAbnormal from '../main/abnormalMonitoring/developmentAbnormal';
import AddedMapping from '../main/abnormalMonitoring/addedMapping';
import GrabSituation from '../main/judicialAuction/grabSituation';
import OtherIndicator from '../main/judicialAuction/otherIndicator';
import './style.scss';
import Side from '../components/side/index';

const sideList = [
    {
        subMenu: '异常监控',
        children: [
            {
                path: '/main/abnormalMonitoring/developmentAbnormal',
                name: '开发异常',
            },
            {
                path: '/main/abnormalMonitoring/addedMapping',
                name: '新增映射值',
            },
        ]
    },
    {
        subMenu: '司法拍卖数据监控',
        children: [
            {
                path: '/main/judicialAuction/grabSituation',
                name: '抓取情况监控',
            },
            {
                path: '/main/judicialAuction/otherIndicator',
                name: '其他指标监控',
            },
        ]
    },
]

const MainContent = <React.Fragment>
    <Route path="/main" component={(props: any) => <Side {...props} sideList={sideList} />} key="main" />
    <div className="yc-content">
        <Route path="/main/abnormalMonitoring/developmentAbnormal" key="developmentAbnormal" component={DevelopmentAbnormal} />
        <Route path="/main/abnormalMonitoring/addedMapping" key="addedMapping" component={AddedMapping} />
        <Route path="/main/judicialAuction/grabSituation" key="grabSituation" component={GrabSituation} />
        <Route path="/main/judicialAuction/otherIndicator" key="otherIndicator" component={OtherIndicator} />
    </div>
</React.Fragment>


class Main extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    MainContent
                }
            </React.Fragment>
        );
    }
}

export default Main;