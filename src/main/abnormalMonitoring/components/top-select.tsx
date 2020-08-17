import React, {useEffect, useState} from "react";
import { labelValue } from '../../../common/schemas';
import {Select} from "antd";
import './style.scss';
import api from '../../../api/developmentAbnormal'
import { message } from 'antd';
import {setDataTypeList} from "../../../store/action";
import {connect} from "react-redux";

/**
 * @author czq
 * @date 2020/8/11
 * @Description: 异常监控-顶层浮动栏
*/

interface Props {
    getValue(val: number): void,
    setDataTypeList(list: []): void,
    option?: labelValue[], // 下拉选项
}

function TopSelect(props: Props) {

    const [type, setType] = useState(0);

    const [selfOption, setSelfOption] = useState(props.option || []); // 本地下来下拉选项 优先外部传进的option

    useEffect(() => {
        const fun = () => {
            api.apiGetDataTypeList().then((res) => {
                if (res.code === 200) {
                    const val = res.data.map((v: any) => ({ value: v.id, label: v.typeName }));
                    if (val[0]) {
                        props.getValue(val[0].value)
                    }
                    setSelfOption(val)
                    props.setDataTypeList(val)
                } else {
                    message.error(res.message)
                }
            }).finally(() => {})
        }
        // 没有传进option时调用
        if (!props.option) {
            fun()
        }
    }, [])

    const handleChange = (val: number):void => {
        setType(val);
        props.getValue(val)
    }

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
                    selfOption.map(v => {
                        return <Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>
                    })
                }
            </Select>
    </div>)
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setDataTypeList: (list: []) => {
            dispatch(setDataTypeList(list))
        },
    }
}

export default connect(() => ({}),
    () => mapDispatchToProps
)(TopSelect);