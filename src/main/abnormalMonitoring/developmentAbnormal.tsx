import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {setFresh, clearParams} from "../../store/action";
import {BtnType} from '../../common/schemas';
import TableWithSearch from '../../components/table-with-search'
import { typeEnum, typeEnum1 } from '../../components/table-with-search/schemas'
import './style.scss';
import TopSelect from './components/top-select';
import {Button, message} from "antd";
import Modal from '../../components/modal';
import Remark from './components/remark-modal';
import api from '../../api/developmentAbnormal';
import { getItemInArray } from '../../utils/utils';
import { EditOutlined } from '@ant-design/icons';

/**
 * @author czq
 * @date 2020/8/4
 * @Description: 异常监控-开发异常
*/

export enum ClickType {
    handle = '处理',
    check = '备注',
    edit = '编辑备注'
}


interface Props {
    userName: string,
    history: any,
    setFresh(bol: boolean):void,
    clearParams(key?: number):void,
    paramsKey: number,
    option: any
}

const errorType = [
        {
            label: '解析错误',
            value: 1,
        },
        {
            label: '抓取错误',
            value: 2
        }
    ]
const dealStatus = [
        {
            label: '未处理',
            value: 0,
        },
        {
            label: '已处理',
            value: 1
        }
    ]

function DevelopmentAbnormal(props: Props) {

    let initColumns = [];
    const [modalState, setModalState] = useState({
        clickType: ClickType.handle,
        visible: 0,
    })
    const [type, setType] = useState(0);
    const [columns, setColumns]: any[] = useState([]);

    const [record, setRecord] = useState({ id: '', remarks: '' });

    const [remark, setRemark] = useState('');

    const [loading, setLoading] = useState(false); // 弹窗按钮加载状态

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
            field: 'netName',
        },
        {
            type: typeEnum.select,
            placeholder: '请选择错误类型',
            label: '错误类型',
            field: 'errorType',
            option: errorType,
        },
        {
            type: typeEnum.select,
            label: '处理状态',
            placeholder: '请选择处理状态',
            field: 'dealStatus',
            option: dealStatus,
        },
        {
            type: typeEnum1.rangePicker,
            label: '发布日期：',
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
            }
        },
    ];

    const handleAddRemark = (resolve: () => void) => {
        // 当是查看时 点击编辑按钮
        if (modalState.clickType === ClickType.check) {
            setModalState({
                ...modalState,
                clickType: ClickType.edit
            });
            return
        }
        setLoading(true)
        api.apiEditRemarkContent({ id: record.id, content: remark }).then((res) => {
            if (res.code === 200) {
                props.setFresh(true);
                setLoading(false)
                resolve();
                message.success('编辑成功')
            } else {
                message.error(res.message)
            }
        }).finally(() => {})
    };

    let handleClick = (val: any, t: ClickType) => {
        if (t === ClickType.handle) {
            api.apiEditDealStatus({ id: val.id }).then((res) => {
                if (res.code === 200) {
                    message.success('处理成功')
                    props.setFresh(true)
                } else {
                    message.error(res.message)
                }
            }).finally(() => {})
        } else {
            setModalState({
                visible: Math.random(),
                clickType: t
            });
            setRecord(val);
        }
    }

    useEffect(() => {

        initColumns = [
            {
                title: '发布日期',
                dataIndex: 'publishTime',
                key: 'publishTime',
            },
            {
                title: '报错日期',
                dataIndex: 'failedTime',
                key: 'failedTime',
            },
            {
                title: '数据类型',
                dataIndex: 'dataType',
                key: 'dataType',
                render: (text: any) => getItemInArray(props.option, 'value', text, 'label')
            },
            {
                title: '错误类型',
                key: 'errorType',
                dataIndex: 'errorType',
                render: (text: any) => getItemInArray(errorType, 'value', text, 'label')
            },
            {
                title: 'source_id',
                key: 'sourceId',
                dataIndex: 'sourceId',
            },{
                title: '网站名称',
                key: 'netName',
                dataIndex: 'netName',
                width: 300,
            },
            {
                title: '子目录',
                key: 'subCatalog',
                dataIndex: 'subCatalog',
            },
            {
                title: '处理状态',
                key: 'dealStatus',
                dataIndex: 'dealStatus',
                render: (text: any) => getItemInArray(dealStatus, 'value', text, 'label')
            },
            {
                title: '操作',
                key: 'action',
                className: 'column-center',
                render: (text: any, record: any) => (
                    <div>
                        {record.dealStatus === 0 && <Button type="ghost" onClick={() => handleClick(record, ClickType.handle)}>处理</Button>}
                        {record.dealStatus === 1 && record.remarks &&  <Button type="ghost" onClick={() => handleClick(record, ClickType.check)}>查看备注</Button>}
                        {record.dealStatus === 1 && !record.remarks && <Button type="ghost" onClick={() => handleClick(record, ClickType.edit)}>编辑备注</Button>}
                    </div>
                ),
            },
        ];
        if (type !== 0) {
            initColumns = initColumns.filter(v => v.title !== '数据类型')
        }
        setColumns(initColumns);
    }, [props.option, type])


    const handleChangeType = (val: any) => {
        setType(val)
    }

    return (
            <div className="developmentAbnormal">
                <div className="content-title">开发异常</div>
                <TopSelect getValue={handleChangeType} />
                <div>
                    <TableWithSearch
                        rowKey="id"
                        columns={columns}
                        config={configList}
                        btnList={btnList}
                        defaultParams={{ dataType: type }}
                        apiFun={api.apiGetAbnormalDevelopList}
                    />
                </div>
                <div>
                </div>
                <Modal
                    className="developmentAbnormal-remark-modal"
                    loading={loading}
                    onOk={handleAddRemark}
                    okText={modalState.clickType === ClickType.check ? <span><EditOutlined />编辑</span> : "保存"}
                    cancelText={modalState.clickType === ClickType.check ? '' :"取消"}
                    title="备注"
                    visible={modalState.visible}
                >
                    <Remark getValue={setRemark} value={record.remarks} type={modalState.clickType} />
                </Modal>
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


export default connect(
    (state: any ) => ({
        userName: state.user.userName,
        paramsKey: state.params.key,
        option: state.dataTypeList,
    }),
    mapDispatchToProps,
)(DevelopmentAbnormal)