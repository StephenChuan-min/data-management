import React from "react";

/**
 * @author czq
 * @date 2020/8/6
 * @Description: 通用接口存放
*/
export interface inputTarget {
    target: {
        value: string
    }
}
// 列表公共分页参数
export interface Table {
    page: number,
    num: number,
}

export interface labelValue {
    value: string | number,
    label: string,
}

// btn Type
export enum BtnType {
    primary = "primary",
    link = "link",
    text = 'text',
    ghost = 'ghost',
    default = "default",
    dashed = "dashed"
}

export interface Columns {
    title: string,
    dataIndex?: string,
    key: string,
    render?(text: any, r: object): any,
}

// 图表数据类型枚举
export enum TimeType {
    day = 1,
    week,
    month,
}