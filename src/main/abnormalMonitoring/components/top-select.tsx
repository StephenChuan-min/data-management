import React, {useState} from "react";
import { labelValue } from '../../../common/schemas';
import {Select} from "antd";
import './style.scss';

/**
 * @author czq
 * @date 2020/8/11
 * @Description: 异常监控-顶层浮动栏
*/

interface Props {
    option: labelValue[], // 下来选项
    getValue(val: number): void,
}

function TopSelect(props: Props) {

    const [type, setType] = useState(0);

    const handleChange = (val: number):void => {
        setType(val);
        props.getValue(val)
    }

    const { option } = props
    return (<div className="abnormal-monitoring-top-select">
            <p className="label">
                <i className="iconfont iconshujuleixing"/>
                当前的数据类型：
            </p>
            <Select
                value={type}
                getPopupContainer={(t) => t.parentNode}
                onChange={handleChange}
            >
                {
                    option.map(v => {
                        return <Select.Option value={v.value}>{v.label}</Select.Option>
                    })
                }
            </Select>
    </div>)
}

export default TopSelect;