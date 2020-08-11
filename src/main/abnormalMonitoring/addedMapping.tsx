import React, {useEffect, useState} from 'react';
import TopSelect from "./components/top-select";
import TableWithSearch from "../../components/table-with-search";
import {typeEnum, typeEnum1} from "../../components/table-with-search/schemas";
import {BtnType} from "../../common/schemas";

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 异常监控-新增映射值
 */
function AddedMapping () {

    const [type, setType] = useState(0)

    useEffect(() => {
        getData(type)
    }, [type])

    const configList = [
        {
            type: typeEnum.select,
            placeholder: '请选择映射字段名',
            label: '映射字段名',
            field: 'status',
        },
        {
            type: typeEnum1.rangePicker,
            label: '更新时间：',
            placeholder: ['起始日期', '截止日期'],
            field: '22',
        },
    ];

    const btnList = [
        {
            label: '查询',
            type: BtnType.primary
        },
        {
            label: '重置',
            type: BtnType.ghost
        },
    ];

    const dataType = [
        {
            value: 0,
            label: '全部',
        },
        {
            value: 1,
            label: '555',
        },
    ]

    const getData = (val: number) => {
        console.log(val)
    }

        return (
            <div>
                    <TopSelect option={dataType} getValue={setType} />
                    <div>
                        <TableWithSearch
                            config={configList}
                            btnList={btnList}
                            type={type}
                            apiFun={() => {}}
                        />
                    </div>
                    <div>
                    </div>
            </div>
        );
}

export default AddedMapping;