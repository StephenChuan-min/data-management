import React, {useEffect, useState} from 'react';
import '../style.scss';
import BottomLeft from './bottom-left-chart';
import BottomRight from './bottom-right-chart';
import { typeEnum } from "../../../components/table-with-search/schemas";
import TitleRight from '../components/title-right';
const echart =  require('echarts');

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 司法拍卖数据监控-抓取情况监控
*/

interface Props {

}

const initData = [
    {
        name: '阿里司法拍卖',
        id: '10763',
        value: 1890,
        than: 100,
    },
    {
        name: '京东司法拍卖',
        id: '10778',
        value: 1890,
        than: 100000,
    },
    {
        name: '公拍司法拍卖',
        id: '10763',
        value: 1890,
        than: 100,
    },
    {
        name: '中拍司法拍卖',
        id: '10781',
        value: 1890,
        than: 100,
    },
    {
        name: '人民法院诉讼资产网',
        id: '10783',
        value: 1890,
        than: 100,
    },
    {
        name: '北交互联',
        id: '10857',
        value: 1890,
        than: 100,
    },
    {
        name: '工行融e购',
        id: '10873',
        value: 1890,
        than: 100,
    },
    {
        name: '阿里金融资产',
        id: '10768',
        value: 1890,
        than: 100000,
    },
    {
        name: '京东金融资产',
        id: '10897',
        value: 1890,
        than: 100,
    },
    {
        name: '中拍金融资产',
        id: '10899',
        value: 1890,
        than: 100,
    },
    {
        name: '公拍同步拍',
        id: '10900',
        value: 1890,
        than: 100,
    },
    {
        name: '公拍金融资产',
        id: '10992',
        value: 1890,
        than: 100,
    },
]


function Index(prop: Props) {
    let pie:any = null;

    const [sumData, setSumData] = useState({ yesterday: 0, less: 0, more: 0 });

    const [data, setData] = useState(initData)

    const col = Math.ceil(data.length / 3);

    const option = {
        color: ['#2858B9', '#148CD5', '#75CA4D', '#F99754', '#EC3434', '#A757F9', '#1371D1', '#23B477', '#F4BF67', '#FF5E41', '#D41E7F', '#6661E9'],
        title: {
            text: '数据源分布',
            left: 160,
            textStyle: {
                color: '#293038',
                fontSize: 14,
            },
            top: 0
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 386,
            top: data.length > 12 ? 0 : 40,
            icon: 'circle',
            data: data.map(v => v.name),
            width: 490,
            itemWidth: 8,
            itemHeight: 8,
            textStyle: {
                rich: {
                   a: {
                       width: 50,
                   },
                   b: {
                       width: 180,
                       fontSize: 14,
                       lineHeight: 20,
                   },
                   c: {
                       color: '#7D8699',
                       fontSize: 14,
                   },
                    d: {
                       align: 'left',
                       color: '#293038',
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: [0, 6, 0, 6],
                    }
                },
            },
            formatter: (name: any) => {
                const item = data.filter(v => v.name === name)[0]
                return `{b|${name}-${item.id}}{d|${item.value}}{c|条，少}{d|${item.than}}{c|条}{a|}`
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['78%', '41%'],
                data: data,
                width: 250,
                height: 250,
                label: {
                    show: false
                },
                labelLine: {
                    show: false,
                    label: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    const configList = [
        {
            type: typeEnum.select,
            placeholder: '请选择映射字段名',
            label: '数据源',
            field: 'status',
            option: [{
                value: 0,
                label: '请选择'
            }],
            onChange: (params: object) => {
                console.log(params)
            }
        },
    ];

    const handleRadioChange = (val: any) => {
        console.log(val)
    }

    useEffect(
        () => {
            const myPie = echart.init(pie);
            myPie.setOption(option)
        }, [option, pie]
    )
        return (
            <div className="grab-situation-monitor">
                <div className="header">
                    <p className="header-title">抓取数据分布概览</p>
                    <div className="header-content-top">
                        <p className="left">
                            <div style={{ display: 'inline-block'}}>
                                <span className="title">昨日抓取总量</span>
                                <div className="bottom">
                                    <span className="number" style={{ marginLeft: 0}}>{sumData.yesterday}</span>
                                    <span>条</span>
                                </div>
                            </div>
                        </p>
                        <p className="right">
                            <span className="title">与源网站增量（区分数据源）差值</span>
                            <div>
                                <span className="right-bottom-left">
                                    <span>少</span>
                                    <span className="number">{sumData.less}</span>
                                    <span>条</span>
                                </span>
                                <span>
                                    <span>多</span>
                                    <span className="number">{sumData.more}</span>
                                    <span>条</span>
                                </span>
                            </div>
                        </p>
                    </div>
                    <div style={{ padding: '0 20px'}}>
                        <div id="pie" ref={dom => pie = dom} style={{ width: '100%', marginTop: 22, height: col > 4 ? col * 36 : 180 }} />
                    </div>
                </div>
                <div className="bottom-left">
                    <p className="header-title">
                        源网站增量与数据抓取量
                        <TitleRight configList={configList} handleRadioChange={handleRadioChange} />
                    </p>
                    <div className="chart">
                        <BottomLeft />
                    </div>
                </div>
                <div className="bottom-right">
                    <p className="header-title">
                        数据抓取量与源网站增量差值
                        <TitleRight configList={configList} handleRadioChange={handleRadioChange} />
                    </p>
                    <div className="chart">
                        <BottomRight />
                    </div>
                </div>
            </div>
        );
}

export default Index;