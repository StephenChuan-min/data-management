import React, {Component} from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { addUser, setToken } from '../../store/action';
import loginLog from '../../assets/img/logo.png';
import loginCenter from '../../assets/img/login-center.png';
import './style.scss';
import { UserOutlined } from '@ant-design/icons';

interface Props {
    userName?: string,
    setUserName: any,
    setToken: any,
    history: {pathname: string}[],
}

function Index(props: Props) {
    const { setToken, setUserName, history } = props;

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const handleClick = (val: { userName: string, passWord: string}) => {
        setUserName(val.userName);
        setToken('this is token');
        history.push({pathname: '/main'});
    };

    const onFinish = (values: any) => {
        console.log('formValues', values)
        handleClick(values)
    }
    return (
            <div className="yc-login">
                <div className="login-header">
                    <img className="login-header-logo" src={loginLog} />
                </div>
                <div className="login-center">
                    <div className="login-center-img-wrapper">
                        <img src={loginCenter} />
                    </div>
                    <div className="login-center-form-wrapper">
                        <div className="login-center-form-wrapper_title">用户登录</div>
                        <Form
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="userName"
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="请输入11位账号"
                                />
                            </Form.Item>
                            <Form.Item
                                name="passWord"
                            >
                                <Input.Password
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="login-bottom">
                    <div className="bottom-content-wrapper">
                        <p>
                            <i className="iconfont icondaohang-logo" />
                            杭州源诚科技有限公司  技术支持
                        </p>
                        <p>
                            Copyright © 2017 杭州源诚科技有限公司  备案号：浙ICP备17030014号
                        </p>
                    </div>
                </div>
            </div>
        );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserName: (name: string) => {
            dispatch(addUser(name))
        },
        setToken: (token: string) => {
            dispatch(setToken(token))
        }
    }
}


export default connect(
    (state: any ) => ({ userName: state.user.userName }),
    mapDispatchToProps,
)(Index);