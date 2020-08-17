import React from 'react';
import { Select, Input, DatePicker } from 'antd';
import { labelValue, inputTarget } from '../../../common/schemas';
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
    defaultValue?: string | number,
}

interface rangePickerProps{
    field: string[],
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
            defaultValue={props.defaultValue}
            onChange={(val) => {
                if (props.onChange) {
                    props.onChange({[props.field]: val})
                }
                handleChange({val, field: props.field})
            }}
        >
        {props.option ? props.option.map(v => (
                <Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>
            )) : null}
        </Select>

    },
    input: (props: commonProps) => (<Input
        placeholder={props.placeholder || '请输入'}
        onChange={(val: inputTarget) => {
            handleChange({val: val.target.value, field: props.field})
        }}
    />),
    datepicker: (props: commonProps) => <DatePicker
        getPopupContainer={(t) => t}
        onChange={(val) => {
            handleChange({val, field: props.field})
        }}
        placeholder={props.placeholder || '请选择'}
    />,
    rangePicker: (props: rangePickerProps) => <React.Fragment>
        <DatePicker
            placeholder={props.placeholder ? props.placeholder[0] : '请选择开始时间'}
            onChange={(val) => {
                handleChange({val, field: props.field[0]})
            }}
        />
        <span className="conjunctions">{props.conjunctions || '至'}</span>
        <DatePicker
            placeholder={props.placeholder ? props.placeholder[1] : '请选择结束时间'}
            onChange={(val) => {
                handleChange({val, field: props.field[1]})
            }}
        />
    </React.Fragment>
}


export default typeMap;