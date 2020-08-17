import React from "react";
import LineChart, { emphasisStyle } from "../../components/line-chart";
import {getDateArray} from "../../../../utils/some-time-utils";
import chartIcon from "../../../../assets/img/chartIcon.png";

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

                    if (name === '-差值') {
                        tempName = '差值'
                    }
                    if (tempName === '差值' && itemLabel === '--') {
                        tipArray[index] = '';
                    } else {
                        tipArray[index] = `${regMarker}${tempName}：${itemLabel}`;
                    }
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

const series = [
    {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        name: '附件抓取量',
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 2,
        smooth: true,
        lineStyle: {
            width: 1,
        },
    },
    {
        data: [1320, 1330, 1290, 934, 901, 932, 820],
        type: 'line',
        name: '附件解析量',
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 2,
        smooth: true,
        lineStyle: {
            width: 1,
        },
    },
    {
        data: [null, 1320, null, 1330, null, 1290, null, 934, null, 901, null, 932, null, 820],
        name: '差值',
        type: 'bar',
        barWidth: 4,
        emphasis: emphasisStyle,
        z: 1,
        barGap: '-100%',
    },
    {
        data: [-1320, null, -1330, null, -1290, null, -934, null, -901, null, -932, null, -820, null],
        name: '-差值',
        type: 'bar',
        barWidth: 4,
        emphasis: emphasisStyle,
        z: 1,
    },
];

const initData = getDateArray(31);

function RightOne() {


    const legend = {
        selectedMode: 'multiple',
        itemGap: 30,
        itemWidth: 16,
        itemHeight: 8,
        data: [{
            name: '附件抓取量',
        }, {
            name: '附件解析量'
        }, {
            name: '差值',
            icon: `image://${chartIcon}`,
        }, {
            name: '-差值',
            icon: 'image://',
        }],
        formatter: function (name: string) {
            if (name === '-差值') return null;
            return name;
        }
    };

    return (
        <div className="right-three">
            <p className="header-title">附件解析情况（日）</p>
            <div className="content">
                <div className="third-content" style={{ marginTop: 29 }}>
                    <div className="second-title">
                        附件抓取量与附件解析量
                    </div>
                </div>
                <LineChart
                    gridTop={70}
                    xAxisData={initData}
                    legend={legend}
                    series={series}
                    color={['#0386D5', '#FD9C26', '#F03733', '#16B45C']}
                    tooltip={tooltip('附件解析')}
                    height={265}
                />
            </div>
        </div>
    )
}

export default RightOne;