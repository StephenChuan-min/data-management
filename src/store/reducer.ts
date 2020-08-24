import * as actionTypes from './action-types';
import { combineReducers } from 'redux';
import { handleLocal } from '../utils/localStorage'
import {labelValue} from "../common/schemas";

interface Action {
    type: string,
    text: any,
}

const initialState = {
    userName: handleLocal('nickName'),
    token: handleLocal('token'),
};

const initialState1 = {
    axiosList: [],
};

const initParams = {
    key: 0, // 搜索选项重置使用的key
}

function user(state = initialState, action: Action) {
    switch(action.type) {
        case actionTypes.ADD_USER:
            return Object.assign({}, state, {
                userName: action.text
            });
        case actionTypes.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.text
            });
        default:
            return state;
    }
}

function axios(state = initialState1, action: Action) {
    switch(action.type) {
        case actionTypes.ADD_AXIOS:
            return Object.assign({}, state, {
                axiosList: [...initialState1.axiosList, action.text]
            });
        default:
            return state;
    }
}


function params(state = initParams, action: { type: string, params: object, key?: number}) {
    switch(action.type) {
        case actionTypes.SET_PARAMS: // 添加请求条件
            return Object.assign({}, state, action.params);
        case actionTypes.CLEAR_PARAMS: // 清空请求条件
            return {key: action.key};
        default:
            return state;
    }
}

function isFresh(state = false, action: { type: string, is: boolean}) {
    switch(action.type) {
        case actionTypes.SET_FRESH: // 设置列表刷新状态
            return action.is;
        default:
            return state;
    }
}

function dataTypeList(state: labelValue[] = [], action: { type: string, list: labelValue[]}): labelValue[] {
    switch(action.type) {
        case actionTypes.SET_DATA_TYPE: // 设置数据类型
            return action.list;
        default:
            return state;
    }
}
// 数据源数组
function dataSourceList(state: labelValue[] = [], action: { type: string, list: labelValue[]}): labelValue[] {
    switch(action.type) {
        case actionTypes.SET_DATA_SOURCE: // 设置数据类型
            return action.list
        default:
            return state;
    }
}


export const reducers = combineReducers({
    user,
    axios,
    params,
    isFresh,
    dataTypeList,
    dataSourceList,
})