import React from "react";
import noData from '../../assets/img/nodata@2x.png'
import './style.scss';

function NoData(props: { height?: number }) {
    return (
        <div className="yc-no-data" style={{ height: props.height }}>
            <img alt="无数据" src={noData} style={{ marginTop: props.height ? props.height / 2 - 90 : 0 }} />
            <p className="">暂无数据</p>
        </div>
    )
}

export default NoData