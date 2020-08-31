import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import './style.scss';

const { SubMenu } = Menu;

interface Props {
    location: {
        pathname: string
    };
    header: string,
    sideList:
        {
            subMenu: string,
            role: boolean,
            icon: string,
            children: {
                name: string,
                path: string,
                role: boolean,
            }[]
        }[]
}

export default class Side extends Component<Props, {}>{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const { location: { pathname }, sideList, header } = this.props;
        let has = false;
        return <div className="yc-main-side">
            <Menu
                defaultOpenKeys={sideList.map(v => v.subMenu)}
                mode="inline"
                selectedKeys={[pathname]}
                theme="dark"
            >
                {
                    sideList.map(v => {
                        if (v.role) {
                            const r = (
                                <SubMenu
                                    key={v.subMenu}
                                    icon={<i className={`iconfont ${v.icon}`} />}
                                    title={
                                        <span>
                                            <span>{v.subMenu}</span>
                                        </span>
                                    }
                                >
                                    {
                                        v.children.map((item, i) => {
                                            if (item.role){
                                               const a = <Menu.Item key={!has ? header : item.path}>
                                                    <Link to={!has ? header : item.path}>{item.name}</Link>
                                                </Menu.Item>;
                                                has = true;
                                                return a;
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </SubMenu>
                            );
                            return r
                        }
                        return null
                    })
                }
            </Menu>
        </div>;
    }
}