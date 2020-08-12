import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {addUser, setFresh, clearParams} from "../../store/action";
import {BtnType} from '../../common/schemas';
import TableWithSearch from '../../components/table-with-search'
import { typeEnum, typeEnum1 } from '../../components/table-with-search/schemas'
import './style.scss';
import TopSelect from './components/top-select';

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 异常监控-开发异常
*/

interface Props {
    userName: string,
    setUserName: (a: string) => void,
    history: any,
    setFresh(bol: boolean):void,
    clearParams():void,
}

function DevelopmentAbnormal(props: Props) {

    const [type, setType] = useState(0)

    const configList = [
        {
            type: typeEnum.input,
            placeholder: '请输入source_id',
            label: 'source_id',
            field: 'source_id',
        },
        {
            type: typeEnum.input,
            placeholder: '请输入网站名称',
            label: '网站名称',
            field: 'name',
        },
        {
            type: typeEnum.select,
            placeholder: '请选择错误类型',
            label: '错误类型：',
            field: 'type',
            option: [
                {
                    value: 1,
                    label: '1'
                },
                {
                    value: 2,
                    label: '2'
                },
            ],
        },
        {
            type: typeEnum.select,
            label: '处理状态',
            placeholder: '请选择处理状态',
            field: 'status',
        },
        {
            type: typeEnum1.rangePicker,
            label: '发布日期：',
            placeholder: ['起始日期', '截止日期'],
            field: 'date',
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
                props.setFresh(true)
                props.clearParams()
            }
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

        return (
            <div className="developmentAbnormal">
                <div className="content-title">开发异常</div>
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserName: (name: string) => {
            dispatch(addUser(name))
        },
        setFresh: (is: boolean) => {
            dispatch(setFresh(is))
        },
        clearParams: () => {
            dispatch(clearParams())
        },
    }
}


export default connect(
    (state: any ) => ({ userName: state.user.userName }),
    mapDispatchToProps,
)(DevelopmentAbnormal)