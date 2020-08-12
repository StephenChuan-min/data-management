import React, {useEffect, useState} from 'react';
import Search from "./search";
import * as schemas from './schemas';
import { Table, Space, Tag } from 'antd';
import {BtnType} from "../../common/schemas";
import { connect } from 'react-redux';
import {clearParams, setFresh} from "../../store/action";

export interface BtnProps {
    label: string,
    type?: BtnType,
    onClick?(): void
}

interface TableProps {
    config: (schemas.Props | schemas.Props1)[],
    btnList: BtnProps[],
    type: number,
    params: object,
    clearParams(key?: number): void,
    apiFun(params: object):void,
    setFresh(bol: boolean):void,
    isFresh: boolean,
    key: number,
}


function TableWithSearch(props: TableProps) {

    const [loading, setLoad] = useState(false)

    useEffect(() => {
        // 初始化时清空查询条件
        props.clearParams()
    }, []);

    useEffect(() => {
        if (props.isFresh) {
            setLoad(true)
            setTimeout(() => {
                setLoad(false)
                props.apiFun(props.params)
                props.setFresh(false)
            }, 1000)
        }
    }, [props.isFresh])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
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
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return <React.Fragment>
        <Search config={props.config} btnList={props.btnList} key={props.key} />
        <div>
            <Table loading={loading} columns={columns} dataSource={data} />
        </div>
    </React.Fragment>
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearParams: (key?: number) => {
            dispatch(clearParams(key))
        },
        setFresh: (is: boolean) => {
            dispatch(setFresh(is))
        },
    }
}

export default connect(
    (state: any) => {
        return ({ params: state.params, isFresh: state.isFresh, key: state.params.key })
    },
    mapDispatchToProps,
)(TableWithSearch);