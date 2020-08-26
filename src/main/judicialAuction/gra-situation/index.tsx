import React, {useEffect, useState} from 'react';
import '../style.scss';
import BottomLeft from './bottom-left-chart';
import BottomRight from './bottom-right-chart';
import { typeEnum } from "../../../components/table-with-search/schemas";
import {message, Spin} from 'antd';
import TitleRight from '../components/title-right';
import getAxisByType from '../common/get-axis-by-type';
import { getDateArray } from '../../../utils/some-time-utils';
import api from '../../../api/grab-situation';
import {labelValue, TimeType} from '../../../common/schemas';
import { getDataSourceList } from '../../../store/action';
import {connect} from "react-redux";
import NoData from '../../../components/no-data';

const echart =  require('echarts');
/**
 * @author czq
 * @date 2020/8/4
 * @Description: 司法拍卖数据监控-抓取情况监控
*/

enum Type {
    left = 1, // 源网站增量与数据抓取量
    right = 2, // 数据抓取量与源网站增量差值
}

const initData = [
    {
        name: '阿里司法拍卖',
        id: '10763',
        value: 0,
        than: 0,
    },
    {
        name: '京东司法拍卖',
        id: '10778',
        value: 0,
        than: 0,
    },
    {
        name: '公拍司法拍卖',
        id: '10763',
        value: 0,
        than: 0,
    },
    {
        name: '中拍司法拍卖',
        id: '10781',
        value: 0,
        than: 0,
    },
    {
        name: '人民法院诉讼资产网',
        id: '10783',
        value: 0,
        than: 0,
    },
    {
        name: '北交互联',
        id: '10857',
        value: 0,
        than: 0,
    },
    {
        name: '工行融e购',
        id: '10873',
        value: 0,
        than: 0,
    },
    {
        name: '阿里金融资产',
        id: '10768',
        value: 0,
        than: 0,
    },
    {
        name: '京东金融资产',
        id: '10897',
        value: 0,
        than: 0,
    },
    {
        name: '中拍金融资产',
        id: '10899',
        value: 0,
        than: 0,
    },
    {
        name: '公拍同步拍',
        id: '10900',
        value: 0,
        than: 0,
    },
    {
        name: '公拍金融资产',
        id: '10992',
        value: 0,
        than: 0,
    },
]


