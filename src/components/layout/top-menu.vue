<template>
  <div class="top-menu-wrapper">
    <div class="top-menu-wrapper-left">
      <h1>
        <img src="../../assets/img/header-logo.png" alt="" />
        <span>源诚数据管理平台</span>
      </h1>
    </div>
    <div class="top-menu-wrapper-right">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          hi,管理员
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0"> 退出登录 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';

export default {
  name: 'TopMenu',
  components: {
    DownOutlined,
  },
};
</script>

<style lang="less">
.top-menu-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    h1 {
      display: flex;
      align-items: center;
      img {
        width: 21px;
        height: 21px;
      }
      span {
        color: #fff;
        margin-left: 6px;
        line-height: 21px;
      }
    }
  }
  &-right {
    .ant-dropdown-trigger {
      color: #fff;
    }
  }
}
</style>
