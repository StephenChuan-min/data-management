import {labelValue} from "../../common/schemas";
import {Moment} from "moment";

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
    allowClear?: boolean,
}

export interface Props extends commonProps{
    type: typeEnum,
    placeholder?: string,
    field: string,
    option?: labelValue[],
    timeDefault?: Moment,
    defaultValue?: string | number,
    disabledDate?(c: Moment): boolean,
}

export interface Props1 extends commonProps{
    type: typeEnum1,
    field: string[],
    placeholder?: string[],
    conjunctions?: string,
    defaultValue? : Moment[],
}