import React, {useEffect, useState} from "react";
import './style.scss';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import LineChart, { emphasisStyle } from "../../components/line-chart";
import {add0, formatType, getDateArray, getLastDay} from "../../../../utils/some-time-utils";
import chartIcon from '../../../../assets/img/chartIcon.png'
import Search from "../../../../components/table-with-search/search";
import {Radio, message, Spin} from "antd";
import {typeEnum} from "../../../../components/table-with-search/schemas";
import api from '../../../../api/other-indicator';
import getAxisByType, { dataToSeries } from "../../common/get-axis-by-type";
import { getDataSourceList } from "../../../../store/action";
import {connect} from "react-redux";
import {labelValue} from "../../../../common/schemas";
import moment, {Moment} from "moment";

/**
 * @author czq
 * @date 2020/8/13
 * @Description: 数据总量监控
*/

const xAxis= (() => {
    const hour = new Date().getHours()
    const arr = new Array(hour+1).fill(0);
    const r: string[] = [];
    arr.forEach((v, i) => {
        r.push(String(i));
    });
    return r;
})();

const yAxis = {
    axisLine: {
        show: false
    },
    splitLine: {
        show: false,
    },
};

const xAxisConfig = {
    name: '（时）',
    nameTextStyle: {
        color: '#4F5358',
        fontSize: 12,
        padding: [25, 0, 0, -10],
    },
    splitLine: {
        show: true,
        lineStyle: {
            type: 'dashed'
        }
    },
    boundaryGap: false,
};

