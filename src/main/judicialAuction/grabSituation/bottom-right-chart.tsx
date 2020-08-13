import React, {useState} from "react";
import LineChart, { emphasisStyle } from '../components/line-chart';
import { getDateArray } from '../../../utils/some-time-utils';

const initData = getDateArray(31);

const series = [
    {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
        barWidth: 10,
        name: '多于源网站增量',
        emphasis: emphasisStyle,
        z: 1,
    },
    {
        data: [-1320, -1330, -1290, -934, -901, -932, -820],
        type: 'bar',
        name: '少于源网站增量',
        barWidth: 10,
        emphasis: emphasisStyle,
        barGap: '30%',
        z: 1,
    },
    {
        data: [1320, 1330, 1290, 934, 901, 932, 820],
        type: 'line',
        name: '累计差值',
        symbol: 'emptyCircle',
        showSymbol: false,
        symbolSize: 2,
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

const color = ['#0386D5', '#FD9C26', '#F03733']

function BottomRight() {

    const [xAxisData, setData] = useState(initData)

    const legend = {
        selectedMode: 'multiple',
        itemGap: 30,
        itemWidth: 16,
        itemHeight: 8,
        data: ['多于源网站增量', '少于源网站增量', '累计差值'],
    };

    return (
        <LineChart xAxisData={xAxisData} legend={legend} series={series} color={color} tooltip={tooltip} height={362} />
    )
}

export default BottomRight;