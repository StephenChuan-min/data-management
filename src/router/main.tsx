import React, {Component} from 'react';
import {Route, Link} from "react-router-dom";
import { Menu } from 'antd';
import DevelopmentAbnormal from '../main/abnormalMonitoring/developmentAbnormal';
import AddedMapping from '../main/abnormalMonitoring/addedMapping';
import GrabSituation from '../main/judicialAuction/grabSituation';
import OtherIndicator from '../main/judicialAuction/otherIndicator';
import './style.scss';
const { SubMenu } = Menu;

class Side extends Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div className="yc-main-side">
            <Menu
                defaultOpenKeys={['sub1', 'sub2']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                                    <span>异常监控</span>
                                </span>
                    }
                >
                    <Menu.Item key="developmentAbnormal">
                        <Link to="/main/abnormalMonitoring/developmentAbnormal">开发异常</Link>
                    </Menu.Item>
                    <Menu.Item key="addedMapping">
                        <Link to="/main/abnormalMonitoring/addedMapping">新增映射值</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <span>司法拍卖数据监控</span>
                        </span>
                    }
                >
                    <Menu.Item key="grabSituation">
                        <Link to="/main/judicialAuction/grabSituation">抓取情况监控</Link>
                        </Menu.Item>
                    <Menu.Item key="otherIndicator">
                        <Link to="/main/judicialAuction/otherIndicator">其他指标监控</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>;
    }
}

const MainContent = [
    <Route path="/main" component={Side} />,
    <Route path="/main/abnormalMonitoring/developmentAbnormal" component={DevelopmentAbnormal} />,
    <Route path="/main/abnormalMonitoring/addedMapping" component={AddedMapping} />,
    <Route path="/main/judicialAuction/grabSituation" component={GrabSituation} />,
    <Route path="/main/judicialAuction/otherIndicator" component={OtherIndicator} />,
]


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