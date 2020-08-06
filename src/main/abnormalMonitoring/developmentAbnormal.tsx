import React, {Component} from 'react';
import {Button, Input} from 'antd';
import { connect } from 'react-redux';
import {addUser} from "../../store/action";

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 异常监控-开发异常
*/

interface Props {
    userName: string,
    setUserName: (a: string) => void,
}

interface State {
    inputValue: string,
}

class DevelopmentAbnormal extends Component<Props, State> {

    state: State = {
        inputValue: ''
    };

    setName():void{
        const { setUserName, userName } = this.props;
        const { inputValue } = this.state;
        if (inputValue !== userName) {
            setUserName(inputValue)
        }
    }

    handleChange(val: any):void {
        this.setState({
            inputValue: val.target.value
        })
    };

    render() {
        const { userName } = this.props;
        const { inputValue } = this.state
        return (
            <div>
                开发异常
                <div>
                    hi，{userName}
                </div>
                <div>
                    <Input placeholder="请输入用户名" value={inputValue} onChange={(val: any) => this.handleChange(val)} />
                    <Button onClick={this.setName.bind(this)}>
                        更换用户名
                    </Button>
                </div>

            </div>
        );
    }
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