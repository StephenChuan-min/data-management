import React, {Component} from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser, setToken } from '../../store/action';

interface Props {
    userName?: string,
    setUserName: any,
    setToken: any,
}

class Index extends Component<Props, {}> {

    handleClick: () => void = () => {
        const { setUserName, setToken } = this.props;
        setUserName('this is name');
        setToken('this is token');
    };

    render() {
        const { userName } = this.props;
        return (
            <div>
                login{userName}
                <Button onClick={this.handleClick}>
                    <Link to="/main">登录</Link>
                </Button>
            </div>
        );
    }
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