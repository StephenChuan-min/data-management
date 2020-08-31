import {applyMiddleware, createStore} from 'redux'
import { reducers } from './reducer';
import thunk from 'redux-thunk';


let store = createStore(reducers, applyMiddleware(thunk));
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
store.subscribe(() =>
    console.log(store.getState())
)


export default store