<template>
  <a-layout>
    <a-layout-header><TopMenu /></a-layout-header>
    <a-layout>
      <a-layout-sider><LeftMenu /></a-layout-sider>
      <a-layout-content>
        <div class="yc-main-wrapper"><router-view /></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import TopMenu from '@/components/layout/top-menu.vue';
import LeftMenu from '@/components/layout/left-menu.vue';

export default {
  name: 'Home',
  components: { TopMenu, LeftMenu },
};
</script>

<style lang="less">
.ant-layout {
  height: 100%;
  min-width: 1200px;
  min-height: 800px;
  &-header {
    background-color: #016aa9;
    height: 50px;
    width: 100%;
    padding: 0 20px;
    line-height: 50px;
  }
  &-has-sider {
    .ant-layout-sider {
      min-width: 190px !important;
      max-width: 190px !important;
      width: 190px !important;
    }
    .ant-layout-content {
      background: #edeff3;
      padding: 20px;
      .yc-main-wrapper {
        background-color: #fff;
        height: 100%;
      }
    }
  }
}
</style>
