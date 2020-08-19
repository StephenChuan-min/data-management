import React, {useEffect, useState} from "react";
import LineChart from '../components/line-chart';
import api from '../../../api/grab-situation';
import {message, Spin} from 'antd';
import {TimeType} from "../../../common/schemas";
import {add0, getLastDay} from "../../../utils/some-time-utils";
import { dataToSeries } from "../common/get-axis-by-type";

const initSeries = [
    {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        name: '源网站增量',
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
        name: '数据抓取量',
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 2,
        smooth: true,
        lineStyle: {
            width: 1,
        },
    },
];

const tooltip = {
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
            tipArray[index] = `${regMarker}${name}：${value || value === 0 ? value : '--'}`;
            return e;
        });
        tip += timeDetail;
        tipArray.map((e) => {
            if (e) {
                tip = `${tip + e}<br>`;/* 组合所有提示信息 */
            }
            return e;
        });
        tip = `总量<br />${params[0].name}<br>${tip}`;
        return tip;
    }
};

const color = ['#FD9C26', '#0386D5'];

interface Props {
    xAxisData: string[],
    params: { dataType: number, timeType: TimeType },
}

function BottomLeft(props: Props) {

    const [data, setData] = useState();
    const [series, setSeries] = useState(initSeries);
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        getData()
    }, [JSON.stringify(props.params)])

    const getData = () => {
        setSpin(true)
        api.apiGetGraspAndSourceAdd({ ...props.params }).then((res) => {
            if (res.code === 200) {
                let selfXAxis = props.xAxisData
                // 当数据类型时月份统计时
                if (props.params.timeType === TimeType.month) {
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
                dataToSeries.call(series,'源网站增量', res.data, 'sourceNetIncrease', selfXAxis);
                const r = dataToSeries.call(series,'数据抓取量', res.data, 'yesterdayGraspSumNumber', selfXAxis);
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
        data: ['源网站增量', '数据抓取量'],
    };

    return (
        <div>
            <Spin spinning={spin}>
                <LineChart
                    key={JSON.stringify(series)}
                    xAxisData={props.xAxisData}
                    legend={legend}
                    series={series}
                    color={color}
                    tooltip={tooltip}
                    height={362}
                />
            </Spin>
        </div>
    )
}

export default BottomLeft;