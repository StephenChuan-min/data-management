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
}

export interface Props extends commonProps{
    type: typeEnum,
    placeholder?: string,
    field: string,
    option?: labelValue[],
    defaultValue? : string | number,
}

export interface Props1 extends commonProps{
    type: typeEnum1,
    field: string[],
    placeholder?: string[],
    conjunctions?: string,
    defaultValue? : (string | number)[],
}