const initSeries = [
    {
        data: [],
        type: 'line',
        name: '爬虫库',
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
        name: '资产监控库',
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

const initSeries1 = [
    {
        data: [],
        type: 'line',
        name: '爬虫库',
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 2,
        lineStyle: {
            width: 1,
        },
    },
    {
        data: [],
        type: 'line',
        name: '资产监控库',
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 2,
        lineStyle: {
            width: 1,
        },
    },
];

function tooltip(title: string, hour?: boolean, data?: {hour: number, countDate: string}[]): { formatter(p: any): string} {
   return ({
       formatter: (params: any) => {
           if (data) {
               if (!data.map((v: any) => String(v.hour)).includes(params[0].name)) {
                   return '';
               }
           }
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
           tipArray.forEach((e) => {
               if (e) {
                   tip = `${tip + e}<br>`;/* 组合所有提示信息 */
               }
           });

           let name = params[0].name;

           if (hour && data) {
               const item = data.filter(v => String(v.hour) === name)[0];
               if (item) {
                   name = `${item.countDate} ${name-1}时~${name}时`
               }
           }

           tip = `${title}<br />${name}<br>${tip}`;
           return tip;
       }
   })
}

const color = ['#FD9C26', '#0386D5', '#F03733', '#16B45C'];

interface Props {
    getDataSourceList(): void,
    option: labelValue[],
}

function Left(props: Props) {

    const [dateType, setDataType] = useState('1');
    const [str, setStr] = useState('全部'); // 浮窗标题
    const [firstSpin, setFirstSpin] = useState(false);
    const [thirdSpin, setThirdSpin] = useState(false);
    const [fourthSpin, setFourthSpin] = useState(false);
    const [xAxis1, setXAxis1] = useState(getDateArray(31));
    const [series, setSeries] = useState(initSeries);
    const [chartData, sethCartData] = useState([]);
    const [series1, setSeries1] = useState(initSeries1);
    const [timeSlotList, setTimeSlotList] = useState([]); // 数据增量时间段分布返回数据
    const [timeSlotParams, setTimeSlotParams] = useState({ countDate: moment().format(formatType), sourceId: props.option[0] ? props.option[0].value : '' }); // 数据增量时间段分布查询参数

    useEffect(() => {
        getData();
        props.getDataSourceList()
    }, []);

    useEffect(() => {
        if (props.option.length !== 0) {
            setTimeSlotParams({countDate: moment().format(formatType), sourceId: props.option[0].value })
        }
    }, [props.option]);

    useEffect(() => {
        getDataCountList()
    }, [dateType]);

    useEffect(() => {
        if (timeSlotParams.sourceId !== '') {
            getTimeSlotList()
        }
    }, [JSON.stringify(timeSlotParams)])

    // 请求当前数据总量及昨日增量
    const getData = () => {
        setFirstSpin(true)
        api.apiGetCurrentSourceAndGraspInfo().then((res) => {
            if (res.code === 200) {
                setData(res.data)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setFirstSpin(false)
        })
    };

    // 获取各表数据增量列表
    const getDataCountList = () => {
        setThirdSpin(true)
        api.apiGetDataCountList({ dateType }).then((res) => {
            if (res.code === 200) {
                let selfXAxis = xAxis1;
                // 当数据类型时月份统计时
                if (dateType === '3') {
                    selfXAxis = xAxis1.map((v, index) => {
                        const [year, month] = v.split('-');
                        const time = new Date(getLastDay(Number(year), Number(month)));
                        let day = add0(time.getDate());
                        // 最后一个月时 最后的日期为昨天
                        if (index === xAxis1.length - 1) {
                            day = new Date().getDate() - 1;
                        }
                        return `${year}-${month}-${day}`
                    })
                }
                sethCartData(res.data)
                dataToSeries.call(series,'爬虫库', res.data, 'assetCount', selfXAxis);
                dataToSeries.call(series,'资产监控库', res.data, 'labModelCount', selfXAxis);
                dataToSeries.call(series,'差值', res.data, 'different', selfXAxis);
                const r = dataToSeries.call(series,'-差值', res.data, 'different', selfXAxis);
                setSeries(r);
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setThirdSpin(false)
        })
    };

    // 获取数据增量时间段分布
    const getTimeSlotList = () => {
        setFourthSpin(true);
        api.apiGetTimeSlotList(timeSlotParams).then((res) => {
            if (res.code === 200) {
                let index: number = 0;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // @ts-ignore
                function fun(name: string, config, field) {
                    let temp = [...config]
                    const item = temp.filter((v: any, i: number) => {
                        if (v.name === name) {
                            index = i;
                            return true
                        }
                        return false
                    })[0];
                    item.data = [];
                    xAxis.forEach((e: any) => {
                        if (res.data.map((v: any) => String(v.hour)).find((i: string) => e === i)) {
                            res.data.forEach((v: any) => {
                                if (String(v.hour) === e) {
                                    item.data.push(v[field])
                                }
                            })
                        } else {
                            item.data.push(null)
                        }
                    });
                    temp[index] = item;
                    return temp;
                }
                const r = fun( '资产监控库', fun('爬虫库', series1, 'assetCount'), 'labModelCount');
                setTimeSlotList(res.data)
                setSeries1(r);
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setFourthSpin(false)
        })
    };

    const [data, setData] = useState({
        assetCount: 0,
        assetTotalCount: 0,
        different: 0,
        labModelCount: 0,
        labModelTotalCount: 0,
        ratio: 0,
        totalDifferent: 0,
        totalRatio: 0,
    });

    const legend = {
        selectedMode: 'multiple',
        itemGap: 30,
        itemWidth: 16,
        itemHeight: 8,
        data: [{
            name: '爬虫库',
        }, {
            name: '资产监控库'
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

    const legend1 = {
        selectedMode: 'multiple',
        itemGap: 30,
        top: 18,
        itemWidth: 16,
        itemHeight: 8,
        data: [{
            name: '爬虫库',
        }, {
            name: '资产监控库'
        },],
    };

    useEffect(() => {
        const item = props.option.find(v => v.value === timeSlotParams.sourceId)
            if (item) {
                setStr(item.label)
            }
    }, [timeSlotParams.sourceId, props.option])

    const configList1 = [
        {
            type: typeEnum.datepicker,
            placeholder: '请选择日期',
            label: '日期',
            field: 'countDate',
            allowClear: false,
            timeDefault: moment(),
            disabledDate: (c: Moment) => {
                return c.unix() > new Date().getTime()/1000
            },
            option: [{
                value: 0,
                label: '请选择'
            }],
            onChange: (params: object) => {
                setTimeSlotParams({
                    ...timeSlotParams,
                    ...params,
                })
            }
        },
        {
            type: typeEnum.select,
            placeholder: '请选择数据源',
            label: '数据源',
            field: 'sourceId',
            option: props.option,
            allowClear: false,
            defaultValue: props.option.length > 0 ? props.option[0].value : undefined,
            onChange: (params: object) => {
                setTimeSlotParams({
                    ...timeSlotParams,
                    ...params,
                })
            }
        },
    ];

    return (
        <div className="left-wrapper">
            <p className="header-title">数据同步监控</p>
            <div className="content-wrapper">
                <Spin spinning={firstSpin}>
                    <div className="first-content">
                        <p className="second-title">当前数据总量（截止到今日6点）</p>
                        <div className="content">
                            <div className="content-left">
                                <p className="label">爬虫库</p>
                                <p className="value">
                                    <span className="number">{data.assetTotalCount}</span>
                                    <span className="lc">条</span>
                                </p>
                            </div>
                            <div className="content-center">
                                <span className="ratio">{data.totalRatio === null ? null : `${(data.totalRatio * 100).toFixed(2)}%`}</span>
                                <p className="border-bottom">
                                    <ArrowRightOutlined />
                                </p>
                                <p className="border-top">
                                    <ArrowLeftOutlined />
                                </p>
                                <span className="lc">{data.totalDifferent === 0 ? null : `${data.totalDifferent > 0 ? '多' : '少'}${Math.abs(data.totalDifferent)}条`}</span>
                            </div>
                            <div className="content-right">
                                <p className="label">资产监控库</p>
                                <p className="value">
                                    <span className="number">{data.labModelTotalCount}</span>
                                    <span className="lc">条</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="second-content">
                        <p className="second-title">昨日增量</p>
                        <div className="content">
                            <div className="content-left">
                                    <p className="label">爬虫库</p>
                                    <p className="value">
                                        <span className="number">{data.assetCount}</span>
                                        <span className="lc">条</span>
                                    </p>
                                </div>
                            <div className="content-center">
                                <span className="ratio">{data.ratio === null ? null : `${(data.ratio * 100).toFixed(2)}%`}</span>
                                <p className="border-bottom">
                                    <ArrowRightOutlined />
                                </p>
                                <p className="border-top">
                                    <ArrowLeftOutlined />
                                </p>
                                <span className="lc">{data.different === 0 ? null : `${data.different > 0 ? '多' : '少'}${Math.abs(data.different)}条`}</span>
                            </div>
                            <div className="content-right">
                                <p className="label">资产监控库</p>
                                <p className="value">
                                    <span className="number">{data.labModelCount}</span>
                                    <span className="lc">条</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Spin>
                <Spin spinning={thirdSpin}>
                    <div className="third-content" style={{ marginTop: 29 }}>
                        <div className="second-title">
                            各表数据增量折线图
                            <div className="title-right">
                                <Radio.Group
                                    onChange={(val) => {
                                        setXAxis1(getAxisByType(val.target.value))
                                        setDataType(val.target.value)
                                    }}
                                    defaultValue="1"
                                >
                                    <Radio.Button value="1">日</Radio.Button>
                                    <Radio.Button value="3">月</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div key={JSON.stringify(series)}>
                            <LineChart
                                hasData={chartData.length > 0}
                                gridTop={70}
                                xAxisData={xAxis1}
                                legend={legend}
                                series={series}
                                color={color}
                                tooltip={tooltip('各表数据增量', false)}
                                height={265}
                            />
                        </div>
                    </div>
                </Spin>
                <Spin spinning={fourthSpin}>
                    <div className="fourth-content" style={{ marginTop: 29 }}>
                        <div className="second-title">
                            数据增量时间段分布
                            <div className="title-right" key={JSON.stringify(props.option)} >
                                <Search config={configList1} />
                            </div>
                        </div>
                        <p style={{ textAlign: 'center', marginTop: -8, height: 8 }}>{`截止到${new Date().getHours()}时`}</p>
                        <LineChart
                            hasData={timeSlotList.length > 0}
                            key={JSON.stringify(series1)}
                            gridTop={70}
                            xAxisData={xAxis}
                            xAxisConfig={xAxisConfig}
                            legend={legend1}
                            series={series1}
                            yAxis={yAxis}
                            color={['#0386D5', '#FD9C26']}
                            tooltip={tooltip(str, true, timeSlotList)}
                            height={286}
                        />
                    </div>
                </Spin>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getDataSourceList: () => {
            dispatch(getDataSourceList())
        },
    }
}


export default connect((state: any) => ({option: state.dataSourceList }), mapDispatchToProps)(Left);