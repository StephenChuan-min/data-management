import React, {useState} from "react";
import LineChart from "../../components/line-chart";
import Search from "../../../../components/table-with-search/search";
import {typeEnum} from "../../../../components/table-with-search/schemas";
import {getDateArray} from "../../../../utils/some-time-utils";

const option = [{
    value: 0,
    label: '开拍时间（start_time)'
}]

function tooltip(str: string) {
    return (
        {
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
                    tipArray[index] = `${regMarker}${tempName}：${itemLabel}`;
            return e;
        });
        tip += timeDetail;
        tipArray.map((e) => {
            if (e) {
                tip = `${tip + e}<br>`;/* 组合所有提示信息 */
            }
            return e;
        });
        tip = `${str}<br />${params[0].name}<br>${tip}`;
        return tip;
    }})
}

function series(str: string): {}[] {
    return [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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

    const [name, setName] = useState('开拍时间（start_time)');

    const legend = {
        show: false,
        data: [name],
    };

    const configList = [
        {
            type: typeEnum.select,
            placeholder: '请选择数据源',
            label: '监控字段',
            field: 'status',
            option: option,
            onChange: (params: { status: any }) => {
                const item = option.filter(v => v.value === params.status)[0]
                console.log(item)
                setName(item.label)
            }
        },
    ];

    return (
        <div className="right-one">
            <p className="header-title">空值率监控（日）</p>
            <div className="content">
                <div className="third-content" style={{ marginTop: 29 }}>
                    <div className="second-title">
                        重要字段空值率折线图
                        <div className="title-right">
                            <Search config={configList} />
                        </div>
                    </div>
                </div>
                <LineChart gridTop={20} xAxisData={initData} legend={legend} series={series(name)} color={['#0386D5']} tooltip={tooltip(name)} height={197} />
            </div>
        </div>
    )
}

export default RightOne;