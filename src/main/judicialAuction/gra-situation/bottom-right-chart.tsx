import React, {useEffect, useState} from "react";
import LineChart, { emphasisStyle } from '../components/line-chart';
import api from "../../../api/grab-situation";
import {add0, getLastDay} from "../../../utils/some-time-utils";
import {dataToSeries} from "../common/get-axis-by-type";
import {message, Spin} from "antd";

const initSeries = [
    {
        data: [],
        type: 'bar',
        barWidth: 10,
        name: '多于源网站增量',
        emphasis: emphasisStyle,
        z: 1,
    },
    {
        data: [],
        type: 'bar',
        name: '少于源网站增量',
        barWidth: 10,
        emphasis: emphasisStyle,
        barGap: '30%',
        z: 1,
    },
    {
        data: [],
        type: 'line',
        name: '累计差值',
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 2,
        lineStyle: {
            width: 1,
        },
    },
];

function tooltip (title: string) {
    return ({
        formatter: (params: any) => {
            const tipArray:string[] = [];
            let tip = '';
            const timeDetail = '';
            params.map((e: any) => {
                const index = e.seriesIndex;
                let name = e.seriesName;
                if (name === '多于源网站增量') {
                    name = '多'
                }
                if (name === '少于源网站增量') {
                    name = '少'
                }
                const { marker } = e;
                const reg = new RegExp(/10/g);
                const reg1 = new RegExp(/5/g);
                const regMarker = marker.replace(reg, '6').replace(reg1, 8);
                const { value } = e;
                tipArray[index] = value || value === 0 ? `${regMarker}${name}：${Math.abs(value)}` : '';
                return e;
            });
            tip += timeDetail;
            tipArray.map((e) => {
                if (e) {
                    tip = `${tip + e}<br>`;/* 组合所有提示信息 */
                }
                return e;
            });
            tip = `${title}<br />${params[0].name}<br>${tip}`;
            return tip;
        }
    })
};

const color = ['#0386D5', '#FD9C26', '#F03733']

function BottomRight(props: { xAxisData: string[], params: { dataType: number, timeType: string }, title: string }) {

    const [data, setData] = useState([]);
    const [series, setSeries] = useState(initSeries);
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        getData()
    }, [props.params])

    const getData = () => {
        setSpin(true)
        api.apiGetGraspAndSourceDvalue({ ...props.params }).then((res) => {
            if (res.code === 200) {
                let selfXAxis = props.xAxisData
                // 当数据类型时月份统计时
                if (props.params.timeType === '3') {
                    selfXAxis = props.xAxisData.map((v, index) => {
                        const [year, month] = v.split('-');
                        const time = new Date(getLastDay(Number(year), Number(month)));
                        let day = add0(time.getDate());
                        // 最后一个月时 最后的日期为昨天
                        if (index === props.xAxisData.length - 1) {
                            day = new Date().getDate() - 1;
                        }
                        return `${year}-${month}-${day}`
                    })
                }
                setData(res.data)
                dataToSeries.call(series,'多于源网站增量', res.data, 'different', selfXAxis);
                dataToSeries.call(series,'少于源网站增量', res.data, 'different', selfXAxis);
                const r = dataToSeries.call(series,'累计差值', res.data, 'accumulativeDValue', selfXAxis);
                setSeries(r);
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
        data: ['多于源网站增量', '少于源网站增量', '累计差值'],
    };

    return (
        <Spin spinning={spin}>
            <LineChart
                hasData={data.length > 0}
                key={JSON.stringify(series)}
                xAxisData={props.xAxisData}
                legend={legend} series={series}
                color={color} tooltip={tooltip(props.title)}
                height={362}
            />
        </Spin>
    )
}

export default BottomRight;