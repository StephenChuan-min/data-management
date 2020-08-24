import React from 'react';
import { Select, Input, DatePicker } from 'antd';
import { labelValue, inputTarget } from '../../../common/schemas';
import store from "../../../store/store";
import { setParams } from "../../../store/action";
import { formatType } from '../../../utils/some-time-utils';
import {Moment} from "moment";
import { CaretDownOutlined } from '@ant-design/icons';
import locale from 'antd/lib/date-picker/locale/zh_CN';


/**
 * @author czq
 * @date 2020/8/10
 * @Description: 搜索栏，搜索条件类型
*/

interface commonProps {
    field: string,
    placeholder?: string,
    className?: string,
    allowClear?: boolean,
    onChange?(val: object):void,
}

interface selectProps extends commonProps{
    option?: labelValue[],
    defaultValue?: string | number,
}

interface datePickProps extends commonProps{
    timeDefault?: Moment,
    disabledDate?(c: Moment): boolean,
}

interface rangePickerProps{
    field: string[],
    placeholder?: string[],
    conjunctions?: string,
    allowClear?: boolean,
    defaultValue?: Moment[],
    onChange?(val: object):void,
}

function handleChange(props: {val: any, field: string }, isTrim: boolean = false) {
    store.dispatch(setParams({ [props.field]: isTrim ? props.val.trim() : props.val }))
}

const typeMap = {
    select: (props: selectProps) => {
        return <Select
            suffixIcon={<CaretDownOutlined />}
            allowClear={props.allowClear !== undefined ? props.allowClear : true}
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
            if (props.onChange) {
                props.onChange({[props.field]: val})
            }
            handleChange({val: val.target.value, field: props.field}, true)
        }}
    />),
    datepicker: (props: datePickProps) => <DatePicker
        locale={locale}
        allowClear={props.allowClear !== undefined ? props.allowClear : true}
        defaultValue={props.timeDefault}
        getPopupContainer={(t) => t}
        disabledDate={props.disabledDate}
        onChange={(val) => {
            let time = undefined
            if (val) {
                time = val.format(formatType)
            }
            if (props.onChange) {
                props.onChange({[props.field]: time})
            }
            handleChange({val: time, field: props.field})
        }}
        placeholder={props.placeholder || '请选择'}
    />,
    rangePicker: (props: rangePickerProps) => <React.Fragment>
        <DatePicker
            locale={locale}
            disabledDate={(c) => {
                return c.unix() >= new Date(store.getState().params[props.field[1]]).getTime() / 1000
            }}
            getPopupContainer={t => t }
            allowClear={props.allowClear !== undefined ? props.allowClear : true}
            placeholder={props.placeholder ? props.placeholder[0] : '请选择开始时间'}
            defaultValue={props.defaultValue ? props.defaultValue[0] : undefined}
            onChange={(val) => {
                let time = undefined
                if (val) {
                    time = val.format(formatType)
                }
                if (props.onChange) {
                    props.onChange({[props.field[0]]: time})
                }
                handleChange({val: time, field: props.field[0]})
            }}
        />
        <span className="conjunctions">{props.conjunctions || '至'}</span>
        <DatePicker
            locale={locale}
            allowClear={props.allowClear !== undefined ? props.allowClear : true}
            placeholder={props.placeholder ? props.placeholder[1] : '请选择结束时间'}
            defaultValue={props.defaultValue ? props.defaultValue[1] : undefined}
            getPopupContainer={t => t}
            disabledDate={(c) => {
                return c.unix() <= new Date(store.getState().params[props.field[0]]).getTime() / 1000
            }}
            onChange={(val) => {
                let time = undefined
                if (val) {
                    time = val.format(formatType)
                }
                if (props.onChange) {
                    props.onChange({[props.field[1]]: time})
                }
                handleChange({val: time, field: props.field[1]})
            }}
        />
    </React.Fragment>
}


export default typeMap;