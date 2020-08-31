import React from 'react';
import './style.scss';
import { Dropdown, Menu } from 'antd';
import { connect} from "react-redux";
import { CaretDownOutlined } from '@ant-design/icons';
import api from '../../api/login';
import { message } from 'antd';
import {handleLocal} from "../../utils/localStorage";

interface Props {
    userName: string,
    history: { pathname: string }[]
}

function Header(props: Props) {
    const { userName, history } = props;

    const handleLogOut = () => {
        api.apiLogout().then((res) => {
            if (res.code === 200) {
                handleLocal('token', '')
                history.push({pathname: '/'});
                message.success('退出成功')
            } else {
                message.error(res.message)
            }
        }).finally(() => {})
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <div style={{ padding: '0 33px' }} onClick={handleLogOut}>退出登录</div>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="yc-header">
            <i className="iconfont icondaohang-logo" />
            <span className="title">源诚数据管理平台</span>
            <div className="header-user-name">
                <Dropdown overlay={menu} placement="bottomCenter" getPopupContainer={t => t}>
                    <div style={{ textAlign: 'center' }}>
                        <span>
                            {` hi，${userName} `}<CaretDownOutlined />
                        </span>
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}




export default connect(
    (state: any) => ({userName: state.user.userName})
)(Header)