import React, {useEffect, useState} from "react";
import './style.scss';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import LineChart, { emphasisStyle } from "../../components/line-chart";
import {getDateArray} from "../../../../utils/some-time-utils";
import chartIcon from '../../../../assets/img/chartIcon.png'
import Search from "../../../../components/table-with-search/search";
import {Radio} from "antd";
import {typeEnum} from "../../../../components/table-with-search/schemas";

/**
 * @author czq
 * @date 2020/8/13
 * @Description: 数据总量监控
*/

const initData = getDateArray(31);

const xAxis= (() => {
    const arr = new Array(25).fill(0);
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

const series = [
    {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
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
        data: [1320, 1330, 1290, 934, 901, 932, 820],
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

const series1 = [
    {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
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
        data: [1320, 1330, 1290, 934, 901, 932, 820],
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

function tooltip(title: string): { formatter(p: any): string} {
   return ({
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
           tip = `${title}<br />${params[0].name}<br>${tip}`;
           return tip;
       }
   })
}

const color = ['#FD9C26', '#0386D5', '#F03733', '#16B45C']

function Left() {

    useEffect(() => {

    })

    const [data, setData] = useState({
        p: 1976840,
        z: 1973699,
        yp: 6840,
        yz: 6840,
        zb: 99.8,
    })

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
        itemWidth: 16,
        itemHeight: 8,
        data: [{
            name: '爬虫库',
        }, {
            name: '资产监控库'
        },],
    };

    const configList1 = [
        {
            type: typeEnum.datepicker,
            placeholder: '请选择日期',
            label: '日期',
            field: 'status',
            option: [{
                value: 0,
                label: '请选择'
            }],
            onChange: (params: object) => {
                console.log(params)
            }
        },
        {
            type: typeEnum.select,
            placeholder: '请选择数据源',
            label: '数据源',
            field: 'status',
            option: [{
                value: 0,
                label: '全部'
            }],
            onChange: (params: object) => {
                console.log(params)
            }
        },
    ];

    return (
        <div className="left-wrapper">
            <p className="header-title">数据同步监控</p>
            <div className="content-wrapper">
                <div className="first-content">
                    <p className="second-title">当前数据总量（截止到今日6点）</p>
                    <div className="content">
                        <div className="content-left">
                            <p className="label">爬虫库</p>
                            <p className="value">
                                <span className="number">{data.p}</span>
                                <span className="lc">条</span>
                            </p>
                        </div>
                        <div className="content-center">
                            <span className="ratio">{data.zb}%</span>
                            <p className="border-bottom">
                                <ArrowRightOutlined />
                            </p>
                            <p className="border-top">
                                <ArrowLeftOutlined />
                            </p>
                            <span className="lc">少3141条</span>
                        </div>
                        <div className="content-right">
                            <p className="label">资产监控库</p>
                            <p className="value">
                                <span className="number">{data.z}</span>
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
                                <span className="number">{data.p}</span>
                                <span className="lc">条</span>
                            </p>
                        </div>
                        <div className="content-center">
                            <span className="ratio">{data.zb}%</span>
                            <p className="border-bottom">
                                <ArrowRightOutlined />
                            </p>
                            <p className="border-top">
                                <ArrowLeftOutlined />
                            </p>
                            <span className="lc">少3141条</span>
                        </div>
                        <div className="content-right">
                            <p className="label">资产监控库</p>
                            <p className="value">
                                <span className="number">{data.z}</span>
                                <span className="lc">条</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="third-content" style={{ marginTop: 29 }}>
                    <div className="second-title">
                        各表数据增量折线图
                        <div className="title-right">
                            <Radio.Group onChange={() => {}} defaultValue="a">
                                <Radio.Button value="a">日</Radio.Button>
                                <Radio.Button value="b">月</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    <LineChart gridTop={70} xAxisData={initData} legend={legend} series={series} color={color} tooltip={tooltip('各表数据总量')} height={320} />
                </div>
                <div className="fourth-content" style={{ marginTop: 29 }}>
                    <div className="second-title">
                        数据增量时间段分布
                        <div className="title-right">
                            <Search config={configList1} />
                        </div>
                    </div>
                    <LineChart xAxisData={xAxis} xAxisConfig={xAxisConfig} legend={legend1} series={series1} yAxis={yAxis} color={['#0386D5', '#FD9C26']} tooltip={tooltip('数据增量时间段分布')} height={240} />
                </div>
            </div>
        </div>
    )
}

export default Left;