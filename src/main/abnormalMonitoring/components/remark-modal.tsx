import React from "react";
import { Input } from 'antd';
import { ClickType } from '../developmentAbnormal';

interface Props {
    type: string, //弹窗类型
    getValue(val: any): void // 获取编辑的值
    value?: string, // 编辑时需传递的值
}

function Remark(props: Props) {

    const handleChange = (e: any) => {
        e.persist()
        props.getValue(e.target.value)
    }
    return (
        <div>
            {props.type === ClickType.check ?
                <div>{
                    props.value
                }</div> :
                <Input.TextArea rows={8} onChange={handleChange} />}
        </div>
    )
}

export default Remark;