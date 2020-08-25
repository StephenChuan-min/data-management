import React, {useEffect, useState} from "react";
import { Modal, Button } from 'antd';
import './style.scss'

interface Props {
    visible: boolean | number, // 显隐状态
    title: string,
    children: any,
    loading?: boolean,
    okButtonProps?: object,
    cancelButtonProps?: object,
    okText?: any,
    okType?: string,
    cancelText?: string,
    maskClosable?: boolean,
    onOk?(callback: () => void): void,
    onCancel?(): void,
    className?: string,
    okStyle?: {},
}

function RemarkModal(props: Props) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true)
    }, [props.visible]);

    useEffect(() => {
        setVisible(false)
    }, [])


    const handleOk = () => {
        if (props.onOk) {
            props.onOk(() => {
                setVisible(false)
            })
        } else {
            setVisible(false)
        }
    }

    const handleCancel = () => {
        setVisible(false)
    }


    return (
        <Modal
            className={props.className}
            title={props.title}
            visible={visible}
            onCancel={handleCancel}
            closeIcon={<i className="iconfont iconclose" />}
            footer={<>
                {props.cancelText && <Button className="cancel-btn" key="back" {...props.cancelButtonProps} onClick={handleCancel}>
                    {props.cancelText}
                </Button>}
                {props.okText && <Button key="submit" {...props.okButtonProps} type="primary" loading={props.loading} onClick={handleOk}>
                    {props.okText}
                </Button>}
            </>}
        >
            {props.children}
        </Modal>
    )
}

export default RemarkModal;