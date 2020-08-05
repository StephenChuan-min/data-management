import { createStore } from 'redux'
import { reducers } from './reducer';

let store = createStore(reducers);

console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)


export default store