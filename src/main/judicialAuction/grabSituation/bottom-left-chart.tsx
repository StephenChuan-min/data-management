import React from "react";
import LineChart from '../components/line-chart';

const series = [
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
    params: { status: number },
}

function BottomLeft(props: Props) {
    console.log(props)
    const legend = {
        selectedMode: 'multiple',
        itemGap: 30,
        itemWidth: 16,
        itemHeight: 8,
        data: ['源网站增量', '数据抓取量'],
    };

    return (
        <LineChart
            xAxisData={props.xAxisData}
            legend={legend}
            series={series}
            color={color}
            tooltip={tooltip}
            height={362}
        />
    )
}

export default BottomLeft;