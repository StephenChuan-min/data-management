import React, {useEffect, useState} from 'react';
import TopSelect from "./components/top-select";
import TableWithSearch from "../../components/table-with-search";
import {typeEnum, typeEnum1} from "../../components/table-with-search/schemas";
import {BtnType} from "../../common/schemas";
import {Tag} from "antd";
import { connect } from 'react-redux';

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 异常监控-新增映射值
 */

interface Props {
    option: [],
}


function AddedMapping (props: Props) {

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
            field: ['start1', 'start2'],
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

    const columns = [
        {
            title: '更新时间',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: '表名',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '映射字段名',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '新增名称',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags : any) => (
                <>
                    {tags.map((tag: any) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];


    const getData = (val: number) => {
        console.log(val)
    }

        return (
            <div className="addedMapping">
                <div className="content-title">新增映射值</div>
                <TopSelect
                    getValue={setType}
                    option={props.option}
                />
                <div>
                    <TableWithSearch
                        columns={columns}
                        config={configList}
                        btnList={btnList}
                        apiFun={() => {}}
                    />
                </div>
                <div>
                </div>
            </div>
        );
}

export default connect((state: any) => ({ option: state.dataTypeList }),)(AddedMapping);