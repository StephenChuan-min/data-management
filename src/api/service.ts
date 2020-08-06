import axios from 'axios';
import { message } from 'antd';
import { baseUrl } from './index';
import store from "../store/store";

let path = '';

// 声明一个数组用于存储每个ajax请求的取消函数和ajax表示
let pending: {u: string, f(a?: string | object):any }[] = [];

interface Pending {
    u: string,
    f: (a?: string | object) => {}
}

interface Config {
    url: string
}


const removePending = (config: Config, arr: Pending[]) => {
    let matchIndex = null;
    if (arr.length === 0) return;
    for (let i = 0; i <= arr.length - 1; i += 1) {
        if (arr[i].u === config.url) {
            arr[i].f();
            matchIndex = i;
        }
        if (matchIndex) {
            arr.splice(matchIndex, 1);
        }
    }
    pending = arr.slice(0);
};

const removeResponse = (url: string) => {
    for (let i = pending.length - 1; i >= 0; i -= 1) {
        if (pending[i].u === url) {
            pending.splice(i, 1);
        }
    }
};

// 创建axios实例
const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000 * 4,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Encoding': 'gzip,compress,deflate,identity',
        token: store.getState().user.token,
        xhrFields: {
            withCredentials: true,
        },
    },
});

// request拦截  请求之前拦截
service.interceptors.request.use((config: any) => {
    // 记录发起请求的path
    // [, path] = config.url.split('yc/');
    path = config.url;
    removePending(config, pending.slice(0));
    const configNew = config;
    configNew.cancelToken = config.cancelToken || new axios.CancelToken((cancel: any) => {
        pending.push({ u: config.url, f: cancel });
    });
    // 在请求发出之前做拦截工作
    // 这块需要做一些用户验证的工作，需要带上用户凭证
    if (configNew.url.match(/\?/)) {
        configNew.url = `${configNew.url}&token=${store.getState().user.token}`;
    } else {
        configNew.url = `${config.url}?token=${store.getState().user.token}`;
    }
    return configNew;
}, (error: any) => {
    // 请求错误之后可以统一处理
    console.debug(`request error :${error}`);
    return Promise.reject(error);
});

// response 拦截  请求相应之后的拦截
service.interceptors.response.use(
    (response: any) => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过 xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        if (response.status === 200 || response.data !== null) {
            const res = response.data;
            if (res.code === 401 || res.code === 5002) {
                // 把其余的请求取消掉
                pending.forEach((item) => {
                    item.f('取消剩余请求');
                });
                pending = [];
                window.location.href = '/login';
                // Modal.warning({
                // 	title: '登陆验证失效',
                // 	content: '你的登陆验证已经失效，可以取消继续留在该页面，或者重新登录',
                // 	okText: '确定',
                // 	onOk() {
                // 		/* 跳转到登陆页面 */
                // 		navigate('/login');
                // 	},
                // });
                return Promise.reject(new Error('token失效'));
            }
            if (res.code === 5005) {
                message.error('管理员重置密码');
                window.location.href = '/login';
            }
        } else {
            response.data = null;
        }
        if (response && response.request && response.request.responseURL) {
            removeResponse(response.request.responseURL.split('?')[0]);
        }
        return response;
    },
    (error: any) => {
        if (axios.isCancel(error)) {
            const a = { message: `${path},请求过于频繁`, type: 'cancel' };
            return Promise.reject(a);
        }
        removeResponse(path);
        console.error('response error:', error);
        message.error('请检查网络情况');
        return Promise.reject(error);
    },
);

export default service;
