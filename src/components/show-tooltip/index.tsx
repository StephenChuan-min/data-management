import React, {useEffect, useRef, useState} from "react";
import { Tooltip } from 'antd';
import './styles.scss';

/**
 * @author czq
 * @date 2020/8/31
 * @Description: 超出部分省略并提示
*/

interface Props {
    children: string | JSX.Element | Element
}

function ShowTooltip(props: Props) {
    const ref: { current: any } = useRef(null);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        if (ref.current !== null) {
            const { parentNode } = ref.current;
            // 当父元素宽度大于子元素宽度不显示tooltip 否则显示
            if (parentNode.clientWidth >= ref.current.clientWidth) {
                setIsOver(false)
            } else {
                setIsOver(true)
            }
        }
    }, [])

    return (
        isOver ? <Tooltip title={props.children}>
            <span className="show-tooltip-content">{props.children}</span>
        </Tooltip>
            :
            <span style={{ display: 'inline-block' }} ref={ref}>
                {props.children}
            </span>
    )
}

export default ShowTooltip;