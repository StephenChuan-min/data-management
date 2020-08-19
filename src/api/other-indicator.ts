import service from "./service";

/**
 * @author czq
 * @date 2020/8/18
 * @Description: 其他数据监控接口
*/

// 【查询】获取当前数据总量及昨日增量[liangxiquan]
export const apiGetCurrentSourceAndGraspInfo = async () => {
    const response = await service.get('/asset/auction/otherIndex/getCurrentSourceAndGraspInfo' );
    return response.data;
};

// 【查询】获取各表数据增量列表[liangxiquan]
export const apiGetDataCountList = async (params: { dateType: string}) => {
    const response = await service.get('/asset/auction/otherIndex/getDataCountList', { params });
    return response.data;
};

// 【查询】数据增量时间段分布列表[liangxiquan] sourceId 数据源ID countDate 统计时间
export const apiGetTimeSlotList = async (params: { sourceId: string, countDate: string}) => {
    const response = await service.get('/asset/auction/otherIndex/getTimeSlotList', { params });
    return response.data;
};

// 【查询】重要字段空值率列表[liangxiquan] monitorField 监控字段
// 监控字段 （1-开拍时间（start_time）2-评估价（consult_price）3-法院（court）4-资产类型（sub_category）5-竞买人 6-状态（status）7-标题（title）8-当前价格（current_price））
export const apiGetNullRateList = async (params: { monitorField: number }) => {
    const response = await service.get('/asset/auction/otherIndex/getNullRateList', { params });
    return response.data;
};

// 【查询】状态更新异常率列表
export const apiGetDataModifiedList = async () => {
    const response = await service.get('/asset/auction/otherIndex/getDataModifiedList' );
    return response.data;
};

// 【查询】状态更新异常率列表
export const apiGetFileAnalysisList = async () => {
    const response = await service.get('/asset/auction/otherIndex/getFileAnalysisList' );
    return response.data;
};


export default {
    apiGetCurrentSourceAndGraspInfo,
    apiGetDataCountList,
    apiGetTimeSlotList,
    apiGetNullRateList,
    apiGetDataModifiedList,
    apiGetFileAnalysisList,
}