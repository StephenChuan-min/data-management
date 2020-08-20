import React, {useEffect} from "react";
import NoData from "../../../components/no-data";

const echart = require('echarts');

export const emphasisStyle = {
    itemStyle: {
        barBorderWidth: 1,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.5)',
    },
};


interface Props {
    xAxisData: string[],
    series: object,
    legend: object,
    tooltip: {formatter(val: any): string},
    hasData: boolean,
    yAxis?: object,
    height?: number,
    color?: string[],
    xAxisConfig?: object
    gridTop?: number,
    grid?: {},
}

function LineChart(props: Props) {

    let ref: any = null;

    useEffect(() => {
        const option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0,0,0,0.7)',
                extraCssText: 'line-height: 24px',
                axisPointer: {
                    z: 2,
                },
                padding: 12,
                formatter: props.tooltip.formatter,
            },
            // toolbox: {
            //     show: true,
            //     feature: {
            //         saveAsImage: { show: true },
            //     },
            // },
            grid: {
                top: props.gridTop || 40,
                bottom: 50,
                right: 10,
                ...props.grid,
            },
            color: props.color,
            legend: props.legend,
            xAxis: [
                {
                    nameTextStyle: {
                        color: '#4F5358',
                        fontSize: 12,
                    },
                    type: 'category',
                    axisLabel: {
                        color: '#4F5358',
                    },
                    axisLine: {// 坐标轴样式
                        onZero: false,
                        lineStyle: {
                            color: '#E2E4E9',
                            width: 1,
                        },

                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                        color: '#E2E4E9',
                    },
                    splitLine: {
                        show: false,
                    },
                    data: props.xAxisData,
                    ...props.xAxisConfig,
                },
            ],
            axisPointer: {
                z: 2,
                lineStyle: {
                    color: '#333',
                },
            },
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    color: '#4F5358',
                    formatter: '{value}',
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#E2E4E9',
                        width: 1,
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        type: 'dashed',
                    },
                },
                ...props.yAxis
            }],
            series: props.series,
        };
        if (props.hasData) {
            const lineChart = echart.init(ref);
            lineChart.setOption(option);
        }
    }, [props]);

    return props.hasData ? <div className="yc-line-chart" style={{ height: props.height || 780 }} ref={dom => ref = dom}/> : <NoData height={props.height} />
}

export default LineChart;