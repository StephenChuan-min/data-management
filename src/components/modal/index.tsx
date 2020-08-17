import React, {useEffect, useState} from "react";
import { Modal } from 'antd';
import './style.scss'

interface Props {
    visible: boolean, // 显隐状态
    title: string,
    children: any,
    okButtonProps?: object,
    cancelButtonProps?: object,
    okText?: string,
    okType?: string,
    cancelText?: string,
    maskClosable?: boolean,
    onOk?(): void,
    onCancel?(): void,
}

function RemarkModal(props: Props) {

    const [visible, setVisible] = useState(props.visible);

    useEffect(() => {
        setVisible(true)
    }, [props.visible]);

    useEffect(() => {
        setVisible(false)
    }, [])


    const handleOk = () => {
        if (props.onOk) {
            props.onOk()
        }
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }


    return (
        <Modal
            okText={props.okText}
            cancelText={props.cancelText}
            okButtonProps={props.okButtonProps}
            cancelButtonProps={props.cancelButtonProps}
            title={props.title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {props.children}
        </Modal>
    )
}

export default RemarkModal;