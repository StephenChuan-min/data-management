import React, {Component} from 'react';
import LeftWrapper from './left-wrapper';
import RightWrapper from './right-wrapper';

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 司法拍卖数据监控-其他指标监控
 */
class GrabSituation extends Component {
    render() {
        return (
            <div className="otherIndicator">
                <LeftWrapper />
                <RightWrapper />
            </div>
        );
    }
}

export default GrabSituation;