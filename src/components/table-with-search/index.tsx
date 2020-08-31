import React, {useEffect, useState} from 'react';
import Search from "./search";
import * as schemas from './schemas';
import {message, Table, Pagination} from 'antd';
import {BtnType, Columns} from "../../common/schemas";
import { connect } from 'react-redux';
import {clearParams, setFresh, setParams} from "../../store/action";
import './style.scss';

export interface BtnProps {
    label: string,
    type?: BtnType,
    onClick?(): void
}

interface TableProps {
    config: (schemas.Props | schemas.Props1)[],
    btnList: BtnProps[],
    params: { key: number, [propsName: string]: any },
    clearParams(key?: number): void,
    apiFun(params: object): any,
    setFresh(bol: boolean):void,
    isFresh: boolean,
    paramsKey: number,
    columns: Columns[],
    rowKey: string,
    setParams(obj: object): void,
    defaultParams?: object, // 默认参数
}

const initProps = {
    config: [],
    btnList: [],
    params: { key: 0 },
    clearParams: () => {},
    apiFun(params: object): any {
    },
    setFresh(bol: boolean): void {},
    isFresh: false,
    columns: [],
    paramsKey: 0,
};

const num = 10

export const TableWithSearch: React.FunctionComponent<TableProps> = props =>{

    const [loading, setLoad] = useState(false);
    const [params, setParams] = useState(props.params);
    const [data, setData] = useState([]);
    const [pageParams, setPageParams] = useState({ total: 0, current: 1, pageSize: num});

    useEffect(() => {
        // 初始化时清空查询条件
        assignDefaultParams(true);
        props.setFresh(true);
    }, []);

    useEffect(() => {
        if (props.isFresh) {
            getData()
            props.setFresh(false)
        }
    }, [params])

    // isMounted 是否首次加载
    const assignDefaultParams = (isMounted: boolean) => {
        const { config } = props;
        let defaultParams:any = [];
        if (isMounted) {
            defaultParams = config.map(v => {
                let obj = {}
                if (v.field instanceof Array && v.defaultValue instanceof Array) {
                    obj = { [v.field[0]]: v.defaultValue ? v.defaultValue[0] : undefined, [v.field[1]]: v.defaultValue[1]}
                }
                if (!(v.field instanceof Array)) {
                    obj = {[v.field]: v.defaultValue}
                }
                return obj;
            }).reduce((r, i) => Object.assign({}, r, i));
        } else {
            defaultParams = props.params
        }
        const a = {...defaultParams, ...props.defaultParams, key: 0 }
        setParams(a);
    };

    const getData = (otherParams?: {}) => {
        setLoad(true)
        // 搜索加上默认参数
        let reParams = {page: pageParams.current, num: pageParams.pageSize, ...params, ...otherParams }
        delete reParams.key;
        props.apiFun(reParams).then((res: any) => {
            if (res.code === 200) {
                setData(res.data.list)
                setPageParams({
                    current: res.data.page,
                    pageSize: res.data.num,
                    total: res.data.total
                })
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setLoad(false)
        })
    };

    useEffect(() => {
        if (props.isFresh) {
            assignDefaultParams(false);
        }
    }, [props.isFresh]);

    const handlePageChange = (page: number) => {
        setPageParams({
            ...pageParams,
            current: page,
        });
        props.setParams({ page });
        setParams({
            ...params,
            page
        });
        props.setFresh(true)
    };

    const handleTableChange = (p: any, filters: any, sorter: any) => {
        if (sorter.order === 'ascend') {
            getData({SorterKey: sorter.columnKey, order: 'ASC'})
        }
        if (sorter.order === 'descend') {
            getData({SorterKey: sorter.columnKey, order: 'DES'})
        }
        if (!sorter.order) {
            getData()
        }
    }

    return <React.Fragment>
        <Search config={props.config} btnList={props.btnList} key={props.paramsKey} />
        <div className="yc-table-wrapper">
            <Table
                rowKey={(record: { [propName: string]: string }) => {
                    return record[props.rowKey]
                }}
                onChange={handleTableChange}
                showSorterTooltip={false}
                loading={loading}
                columns={props.columns}
                dataSource={data}
                pagination={false}
            />
            <div className="yc-table-wrapper-pagination-wrapper">
                <Pagination
                    total={pageParams.total}
                    showQuickJumper
                    showSizeChanger={false}
                    pageSize={pageParams.pageSize}
                    showTotal={v => `共${v}条`}
                    current={pageParams.current}
                    onChange={handlePageChange}
                />
                {/*<Button onClick={handleClick}>跳转</Button>*/}
            </div>
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
        setParams: (obj: object) => {
            dispatch(setParams(obj))
        },
    }
};

TableWithSearch.defaultProps = initProps


export default connect(
    (state: any) => {
        return ({ params: state.params, isFresh: state.isFresh, paramsKey: state.params.key })
    },
    mapDispatchToProps,
)(TableWithSearch);