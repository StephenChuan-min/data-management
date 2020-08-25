import React, {useEffect, useState} from "react";
import LineChart from "../../components/line-chart";
import {getDateArray} from "../../../../utils/some-time-utils";
import api from '../../../../api/other-indicator';
import { message, Spin, Tooltip } from 'antd';
import {dataToSeries} from "../../common/get-axis-by-type";
import { QuestionCircleOutlined } from '@ant-design/icons';

function tooltip(str: string, data: {currentCount: number, abnormalCount: number, countDate: string }[]) {
    return (
        {
            formatter: (params: any) => {
                const tipArray:string[] = [];
                let tip = '';
                const timeDetail = '';
                params.map((e: any) => {
                    const index = e.seriesIndex;
                    const { marker } = e;
                    const reg = new RegExp(/10/g);
                    const reg1 = new RegExp(/5/g);
                    const regMarker = marker.replace(reg, '6').replace(reg1, 8);
                    const { value } = e;

                    let itemLabel = `${value || value === 0 ? `${(value * 100).toFixed(2)} %` : '--'}`
                    tipArray[index] = `${regMarker}异常率：${itemLabel}`;
                    return e;
                });
                tip += timeDetail;
                tipArray.map((e) => {
                    if (e) {
                        tip = `${tip + e}<br>`;/* 组合所有提示信息 */
                    }
                    return e;
                });

                const item = data.find((v) => v.countDate === params[0].name)
                let middleLabel = ''
                if (item) {
                    middleLabel = `<br />当前数据量：${item.currentCount}<br />异常数据量：${item.abnormalCount}`
                }

                tip = `${str}<br />${params[0].name}${middleLabel}<br />${tip}`;
                return tip;
            }})
}

const initSeries = [
        {
            data: [],
            type: 'line',
            name: '状态更新异常率',
            symbol: 'emptyCircle',
            showSymbol: false,
            symbolSize: 2,
            smooth: true,
            lineStyle: {
                width: 1,
            },
        },
    ];

const initData = getDateArray(31);

function RightOne() {

    const legend = {
        show: false,
        data: ['状态更新异常率'],
    };

    const [series, setSeries] = useState(initSeries);
    const [spin, setSpin] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        setSpin(true)
        api.apiGetDataModifiedList().then((res) => {
            if (res.code === 200) {
                const r = dataToSeries.call(series, '状态更新异常率', res.data, 'rate', initData);
                setData(res.data);
                setSeries(r);
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setSpin(false)
        })
    };

    return (
        <div className="right-two">
            <p className="header-title">
                数据更新情况监控（日）
                <Tooltip title="start_time为三天及以前但是status仍为1的数据总量">
                    <span style={{ color: '#7D8699' }}><QuestionCircleOutlined /></span>
                </Tooltip>
            </p>
                <div className="content">
                    <Spin spinning={spin}>
                        <div className="third-content" style={{ marginTop: 29 }}>
                            <div className="second-title">
                                状态更新异常率折线图
                            </div>
                        </div>
                        <LineChart
                            hasData={data.length > 0}
                            key={JSON.stringify(series)}
                            gridTop={30}
                            xAxisData={initData}
                            legend={legend}
                            series={series}
                            color={['#F03733']}
                            tooltip={tooltip('状态更新异常率', data)}
                            height={182}
                            yAxis={{
                                axisLabel: {
                                    color: '#4F5358',
                                    formatter: (v: number) => `${((v * 100000) / 1000).toFixed(2)} %`
                                }
                            }}
                        />
                    </Spin>
                </div>
        </div>
    )
}

export default RightOne;