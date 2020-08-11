import React from "react";
import {Route} from "react-router";

/**
 * @author czq
 * @date 2020/8/7
 * @Description: 获取有权限的路由渲染方法
*/

type Item = {
    path: string,
    role: boolean,
    component: any,
}

interface Props {
    role: boolean,
    children: Item[]
}

export function getRouter(props: Props[]) {
    let result:Item[] = [];
    props.forEach(v => {
        if (v.role) {
            v.children.forEach(e => {
                if (e.role) {
                    result.push({...e})
                }
            })
        }
    })
    const router: any[] = result.map((v, i) => {
        if (i === 0) {
            return <Route exact path="/main" key={v.path} component={v.component} />
        }
        return <Route exact path={v.path} key={v.path} component={v.component} />
    })
    return (
        <div className="yc-content">
            {
                router
            }
        </div>
        )
}