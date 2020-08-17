import React from 'react';
import typeMap from "./type-map";
import './style.scss';
import * as schemas from '../schemas'
import { Button } from 'antd';
import { BtnProps } from '../index'


/**
 * @author czq
 * @date 2020/8/11
 * @Description: 搜索栏
*/

// 自定义类型保护
function isRange(props: schemas.Props1 | schemas.Props): props is schemas.Props1 {
    return props.type === schemas.typeEnum1.rangePicker
}

// 获取类型对应的type类型组件
function renderFun(item: schemas.Props1 | schemas.Props) {
    if (isRange(item)) {
        return typeMap.rangePicker(item)
    } else {
        return typeMap[item.type](item)
    }
}

function Search(props: {config: (schemas.Props | schemas.Props1)[], btnList?: BtnProps[]}) {

   return <React.Fragment>
       <div className="yc-search-line">
           {props.config.map(v => {
               return <div key={v.label} className={v.type === schemas.typeEnum1.rangePicker ? 'yc-search-line-item-range' :"yc-search-line-item"}>
                   <span className="yc-search-line-item_label">{v.label}</span>
                   <span className="yc-search-line-item_value">
                       {
                           renderFun(v)
                       }
                   </span>
               </div>
           })}
           {props.btnList ? <div className="yc-search-line-btn-wrapper">
               {
                   props.btnList.map(v => {
                       return <Button key={v.label} type={v.type} onClick={v.onClick}>{v.label}</Button>
                   })
               }
           </div> : null}
       </div>
   </React.Fragment>
}

export default Search;