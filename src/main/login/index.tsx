import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import { connect } from 'react-redux';
import { addUser, setToken } from '../../store/action';
import loginLog from '../../assets/img/logo.png';
import loginCenter from '../../assets/img/login-center.png';
import './style.scss';
import api from '../../api/login';
import rsaEncrypt from '../../api/encryp';

interface Props {
    setUserName: any,
    setToken: any,
    history: {pathname: string}[],
    form: any,
    userName?: string,
}

enum statusEnum {
    error= 'error',
    success = 'success',
    warning = 'warning',
    validating = 'validating',
    init = '',
}

enum Type {
    user,
    password,
}

function Index(props: Props) {
    const { setToken, setUserName, history } = props;
    const [form] = Form.useForm();
    const { getFieldValue } = form;

    const [loading, setLoading] = useState(false)
    const [userStatus, setUserStatus] = useState(statusEnum.init); // 账号校验状态
    const [passwordStatus, setPasswordStatus] = useState(statusEnum.init); // 密码校验状态
    const [help1, setHelp1] = useState(''); // 账号校验信息
    const [help2, setHelp2] = useState(''); // 密码校验信息

    const handleSuccess = (val: { nickName: string, passWord: string, token: string }) => {
        setUserName(val.nickName);
        setToken(val.token);
        history.push({pathname: '/main'});
    };

    const handleChange = (e: any, type: Type) => {
        let status: statusEnum;
        if (e.target.value) {
            status = statusEnum.init;
            if (type === Type.user) {
                setHelp1('');
            } else {
                setHelp2('');
            }
        } else {
            status = statusEnum.error
            if (type === Type.user) {
                setHelp1('请输入账号');
            } else {
                setHelp2('请输入密码');
            }
        }
        if (type === Type.user) {

            const reg = new RegExp(/\D/)
            if (reg.test(e.target.value)) {
                setUserStatus(statusEnum.error);
                setHelp1('请勿输入非数字的内容')
            } else {
                setUserStatus(status);
            }
        }
        if (type === Type.password) {
            const reg = new RegExp(/\s|[\u4e00-\u9fa5]/)
            if (reg.test(e.target.value)) {
                setPasswordStatus(statusEnum.error);
                setHelp2('请勿输入空格或中文')
            } else {
                setPasswordStatus(status);
            }

        }
    }

    const onFinish = (values: any) => {
        let params = { ...values }
        if (userStatus !== statusEnum.init || passwordStatus !== statusEnum.init) {
            return
        }
        params.password = rsaEncrypt(params.password);
        setLoading(true);
        api.apiLogin(params).then((res: any) => {
            setLoading(false);
            if (res.code === 200) {
                handleSuccess(res.data)
            } else {
                // setUserStatus(statusEnum.error);
                // setPasswordStatus(statusEnum.error);
                // setHelp1(res.message)
                // setHelp2(res.message)
                message.error(res.message)
            }
        }).catch(() => {
            setLoading(false);
        })
        // handleClick(values)
    }
    return (
            <div className="yc-login">
                <div className="login-header">
                    <img alt="源诚科技" className="login-header-logo" src={loginLog} />
                </div>
                <div className="login-center">
                    <div className="login-center-img-wrapper">
                        <img alt="数据管理平台" src={loginCenter} />
                    </div>
                    <div className="login-center-form-wrapper">
                        <div className="login-center-form-wrapper_title">用户登录</div>
                        <Form
                            form={form}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="userName"
                                validateStatus={userStatus}
                                help={help1 || undefined}
                                rules={[
                                    { required: true, message: '请输入账号' }
                                    ]}
                            >
                                <Input
                                    maxLength={11}
                                    onChange={(val:any) => handleChange(val, Type.user)}
                                    prefix={<i className="iconfont iconzhanghao" />}
                                    placeholder="请输入11位账号"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                validateStatus={passwordStatus}
                                help={help2 || undefined}
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password
                                    maxLength={20}
                                    onChange={(val:any) => handleChange(val, Type.password)}
                                    prefix={<i className="iconfont iconmima" />}
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
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