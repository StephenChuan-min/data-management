import React, {useState} from "react";
import LineChart from "../../components/line-chart";
import {getDateArray} from "../../../../utils/some-time-utils";

const option = [{
    value: 0,
    label: '开拍时间（start_time)'
}]

function tooltip(str: string) {
    return (
        {
            formatter: (params: any) => {
                const tipArray:string[] = [];
                let tip = '';
                const timeDetail = '';
                params.map((e: any) => {
                    const index = e.seriesIndex;
                    const name = e.seriesName;
                    const { marker } = e;
                    const reg = new RegExp(/10/g);
                    const reg1 = new RegExp(/5/g);
                    const regMarker = marker.replace(reg, '6').replace(reg1, 8);
                    const { value } = e;
                    let tempName = name;

                    let itemLabel = `${value || value === 0 ? value : '--'}`
                    tipArray[index] = `${regMarker}${tempName}：${itemLabel}`;
                    return e;
                });
                tip += timeDetail;
                tipArray.map((e) => {
                    if (e) {
                        tip = `${tip + e}<br>`;/* 组合所有提示信息 */
                    }
                    return e;
                });
                tip = `${str}<br />${params[0].name}<br>${tip}`;
                return tip;
            }})
}

function series(str: string): {}[] {
    return [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: str,
            symbol: 'emptyCircle',
            showSymbol: false,
            symbolSize: 2,
            smooth: true,
            lineStyle: {
                width: 1,
            },
        },
    ]
}

const initData = getDateArray(31);

function RightOne() {

    const legend = {
        show: false,
        data: ['状态更新异常率'],
    };

    return (
        <div className="right-two">
            <p className="header-title">
                数据更新情况监控（日）
            </p>
            <div className="content">
                <div className="third-content" style={{ marginTop: 29 }}>
                    <div className="second-title">
                        状态更新异常率折线图
                    </div>
                </div>
                <LineChart gridTop={20} xAxisData={initData} legend={legend} series={series('状态更新异常率')} color={['#F03733']} tooltip={tooltip('状态更新异常率')} height={197} />
            </div>
        </div>
    )
}

export default RightOne;