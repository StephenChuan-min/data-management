import React, {useEffect, useState} from "react";
import LineChart, { emphasisStyle } from "../../components/line-chart";
import {getDateArray} from "../../../../utils/some-time-utils";
import {message, Spin} from 'antd';
import chartIcon from "../../../../assets/img/chartIcon.png";
import api from '../../../../api/other-indicator';
import {dataToSeries} from "../../common/get-axis-by-type";

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

const initSeries = [
    {
        data: [],
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
        data: [],
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
        data: [],
        name: '差值',
        type: 'bar',
        barWidth: 4,
        emphasis: emphasisStyle,
        z: 1,
        barGap: '-100%',
    },
    {
        data: [],
        name: '-差值',
        type: 'bar',
        barWidth: 4,
        emphasis: emphasisStyle,
        z: 1,
    },
];

const initData = getDateArray(31);

function RightOne() {

    const [series, setSeries] = useState(initSeries)
    const [spin, setSpin] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setSpin(true)
        api.apiGetFileAnalysisList().then((res) => {
            if (res.code === 200) {
                dataToSeries.call(series,'附件抓取量', res.data, 'fileDbCount', initData);
                dataToSeries.call(series,'附件解析量', res.data, 'fileAnalysisCount', initData);
                dataToSeries.call(series,'差值', res.data, 'different', initData);
                const r = dataToSeries.call(series,'-差值', res.data, 'different', initData);
                setSeries(r);
                setData(res.data)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setSpin(false)
        })
    }

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
                <Spin spinning={spin}>
                    <div className="third-content" style={{ marginTop: 29 }}>
                        <div className="second-title">
                            附件抓取量与附件解析量
                        </div>
                    </div>
                    <LineChart
                        hasData={data.length > 0}
                        key={JSON.stringify(series)}
                        gridTop={70}
                        xAxisData={initData}
                        legend={legend}
                        series={series}
                        color={['#0386D5', '#FD9C26', '#F03733', '#16B45C']}
                        tooltip={tooltip('附件解析')}
                        height={265}
                    />
                </Spin>
            </div>
        </div>
    )
}

export default RightOne;