import Search from "../../../components/table-with-search/search";
import {Radio} from "antd";
import React from "react";
import * as schemas from "../../../components/table-with-search/schemas";
import './style.scss';

function TitleRight(props: { configList: (schemas.Props | schemas.Props1)[], handleRadioChange(val: any):void}) {
    return (
        <div className="title-right">
            <Search config={props.configList} />
            <Radio.Group onChange={props.handleRadioChange} defaultValue="1">
                <Radio.Button value="1">日</Radio.Button>
                <Radio.Button value="2">周</Radio.Button>
                <Radio.Button value="3">月</Radio.Button>
            </Radio.Group>
        </div>
    )
}

export default TitleRight