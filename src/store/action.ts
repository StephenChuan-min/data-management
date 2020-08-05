import { ADD_USER, ADD_AXIOS, SET_TOKEN } from "./actionTypes";
import { handleLocal } from '../utils/localStorage'

export function addUser(text: string) {
    return {
        type: ADD_USER,
        text,
    }
}

export function addAxios(promise: any) {
    return {
        type: ADD_AXIOS,
        item: promise,
    }
}

export function setToken(token: string) {
    handleLocal('token', token)
    return {
        type: SET_TOKEN,
        text: token,
    }
}