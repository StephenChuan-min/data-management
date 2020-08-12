import React from 'react';
import { Select, Input, DatePicker } from 'antd';
import { labelValue } from '../../../common/schemas';
import store from "../../../store/store";
import { setParams } from "../../../store/action";

/**
 * @author czq
 * @date 2020/8/10
 * @Description: 搜索栏，搜索条件类型
*/

interface commonProps {
    field: string,
    placeholder?: string,
    className?: string,
}

interface selectProps extends commonProps{
    option?: labelValue[],
    onChange?(val: object):void,
}

interface rangePickerProps{
    placeholder?: string[],
    conjunctions?: string,
}

function handleChange(props: {val: any, field: string }) {
    store.dispatch(setParams({ [props.field]: props.val }))
}

const typeMap = {
    select: (props: selectProps) => {
        return <Select
            placeholder={props.placeholder || '请选择'}
            className={`yc-search-select ${props.className}`}
            getPopupContainer={(t) => t.parentNode}
            onChange={(val) => {
                if (props.onChange) {
                    props.onChange({[props.field]: val})
                }
                handleChange({val, field: props.field})
            }}
        >
        {props.option ? props.option.map(v => (
                <Select.Option value={v.value}>{v.label}</Select.Option>
            )) : null}
        </Select>

    },
    input: (props: commonProps) => (<Input placeholder={props.placeholder || '请输入'} />),
    datepicker: (props: commonProps) => <DatePicker
        getPopupContainer={(t) => t}
        placeholder={props.placeholder || '请选择'}
    />,
    rangePicker: (props: rangePickerProps) => <React.Fragment>
        <DatePicker placeholder={props.placeholder ? props.placeholder[0] : '请选择开始时间'} />
        <span className="conjunctions">{props.conjunctions || '至'}</span>
        <DatePicker placeholder={props.placeholder ? props.placeholder[1] : '请选择结束时间'} />
    </React.Fragment>
}


export default typeMap;