import React, {useEffect, useState} from "react";
import LineChart from '../components/line-chart';
import api from '../../../api/grab-situation';
import {message, Spin} from 'antd';
import {add0, format, getLastDay} from "../../../utils/some-time-utils";
import {dataToSeries} from "../common/get-axis-by-type";
import {mathCeil} from '../../../utils/utils';

const initSeries = [
    {
        data: [],
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
        data: [],
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

const tooltip = (data: { countDate: string, sourceNetIncrease: number, yesterdayGraspSumNumber: number }[], str: string, timeType: string) => ({
    formatter: (params: any) => {
        let item = data.find(v => v.countDate === params[0].name);
        if (timeType === '3') {
            item = data.find(v => new Date(v.countDate).getMonth() === new Date(params[0].name).getMonth())
        }

        const tipArray:string[] = [];
        let tip = '';
        const timeDetail = '';
        params.map((e: any) => {
            const index = e.seriesIndex;
            let name = e.seriesName;
            const { marker } = e;
            const reg = new RegExp(/10/g);
            const reg1 = new RegExp(/5/g);
            const regMarker = marker.replace(reg, '6').replace(reg1, 8);
            let { value } = e;
            if (name === '源网站增量' && item) {
                value = item.sourceNetIncrease
            }
            if (name === '数据抓取量' && item) {
                value = item.yesterdayGraspSumNumber
            }

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
        let title = params[0].name
        // 选择周时
        if (timeType === '2') {
            const index = data.findIndex(v => v.countDate === params[0].name)
            if (index === 0) {
                const time = new Date(data[0].countDate).getTime()
                const before = time - 7 * 86400000
                title = `${format(before)} ~ ${title}`
            } else {
                title = `${data[index - 1].countDate} ~ ${title}`
            }
        }
        tip = `${str}<br />${title}<br>${tip}`;
        return tip;
    }
});

const color = ['#FD9C26', '#0386D5'];

interface Props {
    xAxisData: string[],
    params: { dataType: number, timeType: string },
    title: string,
}

function BottomLeft(props: Props) {

    const [yAxis, setYaXis] = useState({
        max: 10,
        min: 0,
        interval: 1,
    });
    const [series, setSeries] = useState(initSeries);
    const [data, setData] = useState([]);
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        getData();
    }, [JSON.stringify(props.params)]);

   const handleClick = (e: any[]) => {
        const arr = e.map((v: any) => v.sourceNetIncrease);
        const arr1 = e.map((v: any) => v.yesterdayGraspSumNumber);
        const allArr = [...arr, ...arr1]

        const max = mathCeil(Math.max.apply(null, allArr));
        const interval = max / 10;

        let min = 0;

        if (allArr.find((v) => v < 0)) {
            min  = -interval
        }

        setYaXis({
            min,
            interval,
            max,
        });
    }

    const toSetYaXis = (e: any[]) => {
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
        const arr = e.map((v: any) => v.sourceNetIncrease);
        const arr1 = e.map((v: any) => v.yesterdayGraspSumNumber);
        const allArr = [...arr, ...arr1]

        const max = mathCeil(Math.max.apply(null, allArr));
        const interval = max / 10;

        let min = 0;

        if (allArr.find((v) => v < 0)) {
            min  = -interval
        }

        setYaXis({
            min,
            interval,
            max,
        });
        const list = e.map((v: any) => {
            const temp = {...v};
            if (v.sourceNetIncrease < 0) {
                temp.sourceNetIncrease = -interval
            }
            if (v.yesterdayGraspSumNumber < 0) {
                temp.yesterdayGraspSumNumber = -interval
            }
            return temp
        });
        dataToSeries.call(series,'源网站增量', list, 'sourceNetIncrease', selfXAxis);
        const r = dataToSeries.call(series,'数据抓取量', list, 'yesterdayGraspSumNumber', selfXAxis);
        setSeries(r);
    }

    const getData = () => {
        setSpin(true);
        api.apiGetGraspAndSourceAdd({ ...props.params }).then((res) => {
            if (res.code === 200) {
                toSetYaXis(res.data)
                setData(res.data);
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
                    hasData={data.length > 0}
                    key={JSON.stringify(series)}
                    xAxisData={props.xAxisData}
                    legend={legend}
                    series={series}
                    color={color}
                    tooltip={tooltip(data, props.title, props.params.timeType)}
                    height={362}
                    yAxis={yAxis}
                    handleClick={(isNoSelect) => {
                        if (isNoSelect) {
                            setYaXis({
                                min: 0,
                                interval: 0,
                                max: 0,
                            });
                        } else {
                            handleClick(data)
                        }
                    }}
                />
            </Spin>
        </div>
    )
}

export default BottomLeft;