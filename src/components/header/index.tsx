import React from 'react';
import './style.scss';
import { Dropdown, Menu } from 'antd';
import { connect} from "react-redux";
import { CaretDownOutlined } from '@ant-design/icons';

interface Props {
    userName: string
}

function Header(props: Props) {
    const { userName } = props
    const menu = (
        <Menu>
            <Menu.Item>
                <div style={{ padding: '0 33px' }}>退出登录</div>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="yc-header">
            <i className="iconfont icondaohang-logo" />
            <span className="title">源诚数据管理平台</span>
            <div className="header-user-name">
                <Dropdown overlay={menu} placement="bottomCenter">
                    <div style={{ textAlign: 'center' }}>hi，{userName} <CaretDownOutlined /></div>
                </Dropdown>
            </div>
        </div>
    )
}




export default connect(
    (state: any) => ({userName: state.user.userName})
)(Header)