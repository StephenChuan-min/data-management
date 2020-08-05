import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { handleLocal } from '../utils/localStorage'

interface Action {
    type: string,
    text: any,
}

const initialState = {
    userName: 'czq',
    token: handleLocal('token'),
};

const initialState1 = {
    axiosList: [],
};

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


export const reducers = combineReducers({
    user,
    axios,
})