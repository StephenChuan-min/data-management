import * as type from "./actionTypes";
import { handleLocal } from '../utils/localStorage'

export function addUser(text: string) {
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