import React, { useState, useEffect } from 'react';
import {Button, Input} from 'antd';
import { connect } from 'react-redux';
import {addUser} from "../../store/action";
import { inputTarget } from '../../common/schemas';

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 异常监控-开发异常
*/

interface Props {
    userName: string,
    setUserName: (a: string) => void,
    history: any,
}

function DevelopmentAbnormal(props: Props) {

    const [inputValue, setValue] = useState('')
    const [a, setA] = useState(true)

    useEffect(() => {
        console.log('加载完成')
    })

    useEffect(() => {
        console.log('发起请求')
    }, [a])

    const setName = ():void => {
        const { setUserName, userName } = props;
        // 路由跳转方式
        // history.push({
        //     pathname: '/main/abnormalMonitoring/addedMapping',
        //     params: {a: 9898}
        // })
        if (inputValue !== userName) {
            setA(!a)
            setUserName(inputValue)
        }
    }

    const handleChange = (val: inputTarget):void => {
        setValue(
            val.target.value
        )
    };

        const { userName } = props;
        return (
            <div>
                开发异常
                <div>
                    hi，{userName}
                </div>
                <div>
                    <Input placeholder="请输入用户名" value={inputValue} onChange={(val: any) => handleChange(val)} />
                    <Button onClick={setName}>
                        更换用户名
                    </Button>
                </div>

            </div>
        );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserName: (name: string) => {
            dispatch(addUser(name))
        },
    }
}


export default connect(
    (state: any ) => ({ userName: state.user.userName }),
    mapDispatchToProps,
)(DevelopmentAbnormal);