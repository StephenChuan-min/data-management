<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';

moment.locale(zhCN.locale);
export default {
  setup() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style>
#app {
  font-family: Microsoft YaHei, PingFangSC-Regular, PingFang SC, Helvetica,
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
