import service from "./service";

export const apiLogin = async (data: { password: string, userName: string }) => {
    const response = await service.post('/api/auth/login', data)
    return response.data;
};

export const apiLogout = async () => {
    const response = await service.post('/api/auth/logout')
    return response.data;
};


export default {
    apiLogin,
    apiLogout,
}