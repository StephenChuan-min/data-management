import React, {useEffect, useState} from "react";
import { labelValue } from '../../../common/schemas';
import {Select} from "antd";
import './style.scss';
import {clearParams, getDataTypeList, setFresh} from "../../../store/action";
import {connect} from "react-redux";
import { CaretDownOutlined } from '@ant-design/icons';

/**
 * @author czq
 * @date 2020/8/11
 * @Description: 异常监控-顶层浮动栏
*/

interface Props {
    getValue(val: number): void,
    getDataTypeList(): void,
    storeOption: [], // store中的下拉选项
    paramsKey: number, // store中的key
    clearParams(key: number): void,
    setFresh(bol: boolean): void,
    option?: labelValue[], // 下拉选项
}

function TopSelect(props: Props) {

    const [type, setType] = useState(0);

    const selfOption = props.option || props.storeOption || []; // 本地下拉选项 优先外部传进的option

    useEffect(() => {
        props.getDataTypeList()
    }, []);

    const handleChange = (val: number):void => {
        setType(val);
        props.clearParams(props.paramsKey + 1);
        props.setFresh(true);
        props.getValue(val)
    }

    return (<div className="abnormal-monitoring-top-select">
            <p className="label">
                <i className="iconfont iconshujuleixing"/>
                当前的数据类型：
            </p>
            <Select
                suffixIcon={<CaretDownOutlined />}
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
        getDataTypeList: () => {
            dispatch(getDataTypeList())
        },
        setFresh: (is: boolean) => {
            dispatch(setFresh(is))
        },
        clearParams: (key?: number) => {
            dispatch(clearParams(key))
        },
    }
}

export default connect((state: any) => ({dataTypeList: state.dataTypeList, storeOption: state.dataTypeList, paramsKey: state.params.key }),
    () => mapDispatchToProps
)(TopSelect);