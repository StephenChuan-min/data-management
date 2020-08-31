export const proUrl = 'http://172.18.255.251:18091'; // 生产接口
// export const devUrl = 'http://172.18.255.75:8080'; // 锡全开发接口
// export const devUrl = 'http://172.18.255.196:8080'; // 浩磊开发接口
export const devUrl = 'http://172.18.255.251:18091'; // 开发接口
export const baseUrl = process.env.NODE_ENV === 'production' ? proUrl : devUrl;