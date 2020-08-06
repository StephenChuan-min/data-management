import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

const { SubMenu } = Menu;

interface Props {
    location: {
        pathname: string
    };
    sideList:
        {
            subMenu: string,
            children: {
                name: string,
                path: string
            }[]
        }[]
}

export default class Side extends Component<Props, {}>{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const { location: { pathname }, sideList } = this.props;
        return <div className="yc-main-side">
            <Menu
                defaultOpenKeys={sideList.map(v => v.subMenu)}
                mode="inline"
                selectedKeys={[pathname]}
            >
                {
                    sideList.map(v => (
                        <SubMenu
                            key={v.subMenu}
                            title={
                                <span>
                            <span>{v.subMenu}</span>
                        </span>
                            }
                        >
                            {
                                v.children.map(item => (
                                    <Menu.Item key={item.path}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                    ))
                }
            </Menu>
        </div>;
    }
}