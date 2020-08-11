import {labelValue} from "../../common/schemas";

export enum typeEnum {
    select = 'select',
    input = 'input',
    datepicker = 'datepicker',
}

export enum typeEnum1 {
    rangePicker = 'rangePicker',
}

interface commonProps {
    label: string,
    field: string,
}

export interface Props extends commonProps{
    type: typeEnum,
    placeholder?: string,
    option?: labelValue[],
}

export interface Props1 extends commonProps{
    type: typeEnum1,
    placeholder?: string[],
    conjunctions?: string
}