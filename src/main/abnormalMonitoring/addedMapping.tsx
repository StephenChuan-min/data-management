import React, {useEffect, useState} from 'react';
import TopSelect from "./components/top-select";
import TableWithSearch from "../../components/table-with-search";
import {typeEnum, typeEnum1} from "../../components/table-with-search/schemas";
import {BtnType} from "../../common/schemas";
import {message} from "antd";
import { connect } from 'react-redux';
import {clearParams, setFresh} from "../../store/action";
import api from '../../api/added-mapping';

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 异常监控-新增映射值
 */

interface Props {
    option: [],
    setFresh(is: boolean): void,
    clearParams(key: number): void,
    paramsKey: number,
}


function AddedMapping (props: Props) {

    const [type, setType] = useState(0);
    const [selectOption, setSelectOption] = useState([]);
    // const [configList, setConfigList] = useState();
    const [option, setOption] = useState([ { label: '全部', value: 0 }])

    useEffect(() => {
        getData(type)
        getOption(type)
    }, [type])

    const configList = [
        {
            type: typeEnum.select,
            placeholder: '请选择映射字段名',
            label: '映射字段名',
            field: 'mapField',
            option: selectOption,
        },
        {
            type: typeEnum1.rangePicker,
            label: '更新时间：',
            placeholder: ['起始日期', '截止日期'],
            field: ['startTime', 'endTime'],
        },
    ];

    const btnList = [
        {
            label: '查询',
            type: BtnType.primary,
            onClick: () => {
                props.setFresh(true)
            }
        },
        {
            label: '重置',
            type: BtnType.ghost,
            onClick: () => {
                props.clearParams(props.paramsKey + 1)
                props.setFresh(true)
            }
        },
    ];

    const columns = [
        {
            title: '更新时间',
            dataIndex: 'gmtFirstFind',
            key: 'gmtFirstFind',
        },
        {
            title: '表名',
            dataIndex: 'tableName',
            key: 'tableName',
        },
        {
            title: '映射字段名',
            dataIndex: 'mapField',
            key: 'mapField',
        },
        {
            title: '新增名称',
            key: 'fieldName',
            dataIndex: 'fieldName',
        },
    ];


    const getData = (val: number) => {
        api.apiGetDataTypeList().then((res) => {
            if (res.code === 200) {
                const list = res.data.map((v: {id: number, typeName: string }) => ({ value: v.id, label: v.typeName }))
                setOption(list)
            } else {
                message.error(res.message)
            }
        }).finally(() => {})
    };
    const handleSelect = (val: any) => {
        setType(val);
    };

    const getOption = (val: number) => {
        api.apiGetMapFieldList({ id: val }).then((res) => {
            if (res.code === 200) {
                const option = res.data.map((v: any) => ({ value: v.mapField, label: v.mapField }))
                setSelectOption(option)
            } else {
                message.error(res.message)
            }
        }).finally(() => {})
    }

        return (
            <div className="addedMapping">
                <div className="content-title">新增映射值</div>
                <TopSelect
                    getValue={handleSelect}
                    option={option}
                />
                <div>
                    <TableWithSearch
                        rowKey="id"
                        defaultParams={{ sourceTypeId: type }}
                        columns={columns}
                        config={configList}
                        btnList={btnList}
                        apiFun={api.apiGetNewMappingList}
                    />
                </div>
                <div>
                </div>
            </div>
        );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setFresh: (is: boolean) => {
            dispatch(setFresh(is))
        },
        clearParams: (key?: number) => {
            dispatch(clearParams(key))
        },
    }
}

export default connect((state: any) => ({ paramsKey: state.params.key }), mapDispatchToProps)(AddedMapping);