import React, {useEffect} from "react";
import {Route, Switch} from "react-router";
import NoMatch from './no-match';

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
    children: Item[],
}

function GetRouter(props: Props[]) {
    let result:Item[] = [];

    props.forEach(v => {
        if (v.role) {
            v.children.forEach(e => {
                if (e.role) {
                    result.push({...e})
                }
            })
        }
    });

    useEffect(() => {
        if (result.length === 0) {
            window.location.href = '/'
        }
    })

    const router: any[] = result.map((v, i) => {
        if (i === 0) {
            return <Route exact path="/main" key={v.path} component={(props: any) => <div className="yc-content">{v.component(props)}</div>} />
        }
        return <Route exact path={v.path} key={v.path} component={(props: any) => <div className="yc-content">{v.component(props)}</div>} />
    });

    return <Switch children={[...router, <Route component={NoMatch} />]} />
}

export default GetRouter;