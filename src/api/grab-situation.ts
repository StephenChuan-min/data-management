import service from "./service";
import { TimeType } from '../common/schemas';

/**
 * @author czq
 * @date 2020/8/18
 * @Description: 其他数据监控接口
 */

// 【查询】抓取数据分布概览[xiahaolei]
export const apiGetGraspDataDetail = async () => {
    const response = await service.get('/asset/auction/graspMonitoring/getGraspDataDetail' );
    return response.data;
};

// 【查询】源网站增量与数据抓取量[xiahaolei]
export const apiGetGraspAndSourceAdd = async (params: { dataType: number, timeType: string,}) => {
    const response = await service.get('/asset/auction/graspMonitoring/getGraspAndSourceAdd', { params });
    return response.data;
};

// 【查询】数据抓取量与源网站增量差值[xiahaolei]
export const apiGetGraspAndSourceDvalue = async (params: { dataType: number, timeType: string,}) => {
    const response = await service.get('/asset/auction/graspMonitoring/getGraspAndSourceDvalue', { params });
    return response.data;
};

// 【查询】抓取情况监控数据源下拉列表[xiahaolei]
export const apiGetDataSourceList = async () => {
    const response = await service.get('/asset/auction/graspMonitoring/getDataSourceList' );
    return response.data;
};


export default {
    apiGetGraspDataDetail,
    apiGetGraspAndSourceAdd,
    apiGetGraspAndSourceDvalue,
    apiGetDataSourceList,
}