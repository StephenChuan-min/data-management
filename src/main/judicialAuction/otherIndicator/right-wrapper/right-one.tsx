import React, {useEffect, useState} from "react";
import LineChart from "../../components/line-chart";
import Search from "../../../../components/table-with-search/search";
import {typeEnum} from "../../../../components/table-with-search/schemas";
import {getDateArray} from "../../../../utils/some-time-utils";
import api from '../../../../api/other-indicator';
import { message, Spin } from 'antd';
import {dataToSeries} from "../../common/get-axis-by-type";

const option = [{
    value: 1,
    label: '开拍时间（start_time）'
},{
    value: 2,
    label: '评估价（consult_price）'
},{
    value: 3,
    label: '法院（court）'
},{
    value: 4,
    label: '资产类型（sub_category）'
},{
    value: 5,
    label: '竞买人'
},{
    value: 6,
    label: '状态（status）'
},{
    value: 7,
    label: '标题（title）'
},{
    value: 8,
    label: '当前价格（current_price）'
},
]

function tooltip(str: string, data: { countDate: string, nullRateCount: number, dbCount: number }[]) {
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

                    let itemLabel = `${value || value === 0 ? `${((value * 100000) / 1000).toFixed(2)}%` : '--'}`
                    tipArray[index] = `${regMarker}空值率：${itemLabel}`;
            return e;
        });
        tip += timeDetail;
        tipArray.map((e) => {
            if (e) {
                tip = `${tip + e}<br>`;/* 组合所有提示信息 */
            }
            return e;
        });

        const item = data.find((v) => v.countDate === params[0].name);
        let middleLabel = ''
         if (item) {
             middleLabel = `<br />当前数据量：${item.dbCount}<br />空值数据量：${item.nullRateCount}`
         }
        tip = `${str}<br />${params[0].name}${middleLabel}<br>${tip}`;
        return tip;
    }})
}

function seriesFun(str: string): {}[] {
    return [
        {
            data: [],
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

    const [selectItem, setItem] = useState({
        name: '开拍时间（start_time)',
        value: 1,
    });
    const [series, setSeries] = useState(seriesFun('开拍时间（start_time)'));
    const [data, setData] = useState([]);
    const [spin, setSpin] = useState(false);

    const legend = {
        show: false,
        data: [selectItem.name],
    };

    useEffect(() => {
        getData()
    }, [selectItem]);

    const getData = () => {
        setSpin(true)
        api.apiGetNullRateList({ monitorField: selectItem.value }).then((res) => {
            if (res.code === 200) {
                const r = dataToSeries.call(series, selectItem.name, res.data, 'rate', initData);
                setData(res.data)
                setSeries(r)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setSpin(false)
        })
    }

    const configList = [
        {
            type: typeEnum.select,
            placeholder: '请选择数据源',
            label: '监控字段',
            field: 'monitorField',
            option: option,
            defaultValue: 1,
            allowClear: false,
            onChange: (params: { monitorField: any }) => {
                const item = option.find(v => v.value === params.monitorField)
                if (item) {
                    setSeries(seriesFun(item.label))
                    setItem({
                        name: item.label,
                        value: params.monitorField,
                    })
                }
            }
        },
    ];

    return (
        <div className="right-one">
                <p className="header-title">空值率监控（日）</p>
                <div className="content">
                    <Spin spinning={spin}>
                        <div className="third-content">
                            <div className="second-title">
                                重要字段空值率折线图
                                <div className="title-right">
                                    <Search config={configList} />
                                </div>
                            </div>
                        </div>
                        <LineChart
                            hasData={data.length > 0}
                            key={JSON.stringify(series)}
                            gridTop={30}
                            xAxisData={initData}
                            legend={legend}
                            series={series}
                            color={['#0386D5']}
                            tooltip={tooltip(selectItem.name, data)}
                            height={181}
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