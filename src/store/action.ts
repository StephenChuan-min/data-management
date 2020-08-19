import * as type from "./actionTypes";
import { handleLocal } from '../utils/localStorage'
import { labelValue } from '../common/schemas';
import api from "../api/developmentAbnormal";
import {message} from "antd";

export function addUser(text: string) {
    handleLocal('nickName', text)
    return {
        type: type.ADD_USER,
        text,
    }
}

export function addAxios(promise: any) {
    return {
        type: type.ADD_AXIOS,
        item: promise,
    }
}

export function setToken(token: string) {
    handleLocal('token', token)
    return {
        type: type.SET_TOKEN,
        text: token,
    }
}

export function setParams(params: object) {
    return {
        type: type.SET_PARAMS,
        params,
    }
}

export function clearParams(key?: number) {
    return {
        type: type.CLEAR_PARAMS,
        key,
    }
}

export function setFresh(is: boolean) {
    return {
        type: type.SET_FRESH,
        is,
    }
}

export function setDataTypeList(list: labelValue[]) {
    return {
        type: type.SET_DATA_TYPE,
        list,
    }
}

export function getDataTypeList() {
    return (dispatch: any) => {
        const fun = () => {
            api.apiGetDataTypeList().then((res) => {
                if (res.code === 200) {
                    const val = res.data.map((v: any) => ({ value: v.id, label: v.typeName }));
                    dispatch(setDataTypeList(val))
                } else {
                    message.error(res.message)
                }
            }).finally(() => {})
        }
        return fun()
    }
}
