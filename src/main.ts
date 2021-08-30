import { createApp } from 'vue';
import router from '@/router';
import App from './App.vue';
import antd from './config/antd-config';
import store from '@/store';
import '@/assets/style/index.less';

createApp(App).use(antd).use(router).use(store).mount('#app');
