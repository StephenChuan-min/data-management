import service from "./service";
import {Table} from "../common/schemas";

/**
 * @author czq
 * @date 2020/8/17
 * @Description: 开发异常接口
*/

interface AbnormalDevelopList extends Table {
    dataType: number, // 数据类型
    dealStatus: number, // 处理状态
    endTime: string, // 结束时间
    errorType: number, // 错误类型
    netName: string, // 网站名称 模糊查询
    source_id: number, // source_id 精准查询
    startTime: string, // 开始时间
}

// 【查询】查询开发异常的列表
export const apiGetAbnormalDevelopList = async (params: AbnormalDevelopList) => {
    const response = await service.get('/asset/abnormal/development/getAbnormalDevelopList', { params })
    return response.data;
};
// 【查询】数据类型下拉接口
export const apiGetDataTypeList = async () => {
    const response = await service.get('/asset/abnormal/development/getDataTypeList' )
    return response.data;
};
// 【编辑】修改备注内容
export const apiEditRemarkContent = async (data: { content: string, id: string | number }) => {
    const response = await service.post('/asset/abnormal/development/editRemarkContent', data)
    return response.data;
};
// 【更新】操作-修改待处理为处理状态
export const apiEditDealStatus = async (data: { id: string | number }) => {
    const response = await service.post('/asset/abnormal/development/editDealStatus', data)
    return response.data;
};

export default {
    apiGetAbnormalDevelopList,
    apiGetDataTypeList,
    apiEditRemarkContent,
    apiEditDealStatus,
}