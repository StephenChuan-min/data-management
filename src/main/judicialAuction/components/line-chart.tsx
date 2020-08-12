import React, {useEffect} from "react";

const echart = require('echarts');


interface Props {
    xAxisData: string[],
    yAxis: object,
    series: object,
    legend: object,
    height?: number,
    tooltip?: object,
    color?: string[],
}

function LineChart(props: Props) {

    let ref: any = null;

    useEffect(() => {
        const option = {
            tooltip: props.tooltip,
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: { show: true },
                },
            },
            color: props.color,
            legend: props.legend,
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        color: '#333333',
                    },
                    axisLine: {// 坐标轴样式
                        onZero: false,
                        lineStyle: {
                            color: '#CCCCCC',
                            width: 1,
                        },

                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                    },
                    splitLine: {
                        show: false,
                    },
                    data: props.xAxisData,
                },
            ],
            axisPointer: {
                z: 2,
                lineStyle: {
                    color: '#333',
                },
            },
            yAxis: props.yAxis,
            series: props.series,
        };
        const lineChart = echart.init(ref);
        lineChart.setOption(option);
    }, [])

    return (
        <div style={{ height: props.height || 780 }} ref={dom => ref = dom}/>
    )
}

export default LineChart;