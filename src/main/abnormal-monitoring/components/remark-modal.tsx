import React, {useState} from "react";
import { Input } from 'antd';
import { ClickType } from '../development-abnormal';
import './style.scss';

interface Props {
    type: string, //弹窗类型
    getValue(val: any): void // 获取编辑的值
    value?: string, // 编辑时需传递的值
}

function Remark(props: Props) {

    const [num, setNum] = useState(0)

    const handleChange = (e: any) => {
        e.persist();
        setNum(e.target.value.length)
        props.getValue(e.target.value);
    };


    return (
        <div className="modal-remarks">
            {props.type === ClickType.check ?
                <div>{
                    props.value
                }</div> :
                <div className="input-textarea-wrapper">
                    <Input.TextArea
                        maxLength={160}
                        placeholder="请输入备注"
                        rows={8} onChange={handleChange}
                        defaultValue={props.value}
                    />
                    <span className="num">{`${num}/160`}</span>
                </div>
                }
        </div>
    )
}

export default Remark;