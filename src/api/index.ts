export const proUrl = ''; // 生产接口
export const devUrl = 'http://172.18.255.251:8099'; // 开发接口
export const baseUrl = process.env.NODE_ENV === 'production' ? proUrl : devUrl;