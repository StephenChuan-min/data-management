import React, {Component} from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class Index extends Component {
    render() {
        return (
            <div>
                login
                <Button>
                    <Link to="/main">登录</Link>
                </Button>
            </div>
        );
    }
}

export default Index;