import service from "./service";
import {Table} from "../common/schemas";

interface NewMappingList extends Table {
    sourceTypeId: number, // 数据类型
    endTime: string, // 更新时间结束日期
    mapField: string, // 映射字段名
    startTime: string, // 更新时间起始日期
}

// 【查询】查询开发异常的列表
export const apiGetNewMappingList = async (params: NewMappingList) => {
    const response = await service.get('/asset/abnormal/newMapping/getNewMappingList', { params })
    return response.data;
};

// 【查询】新增映射值数据源下拉列表
export const apiGetDataTypeList = async () => {
    const response = await service.get('/asset/abnormal/newMapping/getDataTypeList')
    return response.data;
};

export default {
    apiGetNewMappingList,
    apiGetDataTypeList,
}