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