function Index(props: { getDataSourceList(): any, option: labelValue[] }) {
    let pie:any = null;

    // 源网站增量与数据抓取量的xAix
    let [xAxis, setXAxis] = useState(getDateArray(31));
    let [spin, setSpin] = useState(false);
    // 数据抓取量与源网站增量差值xAix
    let [xAxis1, setXAxis1] = useState(getDateArray(31));

    let [hasData, setHasData] = useState(false);

    let [leftTitle, setLeftTitle] = useState('总量');
    let [rightTitle, setRightTitle] = useState('总量');

    const [sumData, setSumData] = useState({ yesterdayGraspSumNum: 0, compareSourceNetDvalue: 0, compareSourceNetAdd: 0 });

    const [data, setData] = useState(initData);

    const [leftParams, setLeftParams] = useState({ dataType: 0, timeType: String(TimeType.day) });

    const [rightParams, setRightParams] = useState({ dataType: 0, timeType: String(TimeType.day) });

    const col = Math.ceil(data.length / 3);

    const option = {
        color: ['#2858B9', '#148CD5', '#75CA4D', '#F99754', '#EC3434', '#A757F9', '#1371D1', '#23B477', '#F4BF67', '#FF5E41', '#D41E7F',
            '#6661E9', '#148CD5', '#F4BF67', '#EC3434', '#6661E9', '#DC0000', '#6FE1AE',
        ],
        title: {
            text: '数据源分布',
            left: 110,
            textStyle: {
                color: '#293038',
                fontSize: 14,
            },
            top: 0
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.7)',
            extraCssText: 'line-height: 24px',
            axisPointer: {
                z: 2,
            },
            padding: 12,
            formatter: (params: any) => {
                const { data } = params
                const name = data.name.split('-')[0]
                return `${name}<br/>${data.value}条<br/>${params.percent}%`
            }
        },
        legend: {
            orient: 'vertical',
            left: 326,
            top: data.length > 15 ? 0 : data.length > 12 ? 20 : 40,
            icon: 'circle',
            data: data.map(v => ({
                name: v.name,
                icon: 'circle',
            })),
            width: '80%',
            itemWidth: 8,
            itemHeight: 8,
            textStyle: {
                rich: {
                   a: {
                       width: 50,
                   },
                   b: {
                       width: 240,
                       padding: [0, 0, 0, 5],
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
                   },
                },
            },
            formatter: (name: any) => {
                const item = data.filter(v => v.name === name)[0];
                const str = `{b|${name}}{d|${item.value}}{c|条${item.than === 0 ? '' : item.than < 0 ?  '，少' : '，多'}}${item.than === 0 ? '' : `{d|${Math.abs(item.than)}}{c|条}`}{a|}`;
                return `${str}`
            }
        },
        series: [
            {
                name: '数据源分布',
                type: 'pie',
                radius: '55%',
                center: [150, 100],
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

    const configList = (type: string) => [
        {
            type: typeEnum.select,
            placeholder: '请选择映射字段名',
            label: '数据源',
            field: 'dataType',
            defaultValue: 0,
            option: props.option,
            allowClear: false,
            onChange: (params: { dataType: number }) => {

                const item = props.option.find(v => v.value === params.dataType)

                if (type === 'left') {
                    setLeftParams({
                        ...leftParams,
                        ...params,
                    })
                    if (item) {
                        setLeftTitle(item.label)
                    }
                } else {
                    if (item) {
                        setRightTitle(item.label)
                    }
                    setRightParams({
                        ...rightParams,
                        ...params,
                    })
                }
            }
        },
    ];

    const handleRadioChange = (val: any, type: Type) => {
       xAxis = getAxisByType(val.target.value);
       if (type === Type.left) {
           setXAxis(xAxis);
           setLeftParams({
               ...leftParams,
               timeType: val.target.value,
           })
       }
       if (type === Type.right) {
           setXAxis1(xAxis);
           setRightParams({
               ...rightParams,
               timeType: val.target.value,
           })
       }
    }

    useEffect(
        () => {
            if (hasData) {
                const myPie = echart.init(pie);
                myPie.setOption(option);
            }
        }, [data]
    );

    useEffect(() => {
        getData();
        props.getDataSourceList()
    },[]);

    const getData = () => {
        setSpin(true);
        api.apiGetGraspDataDetail().then((res) => {
            if (res.code === 200) {
                if (res.data.compareSourceNetAdd === null && res.data.compareSourceNetDvalue === null && res.data.everyGraspDistributions.length === 0 && res.data.yesterdayGraspSumNum === null) {
                    setHasData(false)
                } else {
                    setHasData(true)
                }
                setSumData(res.data);
                const temp = res.data.everyGraspDistributions.map((v: any) => ({ name: `${v.dataSourceName}-${v.sourceId}`, id: v.sourceId, value: v.everySourceGraspNum, than: v.dvalue }))
                setData(temp)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setSpin(false);
        })
    }

    return (
        <div className="grab-situation-monitor">
            <div className="header">
                <p className="header-title">抓取数据分布概览</p>
                <Spin spinning={spin}>
                    {hasData ? <>
                        <div className="header-content-top">
                            <div className="left">
                                <div style={{ display: 'inline-block'}}>
                                    <span className="title">昨日抓取总量</span>
                                    <div className="bottom">
                                        <span className="number" style={{ marginLeft: 0}}>{sumData.yesterdayGraspSumNum}</span>
                                        <span>条</span>
                                    </div>
                                </div>
                                {/*/!*{sumData.yesterdayGraspSumNum === 0 ? <div className="cover-wrapper"/> : null} *!/ 遮挡饼图*/}
                            </div>
                            <div className="right">
                                <span className="title">与源网站增量（区分数据源）差值</span>
                                <div>
                                    {sumData.compareSourceNetDvalue === 0 && sumData.compareSourceNetAdd === 0 ?
                                        <span className="right-bottom-left">
                                            <span className="number">0</span>
                                            条
                                        </span>
                                        : <>
                                            {sumData.compareSourceNetDvalue === 0 ? null : <span className="right-bottom-left">
                                                <span>少</span>
                                                <span className="number">{Math.abs(sumData.compareSourceNetDvalue)}</span>
                                                <span>条</span>
                                            </span>}
                                            {sumData.compareSourceNetAdd === 0 ? null : <span>
                                                <span>多</span>
                                                <span className="number">{sumData.compareSourceNetAdd}</span>
                                                <span>条</span>
                                            </span>}
                                    </>}
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0 20px'}}>
                            <div id="pie" ref={dom => pie = dom} style={{ width: '100%', marginTop: 22, height: col > 4 ? col * 30 : 180, minHeight: 180 }} />
                        </div>
                    </> : <NoData height={258} />}
                </Spin>
            </div>
            <div className="bottom-left">
                <div className="header-title">
                    源网站增量与数据抓取量
                    <TitleRight configList={configList('left')} handleRadioChange={(val: any) => handleRadioChange(val, Type.left)} />
                </div>
                <div className="chart">
                    <BottomLeft title={leftTitle} xAxisData={xAxis} params={leftParams} />
                </div>
            </div>
            <div className="bottom-right">
                <div className="header-title">
                    数据抓取量与源网站增量差值
                    <TitleRight configList={configList('right')} handleRadioChange={(val: any) => handleRadioChange(val, Type.right)} />
                </div>
                <div className="chart">
                    <BottomRight title={rightTitle} xAxisData={xAxis1} params={rightParams} />
                </div>
            </div>
        </div>
    );
}

export default connect((state: any) => ({ option: state.dataSourceList }), (dispatch: any) => ({
    getDataSourceList: () => dispatch(getDataSourceList())
}))(Index);