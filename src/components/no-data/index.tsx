import React from "react";
import noData from '../../assets/img/nodata@2x.png'
import './style.scss';

function NoData(props: { height?: number }) {
    return (
        <div className="yc-no-data" style={{ height: props.height }}>
            <img src={noData} />
            <p className="">暂无数据</p>
        </div>
    )
}

export default NoData